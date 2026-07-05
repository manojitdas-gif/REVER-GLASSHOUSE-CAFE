import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendLeadEmails } from './emailService';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Search, Menu, X, Zap, BookOpen, TrendingUp, CheckCircle, 
  MessageSquare, MapPin, Mail, FileText, Code, Calendar, ChevronRight, Cpu, 
  BarChart3, Target, Share2, PenTool, Award, Clock, Star, Phone, Info, Plus, Minus,
  Server, Shield, Database, BarChart, Rocket, Compass, Users
} from 'lucide-react';


/* ============================================================
   SOCIAL ICONS
   ============================================================ */
const FacebookIcon = ({ size = 20, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 20, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 448 512" fill="currentColor" {...props}>
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

/* ============================================================
   TYPES
   ============================================================ */
interface Service { 
  icon: React.ComponentType<any>; 
  title: string; 
  desc: string; 
  color: string; 
  slug: string; 
  img: string; 
  features: string[]; 
}

interface CaseStudy { 
  title: string; 
  category: string; 
  growth: string; 
  image: string; 
  desc: string; 
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[]; 
  techStack: string[];
  clientName: string;
  clientRole: string;
  clientAvatar: string;
  clientQuote: string;
}

interface BlogPost { 
  title: string; 
  summary: string; 
  content: string; 
  date: string; 
  image: string; 
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  requirements: string[];
  responsibilities: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

/* ============================================================
   DATA
   ============================================================ */
const SERVICES: Service[] = [
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    desc: "Achieve dominant, sustainable search engine visibility through our technical audit frameworks, comprehensive intent-focused keyword mapping, semantic topical clustering, and high-authority link acquisition campaigns that convert searches into qualified customers.",
    color: "#06B6D4",
    slug: "seo-optimization",
    img: "/images/3d/services_seo_detail.png",
    features: ['Technical Core Web Vitals & Crawlability Audits', 'Local SEO & SEO Company Kolkata Target Mapping', 'AI SEO Clustering (SaaS SEO & Enterprise SEO)', 'GEO (Generative Engine Optimization) & AEO Setup']
  },
  {
    icon: Cpu,
    title: "AI App Development",
    desc: "Design and deploy cutting-edge artificial intelligence systems using custom Large Language Model (LLM) agents, semantic vector databases, and retrieval-augmented generation (RAG) frameworks to automate repetitive workflows and create intelligent user experiences.",
    color: "#7C3AED",
    slug: "ai-app-development",
    img: "/images/3d/services_ai_detail.png",
    features: ['AI Automation Services & LLM Integrations', 'Workflow & CRM Automation (WhatsApp Automation)', 'Semantic Search Systems & Vector Databases', 'AI Chatbots with Context Retrieval (AI Content Creation)']
  },
  {
    icon: Code,
    title: "Website Development",
    desc: "Develop hyper-performant, responsive frontends and secure backends using modern architectures like React, Next.js, and Vite, meticulously optimized for rapid load times, conversion-rate optimization (CRO), and seamless mobile adaptability.",
    color: "#3B82F6",
    slug: "website-development",
    img: "/images/3d/services_web_detail.png",
    features: ['Website Development Company Kolkata Specialists', 'Responsive Website Design & Fluid Aesthetics', 'WordPress, Shopify & Custom Ecommerce Development', 'Core Web Vitals Optimization (99+ Lighthouse Scores)']
  },
  {
    icon: MessageSquare,
    title: "Social Media Marketing",
    desc: "Formulate organic growth loops and creative social structures across Meta, TikTok, and LinkedIn, focusing on high-retention short-form video content, viral hooks, community nurturing, and multi-channel marketing campaigns.",
    color: "#10B981",
    slug: "social-media-marketing",
    img: "/images/3d/services_social_detail.png",
    features: ['Meta Ads Kolkata & Reels Marketing Setup', 'LinkedIn Marketing Kolkata & Social Media Marketing', 'Active Organic Community Engagement & Growth Strategies', 'LinkedIn B2B Marketing & Founder Branding Pipelines']
  },
  {
    icon: BarChart3,
    title: "Excel & Data Analytics",
    desc: "Convert fragmented spreadsheets and databases into clean, automated pipeline architectures, creating interactive custom business intelligence dashboards, financial projection templates, and advanced SQL data analysis views.",
    color: "#059669",
    slug: "excel-data-analytics",
    img: "/images/3d/services_analytics_detail.png",
    features: ['Advanced Excel Models, VBA macros, & Custom Formulas', 'Automated SQL Pipeline Construction & Database Linking', 'Custom Business Intelligence (Looker Studio, PowerBI) Setups', 'Predictive Modeling Sheets for Corporate Growth Metrics']
  },
  {
    icon: Target,
    title: "Google Ads (PPC)",
    desc: "Maximize acquisition performance and lower CAC using data-backed Google PPC search, display, performance max, and YouTube video ads, featuring continuous audience exclusions, strict negative keywords, and copy variations.",
    color: "#F59E0B",
    slug: "google-ads-ppc",
    img: "/images/3d/seo_growth.png",
    features: ['Google Ads Kolkata & PPC Search Engine Campaigns', 'Performance Max (PMax) & Google Ads Management Services', 'Targeted B2B & D2C Search & Display Campaigns', 'Negative Keyword Auditing & Budget Efficiency Monitoring']
  },
  {
    icon: Share2,
    title: "Meta Business Suite",
    desc: "Establish total coordination of your Meta Business Manager ecosystem, creating unified messaging networks, pixel tracking layers, Conversions API (CAPI) infrastructure, and catalog synchronizations for scaling.",
    color: "#4F46E5",
    slug: "meta-business-suite",
    img: "/images/3d/social_media.png",
    features: ['Unified Messaging Inbox & Auto-response Deployments', 'Meta Conversions API (CAPI) Server-Side Integrations', 'E-commerce Catalog Synchronization & Asset Structuring', 'Meta Pixel Auditing & Account Security Configuration']
  },
  {
    icon: PenTool,
    title: "Content Strategy",
    desc: "Develop cohesive brand narrative frameworks, producing conversion-optimized copywriting, authoritative blog clusters, monthly newsletters, and landing pages that move prospects effortlessly through the sales funnel.",
    color: "#EF4444",
    slug: "content-strategy",
    img: "/images/3d/team_workflow.png",
    features: ['AI Content Creation Services & Blog Strategies', 'AI Copywriting for High-Converting Landing Pages', 'Content Marketing & Automated Email Newsletters', 'Detailed Brand Voice Guidelines & Editorial Maps']
  }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Nexus Tech Solutions",
    category: "Full Content Strategy",
    growth: "+210% Reach",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    desc: "Built a customized multi-channel content strategy that amplified organic visibility and generated high-quality sales leads.",
    challenge: "Nexus Tech suffered from stagnant search impressions and high ad dependencies, resulting in a soaring Customer Acquisition Cost (CAC) and inconsistent inbound sales channels. Their technical indexing was broken due to heavy client-side script rendering blocks.",
    solution: "We refactored their site architecture, mapped out 40 commercial intent keyword clusters, integrated an automated Markdown content production pipeline, and established a white-hat backlink campaign targeting high-authority domains. We also built customized GA4 and GTM tracking systems.",
    metrics: [{ label: "Reach Growth", value: "+210%" }, { label: "Lead Quality", value: "2.4x" }],
    techStack: ['Next.js', 'TailwindCSS', 'MDX', 'Google Tag Manager', 'Screaming Frog'],
    clientName: "Vikram Malhotra",
    clientRole: "CTO, Nexus Solutions",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    clientQuote: "Growthlytics acted as a natural extension of our tech team. They didn't just give us advice; they wrote the Next.js clean code that fixed our crawl budgets."
  },
  {
    title: "Lumina Fashion",
    category: "Meta Ads & Social",
    growth: "4.5x ROAS",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    desc: "Scaled e-commerce revenues rapidly through audience segmentation, copy optimizations, and creative-led Meta Ads campaigns.",
    challenge: "Lumina struggled with high ad spend decay and low return on ad spend (ROAS) on generic audiences, resulting in unprofitable acquisition, high pixel drop-offs due to iOS 14.5 restrictions, and rising catalog sync errors.",
    solution: "We refactored their Meta pixel using Google Tag Manager Server-Side container, implemented server-side Conversions API (CAPI) with full user identity parameters, and launched a weekly creative-testing cycle running high-retention video hooks that optimized ROAS and catalog conversions.",
    metrics: [{ label: "ROAS", value: "4.5x" }, { label: "Revenue Lift", value: "+180%" }],
    techStack: ['GTM Server-Side', 'Meta Conversions API', 'Node.js', 'Framer Motion', 'Looker Studio'],
    clientName: "Sarah Henderson",
    clientRole: "Founder, Lumina Fashion",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    clientQuote: "After our ad tracking broke with iOS 14.5 restrictions, our ROAS cratered. Growthlytics deployed server-side Conversions API mapping that restored our data accuracy and scaled our ROAS to 4.5x."
  },
  {
    title: "Apex Logistics",
    category: "Data & SEO Audit",
    growth: "-30% CAC",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    desc: "Revamped technical SEO architecture and data reporting, cutting customer acquisition cost while driving organic conversion rate.",
    challenge: "Apex suffered from technical crawl blocks, slow load times on heavy tracking script layers, and fragmented databases leading to inaccurate marketing analytics (dark data) and incorrect spend allocation.",
    solution: "We ran a deep crawl audit to eliminate indexing blocks, consolidated SQL database connections to construct automated pipeline views, and streamlined tracking container tags, resulting in quick load times and clear acquisition analytics.",
    metrics: [{ label: "CAC Reduction", value: "-30%" }, { label: "Conversion Rate", value: "+45%" }],
    techStack: ['PostgreSQL', 'Python', 'FastAPI', 'Google Analytics 4', 'Vite'],
    clientName: "Rajesh Verma",
    clientRole: "Director of Ops, Apex Logistics",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    clientQuote: "Their data analytics models consolidated our marketing spend sheets. For the first time in our startup journey, we had clear analytics on our Customer Acquisition Cost."
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    title: "The Future of SEO: AI-Driven Search and How to Stay Ahead",
    summary: "As generative AI transforms how users search, we explore how to optimize for 'answer engines' and AI overviews. Learn to leverage semantic relevance over keyword stuffing.",
    date: "May 5, 2026",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop",
    content: `The landscape of Search Engine Optimization is undergoing its most significant transformation since the inception of Google. With the rise of Search Generative Experience (SGE) and AI Overviews, the goal is no longer just to rank #1—it's to be the source that AI cites.

Key Strategies for 2026:
1. Semantic Relevance: Focus on topics, not just keywords. AI understands context and intent better than ever.
2. E-E-A-T: Experience, Expertise, Authoritativeness, and Trustworthiness are non-negotiable. Real-world insights trump generic AI-generated filler.
3. Brand Authority: Building a recognizable brand name is the best defense against algorithm shifts.

Conclusion:
Digital entities that provide unique, data-backed value will thrive. Survival in the AI era requires a shift from 'creating content for search' to 'creating value for humans that AI happens to find useful'.`
  },
  {
    title: "Maximizing ROI on Meta Ads: Strategies for 2026",
    summary: "Advanced attribution modeling and creative-led growth strategies for the current Meta ecosystem. Discover why creative testing is your new best friend for scaling.",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
    content: `In 2026, Meta Ads have shifted from a platform of technical hacks to a platform of creative excellence. Advantage+ campaigns have automated much of the targeting, leaving 'Creative' as the last remaining lever for performance.

The Growth Blueprint:
1. Creative-Led Targeting: Let your video hooks and headlines do the segmentation.
2. Diversified Format Testing: Reels are still the primary growth engine. Use them for top-of-funnel awareness.
3. Zero-Click Content: Build trust within the feed before asking for the click.

Scaling Secrets:
Don't scale by budget alone; scale by creative diversity. A healthy ad account should have at least 5 different creative 'angles' running simultaneously.`
  },
  {
    title: "Content That Converts: Building a Data-Driven Content Strategy",
    summary: "Stop guessing what your audience wants. Learn how to use heatmaps and user flow data to craft content that guides prospects through the funnel.",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    content: `Data-driven content strategy is the intersection of psychology and analytics. Most brands create content to 'be active'; winners create content to 'move numbers'.

Building the Funnel:
1. TOFU (Awareness): Answer the questions your audience is asking on Reddit and Quora.
2. MOFU (Consideration): Use case studies and whitepapers to prove technical capability.
3. BOFU (Conversion): Targeted comparisons and feature deep-dives to close the gap.

Optimization Checklist:
- Use heatmaps (Hotjar/VWO) to see where users drop off.
- A/B test your headlines for 'curiosity gaps'.
- Ensure every piece of content has a singular, clear Call to Action.`
  },
  {
    title: "Social Media 2.0: Moving From 'Likes' to ROI-Driven Communities",
    summary: "Viral loops are dead. Engagement is the new currency. We break down the shift from vanity metrics to meaningful interactions that drive business growth.",
    date: "April 02, 2026",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
    content: `The era of chasing viral numbers is coming to an end. Algorithms now prioritize 'meaningful relationship units' over simple scrolls. To survive, brands must transition from broadcasters to community leaders.

Community Building Pillars:
1. Vertical Communities: Focus on micro-niches where your expertise is unchallenged.
2. Interactive Storytelling: Use Polls, AMAs, and Live sessions to lower the barrier between brand and consumer.
3. Direct Response Social: Every post should contribute to a 'Sales Velocity' metric, not just reach.

Growth Metric:
Measure 'Share of Conversation' rather than 'Follower Count'. A small, loyal audience that talks back is worth 10x a silent million.`
  },
  {
    title: "Data Privacy & The Cookieless Future: A Survival Guide",
    summary: "With third-party cookies disappearing, first-party data is your only safety net. Learn how to build a privacy-first marketing stack.",
    date: "March 20, 2026",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    content: `The cookie is crumbling, and the marketing world is scrambling. However, privacy is not an obstacle—it's an opportunity to build deeper trust with your customers.

The First-Party Strategy:
1. Lead Magnets: Give immense value (tools, data, templates) in exchange for direct contact info.
2. Identity Resolution: Use server-side tracking (GTM Server Side) to maintain data accuracy without violating browser privacy settings.
3. Zero-Party Data: Simply ask your users what they want. Quizzes and preference centers are marketing goldmines.

The Future is Permission-Based:
Marketing in 2026 must be invited. Use personalized CRM flows to nurture leads who have explicitly opted into your world.`
  }
];

const SERVICE_DETAILS: Record<string, { title: string; description: string; caseStudy: string }> = {
  "seo-optimization": {
    title: "SEO Optimization",
    description: "Dominating search rankings through technical audits, keyword research, and high-authority link building. We help you increase organic traffic and visibility.",
    caseStudy: "Increased organic traffic by 150% for a leading e-commerce brand in 6 months."
  },
  "ai-app-development": {
    title: "AI App Development",
    description: "Leveraging cutting-edge language models to create intelligent applications for automation and enhanced user experiences.",
    caseStudy: "Developed an AI-powered customer service bot reducing support ticket volume by 40%."
  },
  "website-development": {
    title: "Website Development",
    description: "Building high-performance, responsive websites tailored to your brand, optimized for speed and conversion.",
    caseStudy: "Rebuilt a corporate website resulting in a 30% increase in lead generation."
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    description: "Building communities and driving engagement across Meta, TikTok, and LinkedIn with viral-ready campaigns.",
    caseStudy: "Achieved viral engagement with a multi-platform campaign reaching 1 million+ impressions."
  },
  "excel-data-analytics": {
    title: "Excel & Data Analytics",
    description: "Transforming raw data into actionable insights with complex modeling, automation, and custom dashboards.",
    caseStudy: "Automated manual reporting, saving 20 hours of work per week for a finance team."
  },
  "google-ads-ppc": {
    title: "Google Ads (PPC)",
    description: "Maximizing ROI with precision-targeted search, display, and YouTube campaigns that convert intent into sales.",
    caseStudy: "Reduced cost-per-acquisition by 25% while increasing conversions by 50%."
  },
  "meta-business-suite": {
    title: "Meta Business Suite",
    description: "Comprehensive management of your Facebook and Instagram ecosystem, integrated with unified messaging.",
    caseStudy: "Streamlined social operations, increasing response times by 60%."
  },
  "content-strategy": {
    title: "Content Strategy",
    description: "Story-driven content ecosystems designed to nurture leads and establish industry authority.",
    caseStudy: "Developed a content roadmap that boosted blog traffic by 200% year-over-year."
  }
};

const PRINCIPLES = [
  { icon: Zap, title: "Deep Work", desc: "We focus on high-impact tasks that move the needle." },
  { icon: Clock, title: "Constant Learning", desc: "Data shifts every day, and so do we." },
  { icon: Award, title: "Scale Mindset", desc: "We don't think in additions; we think in multiplications." }
];

const JOB_POSITIONS: JobPosition[] = [
  {
    id: "ai-engineer",
    title: "AI Integration Engineer",
    department: "Engineering",
    location: "Kolkata, WB / Remote",
    type: "Full-Time",
    requirements: [
      "2+ years experience building production-ready applications using LLMs (OpenAI, Anthropic, Gemini APIs) with a strong portfolio of shipped products.",
      "Strong proficiency in TypeScript, Python, and React, including framework integrations.",
      "Deep familiarity with vector databases (Pinecone, PGVector, Milvus), semantic embeddings, and agentic pipelines (LangChain, LangGraph, AutoGen).",
      "Experience optimizing LLM API latency, managing token usage budgets, and deploying prompt engineering strategies.",
      "Familiarity with containerized deployments (Docker, AWS ECS) and serverless backend setups."
    ],
    responsibilities: [
      "Develop custom AI chatbots, semantic workflows, and autonomous agents to automate marketing and lead processing tasks.",
      "Integrate intelligent recommendation algorithms and predictive analytics pipelines into client-facing dashboard portals.",
      "Maintain clean, modular codebases, write comprehensive API documentation, and collaborate with frontend engineers.",
      "Participate in client discovery sessions to assess AI automation feasibility and translate business targets into code specifications."
    ]
  },
  {
    id: "growth-lead",
    title: "Growth Marketing Lead",
    department: "Marketing",
    location: "Kolkata, WB / Hybrid",
    type: "Full-Time",
    requirements: [
      "3+ years experience scaling D2C or B2B SaaS accounts to high monthly revenues with verified case studies.",
      "Proven track record managing ₹5L+ monthly budgets on Meta Ads, Google PPC (Search, Display, PMax), and LinkedIn campaigns.",
      "Obsessively data-driven with strong command over GA4, GTM, Hotjar, Microsoft Clarity, SQL, and Excel reporting.",
      "Excellent copywriting skills with experience directing design assets and video hooks.",
      "Familiarity with server-side tagging concepts and conversion rate optimization (CRO) methodologies."
    ],
    responsibilities: [
      "Formulate multi-channel customer acquisition strategies focusing strictly on conversion volume and positive ROI metrics.",
      "Direct creative ad testing cycles, coordinate with design pods, and write engaging copy targeting specific demographics.",
      "Perform regular conversion rate audits, configure heatmaps, and design high-converting landing page layouts.",
      "Synchronize server-side pixel attributions and construct unified Looker Studio dashboards for weekly client reporting."
    ]
  },
  {
    id: "react-dev",
    title: "Full-Stack React/Vite Developer",
    department: "Engineering",
    location: "Kolkata, WB / Hybrid",
    type: "Full-Time",
    requirements: [
      "Solid understanding of React 18, React hooks, Context API, state management libraries, TypeScript, and Vite bundlers.",
      "Expertise in CSS layout models (Flexbox, Grid), responsive design rules, and utility frameworks like TailwindCSS.",
      "Familiarity with backend server models (Node.js, Express) and headless/decoupled database endpoints (Supabase, PostgreSQL).",
      "Experience setting up secure OAuth flows, managing third-party API configurations, and optimizing core web vitals.",
      "Experience with automated testing tools (Jest, Playwright) and continuous integration (GitHub Actions, Vercel deployments)."
    ],
    responsibilities: [
      "Build and deploy pixel-perfect, hyper-performant frontends and landing page templates for our clients.",
      "Implement premium interactive layout layers, Framer Motion transitions, and 3D hover effects to drive engagement.",
      "Optimize Core Web Vitals (aiming for 95+ LCP and CLS scores) by refactoring bulky JavaScript bundles.",
      "Integrate backend APIs and setup local JSON database configurations for scalable lead submission systems."
    ]
  }
];

const ONBOARDING_SPRINTS = [
  { 
    phase: "Phase 1", 
    title: "Audit & Architecture Mapping", 
    duration: "Days 1–7", 
    desc: "We perform deep-dive technical diagnostics across your entire web structure. This includes scanning search engine indexing logs, resolving core web vitals speed blocks, analyzing tracking pixel triggers, auditing advertising accounts for budget waste, and setting baseline Customer Acquisition Cost (CAC) benchmarks.",
    icon: Search
  },
  { 
    phase: "Phase 2", 
    title: "AI Workflows & NextJS Setup", 
    duration: "Days 8–15", 
    desc: "We integrate custom Large Language Models (LLMs) and vector memory connectors to automate your content research and customer service pipelines. Concurrently, we construct a high-performance React/Next.js frontend template built with TypeScript and Tailwind, guaranteeing speed index scores above 95.",
    icon: Code
  },
  { 
    phase: "Phase 3", 
    title: "Data Pipelines & CAPI Sync", 
    duration: "Days 16–22", 
    desc: "We deploy Google Tag Manager server-side containers and configure Meta Conversions API (CAPI) sync. We link your backend CRM systems to SQL databases, establishing clean real-time Looker Studio reports so you can attribute every rupee of marketing spend directly to customer sales.",
    icon: Database
  },
  { 
    phase: "Phase 4", 
    title: "SEO Clusters & Scale Campaigns", 
    duration: "Days 23–30", 
    desc: "We launch verified paid advertising creatives, index optimized commercial keyword clusters, distribute target backlink outreach, and begin our weekly conversion optimization sprints. This compounds your organic inbound traffic while lowering customer acquisition costs.",
    icon: Rocket
  }
];

const FAQS: FAQItem[] = [
  {
    question: "What does the Free Growth Audit cover?",
    answer: "Our growth audits deep-dive into your technical SEO infrastructure, page speed metrics, search engine keyword gaps, tracking pixel configurations (GA4/Meta CAPI), and paid advertising historical performance to identify your biggest bottlenecks."
  },
  {
    question: "How do you integrate AI into client workflows?",
    answer: "We develop custom Large Language Model (LLM) agents and APIs tailored to your processes. This includes building custom content generation pipelines, automating customer support queries with semantic memory, and creating predictive analytical algorithms."
  },
  {
    question: "Do we retain full ownership of the assets and code?",
    answer: "Yes, 100%. All custom Next.js/React codebases, custom database tables (SQL/Supabase), vector search repositories, and marketing ad accounts are set up in your name. You retain full copyright and data ownership."
  },
  {
    question: "How do you track conversion attribution accurately?",
    answer: "We implement advanced server-side GTM configurations and Meta Conversions API (CAPI) integrations. This minimizes the impact of third-party cookie restrictions, ensuring that we measure ad interactions and offline conversions with precision."
  },
  {
    question: "What is your weekly report and communication cadence?",
    answer: "We communicate asynchronously using a shared Slack channel. You receive a live, real-time Looker Studio database report alongside a weekly video summary detailing the test results, conversions, and target growth benchmarks."
  },
  {
    question: "Are there any long-term contract lock-ins?",
    answer: "No, we do not believe in locking clients into long-term restrictive retainers. We operate on flexible monthly rolling sprints. We earn your partnership every single month by delivering measurable growth and compounding performance."
  },
  {
    question: "Can you collaborate with our existing in-house developers?",
    answer: "Absolutely. We routinely operate as an external acceleration pod. We integrate with your existing codebase via GitHub pull requests, coordinate in your Slack workspace, and document our APIs and tracking schemas thoroughly."
  },
  {
    question: "What technology stack do you build your solutions with?",
    answer: "We build with modern, performance-first frameworks: React, Next.js, Vite, TypeScript, TailwindCSS, Node.js, Python, PostgreSQL, and Supabase. We avoid bloated drag-and-drop website builders to ensure maximum speed and flexibility."
  }
];

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { 
        el.classList.add('visible'); 
        obs.disconnect(); 
      } 
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, count };
}

function useMouse3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({ x: ((e.clientY - cy) / (rect.height / 2)) * -12, y: ((e.clientX - cx) / (rect.width / 2)) * 12 });
  }, []);
  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener('mousemove', handleMouseMove as EventListener);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => { 
      el.removeEventListener('mousemove', handleMouseMove as EventListener); 
      el.removeEventListener('mouseleave', handleMouseLeave); 
    };
  }, [handleMouseMove, handleMouseLeave]);
  return { ref, tilt };
}

/* ============================================================
   GLOBAL COMPONENTS & STYLING
   ============================================================ */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Dynamic SEO title & description injection
    let title = "Growthlytics | AI Marketing, SEO & Automation Agency India";
    let desc = "Growthlytics helps startups and businesses grow with AI-powered digital marketing, SEO, AI automation, web development, Google Ads, Meta Ads, LinkedIn strategy, and content marketing across India.";

    if (pathname === '/about') {
      title = "About Us | Growthlytics - AI Marketing, SEO & Automation Agency India";
      desc = "We are an ROI-focused growth engineering team bypassing traditional agency structures. We build high-performance web systems and AI automations you own 100%.";
    } else if (pathname === '/portfolio') {
      title = "Case Studies & Audited Results | Growthlytics";
      desc = "Read real, audited case studies of how we scaled traffic, conversion rates, and ROAS using technical growth frameworks and code ownership.";
    } else if (pathname === '/blogs') {
      title = "Technical Growth & Marketing Blogs | Growthlytics";
      desc = "Deep-dives into server-side GTM containers, advanced search engine mapping, paid advertising mathematics, and custom AI content pipelines.";
    } else if (pathname === '/services') {
      title = "Growth & Automation Services | Growthlytics India";
      desc = "Explore our core services: AI automation, Web Development, SEO, Paid Ads, LinkedIn B2B marketing, and Social Media strategies.";
    } else if (pathname.startsWith('/service/')) {
      const slug = pathname.replace('/service/', '');
      const svc = SERVICES.find(s => s.slug === slug);
      if (svc) {
        title = `${svc.title} Services Kolkata & India | Growthlytics`;
        desc = svc.desc;
      }
    } else if (pathname === '/privacy-policy') {
      title = "Privacy Policy | Growthlytics";
      desc = "At Growthlytics, we value your privacy. Read our terms regarding data confidentiality, applicant CVs, and database record storage.";
    }

    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
  }, [pathname, hash]);
  return null;
};

const TiltImage3D = ({ src, alt, height = 380, glow = '#7C3AED', floatDelay = '0s' }: { src: string; alt: string; height?: number | string; glow?: string; floatDelay?: string }) => {
  const { ref, tilt } = useMouse3D();
  return (
    <div ref={ref} style={{ perspective: '1000px', width: '100%' }}>
      <div style={{
        position: 'relative', borderRadius: '24px', overflow: 'hidden',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d',
        boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${glow}40`,
        animation: `float3d 6s ease-in-out infinite`,
        animationDelay: floatDelay,
      }}>
        <img src={src} alt={alt} style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%, rgba(255,255,255,0.02) 100%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: `linear-gradient(to top, ${glow}20, transparent)`,
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
};

const Orbs3D = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {[
      { size: 400, top: '-5%', left: '-5%', color: 'rgba(124,58,237,0.14)', delay: '0s', dur: '12s' },
      { size: 300, top: '45%', right: '-3%', color: 'rgba(6,182,212,0.12)', delay: '2s', dur: '15s' },
      { size: 250, bottom: '5%', left: '20%', color: 'rgba(16,185,129,0.08)', delay: '1s', dur: '9s' },
    ].map((orb, i) => (
      <div key={i} style={{
        position: 'absolute', borderRadius: '50%',
        width: orb.size, height: orb.size,
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        ...(orb.top ? { top: orb.top } : {}),
        ...(orb.bottom ? { bottom: (orb as any).bottom } : {}),
        ...(orb.left ? { left: orb.left } : {}),
        ...(orb.right ? { right: (orb as any).right } : {}),
        animation: `float3d ${orb.dur} ease-in-out infinite`,
        animationDelay: orb.delay,
      }} />
    ))}
  </div>
);

const StatItem = ({ target, suffix, label, subdesc }: { target: number; suffix: string; label: string; subdesc: string }) => {
  const { ref, count } = useCounter(target);
  return (
    <div ref={ref} style={{ textAlign: 'center' }} className="p-4 relative z-10">
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{subdesc}</div>
    </div>
  );
};

const SpaceStarfield = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let scrollY = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const starCount = 120;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      depth: number;
      speedX: number;
      speedY: number;
      alpha: number;
      twinkle: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(6, 182, 212, ',
      'rgba(124, 58, 237, ',
      'rgba(244, 63, 94, '
    ];

    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2 + 0.5;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        depth: size * 0.015,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04,
        alpha: Math.random() * 0.8 + 0.2,
        twinkle: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const shootingStars: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      speed: number;
      opacity: number;
    }> = [];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.4),
        dx: Math.random() * 3 + 3,
        dy: Math.random() * 1.5 + 1.5,
        length: Math.random() * 60 + 30,
        speed: Math.random() * 8 + 6,
        opacity: 1.0
      });
    };

    const updateShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ctx.beginPath();
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.dx * 3, ss.y - ss.dy * 3);
        grad.addColorStop(0, `rgba(6, 182, 212, ${ss.opacity})`);
        grad.addColorStop(0.5, `rgba(124, 58, 237, ${ss.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.dx * 3, ss.y - ss.dy * 3);
        ctx.stroke();

        ss.x += ss.dx * (ss.speed / 10);
        ss.y += ss.dy * (ss.speed / 10);
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach(star => {
        star.x += star.speedX;
        star.y += star.speedY;

        star.alpha += star.twinkle;
        if (star.alpha > 1.0 || star.alpha < 0.15) {
          star.twinkle = -star.twinkle;
          star.alpha = Math.max(0.15, Math.min(1.0, star.alpha));
        }

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const offsetX = (mouse.x - centerX) * star.depth;
        const offsetY = (mouse.y - centerY) * star.depth;
        const scrollOffset = -scrollY * star.depth * 0.5;

        let drawX = star.x + offsetX;
        let drawY = star.y + offsetY + scrollOffset;

        drawX = (drawX % width + width) % width;
        drawY = (drawY % height + height) % height;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + Math.max(0.1, Math.min(1.0, star.alpha)) + ')';
        ctx.fill();
      });

      if (Math.random() < 0.0004) {
        spawnShootingStar();
      }
      updateShootingStars();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

const NoiseOverlay = () => <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: 0.02, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '150px 150px' }} />;

/* ============================================================
   GLOBAL LAYOUT (NAV & FOOTER)
   ============================================================ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (anchor: string) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${anchor}`);
    } else {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 5%',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        ...(scrolled ? { background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' } : {}),
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', height: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, perspective: 1000 }}>
            <div className="logo-float" style={{ display: 'flex', alignItems: 'center' }}>
              <motion.img 
                src="/images/logo.jpg" 
                alt="Growthlytics Logo" 
                style={{ 
                  width: 55, 
                  height: 55, 
                  borderRadius: 14, 
                  objectFit: 'cover', 
                  border: '3px solid #06B6D4', 
                  boxShadow: '0 0 20px rgba(6,182,212,0.4)',
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  background: '#0a0a12',
                  padding: '2px',
                  filter: 'brightness(1.15) contrast(1.05)'
                }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 20, 
                  rotateX: 12,
                  boxShadow: '0 0 30px rgba(6,182,212,0.7)',
                  borderColor: '#06B6D4'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="gradient-text-animated" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: '1.95rem', letterSpacing: '-0.03em', lineHeight: 1.1, filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.25))' }}>Growthlytics</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 800, color: '#06B6D4', letterSpacing: '0.12em', marginTop: 2, textTransform: 'uppercase', textShadow: '0 0 8px rgba(6,182,212,0.3)' }}>// Real-Time Problem Solvers</span>
            </div>
          </Link>

          <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link to="/" className="nav-link">Overview</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            <Link to="/blogs" className="nav-link">Blogs</Link>
            <Link to="/services" className="nav-link">Services</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 14, marginRight: 4 }}>
              <a href="https://www.facebook.com/profile.php?id=61574339623332" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = '#1877F2'; e.currentTarget.style.transform = 'scale(1.15)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }} title="Facebook">
                <FacebookIcon size={18} />
              </a>
              <a href="https://www.instagram.com/_growthlytics_/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = '#E1306C'; e.currentTarget.style.transform = 'scale(1.15)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }} title="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://wa.me/919836148511" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = '#25D366'; e.currentTarget.style.transform = 'scale(1.15)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }} title="WhatsApp">
                <WhatsAppIcon size={18} />
              </a>
            </div>
            <button onClick={() => handleNav('book-demo')} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>Free Audit →</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="ham-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 8, display: 'none' }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(5,5,8,0.98)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Overview</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="mobile-nav-link">About Us</Link>
            <Link to="/portfolio" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Portfolio</Link>
            <Link to="/blogs" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Blogs</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Services</Link>
            <button onClick={() => handleNav('book-demo')} className="btn-primary" style={{ marginTop: 12 }}>Get Free Audit →</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){.desk-nav{display:none!important}.ham-btn{display:flex!important}}
        .nav-link-btn { background: none; border: none; cursor: pointer; text-align: left; }
        .mobile-nav-link { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.8); text-decoration: none; background: none; border: none; cursor: pointer; }
        .mobile-nav-link:hover { color: #06B6D4; }
      `}</style>
    </>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (anchor: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${anchor}`);
    } else {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer style={{ background: 'rgba(5,5,8,0.9)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 5% 40px', position: 'relative', zIndex: 1, backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="footer-cols">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, perspective: 1000 }}>
              <div className="logo-float" style={{ display: 'flex', alignItems: 'center' }}>
                <motion.img 
                  src="/images/logo.jpg" 
                  alt="Growthlytics Logo" 
                  style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 12, 
                    objectFit: 'cover', 
                    border: '3px solid #7C3AED', 
                    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    background: '#0a0a12',
                    padding: '2px',
                    filter: 'brightness(1.15) contrast(1.05)'
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotateY: 20, 
                    rotateX: 12,
                    boxShadow: '0 0 30px rgba(124,58,237,0.7)',
                    borderColor: '#7C3AED'
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="gradient-text-animated" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: '1.65rem', color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.25))' }}>Growthlytics</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', fontWeight: 800, color: '#7C3AED', letterSpacing: '0.12em', marginTop: 2, textTransform: 'uppercase', textShadow: '0 0 8px rgba(124,58,237,0.3)' }}>// Real-Time Problem Solvers</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 300, marginBottom: 24 }}>
              A high-velocity team of real-time problem solvers building AI systems, premium websites, and technical growth infrastructure that deliver compounding, measurable results.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61574339623332' },
                { name: 'Instagram', url: 'https://www.instagram.com/_growthlytics_/' },
                { name: 'WhatsApp', url: 'https://wa.me/919836148511' }
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {s.name === 'Facebook' && <FacebookIcon size={14} />}
                  {s.name === 'Instagram' && <InstagramIcon size={14} />}
                  {s.name === 'WhatsApp' && <WhatsAppIcon size={14} />}
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SERVICES.map(s => (
                <li key={s.slug}><Link to={`/service/${s.slug}`} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><button onClick={() => handleNav('services')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>Core Services</button></li>
              <li><button onClick={() => handleNav('portfolio')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>Portfolio</button></li>
              <li><Link to="/services" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>Services</Link></li>
              <li><Link to="/privacy-policy" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Mail size={14} style={{ color: '#06B6D4' }} />
                <a href="mailto:growthlytics23@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>growthlytics23@gmail.com</a>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', color: '#06B6D4', width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>📞</span>
                <a href="tel:+919836148511" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>+91 98361 48511</a>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', color: '#06B6D4', width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>☎️</span>
                <a href="tel:+918765197073" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>+91 87651 97073</a>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', color: '#06B6D4', width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>💬</span>
                <a href="https://wa.me/919836148511" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#06B6D4'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>WhatsApp Chat</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>© 2026 GROWTHLYTICS. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/privacy-policy" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>Privacy Policy</Link>
            <a href="#" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>Terms of Service</a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-cols{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.footer-cols{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
};

const GrowthlyticsChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: "Hey! I'm your Growthlytics AI Assistant. ⚡\n\nWe build custom AI automations, high-velocity Next.js sites, and robust server-side tagging pipelines.\n\nHow can we help grow your business today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Escalation state variables
  const [flowState, setFlowState] = useState<'idle' | 'name' | 'contact' | 'message' | 'sending'>('idle');
  const [tempName, setTempName] = useState('');
  const [tempContact, setTempContact] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message to screen
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');
    
    // Run chatbot logic
    setIsTyping(true);
    setTimeout(async () => {
      let reply = "";
      const lower = text.toLowerCase();

      // Check current state machine
      if (flowState === 'name') {
        setTempName(text);
        reply = `Nice to meet you, ${text}! 👋 What email address or phone number should our engineers use to get back to you?`;
        setFlowState('contact');
        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        setIsTyping(false);
      } 
      else if (flowState === 'contact') {
        setTempContact(text);
        reply = `Got it. Please describe your question or what you would like our team to build.`;
        setFlowState('message');
        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        setIsTyping(false);
      } 
      else if (flowState === 'message') {
        reply = `Thanks! I am sending these details to our team at growthlytics23@gmail.com right now...`;
        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        
        try {
          await sendLeadEmails({
            formType: 'Chatbot Escalation',
            name: tempName,
            email: text.includes('@') ? text : (tempContact.includes('@') ? tempContact : 'chatbot-escalation@growthlytics.com'),
            phone: tempContact,
            message: text,
            overview: `Escalated query from chatbot user. Name: ${tempName}, Contact: ${tempContact}, Query: "${text}"`
          });
          
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: `All set! 🚀 Your message has been sent. A growth engineer will reach out to you within 24 hours.`, 
              sender: 'bot' 
            }]);
            setFlowState('idle');
          }, 1500);
        } catch (err) {
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: `I had a connection issue sending that automatically, but you can email us directly at growthlytics23@gmail.com or click 'Chat on WhatsApp'!`, 
              sender: 'bot' 
            }]);
            setFlowState('idle');
          }, 1500);
        }
        setIsTyping(false);
      } 
      else {
        // Idle state - standard keyword answers
        let handled = false;
        
        if (lower.includes('audit') || lower.includes('free') || lower.includes('request')) {
          reply = "Our technical audits are 100% free and take about 30 minutes. We inspect your site performance, indexing errors, and GTM tagging setups. Scroll down to our booking form at the bottom, or type your email here to start!";
          handled = true;
        } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('rate')) {
          reply = "Every partnership at Growthlytics is custom-scoped because we skip agency models and build actual software assets. Custom React & Next.js systems start around $2.5k. Let's discuss your requirements on WhatsApp!";
          handled = true;
        } else if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('phone') || lower.includes('call') || lower.includes('contact')) {
          reply = "You can speak directly with our engineering team on WhatsApp at +91 98361 48511. Click the 'Talk on WhatsApp' button above or dial directly!";
          handled = true;
        } else if (lower.includes('ai') || lower.includes('automation') || lower.includes('agent') || lower.includes('bot')) {
          reply = "We build custom LLM scrapers, database synchronization workers, and business automation workflows. We integrate systems like Supabase, OpenAI, and custom cron triggers to automate manual business processes.";
          handled = true;
        } else if (lower.includes('website') || lower.includes('web') || lower.includes('react') || lower.includes('next')) {
          reply = "We design lightweight React & Next.js frontends, complete with custom TailwindCSS systems, optimized for sub-1s load times and 100% SEO indexability. And you get full source code ownership (no vendor lock-in)!";
          handled = true;
        } else if (lower.includes('seo') || lower.includes('search') || lower.includes('google')) {
          reply = "We write semantic crawlers, restructure crawl architectures, and implement indexing fixes (like GTM server-side containers) to capture organic traffic and compound your ROI.";
          handled = true;
        } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
          reply = "Hey! I'm here to help. Are you looking for website development, AI integrations, or tracking fixes?";
          handled = true;
        }

        // If not matching any keyword, trigger email escalation
        if (!handled) {
          reply = "I want to make sure you get the absolute best answer. Let me escalate your query directly to our human engineering team.\n\nFirst, could you tell me your name?";
          setFlowState('name');
        }

        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        setIsTyping(false);
      }
    }, 1200);
  };

  const selectOption = (opt: string) => {
    handleSend(opt);
  };

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10000, fontFamily: 'Inter, sans-serif' }}>
      {/* Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4), 0 0 20px rgba(6, 182, 212, 0.3)',
          position: 'relative'
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : (
          <div style={{ position: 'relative' }}>
            <MessageSquare size={26} />
            <span style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#10B981', border: '2px solid #050508' }} />
          </div>
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="glass"
            style={{
              position: 'absolute', bottom: 80, right: 0,
              width: 'min(380px, 90vw)', height: 'min(520px, 80vh)',
              borderRadius: 24, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              background: 'rgba(10,10,18,0.95)',
              backdropFilter: 'blur(30px)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'white', letterSpacing: '0.02em' }}>Growthlytics AI</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 1 }}>Systems Agent</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="https://wa.me/919836148511" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#25D366'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'} title="WhatsApp Link">
                  <WhatsAppIcon size={16} />
                </a>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '12px 16px', borderRadius: 18,
                    fontSize: '0.85rem', lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    ...(msg.sender === 'user'
                      ? { background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: 'white', borderBottomRightRadius: 4 }
                      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.06)', borderBottomLeftRadius: 4 }
                    )
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 18px', borderRadius: 18, borderBottomLeftRadius: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: 8 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0s' }} />
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0.2s' }} />
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: 'bounce 1.4s infinite 0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Chips */}
            <div style={{ padding: '0 20px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                "⚡ Free Technical Audit",
                "🛠️ Operational Automation",
                "📦 Source Code Handoff",
                "💬 Chat on WhatsApp"
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (opt === "💬 Chat on WhatsApp") {
                      window.open('https://wa.me/919836148511', '_blank');
                    } else {
                      selectOption(opt);
                    }
                  }}
                  style={{
                    padding: '8px 12px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)'; e.currentTarget.style.color = '#06B6D4'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => { e.preventDefault(); handleSend(inputValue); }}
              style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 10, background: 'rgba(255,255,255,0.01)' }}
            >
              <input
                type="text"
                placeholder="Ask us anything..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '12px 16px',
                  color: 'white', fontSize: '0.85rem', outline: 'none'
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#06B6D4')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 18px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: '0.8rem', transition: 'transform 0.1s'
                }}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToContact = () => {
    const element = document.getElementById('book-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button 
        onClick={handleScrollToContact}
        className="btn-primary" 
        style={{ 
          position: 'fixed', bottom: 104, right: 32, zIndex: 500, 
          boxShadow: '0 8px 40px rgba(124, 58, 237, 0.5)', 
          transform: show ? 'translateY(0) scale(1)' : 'translateY(120px) scale(0.8)', 
          opacity: show ? 1 : 0, 
          transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)', 
          pointerEvents: show ? 'auto' : 'none', 
          fontSize: '0.875rem', padding: '12px 24px' 
        }}
      >
        Free Audit ✦
      </button>
      <GrowthlyticsChatbot />
    </>
  );
};

/* ============================================================
   PAGES
   ============================================================ */

/* ─── 1. HOME PAGE ────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    label: "AI Digital Marketing Agency India // Active",
    title: "We Turn Data Into",
    titleGradient: "Unstoppable Growth",
    desc: "We are an ROI-focused AI Marketing Agency in India and SEO Company in Kolkata, building custom AI Automation Services, high-performance websites, and growth frameworks for scaling brands.",
    checklist: [
      "Full Asset Ownership: Retain 100% of custom code, databases, and setups.",
      "Privacy-First Attributions: GTM Server-Side and Meta Conversions API integrations.",
      "Custom Workflow AI Agents: Built specifically to automate support and production pipelines."
    ],
    ctaText: "Get Free Audit",
    ctaLink: "#book-demo",
    secondaryCtaText: "View Portfolio",
    secondaryCtaLink: "#portfolio",
    image: "/images/3d/hero_dashboard.png",
    glow: "#7C3AED",
    chips: [
      { label: '↑ 80% Traffic', color: '#06B6D4', top: '10%', left: '-8%', delay: '0.6s' },
      { label: '3.2x ROAS', color: '#7C3AED', bottom: '15%', right: '-6%', delay: '1.2s' },
      { label: 'Growth Marketing Agency India', color: '#10B981', top: '60%', left: '-12%', delay: '0.9s' }
    ],
    bgPoster: "/images/3d/cyber_grid_bg.png"
  },
  {
    label: "AI Automation Protocol // Active",
    title: "Autonomous Content &",
    titleGradient: "LLM Pipeline Architecture",
    desc: "Deploy custom scraping, vector database vectorizations, and LLM-orchestrated content nodes that target organic search queries and build direct capture channels.",
    checklist: [
      "Custom Scraper Engines: Automated lead prospecting & site crawl mapping.",
      "Vector DB Integration: Power smart search & semantic indexing.",
      "Automated MDX Generation: Quality blog workflows without human friction."
    ],
    ctaText: "Explore AI Services",
    ctaLink: "#services",
    secondaryCtaText: "Our Onboarding timeline",
    secondaryCtaLink: "#methodology",
    image: "/images/3d/ai_brain.png",
    glow: "#06B6D4",
    chips: [
      { label: 'AI Indexing', color: '#06B6D4', top: '12%', right: '-8%', delay: '0.5s' },
      { label: 'Vector Stores', color: '#EC4899', bottom: '18%', left: '-10%', delay: '1.0s' },
      { label: 'LLM Pipelines', color: '#8B5CF6', top: '55%', right: '-12%', delay: '0.8s' }
    ],
    bgPoster: "/images/3d/neural_network_bg.png"
  },
  {
    label: "Server-Side Pixels & attribution",
    title: "Accurate Analytics &",
    titleGradient: "Performance Ad Scaling",
    desc: "Bypass standard iOS 14.5+ pixel limitations. We construct dedicated Google Tag Manager Server-Side containers, Conversions API tracking, and clean dashboards.",
    checklist: [
      "Server-Side Tagging: 100% accurate conversion events bypassing ad blockers.",
      "Meta Conversions API (CAPI): Deduplicated signals with maximum MATCH score.",
      "Looker Studio Sheets: Unified, audited acquisition cost spreadsheets."
    ],
    ctaText: "Audit Ad Pixels",
    ctaLink: "#book-demo",
    secondaryCtaText: "View Case Studies",
    secondaryCtaLink: "#portfolio",
    image: "/images/3d/analytics_pipeline.png",
    glow: "#10B981",
    chips: [
      { label: '+45% Revenue', color: '#10B981', top: '8%', left: '-5%', delay: '0.4s' },
      { label: '88% Match Rate', color: '#06B6D4', bottom: '22%', right: '-10%', delay: '1.1s' },
      { label: 'Zero Data Leak', color: '#7C3AED', top: '62%', left: '-8%', delay: '0.7s' }
    ],
    bgPoster: "/images/3d/cyber_grid_bg.png"
  },
  {
    label: "Zero Slide Decks // Production Code",
    title: "Engineered Frameworks &",
    titleGradient: "Full Code Ownership",
    desc: "We skip corporate slides and agency layers. We write next-generation React frontends, FastAPI services, and PostgreSQL schemas that you own completely. No vendor lock-in.",
    checklist: [
      "Custom React & Next.js: Lightweight, SEO-optimized web frontends.",
      "FastAPI & PostgreSQL: Highly performant backend APIs & database schemas.",
      "100% Repository Transfer: We hand over the GitHub repositories upon launch."
    ],
    ctaText: "Get Started Now",
    ctaLink: "#faq",
    secondaryCtaText: "Meet Core Builders",
    secondaryCtaLink: "/services",
    image: "/images/3d/website_mockup.png",
    glow: "#EC4899",
    chips: [
      { label: '100% Source Code', color: '#EC4899', top: '15%', right: '-5%', delay: '0.6s' },
      { label: 'No Vendor Lock', color: '#7C3AED', bottom: '15%', left: '-8%', delay: '1.3s' },
      { label: 'Next.js Dev', color: '#06B6D4', top: '58%', right: '-8%', delay: '0.9s' }
    ],
    bgPoster: "/images/3d/neural_network_bg.png"
  }
];

const Home = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Autoplay Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);
  
  // Accordion FAQ State
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Contact Form States
  const [form, setForm] = useState({ name: '', email: '', companyName: '', websiteUrl: '', phone: '', service: '', budget: '', overview: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const servicesRef = useReveal();
  const portfolioRef = useReveal();
  const methodologyRef = useReveal();
  const faqRef = useReveal();
  const blogRef = useReveal();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');
    setFormError('');
    const email = form.email;
    try {
      await sendLeadEmails({
        formType: 'Homepage Audit Request',
        name: form.name,
        email: form.email,
        companyName: form.companyName,
        websiteUrl: form.websiteUrl,
        phone: form.phone,
        service: form.service || 'Free Growth Audit',
        budget: form.budget || 'Not specified',
        message: form.overview,
      });
      setSubmittedEmail(email);
      setSubmitState('success');
      setForm({ name: '', email: '', companyName: '', websiteUrl: '', phone: '', service: '', budget: '', overview: '' });
    } catch (err: any) {
      console.error('[Lead Form] EmailJS error:', err);
      setFormError(err?.message || err?.text || 'Failed to send. Please email us directly at growthlytics23@gmail.com');
      setSubmitState('error');
    }
  };

  return (
    <>
      {/* Background Graphic Grid/Blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', borderRadius: '50%', width: 700, height: 700, background: 'radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)', top: '-100px', left: '-100px', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', borderRadius: '50%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%)', top: '35%', right: '-100px', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', borderRadius: '50%', width: 450, height: 450, background: 'radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)', bottom: '15%', left: '15%', filter: 'blur(60px)' }} />
      </div>

      {/* HERO SECTION */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 5% 80px', overflow: 'hidden' }} className="grid-bg">
        
        {/* Poster Size Background (Fade Transitions) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-motion-3d"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${HERO_SLIDES[currentHeroSlide].bgPoster}')`,
              backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'screen', pointerEvents: 'none',
              zIndex: 0
            }}
          />
        </AnimatePresence>

        {/* Ambient lighting overlays */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to top, #050508, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to bottom, #050508, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        
        <Orbs3D />
        
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentHeroSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 60, alignItems: 'center' }} 
              className="hero-grid"
            >
              {/* Left Text Column */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'left' }}>
                <div style={{ marginBottom: 24 }}>
                  <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: HERO_SLIDES[currentHeroSlide].glow, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: HERO_SLIDES[currentHeroSlide].glow, boxShadow: `0 0 12px ${HERO_SLIDES[currentHeroSlide].glow}`, display: 'inline-block' }} className="animate-pulse" />
                    {HERO_SLIDES[currentHeroSlide].label}
                  </div>
                </div>

                <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.3rem,5vw,4.2rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, color: 'white' }}>
                  {HERO_SLIDES[currentHeroSlide].title}{' '}
                  <span style={{ 
                    background: `linear-gradient(135deg,#7C3AED,${HERO_SLIDES[currentHeroSlide].glow},#EC4899,#7C3AED)`, 
                    backgroundSize: '300% 300%', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text', 
                    animation: 'gradientShift 4s ease infinite' 
                  }}>
                    {HERO_SLIDES[currentHeroSlide].titleGradient}
                  </span>
                </h1>

                <p style={{ fontSize: 'clamp(0.95rem,1.8vw,1.1rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 24, maxWidth: 540 }}>
                  {HERO_SLIDES[currentHeroSlide].desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                  {HERO_SLIDES[currentHeroSlide].checklist.map((item, idx) => {
                    const iconColors = ['#06B6D4', '#7C3AED', '#10B981'];
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <CheckCircle size={16} style={{ color: iconColors[idx % iconColors.length], flexShrink: 0, marginTop: 3 }} />
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
                  <a href={HERO_SLIDES[currentHeroSlide].ctaLink} className="btn-primary" style={{ fontSize: '0.95rem', padding: '14px 30px' }}>
                    {HERO_SLIDES[currentHeroSlide].ctaText}
                    <ArrowRight size={18} />
                  </a>
                  <a href={HERO_SLIDES[currentHeroSlide].secondaryCtaLink} className="btn-ghost" style={{ fontSize: '0.95rem', padding: '14px 30px' }}>
                    {HERO_SLIDES[currentHeroSlide].secondaryCtaText}
                  </a>
                </div>
              </div>

              {/* Right Floating 3D Graphic */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ transform: `translate(${mouse.x * 0.1}px, ${mouse.y * 0.1}px) translateY(${-scrollY * 0.03}px)`, transition: 'transform 0.2s ease-out', width: '100%', maxWidth: 420 }}>
                  <TiltImage3D src={HERO_SLIDES[currentHeroSlide].image} alt={HERO_SLIDES[currentHeroSlide].label} height={420} glow={HERO_SLIDES[currentHeroSlide].glow} />
                </div>

                {/* Floating Chips */}
                {HERO_SLIDES[currentHeroSlide].chips.map((chip, idx) => (
                  <div key={idx} className="glass animate-float" style={{
                    position: 'absolute', padding: '10px 18px', borderRadius: 100,
                    fontSize: '0.8rem', fontWeight: 800, color: 'white',
                    border: `1px solid ${chip.color}40`,
                    ...(chip.top ? { top: chip.top } : {}),
                    ...(chip.bottom ? { bottom: chip.bottom } : {}),
                    ...(chip.left ? { left: chip.left } : {}),
                    ...(chip.right ? { right: chip.right } : {}),
                    animationDelay: chip.delay,
                    whiteSpace: 'nowrap',
                    boxShadow: `0 0 20px ${chip.color}20`,
                    background: 'rgba(13,13,26,0.75)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 10
                  }}>
                    <span style={{ color: chip.color, marginRight: 6 }}>✦</span>
                    {chip.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls / Progress Indicators */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: 40, 
            paddingTop: 24, 
            borderTop: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            zIndex: 10 
          }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  style={{
                    width: idx === currentHeroSlide ? 50 : 20,
                    height: 6,
                    borderRadius: 100,
                    background: idx === currentHeroSlide ? HERO_SLIDES[idx].glow : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title={`Go to Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: 24 }}>
              <span>PILOT NODE // 0{currentHeroSlide + 1}</span>
              <span>TOTAL ACTIVE NODES // 0{HERO_SLIDES.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS COUNT strip */}
      <section style={{ padding: '0 5% 60px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/neural_network_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16, pointerEvents: 'none'
        }} />
        <div className="glass" style={{ maxWidth: 1280, margin: '0 auto', borderRadius: 28, padding: '40px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#7C3AED,#06B6D4,transparent)', animation: 'beamSlide 3s ease-in-out infinite' }} />
          <StatItem target={12} suffix=" Months" label="Active Operations" subdesc="Launched mid-2025 as a high-velocity team" />
          <StatItem target={3} suffix="+" label="High-Growth Pilots Shipped" subdesc="Across custom e-commerce and AI pipeline integrations" />
          <StatItem target={4} suffix=" Active Partners" label="Growing Brands" subdesc="Boutique, direct collaborations built on shared Slack channels" />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" ref={servicesRef} className="reveal" style={{ padding: '100px 5%', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Our Expertise</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginTop: 12 }}>
              Modular Growth Services Built for Packs of <span className="gradient-text">Performance</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '20px auto 0', fontSize: '1rem' }}>
              We don't just run campaigns; we build cohesive lead generation and automated pipeline frameworks. Click to explore details.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {SERVICES.map((s) => {
              const SvcIcon = s.icon;
              return (
                <Link to={`/service/${s.slug}`} key={s.slug} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    
                    {/* Embedded 3D Image Card Header (No vacant spaces!) */}
                    <div style={{ height: 160, overflow: 'hidden', borderRadius: '14px', marginBottom: 20, position: 'relative', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,26,0.95), transparent)' }} />
                      <div style={{ 
                        position: 'absolute', bottom: 12, left: 12,
                        width: 38, height: 38, borderRadius: 10, 
                        background: `${s.color}20`, border: `1px solid ${s.color}40`, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        color: s.color, boxShadow: `0 0 15px ${s.color}15`
                      }}>
                        <SvcIcon size={20} />
                      </div>
                    </div>

                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                    
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                      {s.features.map((feat, idx) => (
                        <li key={idx} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ color: s.color }}>✦</span>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: s.color, fontWeight: 700 }}>
                      Explore Details
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" ref={portfolioRef} className="reveal" style={{ padding: '100px 5%', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/neural_network_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16, pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
            <div>
              <div className="section-label">Success Stories</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginTop: 12 }}>
                Real Results. Real Value.{' '}
                <span className="gradient-text">Compounded.</span>
              </h2>
            </div>
            <a href="#book-demo" className="btn-ghost">Start Scaling Today</a>
          </div>

          {/* Large Results metrics render before grid */}
          <div style={{ marginBottom: 40, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 28, overflow: 'hidden' }}>
            <TiltImage3D src="/images/3d/results_metrics.png" alt="Growth metrics overview" height={360} glow="#06B6D4" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {CASE_STUDIES.map((cs, i) => (
              <div key={i} className="glass hover-lift" style={{ 
                borderRadius: 24, overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,10,20,0.4)',
                transition: 'all 0.4s ease'
              }}>
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={cs.image} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.9), transparent)' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#06B6D4', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {cs.growth}
                  </div>
                  <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                    <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.category}</span>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, color: 'white', marginTop: 4 }}>{cs.title}</h3>
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  {/* Render tech stack badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {cs.techStack.map((tech, idx) => (
                      <span key={idx} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>{cs.desc}</p>
                  
                  {/* Expanded challenge/solution content */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                    <div style={{ fontSize: '0.8rem', lineHeight: 1.5 }}><strong style={{ color: '#EF4444' }}>Challenge: </strong>{cs.challenge}</div>
                    <div style={{ fontSize: '0.8rem', lineHeight: 1.5 }}><strong style={{ color: '#10B981' }}>Solution: </strong>{cs.solution}</div>
                  </div>

                  <div style={{ display: 'flex', gap: 16 }}>
                    {cs.metrics.map((m, j) => (
                      <div key={j} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#06B6D4' }}>{m.value}</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 2, fontWeight: 500 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Client Quote & Avatar (Human Touch) */}
                  <div style={{ 
                    marginTop: 20, 
                    paddingTop: 16, 
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 12 
                  }}>
                    <p style={{ 
                      fontStyle: 'italic', 
                      fontSize: '0.825rem', 
                      color: 'rgba(255,255,255,0.6)', 
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      "{cs.clientQuote}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img 
                        src={cs.clientAvatar} 
                        alt={cs.clientName} 
                        style={{ 
                          width: 38, 
                          height: 38, 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '1.5px solid #06B6D4' 
                        }} 
                      />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{cs.clientName}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{cs.clientRole}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION (TIMELINE SPRINT) - Completely replaces payment plans! */}
      <section id="methodology" ref={methodologyRef} className="reveal" style={{ padding: '100px 5%', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Our Process</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginTop: 12 }}>
              The 30-Day Onboarding <span className="gradient-text">Sprint</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '20px auto 0', fontSize: '1rem' }}>
              How we deploy our tracking networks, build custom AI tools, and activate organic content clusters to build your growth engine.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }} className="about-grid-split">
            {/* Left Timeline Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {ONBOARDING_SPRINTS.map((sp, idx) => {
                const IconComp = sp.icon;
                return (
                  <div key={idx} className="glass" style={{ padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 20, alignItems: 'start' }}>
                    <div style={{ 
                      width: 44, height: 44, borderRadius: 10, 
                      background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      color: '#8B5CF6', flexShrink: 0 
                    }}>
                      <IconComp size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'white' }}>
                          <span style={{ color: '#06B6D4', marginRight: 8, fontSize: '0.85rem', fontWeight: 800 }}>{sp.phase}:</span>
                          {sp.title}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: '#06B6D4', fontWeight: 800, background: 'rgba(6,182,212,0.1)', padding: '2px 10px', borderRadius: 100 }}>{sp.duration}</span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>{sp.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 3D Image Column */}
            <div>
              <TiltImage3D src="/images/3d/sprint_methodology.png" alt="Methodology Roadmap 3D" height={440} glow="#7C3AED" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US (METHODOLOGY OVERVIEW) */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60, alignItems: 'center' }} className="about-grid-split">
            <TiltImage3D src="/images/3d/careers_workspace.png" alt="Growth Workflows 3D" height={400} glow="#06B6D4" />
            
            <div>
              <div className="section-label">Why Growthlytics</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 12, marginBottom: 24 }}>
                We're Not a Traditional Agency.<br/>
                <span className="gradient-text">We Are Real-Time Problem Solvers.</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 32 }}>
                Traditional marketing agencies optimize for monthly administrative overhead and billing retainer slide decks. We optimize exclusively for codebase integrations, system uptime, and measurable conversion flows.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Purely data-backed methodologies, zero gut-feeling guesswork',
                  'Dedicated specialists handling AI automation and analytics structures',
                  'High frequency creative and technical testing cadence',
                  'Full transparent pipeline and ad account ownership'
                ].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                    <div style={{ 
                      width: 22, height: 22, borderRadius: '50%', 
                      background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#10B981', flexShrink: 0
                    }}>
                      ✓
                    </div>
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.about-grid-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* COMPANY VISION & STORY (PROBLEM SOLVERS) */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 1, background: 'rgba(10,10,20,0.2)', overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.03, pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }} className="about-grid-split">
            <div>
              <div className="section-label">Our Story</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 12, marginBottom: 24 }}>
                We Are <span className="gradient-text">Real-Time Problem Solvers</span>
              </h2>
              
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p>
                  "We launched Growthlytics in mid-2025 to solve a clear structural mismatch: while modern acquisition channels are completely driven by software and APIs, marketing campaigns remain slow and manual. We operate as real-time problem solvers, bypassing the traditional agency layers that delay execution."
                </p>
                <p>
                  "We designed Growthlytics to run as an engineering-focused acquisition pod. Our team builds performant React web assets, configures server-side tagging (GTM CAPI) pipelines, constructs automated scrapers, and manages paid campaigns with strict algorithmic auditing. You work directly with technical specialists committed to shipping real solutions."
                </p>
                <p>
                  "Whether it is recovering from a tracking telemetry mismatch, creating database synchronization scripts, or scaling organic topical maps, we treat growth as a systems engineering challenge that can be solved with precise, production-grade code."
                </p>
              </div>

              <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Growthlytics Team</h4>
                  <span style={{ fontSize: '0.75rem', color: '#06B6D4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Real-Time Growth Engineers</span>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.2rem', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 16 }}>
                  SOLUTIONS
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 360 }}>
                <TiltImage3D src="/images/3d/problem_solving.png" alt="Collaborative Growth Workflow" height={420} glow="#06B6D4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (CLICKABLE ACCORDION - Highly detailed!) */}
      <section id="faq" ref={faqRef} className="reveal" style={{ padding: '100px 5%', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/neural_network_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16, pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }} className="about-grid-split">
            {/* Left Column: Title & 3D Image */}
            <div>
              <div className="section-label">Questions</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginTop: 12, marginBottom: 20 }}>
                Frequently Asked <span className="gradient-text">Inquiries</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 32 }}>
                Find detailed answers to common inquiries about our performance marketing frameworks, custom AI software deliverables, and data onboarding methods.
              </p>
              <TiltImage3D src="/images/3d/faq_support.png" alt="FAQ Support 3D" height={360} glow="#06B6D4" />
            </div>

            {/* Right Column: FAQ Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((faq, idx) => {
                const isExpanded = expandedFAQ === idx;
                return (
                  <div 
                    key={idx} 
                    className="glass" 
                    style={{ 
                      borderRadius: 16, overflow: 'hidden', 
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: isExpanded ? 'rgba(124,58,237,0.05)' : 'rgba(10,10,20,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <button 
                      onClick={() => setExpandedFAQ(isExpanded ? null : idx)}
                      style={{ 
                        width: '100%', padding: '20px 24px', background: 'none', border: 'none', 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                        cursor: 'pointer', textAlign: 'left', outline: 'none'
                      }}
                    >
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{faq.question}</span>
                      <span style={{ color: '#06B6D4', marginLeft: 12 }}>{isExpanded ? <Minus size={18} /> : <Plus size={18} />}</span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 24px 24px', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 16 }}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG INSIGHTS SECTION */}
      <section id="blog" ref={blogRef} className="reveal" style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Growth Library</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginTop: 12 }}>
              Redefining Strategic <span className="gradient-text">Trends</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '16px auto 0', fontSize: '0.95rem' }}>
              Deep dives and case breakdowns on search engine marketing, creative scaling, and data privacy stacks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24 }}>
            {BLOG_POSTS.map((bp, i) => (
              <div key={i} className="glass" style={{ borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={bp.image} alt={bp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: '#06B6D4', fontWeight: 600, display: 'block', marginBottom: 12 }}>{bp.date}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12, lineHeight: 1.3 }}>{bp.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{bp.summary}</p>
                  <button onClick={() => setActiveBlog(bp)} className="btn-ghost" style={{ padding: '8px 20px', fontSize: '0.8rem', width: 'fit-content' }}>
                    Read Article →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT DEMO SECTION */}
      <section id="book-demo" style={{ padding: '100px 5% 120px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div className="bg-motion-3d" style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="contact-grid-split">
            <div>
              <div className="section-label">Grow Fast</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 12, marginBottom: 24 }}>
                Ready to Secure Your Free<br/>
                <span className="gradient-text">Growth Audit?</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 24, fontSize: '0.95rem' }}>
                Book a comprehensive 30-minute growth evaluation. We will review your existing SEO visibility, analytics stack, and paid advertising accounts at no cost.
              </p>

              {/* Detailed Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {[
                  { title: "Technical Indexing & Speed Scan", desc: "Audit of server crawl blocks, broken link parameters, and Core Web Vitals script bottlenecks." },
                  { title: "Attribution Tagging Integrity", desc: "Detailed validation of GA4 schema structures and server-side Meta Conversions API (CAPI) events." },
                  { title: "Paid Advertising Efficiency Analysis", desc: "Identification of keyword budget leaks, overlapping ad sets, and creative decay metrics." },
                  { title: "AI Automation Feasibility", desc: "Custom strategic roadmap outlining steps to automate support tasks and content generation workflows." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4', fontSize: 10, flexShrink: 0, marginTop: 3 }}>✓</div>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, marginBottom: 2 }}>{item.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.4 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <TiltImage3D src="/images/3d/contact_globe.png" alt="Globe Connectivity 3D" height={320} glow="#06B6D4" />
            </div>

            <div className="glass" style={{ padding: 40, borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)' }}>
              {submitState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: 12 }}>Request Submitted!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 16 }}>
                    A confirmation email has been sent to <strong style={{ color: '#06B6D4' }}>{submittedEmail}</strong>.
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Our growth team has received your details and will reach out within <strong style={{ color: 'white' }}>24 hours</strong> with a custom audit plan.
                  </p>
                  <div style={{ marginTop: 24, padding: '14px 20px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 12, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    📧 Check your inbox (and spam folder) for your acknowledgement email.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>Submit Audit Request</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name *</label>
                      <input type="text" className="form-input" placeholder="e.g. Priyesh Mukherjee" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name</label>
                      <input type="text" className="form-input" placeholder="e.g. Growthlytics" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Business Email *</label>
                      <input type="email" className="form-input" placeholder="e.g. priyesh@company.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                      <input type="tel" className="form-input" placeholder="e.g. +91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Website URL / Domain</label>
                      <input type="url" className="form-input" placeholder="e.g. https://yourcompany.com" value={form.websiteUrl} onChange={e => setForm({ ...form, websiteUrl: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service of Interest *</label>
                      <select className="form-input" style={{ background: '#111122' }} required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                        <option value="">Select a service...</option>
                        {SERVICE_DETAIL_DATA.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                        <option value="Multiple Services">Multiple Services / Full Package</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly Budget Range</label>
                      <select className="form-input" style={{ background: '#111122' }} value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                        <option value="">Select your budget range...</option>
                        <option value="Under ₹25,000">Under ₹25,000/month</option>
                        <option value="₹25,000 – ₹75,000">₹25,000 – ₹75,000/month</option>
                        <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000/month</option>
                        <option value="₹2,00,000+">₹2,00,000+/month</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Growth Goals & Challenges *</label>
                      <input type="text" className="form-input" placeholder="Describe your key targets" required value={form.overview} onChange={e => setForm({ ...form, overview: e.target.value })} />
                    </div>
                  </div>

                  {formError && (
                    <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600 }}>{formError}</div>
                  )}

                  <button type="submit" className="btn-primary" disabled={submitState === 'loading'} style={{ width: '100%', justifyContent: 'center', padding: '14px 0' }}>
                    {submitState === 'loading' ? 'Processing Audit...' : 'Claim Free Audit →'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Secure. Confidential. 100% Free.</p>
                </form>
              )}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.contact-grid-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* BLOG OVERLAY MODAL */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(5,5,8,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{ background: 'rgba(10,10,20,0.98)', border: '1px solid rgba(255,255,255,0.1)', maxWidth: 760, width: '100%', maxHeight: '85vh', borderRadius: 28, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: 240, overflow: 'hidden', flexShrink: 0 }}>
                <img src={activeBlog.image} alt={activeBlog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,20,1), transparent)' }} />
                <button onClick={() => setActiveBlog(null)} style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                  <X size={18} />
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24 }}>
                  <span style={{ fontSize: '0.75rem', color: '#06B6D4', fontWeight: 600 }}>{activeBlog.date}</span>
                  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: 4, lineHeight: 1.25 }}>{activeBlog.title}</h2>
                </div>
              </div>
              <div style={{ padding: 32, overflowY: 'auto', flex: 1, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }} className="no-scrollbar">
                <p style={{ whiteSpace: 'pre-wrap' }}>{activeBlog.content}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 32, paddingTop: 24, textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, color: 'white', marginBottom: 12 }}>Want to apply this strategy to your product?</p>
                  <button onClick={() => { setActiveBlog(null); document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary" style={{ padding: '8px 24px' }}>
                    Request Strategic Session
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── 2. SERVICE DETAIL PAGE ───────────────────────────────── */
const ServiceDetail = () => {
  const { serviceId } = useParams();
  const detail = serviceId ? SERVICE_DETAILS[serviceId] : null;
  const mainService = SERVICES.find(s => s.slug === serviceId);

  // Suggested other services
  const otherServices = SERVICES.filter(s => s.slug !== serviceId).slice(0, 3);

  if (!detail || !mainService) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 5%', textAlign: 'center' }}>
        <Info size={48} style={{ color: '#EF4444', marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>Service Not Found</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>The service path you are looking for does not exist.</p>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    );
  }

  const IconComponent = mainService.icon;

  return (
    <div style={{ minHeight: '100vh', padding: '140px 5% 80px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <div className="bg-motion-3d" style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none',
        zIndex: 0
      }} />
      <Orbs3D />
      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Back Link */}
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#06B6D4', fontWeight: 700, fontSize: '0.9rem', marginBottom: 32 }} className="hover-lift">
          <ArrowLeft size={16} />
          Back to Growth Hub
        </Link>

        {/* Hero Card */}
        <div className="glass" style={{ padding: '48px 40px', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 40, background: 'rgba(10,10,20,0.6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: 48, alignItems: 'center' }} className="service-detail-split">
            <div>
              <div style={{ 
                width: 48, height: 48, borderRadius: 12, 
                background: `${mainService.color}15`, border: `1px solid ${mainService.color}30`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                color: mainService.color, marginBottom: 20
              }}>
                <IconComponent size={24} />
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>{detail.title}</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 28 }}>{detail.description}</p>
              
              <Link to="/#book-demo" className="btn-primary">
                Book a Consultation
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <TiltImage3D src={mainService.img} alt={mainService.title} height={280} glow={mainService.color} />
          </div>
        </div>

        {/* Deliverables List & Case Study Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, marginBottom: 56 }} className="service-detail-split">
          <div className="glass" style={{ padding: 36, borderRadius: 24 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
              <CheckCircle size={20} style={{ color: mainService.color }} />
              Key Deliverables & Features
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {mainService.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'start', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                  <span style={{ color: mainService.color, fontWeight: 'bold', marginTop: 2 }}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass" style={{ padding: 36, borderRadius: 24, border: `1px solid ${mainService.color}30`, background: `${mainService.color}05` }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Case Study Preview</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
              Discover how we implemented this setup for a pilot brand, achieving high-velocity efficiency:
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', padding: 20, borderRadius: 16 }}>
              <p style={{ fontStyle: 'italic', color: '#fff', fontSize: '1rem', lineHeight: 1.5 }}>
                "{detail.caseStudy}"
              </p>
            </div>
          </div>
        </div>

        {/* Technical Blueprint Section */}
        <div className="glass" style={{ padding: 36, borderRadius: 24, marginBottom: 56, border: '1px dashed rgba(255,255,255,0.15)' }}>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>
            Technical Deployment Architecture
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 28 }}>
            Our standard development workflow for this service includes the following production-grade deployment phases and automated quality assurance loops:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { phase: "01. Pre-Flight Mapping", desc: "Configuration of database schemas, repository branch mappings, and staging server initialization." },
              { phase: "02. Implementation", desc: "Coding custom modules using TypeScript, optimizing resource consumption, and connecting backend routing layers." },
              { phase: "03. QA Verification", desc: "Automated core web vitals check, script payload compression audits, and server event matching synchronization." },
              { phase: "04. Production Deployment", desc: "Continuous integration sync to Vercel/AWS networks, setting up real-time analytics monitoring." }
            ].map((step, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: 20, borderRadius: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '0.75rem', color: mainService.color, fontWeight: 800, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{step.phase}</span>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggest other services */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 48 }}>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'white', marginBottom: 24 }}>Explore Related Expertise</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {otherServices.map(s => {
              const SvcIcon = s.icon;
              return (
                <Link to={`/service/${s.slug}`} key={s.slug} className="glass card" style={{ padding: 24, textDecoration: 'none', display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                    <SvcIcon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: 2 }}>{s.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: 700 }}>Explore →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
      <style>{`@media(max-width:768px){.service-detail-split{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};

/* ─── 2.5. ABOUT US PAGE ───────────────────────────────────── */
const AboutUs = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '140px 5% 80px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <div className="bg-motion-3d" style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/3d/neural_network_bg.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16, pointerEvents: 'none',
        zIndex: 0
      }} />
      <Orbs3D />
      
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header Block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center', marginBottom: 80 }} className="about-grid-split">
          <div style={{ textAlign: 'left' }}>
            <div className="section-label">Our Philosophy</div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'white', marginTop: 16, marginBottom: 20 }}>
              Real-Time <span className="gradient-text">Problem Solvers</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 24 }}>
              Traditional digital marketing agencies thrive on administrative bloat, slide-deck presentations, and hourly billing inflation. We built Growthlytics to dismantle this model. We operate as a technical growth engineering studio dedicated to building durable software assets and robust conversion infrastructure.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              When you collaborate with us, you get direct integration access. There are no client-relationship executives, no account manager middlemen, and no recurring slide briefings. You work directly with engineers who commit code, optimize databases, and configure server-side tracking in a shared Slack workspace.
            </p>
          </div>
          <div style={{ transform: `translate(${mouse.x * 0.1}px, ${mouse.y * 0.1}px)`, transition: 'transform 0.2s ease-out' }}>
            <TiltImage3D src="/images/3d/code_ownership.png" alt="Collaborative Growth Workflow" height={380} glow="#06B6D4" />
          </div>
        </div>

        {/* Digital Bio Embed */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-label">Interactive Portfolio</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
              Our Live <span className="gradient-text">Digital Bio Profile</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 600, margin: '16px auto 0', fontSize: '0.95rem' }}>
              Explore our background qualifications, project repositories, and technical journey in real-time.
            </p>
          </div>
          <div className="glass" style={{ 
            width: '100%', 
            height: '750px', 
            borderRadius: 28, 
            overflow: 'hidden', 
            border: '2px solid rgba(6,182,212,0.2)', 
            boxShadow: '0 0 40px rgba(6,182,212,0.1), 0 25px 60px rgba(0,0,0,0.6)', 
            background: '#050508', 
            position: 'relative' 
          }}>
            <iframe 
              src="https://portfolio-delta-nine-buockq1joj.vercel.app/" 
              title="Growthlytics Digital Bio" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Core Startup Values */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div className="section-label">Our Values</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>How We Ship Value</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            <div className="glass" style={{ padding: 40, borderRadius: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED', marginBottom: 24, fontSize: '1.2rem', fontWeight: 'bold' }}>01</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>100% Code Ownership</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Every custom React frontend, FastAPI service, and database schema we build belongs to you. No proprietary dashboard lock-in or recurring monthly licensing.
              </p>
            </div>

            <div className="glass" style={{ padding: 40, borderRadius: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4', marginBottom: 24, fontSize: '1.2rem', fontWeight: 'bold' }}>02</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>Server-Side Attributions</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We don't rely on cookie-based browser pixels that break with ad blockers. We set up Server-Side Google Tag Manager and Conversions API containers for complete tracking.
              </p>
            </div>

            <div className="glass" style={{ padding: 40, borderRadius: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', marginBottom: 24, fontSize: '1.2rem', fontWeight: 'bold' }}>03</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>High-Velocity Sprints</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We operate on strict 1-week sprints. We prioritize launching MVP funnels and tracking layers within 7 days, then optimize iteratively based on real traffic.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision: Real-Time Problem Solvers Manifesto */}
        <div style={{ marginTop: 60, marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Our Vision</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'white' }}>
              Real-Time Problem Solvers, <span className="gradient-text">Not a Marketing Agency</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 700, margin: '16px auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
              We treat marketing as a software engineering and database integrity problem. Here is how we differ from the outdated agency model to deliver real system assets.
            </p>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 80 }} className="about-grid-split">
            {/* Outdated Marketing Agency Card */}
            <div className="glass" style={{ padding: 40, borderRadius: 24, border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.02)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#EF4444', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>❌</span> Traditional Digital Agency
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: "Account Management Layers", desc: "Your requests pass through client-relationship middle-men, creating translation delays and misaligned outcomes." },
                  { label: "Presentation Slide Decks", desc: "Focuses on theoretical marketing reports, audits, and advice rather than deploying functional code changes." },
                  { label: "Cookie-Based Pixels", desc: "Relies on default browser scripts that fail on modern ad blockers, losing up to 40% of conversion data." },
                  { label: "Vendor Code Lock-In", desc: "Locks clients into proprietary dashboards or maintains control of the repository, preventing independent migration." },
                  { label: "Slow Response Cycles", desc: "Solving an ad tracking bug or database mismatch takes weeks of emails, scheduled briefings, and billing reviews." }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                    <div style={{ color: '#EF4444', fontWeight: 900, marginTop: 2 }}>✕</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growthlytics Real-Time Problem Solvers Card */}
            <div className="glass" style={{ padding: 40, borderRadius: 24, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.02)', boxShadow: '0 0 30px rgba(6,182,212,0.05)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#06B6D4', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>⚡</span> Growthlytics Problem Solvers
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: "Direct Access to Tech Builders", desc: "No middle-men. You talk directly with the engineers committing your React code and configuring your databases." },
                  { label: "Production-Grade Code Output", desc: "We deploy Next.js pages, write FastAPI backend microservices, and automate databases directly in your stack." },
                  { label: "Server-Side Attributions", desc: "We implement Server-Side GTM containers and Conversions API (CAPI) for 100% accurate, ad-blocker resistant tracking." },
                  { label: "100% Repository Transfer", desc: "You own every line of code, database model, and telemetry tag we build. We transfer full ownership upon launch." },
                  { label: "Real-Time Systems Patches", desc: "When campaign metrics drift or page speeds drop, we patch the repository directly in real time, within hours." }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                    <div style={{ color: '#10B981', fontWeight: 900, marginTop: 2 }}>✓</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deep Vision Manifesto Description Block */}
          <div className="glass" style={{ padding: 48, borderRadius: 28, background: 'rgba(10,10,20,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'center' }} className="about-grid-split">
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>
                  Our Real-Time Problem Solving Manifesto
                </h3>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <p>
                    Growthlytics was founded in mid-2025 to solve a fundamental mismatch in modern marketing: while advertising platforms have become automated, algorithmic systems, the agencies managing them remain slow, manual, and service-based. We believe that scaling a digital entity is now an engineering problem.
                  </p>
                  <p>
                    By building custom LLM scraper engines, indexing semantic search clusters, automating data sync pipelines, and configuring server-side tagging layers, we solve structural blocks. We don't just optimize budgets; we code the bridges that connect your product directly to market demand.
                  </p>
                  <p>
                    Our team does not sit in recurring planning meetings. We write clean code, monitor analytics anomalies, and execute daily sprint tests. This technical speed is why we transfer full code repository ownership to your brand. We build assets that appreciate, giving your company durable competitive advantages.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TiltImage3D src="/images/3d/manifesto_document.png" alt="Collaborative Growth Workflow" height={360} glow="#7C3AED" />
              </div>
            </div>
          </div>
        </div>

      </div>
      <style>{`@media(max-width:768px){.about-grid-split{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};

/* ─── 2.6. PORTFOLIO PAGE ──────────────────────────────────── */
const PortfolioPage = () => {
  const [filter, setFilter] = useState<'All' | 'E-Commerce' | 'SaaS' | 'SEO & Data' | 'AI Automation'>('All');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  // Extend CASE_STUDIES with the 4th case study
  const extendedStudies: CaseStudy[] = [
    ...CASE_STUDIES,
    {
      title: "AlphaCorp SaaS Automation",
      category: "AI Automation",
      growth: "+40% Efficiency",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      desc: "Integrated a multi-agent AI pipeline using FastAPI and custom vector databases that automated 60% of customer support workflows.",
      challenge: "AlphaCorp struggled with rising support tickets, high agent fatigue, and slow response times on complex technical integration queries, leading to client churn.",
      solution: "We built an autonomous LLM RAG agent connected to their PostgreSQL product schemas, using Pinecone for semantic memory and indexing their entire API docs. We deployed it via FastAPI endpoints with custom Webhook triggers.",
      metrics: [{ label: "Support Vol", value: "-40%" }, { label: "Response Time", value: "Instant" }],
      techStack: ['FastAPI', 'Pinecone', 'OpenAI API', 'React', 'PostgreSQL'],
      clientName: "Neha Sharma",
      clientRole: "VP of Support, AlphaCorp",
      clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      clientQuote: "Growthlytics replaced our bloated support ticket stack with a lightning-fast custom AI agent. Response times dropped from 2 hours to instant, saving us hundreds of engineering hours."
    }
  ];

  const filteredProjects = filter === 'All' 
    ? extendedStudies 
    : extendedStudies.filter(cs => {
        if (filter === 'E-Commerce') return cs.category.includes('Ads') || cs.category.includes('Social') || cs.title.includes('Lumina');
        if (filter === 'SaaS') return cs.title.includes('AlphaCorp');
        if (filter === 'SEO & Data') return cs.category.includes('SEO') || cs.category.includes('Data') || cs.title.includes('Nexus') || cs.title.includes('Apex');
        if (filter === 'AI Automation') return cs.title.includes('AlphaCorp') || cs.category.includes('Automation');
        return true;
      });

  return (
    <div style={{ minHeight: '100vh', padding: '140px 5% 80px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <div className="bg-motion-3d" style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none',
        zIndex: 0
      }} />
      <Orbs3D />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">Case Studies</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'white', marginTop: 16 }}>
            Our Proven <span className="gradient-text">Growth Pilots</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '16px auto 0', fontSize: '0.95rem', lineHeight: 1.6 }}>
            We write code and deploy data tagging schemas that generate real economic returns. Explore our detailed execution logs.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 50 }}>
          {(['All', 'E-Commerce', 'SaaS', 'SEO & Data', 'AI Automation'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                background: filter === tab ? 'linear-gradient(135deg,#7C3AED,#06B6D4)' : 'rgba(255,255,255,0.03)',
                border: filter === tab ? 'none' : '1px solid rgba(255,255,255,0.07)',
                color: filter === tab ? '#fff' : 'rgba(255,255,255,0.7)',
                padding: '10px 24px',
                borderRadius: 100,
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: filter === tab ? '0 0 15px rgba(124,58,237,0.3)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 32 }}>
          {filteredProjects.map((cs, i) => (
            <div 
              key={i} 
              className="glass hover-lift" 
              onClick={() => setSelectedProject(cs)}
              style={{ 
                borderRadius: 24, overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,10,20,0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
            >
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={cs.image} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.9), transparent)' }} />
                <div style={{ position: 'absolute', top: 16, right: 16, background: '#06B6D4', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {cs.growth}
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                  <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.category}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, color: 'white', marginTop: 4 }}>{cs.title}</h3>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {cs.techStack.map((tech, idx) => (
                    <span key={idx} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>{cs.desc}</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  {cs.metrics.map((m, j) => (
                    <div key={j} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#06B6D4' }}>{m.value}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 2, fontWeight: 500 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: '#06B6D4', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>Read Full Report <ArrowRight size={14} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(15px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#0b0b14', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}
              className="no-scrollbar"
            >
              <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', color: 'white', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                <X size={18} />
              </button>

              <div style={{ position: 'relative', height: 260 }}>
                <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0b0b14, transparent)' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 32 }}>
                  <span style={{ fontSize: '0.75rem', color: '#06B6D4', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{selectedProject.category}</span>
                  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2rem', fontWeight: 900, color: 'white', marginTop: 4 }}>{selectedProject.title}</h2>
                </div>
              </div>

              <div style={{ padding: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, marginBottom: 32 }}>
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#06B6D4' }}>{m.value}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{m.label}</div>
                    </div>
                  ))}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6' }}>{selectedProject.growth}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Attributed Growth</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>The Challenge</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>The Solution</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>Technology Stack Deployed</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selectedProject.techStack.map((tech, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa', padding: '6px 14px', borderRadius: 8, fontFamily: 'monospace' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Client Testimonial */}
                <div style={{ padding: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20 }}>
                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 16 }}>
                    "{selectedProject.clientQuote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={selectedProject.clientAvatar} alt={selectedProject.clientName} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #06B6D4' }} />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{selectedProject.clientName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{selectedProject.clientRole}</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── 2.7. BLOGS PAGE ──────────────────────────────────────── */
const BlogsPage = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', padding: '140px 5% 80px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <div className="bg-motion-3d" style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/3d/neural_network_bg.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16, pointerEvents: 'none',
        zIndex: 0
      }} />
      <Orbs3D />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {activePost ? (
          /* Detailed Blog Reader */
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <button 
              onClick={() => setActivePost(null)} 
              style={{ background: 'none', border: 'none', color: '#06B6D4', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 700, marginBottom: 32 }}
            >
              ← Back to all articles
            </button>

            <div style={{ position: 'relative', height: 400, borderRadius: 28, overflow: 'hidden', marginBottom: 40, border: '1px solid rgba(255,255,255,0.06)' }}>
              <img src={activePost.image} alt={activePost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050508, transparent)' }} />
              <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
                <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{activePost.date}</span>
                <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'white', marginTop: 8, lineHeight: 1.15 }}>{activePost.title}</h1>
              </div>
            </div>

            <div className="glass" style={{ padding: 40, borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 32, borderLeft: '3px solid #06B6D4', paddingLeft: 20 }}>
                "{activePost.summary}"
              </p>

              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }} className="blog-reader-content">
                {activePost.content.split('\n\n').map((para, idx) => {
                  if (para.startsWith('Key Strategies') || para.startsWith('The Growth Blueprint') || para.startsWith('Building the Funnel') || para.startsWith('Community Building Pillars') || para.startsWith('The First-Party Strategy')) {
                    return <h3 key={idx} style={{ color: 'white', fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', fontWeight: 700, marginTop: 16 }}>{para}</h3>;
                  }
                  if (para.startsWith('1.') || para.startsWith('-') || para.startsWith('2.') || para.startsWith('3.')) {
                    return (
                      <div key={idx} style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, fontFamily: 'monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                        {para.split('\n').map((line, lidx) => <div key={lidx} style={{ marginBottom: 8 }}>{line}</div>)}
                      </div>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>

              <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>GL</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Growthlytics Team</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Technical Writers</div>
                  </div>
                </div>
                <a href="/#book-demo" className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.85rem' }}>Start Scaling Today</a>
              </div>
            </div>
          </div>
        ) : (
          /* Article Index */
          <>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-label">Our Log</div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'white', marginTop: 16 }}>
                Technical <span className="gradient-text">Growth Insights</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '16px auto 32px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                We write about server-side tag containers, next-gen SEO rendering, paid acquisition math, and LLM content pipelines.
              </p>

              {/* Search Field */}
              <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search technical logs..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  style={{ borderRadius: 100, padding: '14px 28px 14px 48px', width: '100%', background: 'rgba(10,10,20,0.4)', border: '1px solid rgba(255,255,255,0.08)' }} 
                />
                <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>🔍</span>
              </div>
            </div>

            {/* Blogs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 32 }}>
              {filteredPosts.map((post, i) => (
                <div 
                  key={i} 
                  className="glass hover-lift" 
                  onClick={() => setActivePost(post)}
                  style={{ 
                    borderRadius: 24, overflow: 'hidden', 
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(10,10,20,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    display: 'flex', flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.9), transparent)' }} />
                    <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                      <span style={{ fontSize: '0.7rem', color: '#8B5CF6', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.date}</span>
                    </div>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>{post.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>{post.summary}</p>
                    <span style={{ fontSize: '0.85rem', color: '#06B6D4', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>Read Article <ArrowRight size={14} /></span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─── 3. SERVICES PAGE ─────────────────────────────────────── */

const SERVICE_DETAIL_DATA = [
  {
    id: 'seo-optimization',
    icon: TrendingUp,
    title: 'SEO Optimization',
    tagline: 'Rank Higher. Convert Better. Grow Faster.',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.25)',
    img: '/images/3d/services_seo_detail.png',
    overview: 'Our SEO strategy is not about shortcuts — it is about building durable authority. We combine technical site health audits, laser-focused keyword intelligence, deep semantic content clustering, and authoritative white-hat link acquisition to engineer sustainable first-page dominance that compounds month after month.',
    process: [
      { step: '01', title: 'Technical Audit', desc: 'Full crawl of your site: Core Web Vitals, indexability, schema markup, canonical errors, page speed bottlenecks, and mobile UX issues.' },
      { step: '02', title: 'Keyword Intelligence', desc: 'Intent-mapping of 500-5000+ keywords across all buying stages — awareness, consideration, and conversion — with competitor gap analysis.' },
      { step: '03', title: 'Content Architecture', desc: 'Topic cluster design with pillar pages and supporting satellite articles that create semantic authority in your niche.' },
      { step: '04', title: 'Link Acquisition', desc: 'Manual outreach to high-DA relevant domains, digital PR, and broken-link reclamation campaigns for durable backlink growth.' },
      { step: '05', title: 'Reporting & Iteration', desc: 'Monthly ranking dashboards with GSC, Ahrefs, and GA4 integrations tracking position changes, traffic value, and conversion attribution.' }
    ],
    features: ['Core Web Vitals & Crawlability Audits', 'Intent-focused Keyword & Competitor Mapping', 'Topic Cluster & Deep Semantic Content Architecture', 'High-DA White-Hat Link Building Campaigns', 'Local SEO & Google Business Profile Optimization', 'Schema Markup & Structured Data Implementation'],
    industries: ['E-commerce & DTC Brands', 'SaaS & Tech Startups', 'Healthcare & Wellness', 'Real Estate & Legal Firms', 'Educational Platforms'],
    results: ['Average 80% organic traffic increase in 6 months', '1st-page rankings for 15 target keywords', '2.5x ROI on SEO investment vs. paid acquisition']
  },
  {
    id: 'ai-app-development',
    icon: Cpu,
    title: 'AI Integrations & Automation',
    tagline: 'Automate Decision Making. Scale With AI Intelligence.',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.25)',
    img: '/images/3d/services_ai_detail.png',
    overview: 'We build and deploy enterprise-grade AI integrations that help your business grow using AI decision making, autonomous process automation, and cognitive agents. By combining generative models with your internal databases, we create workflows that qualify leads, automate support channels, forecast metrics, and make smart operational decisions in real-time.',
    process: [
      { step: '01', title: 'Workflow & Decision Audit', desc: 'We audit your existing processes to map where manual bottlenecks exist and where AI decision-making models can scale speed and accuracy.' },
      { step: '02', title: 'Knowledge Base Construction', desc: 'We integrate your PDFs, spreadsheets, SQL databases, and CRM records into a semantic vector database (Pinecone/PGVector) for context retrieval.' },
      { step: '03', title: 'Agentic Model Design', desc: 'We construct multi-agent networks with advanced memory retention and web-scraping capabilities using LangGraph and LangChain frameworks.' },
      { step: '04', title: 'Enterprise Integrations', desc: 'We deploy the AI engines into your everyday software stacks — Slack, WhatsApp, HubSpot, Salesforce, or custom web portals via APIs.' },
      { step: '05', title: 'Accuracy Monitoring', desc: 'We configure evaluation metrics, check for hallucinations, monitor token budgets, and fine-tune models to ensure 99%+ operational accuracy.' }
    ],
    features: ['AI-Powered Decision Making & Analytics', 'Autonomous Workflow & Agentic Automation', 'Custom LLM integrations (OpenAI, Claude, Gemini)', 'AI Chatbots with Long-Term Memory Retention', 'Semantic Vector Databases & RAG Pipelines', 'Automated Lead Qualification & CRM Syncing'],
    industries: ['SaaS & Tech Startups', 'E-commerce & DTC Brands', 'Finance & Investment Planning', 'Healthcare & Clinical Operations', 'Logistics & Supply Chain'],
    results: ['30% reduction in customer support and operational overhead', '3x faster decision execution and lead qualification speed', 'AI systems processing over 500 automated processes per day']
  },
  {
    id: 'website-development',
    icon: Code,
    title: 'Website Development',
    tagline: 'Built for Performance. Designed for Conversion.',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.25)',
    img: '/images/3d/services_web_detail.png',
    overview: 'We engineer hyper-performant websites and web applications using modern frameworks like React, Next.js, and Vite — meticulously optimized for 99+ Lighthouse scores, lightning-fast load times, and conversion-rate maximization. Every pixel is intentional; every interaction is crafted to move users toward action.',
    process: [
      { step: '01', title: 'UX Wireframing', desc: 'Conversion-focused wireframes based on user journey analysis, heatmap data patterns, and CRO best practices before a single line of code.' },
      { step: '02', title: 'Design System', desc: 'Custom design tokens, component libraries, and glassmorphic or brutalist UI systems that feel premium across every screen size.' },
      { step: '03', title: 'Frontend Development', desc: 'React/Next.js SSR or SSG builds with TailwindCSS, Framer Motion animations, and pixel-perfect mobile responsiveness.' },
      { step: '04', title: 'Backend & CMS Integration', desc: 'FastAPI or Node.js backends, headless CMS (Sanity, Contentful), custom PostgreSQL schemas, and RESTful or GraphQL APIs.' },
      { step: '05', title: 'Launch & Optimization', desc: 'Vercel/AWS/GCP deployment with CI/CD pipelines, uptime monitoring, and post-launch CRO A/B testing.' }
    ],
    features: ['React & Next.js Headless SSR/SSG Architecture', 'Custom Glassmorphic & Fluid Styling Systems', 'Core Web Vitals Optimization (99+ Lighthouse)', 'Decoupled Headless CMS & Custom Database Schemas', 'API Integration & Third-party Service Connections', 'Conversion Rate Optimization (CRO) & A/B Testing'],
    industries: ['SaaS Platforms & Web Apps', 'E-commerce & Product Stores', 'Agency & Portfolio Sites', 'Healthcare & Telemedicine', 'FinTech & InsurTech Platforms'],
    results: ['Average page load speed under 1.8 seconds', '90+ Lighthouse performance scores achieved', '12% avg. increase in conversion rate post-redesign']
  },
  {
    id: 'social-media-marketing',
    icon: MessageSquare,
    title: 'Social Media Marketing',
    tagline: 'Build Community. Drive Virality. Own Attention.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
    img: '/images/3d/services_social_detail.png',
    overview: 'We create organic growth engines across Meta, TikTok, LinkedIn, and YouTube that build community, authority, and pipeline — not just vanity metrics. Our creative direction combines short-form video storytelling, data-driven posting strategies, and precision community engagement protocols to build a social presence that compounds over time.',
    process: [
      { step: '01', title: 'Brand & Audience Audit', desc: 'Map your current brand voice, analyze audience demographics, competitor content strategies, and identify high-engagement content gaps.' },
      { step: '02', title: 'Content Strategy Blueprint', desc: 'Build a 90-day content calendar with content pillars, hook formulas, platform-specific formats, and weekly publishing cadences.' },
      { step: '03', title: 'Creative Production', desc: 'Script, shoot-guide, edit, and caption high-retention short-form videos, carousels, and static creatives for each platform.' },
      { step: '04', title: 'Community Engagement', desc: 'Daily active comment responses, DM management, collaboration outreach, and hashtag strategy implementation.' },
      { step: '05', title: 'Analytics & Reporting', desc: 'Weekly performance reports with reach, engagement rate, follower growth, and direct revenue attribution from social.' }
    ],
    features: ['Short-Form Video Creative Direction & Editing (Reels, TikTok)', 'LinkedIn Thought Leadership & B2B Editorial Pipelines', 'Active Organic Community Engagement & Growth Strategies', 'Advanced ROI Attribution & Campaign Analytics', 'Influencer Identification & Collaboration Management', 'Platform Algorithm Optimization & Hashtag Research'],
    industries: ['Direct-to-Consumer Brands', 'B2B SaaS & Tech Companies', 'Coaches & Personal Brands', 'Restaurants & Hospitality', 'Fashion & Lifestyle Products'],
    results: ['Average 60% follower growth in first 90 days', '25% average increase in organic reach', '10% of clients generate direct sales from organic social within 60 days']
  },
  {
    id: 'excel-data-analytics',
    icon: BarChart3,
    title: 'Excel & Data Analytics',
    tagline: 'Turn Data Chaos Into Decision-Ready Clarity.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.25)',
    img: '/images/3d/services_analytics_detail.png',
    overview: 'We transform fragmented spreadsheets, disconnected databases, and manual reporting into clean, automated analytics pipelines and interactive BI dashboards. From advanced Excel financial models to real-time Power BI and Looker Studio dashboards — we give decision-makers the data clarity they need to move with confidence and speed.',
    process: [
      { step: '01', title: 'Data Audit', desc: 'Inventory all your data sources — CRMs, ad platforms, spreadsheets, databases — and identify integration and automation opportunities.' },
      { step: '02', title: 'Pipeline Architecture', desc: 'Design automated ETL (Extract, Transform, Load) pipelines that eliminate manual data entry and ensure real-time data freshness.' },
      { step: '03', title: 'Dashboard Design', desc: 'Build interactive KPI dashboards in Power BI, Looker Studio, or custom React components tailored to your specific business metrics.' },
      { step: '04', title: 'Excel Modeling', desc: 'Advanced Excel models with VBA automation, dynamic array formulas, pivot tables, and financial projection templates.' },
      { step: '05', title: 'Team Training & Handoff', desc: 'Full documentation and team training sessions to ensure your staff can maintain and evolve the analytics system independently.' }
    ],
    features: ['Advanced Excel Models, VBA Macros & Custom Formulas', 'Automated SQL Pipeline Construction & Database Linking', 'Custom BI Dashboards (Looker Studio, Power BI)', 'Predictive Modeling for Corporate Growth Metrics', 'CRM & Ad Platform Data Integration (GA4, Salesforce, HubSpot)', 'Financial Modeling & P&L Projection Templates'],
    industries: ['Finance & Investment Firms', 'Retail & E-commerce Operations', 'Healthcare Analytics', 'Logistics & Supply Chain', 'Marketing Agencies'],
    results: ['30% reduction in manual reporting hours per month', 'Automated dashboards refreshing data daily', 'Financial models built for corporate forecasting views']
  },
  {
    id: 'google-ads-ppc',
    icon: Target,
    title: 'Google Ads (PPC)',
    tagline: 'Lower CAC. Higher ROAS. Predictable Pipeline.',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.25)',
    img: '/images/3d/seo_growth.png',
    overview: 'We maximize your paid acquisition performance and systematically lower cost-per-acquisition using data-backed Google PPC search, display, Performance Max, and YouTube video campaigns. Every campaign features continuous audience exclusions, strict negative keyword architecture, and rapid creative iteration to keep efficiency high and wasted spend near zero.',
    process: [
      { step: '01', title: 'Account Audit', desc: 'Full review of campaign structure, quality scores, wasted spend patterns, audience segments, and conversion tracking accuracy.' },
      { step: '02', title: 'Strategy & Structure', desc: 'Rebuild or optimize campaign hierarchy, match types, ad groups, audience layers, and bidding strategies for maximum efficiency.' },
      { step: '03', title: 'Creative Production', desc: 'Write high-performing RSA ad copy with multiple headline/description variations informed by competitor intelligence and CTR testing.' },
      { step: '04', title: 'Campaign Launch', desc: 'Phased launch with Performance Max, Search, Display, and YouTube campaigns per funnel stage with ROAS/CPA goal targets.' },
      { step: '05', title: 'Weekly Optimization', desc: 'Weekly bid adjustments, search term reviews, negative keyword expansion, audience exclusions, and creative A/B test rotations.' }
    ],
    features: ['Comprehensive Keyword Bidding & CPC Optimizations', 'Performance Max (PMax) & Advanced Shopping Campaigns', 'Targeted B2B & D2C Search & Display Campaigns', 'Negative Keyword Auditing & Budget Efficiency Monitoring', 'Conversion Tracking (GTM, GA4, Enhanced Conversions)', 'YouTube & Discovery Ads for Full-Funnel Coverage'],
    industries: ['Local Services & Contractors', 'E-commerce & Product Brands', 'SaaS & Software Companies', 'Healthcare Practices', 'Education & Course Creators'],
    results: ['Average 2.8x ROAS improvement within 60 days', '15% reduction in cost-per-lead versus previous campaigns', 'Clients scaling to ₹2L+ monthly ad spend with maintained efficiency']
  },
  {
    id: 'meta-business-suite',
    icon: Share2,
    title: 'Meta Business Suite',
    tagline: 'Total Meta Ecosystem Control. Zero Pixel Leakage.',
    color: '#4F46E5',
    glow: 'rgba(79,70,229,0.25)',
    img: '/images/3d/social_media.png',
    overview: 'We establish total coordination of your Meta Business Manager ecosystem — from Pixel architecture and Conversions API setup to catalog synchronization and unified messaging systems. Our Meta setups are built for scale: CAPI-first, privacy-compliant, and engineered to maintain attribution accuracy even in an iOS 14+ world.',
    process: [
      { step: '01', title: 'Business Manager Audit', desc: 'Full audit of current BM structure, ad account health, pixel events, CAPI configuration, and catalog sync issues.' },
      { step: '02', title: 'Pixel & CAPI Setup', desc: 'Install or rebuild Meta Pixel with GTM, configure Conversions API (server-side) for event deduplication and iOS 14+ tracking resilience.' },
      { step: '03', title: 'Catalog & Shop Setup', desc: 'Product catalog creation, dynamic ad setup, Shops integration, and product set structuring for retargeting and prospecting.' },
      { step: '04', title: 'Campaign Architecture', desc: 'Design TOF/MOF/BOF campaign structure with Advantage+ campaigns, lookalike audiences, and dynamic creative testing.' },
      { step: '05', title: 'Messaging Automation', desc: 'ManyChat or native Meta automation for DM flows, comment auto-replies, lead capture sequences, and customer support bots.' }
    ],
    features: ['Meta Conversions API (CAPI) Server-Side Integration', 'E-commerce Catalog Sync & Asset Structuring', 'Meta Pixel Auditing & Account Security Configuration', 'Unified Messaging Inbox & Auto-response Deployments', 'Advantage+ Campaign & Lookalike Audience Setup', 'Instagram Shopping & Facebook Shops Configuration'],
    industries: ['D2C Fashion & Beauty Brands', 'Home Décor & Furniture', 'Food & Beverage', 'Real Estate & Property', 'Coaching & Online Courses'],
    results: ['Average 2.2x ROAS improvement post-CAPI implementation', '15% lower CPM through optimized audience architecture', '85% tracking accuracy maintained post iOS 14']
  },
  {
    id: 'content-strategy',
    icon: PenTool,
    title: 'Content Strategy',
    tagline: 'Words That Rank. Copy That Converts.',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.25)',
    img: '/images/3d/team_workflow.png',
    overview: 'We develop cohesive brand narrative frameworks that convert content into pipeline. From SEO-optimized blog clusters that build topical authority to high-conversion landing page copy that closes deals — every piece of content we create is engineered with a clear conversion path, a strong brand voice, and a measurable business objective.',
    process: [
      { step: '01', title: 'Brand Voice Development', desc: 'Define your brand positioning, tone of voice, messaging hierarchy, and unique value propositions in a comprehensive brand bible.' },
      { step: '02', title: 'Content Audit & Gap Analysis', desc: 'Analyze existing content performance, identify cannibalization issues, and map content gaps against competitor authority.' },
      { step: '03', title: 'Editorial Calendar', desc: 'Build a 90-day rolling content calendar with blog topics, landing page priorities, email sequences, and social content integration.' },
      { step: '04', title: 'Content Production', desc: 'Research-backed, SEO-optimized long-form articles (2000-5000 words), landing page copy, email sequences, and case studies.' },
      { step: '05', title: 'Performance Tracking', desc: 'Monthly content audits tracking organic rankings, time-on-page, scroll depth, conversion rate, and content-influenced pipeline.' }
    ],
    features: ['Conversion-Focused SEO Blog Strategies & Writing', 'High-Converting Core Landing Page Copywriting', 'Nurture Sequences & Automated Email Newsletters', 'Detailed Brand Voice Guidelines & Editorial Standards', 'Case Study & Testimonial Content Development', 'PR Outreach & Guest Posting Coordination'],
    industries: ['B2B SaaS & Software', 'Professional Services & Agencies', 'Healthcare & Wellness Brands', 'E-learning & EdTech', 'Financial Services'],
    results: ['Content portfolios generating 5K+ monthly organic visits', '25% average email open rate (vs. 21% industry avg.)', 'Landing pages achieving 5-8% conversion rates (vs. 2-3% avg.)']
  }
];

const ServicesPage = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', companyName: '', websiteUrl: '', phone: '', service: '', budget: '', message: '' });
  const [contactState, setContactState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmailSvc, setSubmittedEmailSvc] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactState('loading');
    setContactError('');
    // Save before clearing
    const savedName = contactForm.name;
    const savedEmail = contactForm.email;
    try {
      await sendLeadEmails({
        formType: 'Services Page Inquiry',
        name: contactForm.name,
        email: contactForm.email,
        companyName: contactForm.companyName,
        websiteUrl: contactForm.websiteUrl,
        phone: contactForm.phone,
        service: contactForm.service || 'General Inquiry',
        budget: contactForm.budget || 'Not specified',
        message: contactForm.message,
      });
      setSubmittedName(savedName);
      setSubmittedEmailSvc(savedEmail);
      setContactState('success');
      setContactForm({ name: '', email: '', companyName: '', websiteUrl: '', phone: '', service: '', budget: '', message: '' });
    } catch (err: any) {
      console.error('[Services Form] EmailJS error:', err);
      setContactError(err?.message || 'Failed to send. Please email growthlytics23@gmail.com directly.');
      setContactState('error');
    }
  };

  const activeData = SERVICE_DETAIL_DATA.find(s => s.id === activeService);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* Hero Background */}
      <div className="bg-motion-3d" style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/3d/services_hero_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.20, pointerEvents: 'none', zIndex: 0 }} />
      <Orbs3D />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ padding: '60px 5% 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 70, alignItems: 'center' }} className="about-grid-split">
            <div>
              <div className="section-label">What We Do</div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'white', marginTop: 16, marginBottom: 24, lineHeight: 1.1 }}>
                Growth Services <br/><span className="gradient-text">Built for Scale</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: 32 }}>
                We are a 1-year-old startup that has already delivered measurable, compounding growth across SEO, AI automation, paid media, and web development for clients ranging from early-stage startups to established mid-market brands.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 36 }}>
                Unlike traditional agencies that package and resell generic services, every Growthlytics engagement is custom-scoped, ROI-anchored, and built on proprietary technology stacks developed by our in-house engineering and marketing team.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="#services-grid" className="btn-primary" style={{ textDecoration: 'none' }}>Explore Services</a>
                <a href="mailto:growthlytics23@gmail.com" className="btn-ghost" style={{ textDecoration: 'none' }}>Get a Free Audit</a>
              </div>
            </div>
            <TiltImage3D src="/images/3d/services_hero_bg.png" alt="Growthlytics Services" height={460} glow="#06B6D4" />
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ─────────────────────────────────────── */}
      <section style={{ padding: '0 5% 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { value: '4+', label: 'Focused Service Lines', color: '#06B6D4' },
              { value: '3+', label: 'Dedicated Pilots Shipped', color: '#8B5CF6' },
              { value: '65%', label: 'Avg. Organic Traffic Growth', color: '#10B981' },
              { value: '2.8x', label: 'Average ROAS Delivered', color: '#F59E0B' },
              { value: '25%', label: 'Reduction in Manual Ops', color: '#EF4444' }
            ].map((stat, i) => (
              <div key={i} className="glass hover-lift" style={{ padding: '28px 24px', borderRadius: 20, textAlign: 'center', border: `1px solid ${stat.color}22` }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.4rem', fontWeight: 900, color: stat.color, letterSpacing: '-0.02em', marginBottom: 8 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────── */}
      <section id="services-grid" style={{ padding: '0 5% 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Our Core Offerings</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', marginTop: 12 }}>
              8 Services, 1 <span className="gradient-text">Unified Growth System</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '16px auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Every service is interconnected — our SEO informs our content, our content feeds our ads, our ads data trains our AI systems. Click any service to explore full details.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {SERVICE_DETAIL_DATA.map((svc, i) => {
              const SvcIcon = svc.icon;
              return (
                <div
                  key={svc.id}
                  onClick={() => setActiveService(svc.id)}
                  className="glass hover-lift"
                  style={{ borderRadius: 24, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${svc.color}22`, transition: 'all 0.3s ease' }}
                >
                  <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.4) 60%, transparent 100%)` }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, width: 44, height: 44, borderRadius: 12, background: `${svc.color}22`, border: `1px solid ${svc.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: svc.color }}>
                      <SvcIcon size={22} />
                    </div>
                    <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                      <span style={{ fontSize: '0.65rem', background: `${svc.color}22`, color: svc.color, padding: '4px 10px', borderRadius: 6, fontWeight: 700, border: `1px solid ${svc.color}33` }}>View Details →</span>
                    </div>
                  </div>
                  <div style={{ padding: '24px 28px 28px' }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{svc.title}</h3>
                    <p style={{ color: svc.color, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>{svc.tagline}</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 20 }}>
                      {svc.overview.slice(0, 160)}...
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {svc.features.slice(0, 3).map((f, fi) => (
                        <span key={fi} style={{ fontSize: '0.68rem', background: `${svc.color}12`, color: svc.color, padding: '4px 10px', borderRadius: 6, fontWeight: 600, border: `1px solid ${svc.color}25` }}>{f.split('&')[0].trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ─────────────────────────────────────── */}
      <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Our Approach</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', marginTop: 12 }}>
              How We <span className="gradient-text">Deliver Results</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { num: '01', title: 'Discovery & Audit', desc: 'We start with a comprehensive audit of your current digital presence, competitors, and untapped growth opportunities before proposing a single strategy.', color: '#06B6D4', icon: '🔍' },
              { num: '02', title: 'Strategy Design', desc: 'We build a custom, 90-day execution roadmap with clear KPIs, resource allocations, technology stack selections, and projected outcomes.', color: '#7C3AED', icon: '🗺️' },
              { num: '03', title: 'Sprint Execution', desc: 'We execute in 2-week sprints with daily standups, weekly client updates, and full transparency via shared project dashboards.', color: '#3B82F6', icon: '⚡' },
              { num: '04', title: 'Measure & Iterate', desc: 'Monthly analytics reviews with data-backed optimizations ensure we compound results over time and never plateau on performance.', color: '#10B981', icon: '📊' },
              { num: '05', title: 'Scale & Expand', desc: 'Once a growth channel is proven, we engineer systems to scale it — reducing your cost-per-acquisition while increasing total output.', color: '#F59E0B', icon: '🚀' }
            ].map((step, i) => (
              <div key={i} className="glass hover-lift" style={{ padding: '32px 28px', borderRadius: 22, border: `1px solid ${step.color}22`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '5rem', opacity: 0.04, fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif" }}>{step.num}</div>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{step.icon}</div>
                <div style={{ fontSize: '0.7rem', color: step.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Step {step.num}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GROWTHLYTICS ─────────────────────────────────── */}
      <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }} className="about-grid-split">
            <div>
              <div className="section-label">Why Us</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', marginTop: 16, marginBottom: 24 }}>
                We Are Real-Time Problem Solvers — <span className="gradient-text">Not a Traditional Agency</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 32 }}>
                We don't sell advice or hand off slide-deck audits. We construct real-time growth infrastructure. We code custom scraping microservices, deploy Conversions API networks, integrate LLM pipelines, and optimize web platforms. You get direct integrations from our engineering team.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'Engineering-First Culture', desc: 'Every strategy is backed by code, data pipelines, and automation — not spreadsheets and hope.' },
                  { title: 'Full Transparency', desc: 'Direct access to the technical team and shared project dashboards — no middle-men account managers.' },
                  { title: 'High-Velocity Sprints', desc: 'We launch core tracking networks and conversion funnels in 1 week, optimizing based on live user data.' },
                  { title: 'Durable Technical Assets', desc: 'Every Next.js site, serverless API, or tracking layer is transferred to your repository. You own 100% of the asset.' }
                ].map((pt, pi) => (
                  <div key={pi} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4', marginTop: 7, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: 4 }}>{pt.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6 }}>{pt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <TiltImage3D src="/images/3d/why_us_rocket.png" alt="Growthlytics System Workflow" height={480} glow="#8B5AF6" />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ─────────────────────────────── */}
      <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Industries</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', marginTop: 12 }}>
              Industries We <span className="gradient-text">Specialize In</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { name: 'E-commerce & DTC', icon: '🛍️', color: '#06B6D4' },
              { name: 'SaaS & Tech Startups', icon: '💻', color: '#7C3AED' },
              { name: 'Healthcare & Wellness', icon: '🏥', color: '#10B981' },
              { name: 'Real Estate & PropTech', icon: '🏢', color: '#3B82F6' },
              { name: 'Education & EdTech', icon: '🎓', color: '#F59E0B' },
              { name: 'Finance & FinTech', icon: '💰', color: '#EF4444' },
              { name: 'Restaurants & F&B', icon: '🍽️', color: '#EC4899' },
              { name: 'Legal & Professional', icon: '⚖️', color: '#8B5CF6' }
            ].map((ind, i) => (
              <div key={i} className="glass hover-lift" style={{ padding: '24px 20px', borderRadius: 18, textAlign: 'center', border: `1px solid ${ind.color}25`, cursor: 'default' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{ind.icon}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{ind.name}</div>
                <div style={{ width: 30, height: 2, background: ind.color, borderRadius: 2, margin: '12px auto 0' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ─────────────────────────────────────── */}
      <section style={{ padding: '0 5% 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60, alignItems: 'start' }} className="about-grid-split">
            <div>
              <div className="section-label">Get Started</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: 'white', marginTop: 16, marginBottom: 20 }}>
                Ready to <span className="gradient-text">Deploy Your Growth Engine?</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 32 }}>
                Tell us where you are and where you want to be. We will scope a custom growth plan and send you a no-obligation proposal within 48 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Email Address', value: 'growthlytics23@gmail.com', href: 'mailto:growthlytics23@gmail.com', icon: '✉️' },
                  { label: 'Primary Hotline', value: '+91 98361 48511', href: 'tel:+919836148511', icon: '📞' },
                  { label: 'Secondary Hotline', value: '+91 87651 97073', href: 'tel:+918765197073', icon: '☎️' },
                  { label: 'WhatsApp Chat', value: 'Chat Live with our Growth Team', href: 'https://wa.me/919836148511', icon: '💬' }
                ].map((contact, ci) => (
                  <a key={ci} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ display: 'flex', gap: 16, alignItems: 'center', textDecoration: 'none', padding: '16px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, transition: 'all 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(6,182,212,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{contact.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#06B6D4', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{contact.label}</div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="glass" style={{ padding: 40, borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)' }}>
              {contactState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎯</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: 12 }}>Inquiry Received!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 16 }}>
                    A confirmation email has been sent to <strong style={{ color: '#06B6D4' }}>{submittedEmailSvc || 'your inbox'}</strong>.
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Our growth team has received your full inquiry and will respond within <strong style={{ color: 'white' }}>24 hours</strong> with a tailored proposal.
                  </p>
                  <div style={{ marginTop: 24, padding: '14px 20px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 12, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    📧 Check your inbox (and spam folder) for your acknowledgement email.
                  </div>
                  <button onClick={() => setContactState('idle')} className="btn-ghost" style={{ marginTop: 24 }}>Send Another Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>Request a Free Audit</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6, marginTop: -8 }}>No commitment. No cost. Just clarity on where your growth is leaking.</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                      <input type="text" className="form-input" placeholder="Your name" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email *</label>
                      <input type="email" className="form-input" placeholder="you@company.com" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name</label>
                      <input type="text" className="form-input" placeholder="e.g. Growthlytics" value={contactForm.companyName} onChange={e => setContactForm({ ...contactForm, companyName: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Website URL</label>
                      <input type="url" className="form-input" placeholder="e.g. https://yourcompany.com" value={contactForm.websiteUrl} onChange={e => setContactForm({ ...contactForm, websiteUrl: e.target.value })} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                      <input type="tel" className="form-input" placeholder="e.g. +91 98765 43210" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service of Interest *</label>
                      <select className="form-input" style={{ background: '#111122' }} required value={contactForm.service} onChange={e => setContactForm({ ...contactForm, service: e.target.value })}>
                        <option value="">Select a service...</option>
                        {SERVICE_DETAIL_DATA.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                        <option value="Multiple Services">Multiple Services / Full Package</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly Budget Range</label>
                    <select className="form-input" style={{ background: '#111122' }} value={contactForm.budget} onChange={e => setContactForm({ ...contactForm, budget: e.target.value })}>
                      <option value="">Select your budget range...</option>
                      <option value="Under ₹25,000">Under ₹25,000/month</option>
                      <option value="₹25,000 – ₹75,000">₹25,000 – ₹75,000/month</option>
                      <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000/month</option>
                      <option value="₹2,00,000+">₹2,00,000+/month</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tell Us About Your Challenge *</label>
                    <textarea className="form-input" placeholder="Describe your current marketing challenges, goals, or what you want to achieve..." required rows={4} style={{ resize: 'none' }} value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} />
                  </div>

                  {contactError && (
                    <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600, marginTop: 4 }}>{contactError}</div>
                  )}

                  <button type="submit" className="btn-primary" disabled={contactState === 'loading'} style={{ width: '100%', justifyContent: 'center', padding: '15px 0', fontSize: '1rem' }}>
                    {contactState === 'loading' ? 'Sending Request...' : '🚀 Request Free Audit'}
                  </button>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.5 }}>By submitting, you agree to our Privacy Policy. We never share your data.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){.services-modal-grid{grid-template-columns:1fr!important}}`}</style>

      {/* ── SERVICE DETAIL MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveService(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(5,5,8,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'rgba(8,8,18,0.99)', border: `1px solid ${activeData.color}33`, maxWidth: 900, width: '100%', borderRadius: 28, overflow: 'hidden', position: 'relative' }}
            >
              {/* Modal Header Image */}
              <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                <img src={activeData.img} alt={activeData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(8,8,18,1) 0%, rgba(8,8,18,0.6) 50%, transparent 100%)` }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${activeData.glow} 0%, transparent 70%)`, opacity: 0.4 }} />
                <button onClick={() => setActiveService(null)} style={{ position: 'absolute', top: 20, right: 20, width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(4px)' }}>
                  <X size={18} />
                </button>
                <div style={{ position: 'absolute', bottom: 28, left: 36 }}>
                  <div style={{ fontSize: '0.7rem', color: activeData.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{activeData.tagline}</div>
                  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{activeData.title}</h2>
                </div>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '36px 36px 40px' }}>
                {/* Overview */}
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 40 }}>{activeData.overview}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="services-modal-grid">
                  {/* Process */}
                  <div>
                    <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${activeData.color}25` }}>Our Process</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {activeData.process.map((p, pi) => (
                        <div key={pi} style={{ display: 'flex', gap: 16 }}>
                          <div style={{ fontSize: '0.7rem', color: activeData.color, fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", minWidth: 24, paddingTop: 2 }}>{p.step}</div>
                          <div>
                            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', marginBottom: 4 }}>{p.title}</div>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.6 }}>{p.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    {/* Features */}
                    <div>
                      <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${activeData.color}25` }}>What's Included</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {activeData.features.map((f, fi) => (
                          <div key={fi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ color: activeData.color, fontSize: '0.8rem', marginTop: 2 }}>✓</span>
                            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.5 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div style={{ background: `${activeData.color}0d`, border: `1px solid ${activeData.color}22`, borderRadius: 16, padding: 20 }}>
                      <h4 style={{ fontSize: '0.8rem', color: activeData.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Typical Results</h4>
                      {activeData.results.map((r, ri) => (
                        <div key={ri} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                          <span style={{ color: activeData.color, fontSize: '0.9rem' }}>→</span>
                          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <a href="mailto:growthlytics23@gmail.com" className="btn-primary" style={{ textDecoration: 'none' }}>Start with {activeData.title}</a>
                  <button onClick={() => setActiveService(null)} className="btn-ghost">Explore Other Services</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── 4. PRIVACY POLICY PAGE ───────────────────────────────── */
const PrivacyPolicy = () => (
  <div style={{ minHeight: '100vh', padding: '140px 5% 80px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
    <div className="bg-motion-3d" style={{
      position: 'absolute', inset: 0,
      backgroundImage: "url('/images/3d/cyber_grid_bg.png')",
      backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none',
      zIndex: 0
    }} />
    <Orbs3D />
    <div style={{ maxWidth: 800, margin: '0 auto', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
      <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>Privacy Policy</h1>
      <span style={{ fontSize: '0.85rem', color: '#06B6D4', fontWeight: 600, display: 'block', marginBottom: 40 }}>Last updated: June 4, 2026</span>
      
      <p style={{ fontSize: '1.05rem', marginBottom: 24 }}>
        At Growthlytics, we value your privacy. We are committed to protecting the confidential information, marketing data, and assets shared with us for the execution of our services.
      </p>

      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#white', fontWeight: 700, fontSize: '1.4rem', marginTop: 32, marginBottom: 16 }}>1. Data Collection</h2>
      <p style={{ marginBottom: 20 }}>
        We only request business data, contact email, and name details when submitting forms to register client inquiries or career interest. We do not gather cookies, tracker information, or other automated identity details unless explicitly authorized.
      </p>

      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#white', fontWeight: 700, fontSize: '1.4rem', marginTop: 32, marginBottom: 16 }}>2. Data Confidentiality</h2>
      <p style={{ marginBottom: 20 }}>
        All marketing dashboards, website analytics details, and campaign budgets shared with us for audits stay strictly confidential. We do not share lead information, applicant CVs, or customer names with third parties under any circumstances.
      </p>

      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", color: '#white', fontWeight: 700, fontSize: '1.4rem', marginTop: 32, marginBottom: 16 }}>3. Contact & Inquiries</h2>
      <p style={{ marginBottom: 20 }}>
        If you have questions or wish to delete your records from our database, please contact our privacy officer at <a href="mailto:growthlytics23@gmail.com" style={{ color: '#06B6D4', textDecoration: 'none' }}>growthlytics23@gmail.com</a>.
      </p>
    </div>
  </div>
);

/* ─── 5. NOT FOUND PAGE ────────────────────────────────────── */
const NotFound = () => (
  <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 5%', textAlign: 'center' }}>
    <Info size={48} style={{ color: '#F59E0B', marginBottom: 16 }} />
    <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>Page Not Found</h2>
    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>The path you requested is invalid.</p>
    <Link to="/" className="btn-primary">Return to Home Page</Link>
  </div>
);

/* ============================================================
   ENTRY POINT & ROUTING
   ============================================================ */
export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background: '#050508', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        <SpaceStarfield />
        <NoiseOverlay />
        <ScrollToTop />
        <Navbar />
        
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />

            {/* Recommended SEO Strategy Landing Page Redirects */}
            <Route path="/seo-services" element={<Navigate to="/service/seo-optimization" replace />} />
            <Route path="/ai-seo-services" element={<Navigate to="/service/seo-optimization" replace />} />
            <Route path="/website-development" element={<Navigate to="/service/website-development" replace />} />
            <Route path="/digital-marketing" element={<Navigate to="/services" replace />} />
            <Route path="/google-ads" element={<Navigate to="/service/google-ads-ppc" replace />} />
            <Route path="/meta-ads" element={<Navigate to="/service/meta-business-suite" replace />} />
            <Route path="/linkedin-marketing" element={<Navigate to="/service/social-media-marketing" replace />} />
            <Route path="/content-marketing" element={<Navigate to="/service/content-strategy" replace />} />
            <Route path="/ai-content" element={<Navigate to="/service/content-strategy" replace />} />
            <Route path="/ai-automation" element={<Navigate to="/service/ai-app-development" replace />} />
            <Route path="/social-media-marketing" element={<Navigate to="/service/social-media-marketing" replace />} />
            <Route path="/saas-marketing" element={<Navigate to="/services" replace />} />
            <Route path="/growth-marketing" element={<Navigate to="/services" replace />} />
            <Route path="/local-seo" element={<Navigate to="/service/seo-optimization" replace />} />
            <Route path="/blog" element={<Navigate to="/blogs" replace />} />
            <Route path="/contact" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <FloatingCTA />
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { font-family: 'Inter', sans-serif; background: #050508; color: #F8FAFC; line-height: 1.6; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050508; }
        ::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(124, 58, 237, 0.7); }
        ::selection { background: rgba(124, 58, 237, 0.35); color: white; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float3d {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(.6deg); }
          66% { transform: translateY(-6px) rotate(-.4deg); }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes beamSlide {
          0%, 100% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-4px) rotateY(3deg) rotateX(1deg); }
        }

        .logo-float {
          animation: logoFloat 6s ease-in-out infinite;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        
        .animate-float {
          animation: float3d 5s ease-in-out infinite;
        }
      `}</style>
    </BrowserRouter>
  );
}
