const fs = require('fs');
const path = require('path');

const currentBrain = "C:\\Users\\MONOJIT\\.gemini\\antigravity\\brain\\e0df4b34-7b5a-410d-9bbe-fcc4db239485";
const oldBrain     = "C:\\Users\\MONOJIT\\.gemini\\antigravity\\brain\\e521b3ef-671f-4b11-ab2c-5fb413a19c40";
const project      = "C:\\Users\\MONOJIT\\Desktop\\new\\public\\images";

// Create directories if they don't exist
fs.mkdirSync(path.join(project, 'gallery'), { recursive: true });
fs.mkdirSync(path.join(project, 'food'), { recursive: true });

console.log("Copying GALLERY images...");
const galleryMap = [
    { src: path.join(currentBrain, "media__1779186430414.png"), dst: path.join(project, "gallery", "gallery_interior_chandelier.jpg"), label: "Interior chandelier overview" },
    { src: path.join(currentBrain, "media__1779186435934.jpg"), dst: path.join(project, "gallery", "gallery_red_doors.jpg"), label: "Red French doors" },
    { src: path.join(currentBrain, "media__1779186445776.jpg"), dst: path.join(project, "gallery", "gallery_chandelier_full.jpg"), label: "Grand chandelier full" },
    { src: path.join(currentBrain, "media__1779186451795.jpg"), dst: path.join(project, "gallery", "gallery_masquerade.jpg"), label: "Masquerade room" },
    { src: path.join(currentBrain, "media__1779186458533.jpg"), dst: path.join(project, "gallery", "gallery_evening_dining.jpg"), label: "Evening dining" },
    { src: path.join(currentBrain, "media__1779186430414.png"), dst: path.join(project, "gallery", "gallery_fountain.jpg"), label: "Fountain + balcony" }
];

galleryMap.forEach(item => {
    if (fs.existsSync(item.src)) {
        fs.copyFileSync(item.src, item.dst);
        console.log(`  OK: ${item.label}`);
    } else {
        console.log(`  MISSING: ${item.src}`);
    }
});

console.log("\nCopying FOOD images...");
const foodMap = [
    { src: path.join(oldBrain, "chicken_malai_kabab_1779185293580.png"), dst: path.join(project, "food", "chicken_malai_kabab.png"), label: "Chicken Malai Kabab" },
    { src: path.join(oldBrain, "thai_pineapple_fried_rice_1779185312427.png"), dst: path.join(project, "food", "thai_pineapple_fried_rice.png"), label: "Thai Pineapple Fried Rice" },
    { src: path.join(oldBrain, "cold_brew_coffee_1779185328248.png"), dst: path.join(project, "food", "cold_brew_coffee.png"), label: "Cold Brew Coffee" },
    { src: path.join(oldBrain, "nolen_gur_iced_coffee_1779185360022.png"), dst: path.join(project, "food", "nolen_gur_iced_coffee.png"), label: "Nolen Gur Iced Coffee" },
    { src: path.join(oldBrain, "crab_california_sushi_1779185376852.png"), dst: path.join(project, "food", "crab_california_sushi.png"), label: "Crab California Sushi" },
    { src: path.join(oldBrain, "smoked_lamb_croquette_1779185395480.png"), dst: path.join(project, "food", "smoked_lamb_croquette.png"), label: "Smoked Lamb Croquette" },
    { src: path.join(oldBrain, "green_thai_curry_1779185420096.png"), dst: path.join(project, "food", "green_thai_curry.png"), label: "Green Thai Curry" },
    { src: path.join(oldBrain, "clarified_orange_latte_1779185437153.png"), dst: path.join(project, "food", "clarified_orange_latte.png"), label: "Clarified Orange Latte" },
    { src: path.join(oldBrain, "espresso_coffee_1779185452990.png"), dst: path.join(project, "food", "espresso_coffee.png"), label: "Espresso Coffee" },
    { src: path.join(oldBrain, "nachos_diablo_1779185477259.png"), dst: path.join(project, "food", "nachos_diablo.png"), label: "Nachos Diablo" },
    { src: path.join(oldBrain, "katsu_curry_chicken_1779185492666.png"), dst: path.join(project, "food", "katsu_curry_chicken.png"), label: "Katsu Curry Chicken" },
    { src: path.join(oldBrain, "butter_garlic_prawn_1779185508025.png"), dst: path.join(project, "food", "butter_garlic_prawn.png"), label: "Butter Garlic Prawn" }
];

foodMap.forEach(item => {
    if (fs.existsSync(item.src)) {
        fs.copyFileSync(item.src, item.dst);
        console.log(`  OK: ${item.label}`);
    } else {
        console.log(`  MISSING: ${item.src}`);
    }
});

console.log("\nAll images setup completed successfully!");
