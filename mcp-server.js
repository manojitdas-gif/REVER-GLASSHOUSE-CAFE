import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Log to stderr because stdout is reserved for JSON-RPC messages
const logError = (msg) => {
  process.stderr.write(`[REVER MCP ERROR] ${msg}\n`);
};

// JSON-RPC processing loop on stdin
let buffer = '';
process.stdin.on('data', chunk => {
  buffer += chunk.toString();
  let lineEnd;
  while ((lineEnd = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, lineEnd).trim();
    buffer = buffer.slice(lineEnd + 1);
    if (line) {
      handleRequest(line);
    }
  }
});

const sendResponse = (id, result) => {
  const response = {
    jsonrpc: "2.0",
    id,
    result
  };
  process.stdout.write(JSON.stringify(response) + '\n');
};

const sendError = (id, code, message) => {
  const response = {
    jsonrpc: "2.0",
    id,
    error: { code, message }
  };
  process.stdout.write(JSON.stringify(response) + '\n');
};

const handleRequest = (line) => {
  try {
    const req = JSON.parse(line);
    
    // Notifications do not have an ID and do not expect a response
    if (req.id === undefined) {
      return;
    }

    if (req.method === 'initialize') {
      sendResponse(req.id, {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: "rever-cafe-mcp",
          version: "1.0.0"
        }
      });
      return;
    }

    if (req.method === 'tools/list') {
      sendResponse(req.id, {
        tools: [
          {
            name: "get_menu",
            description: "Get the complete list of all recipe items categorized by section",
            inputSchema: { type: "object", properties: {} }
          },
          {
            name: "get_reservations",
            description: "View dynamic customer table bookings and reservations log",
            inputSchema: { type: "object", properties: {} }
          },
          {
            name: "get_reviews",
            description: "Retrieve submitted reviews and star ratings from guests",
            inputSchema: { type: "object", properties: {} }
          },
          {
            name: "get_details",
            description: "Fetch cafe details such as phone, address, operating hours, and socials",
            inputSchema: { type: "object", properties: {} }
          },
          {
            name: "update_menu",
            description: "Overwrite the recipe items list for a specific menu section/category",
            inputSchema: {
              type: "object",
              properties: {
                category: { type: "string", description: "Name of category e.g. Signature, Small Bites" },
                items: {
                  type: "array",
                  description: "Array of menu item objects",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      desc: { type: "string" },
                      price: { type: "number" },
                      img: { type: "string" },
                      veg: { type: "boolean" }
                    },
                    required: ["name", "price", "img"]
                  }
                }
              },
              required: ["category", "items"]
            }
          },
          {
            name: "update_details",
            description: "Modify cafe contact details, operating hours, or address parameters",
            inputSchema: {
              type: "object",
              properties: {
                name: { type: "string" },
                tagline: { type: "string" },
                address: { type: "string" },
                phone1: { type: "string" },
                phone2: { type: "string" },
                hours: { type: "string" },
                whatsapp: { type: "string" }
              }
            }
          }
        ]
      });
      return;
    }

    if (req.method === 'tools/call') {
      const toolName = req.params?.name;
      const args = req.params?.arguments || {};
      handleToolCall(req.id, toolName, args);
      return;
    }

    sendError(req.id, -32601, `Method not found: ${req.method}`);

  } catch (err) {
    logError(`JSON parse or run failure: ${err.message}`);
  }
};

const handleToolCall = (id, name, args) => {
  try {
    if (name === 'get_menu') {
      const db = loadDB();
      const menu = db.menu || {};
      sendToolResult(id, JSON.stringify(menu, null, 2));
      return;
    }

    if (name === 'get_reservations') {
      const data = fs.readFileSync(RESERVATIONS_FILE, 'utf8') || '[]';
      sendToolResult(id, data);
      return;
    }

    if (name === 'get_reviews') {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8') || '[]';
      sendToolResult(id, data);
      return;
    }

    if (name === 'get_details') {
      const db = loadDB();
      const details = db.details || {};
      sendToolResult(id, JSON.stringify(details, null, 2));
      return;
    }

    if (name === 'update_menu') {
      const { category, items } = args;
      const db = loadDB();
      db.menu = db.menu || {};
      db.menu[category] = items;
      saveDB(db);
      sendToolResult(id, `Successfully updated menu category: "${category}" with ${items.length} items.`);
      return;
    }

    if (name === 'update_details') {
      const db = loadDB();
      db.details = { ...db.details, ...args };
      saveDB(db);
      sendToolResult(id, `Successfully updated cafe details details.`);
      return;
    }

    sendError(id, -32602, `Unknown tool: ${name}`);

  } catch (err) {
    sendError(id, -32603, `Tool call execution error: ${err.message}`);
  }
};

const sendToolResult = (id, text) => {
  sendResponse(id, {
    content: [
      {
        type: "text",
        text
      }
    ]
  });
};

const loadDB = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '{}');
    }
  } catch (e) {
    logError(`Failed to load DB file: ${e.message}`);
  }
  return {};
};

const saveDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    logError(`Failed to write DB file: ${e.message}`);
  }
};
