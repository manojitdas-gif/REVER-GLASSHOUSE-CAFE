import { supabase } from './supabase';

export interface MenuItem {
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  img?: string;
}

export interface CafeDetails {
  name: string;
  tagline: string;
  address: string;
  phone1: string;
  phone2: string;
  hours: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  adminPasscode?: string;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discount: string;
  active: boolean;
  bannerText: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  googleSiteVerification?: string;
  customHeadScript?: string;
}

export interface AdCampaign {
  id: string;
  platform: 'Google' | 'Facebook' | 'Instagram';
  name: string;
  budget: number;
  status: 'Active' | 'Paused' | 'Ended';
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  spend: number;
  startDate: string;
}

// Default High-Quality Unsplash Images for Menu Items to ensure all recipes have images
const defaultImages: Record<string, string> = {
  // Signatures
  "Dulce De Leche Iced Coffee": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60",
  "Nolen Gur Iced Coffee": "/images/food/nolen_gur_iced_coffee.png",
  "Banana Split Espresso Tonic": "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=500&auto=format&fit=crop&q=60",
  "Clarified Orange Latte": "/images/food/clarified_orange_latte.png",
  "Clarified Pina Colada": "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&auto=format&fit=crop&q=60",
  "Clarified Strawberry Matcha": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=60",
  
  // Hot Caffeine
  "Espresso": "/images/food/espresso_coffee.png",
  "Cubano": "https://images.unsplash.com/photo-1510972527409-cef7e2b761c3?w=500&auto=format&fit=crop&q=60",
  "Cortado": "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60",
  "Machiato": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&auto=format&fit=crop&q=60",
  "Americano": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60",
  "Iced Aerocano": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&auto=format&fit=crop&q=60",
  "Cappuccino": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60",
  "Latte": "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60",
  "Piccolo Latte": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=60",
  "Mocha": "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&auto=format&fit=crop&q=60",

  // Rever Lattes
  "Caramel Latte": "https://images.unsplash.com/photo-1599390809312-5f6e24021136?w=500&auto=format&fit=crop&q=60",
  "Spanish Latte": "https://images.unsplash.com/photo-1461023058048-245a7e4c8cc7?w=500&auto=format&fit=crop&q=60",
  "Nutella Latte": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
  "Strawberry Vanilla & Matcha Latte": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=60",
  "Biscoff Latte": "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=500&auto=format&fit=crop&q=60",
  "Maple Walnut Latte": "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&auto=format&fit=crop&q=60",

  // Cold Brews
  "House Blend": "/images/food/cold_brew_coffee.png",
  "Coconut Cold Brew": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60",
  "Mix Berry Brew": "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500&auto=format&fit=crop&q=60",
  "Tropical Fizz": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60",
  "Whiskey Barrel": "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=500&auto=format&fit=crop&q=60",

  // Cold Coffees
  "Classic Cold Coffee": "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=60",
  "Choco Frappe": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60",
  "Tiramisu Frappe": "https://images.unsplash.com/photo-1532713109658-f5358d5570df?w=500&auto=format&fit=crop&q=60",
  "Cookie and Cream Frappe": "https://images.unsplash.com/photo-1471691118458-a88597b4c1f5?w=500&auto=format&fit=crop&q=60",
  "Jaggery and Peanut Brittle Frappe": "https://images.unsplash.com/photo-1580933079467-aa2579074020?w=500&auto=format&fit=crop&q=60",

  // Add-ons
  "Hazelnut": "https://images.unsplash.com/photo-1508215885820-4585e56135c8?w=500&auto=format&fit=crop&q=60",
  "Tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60",
  "Cinnamon": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=60",
  "Oat Milk": "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&auto=format&fit=crop&q=60",
  "Almond Milk": "https://images.unsplash.com/photo-1568651343853-224e6a73d3b5?w=500&auto=format&fit=crop&q=60",

  // Small Bites (Veg)
  "Nachos Diablo": "/images/food/nachos_diablo.png",
  "Exotic Veg Jhool Momo": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
  "Spinach and Cheese Dragon Roll": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
  "Crispy Chilli Baby Corn": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Thai Crispy Corn Curd": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Corn and Jalapeno Croquette": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "MC BC": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Mushroom Chettinad Puff": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
  "Green Thai Paneer Tikka": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
  "Apricot Silk Bites": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
  "Pindi Channa Hummus and Amritsari Kulcha": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
  "Edamame Galauti": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
  "Mushroom Coco Bao": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",

  // Small Bites (Non-Veg)
  "Yaki Tori Chicken": "https://images.unsplash.com/photo-1516685018646-549198525c1b?w=500&auto=format&fit=crop&q=60",
  "Tempered Chicken Popcorn": "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=60",
  "4 Cheese Malai Chicken Tikka": "/images/food/chicken_malai_kabab.png",
  "Crispy Plum Chicken": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60",
  "Schezwan Pepper and Leek Chicken": "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?w=500&auto=format&fit=crop&q=60",
  "Bhatti Da Murgh": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60",
  "Korean Crispy Chicken Bao": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
  "Pahadi Chicken Jhool Momo": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",

  // Non-Veg Starters
  "Smoked Lamb Croquette": "/images/food/smoked_lamb_croquette.png",
  "Mutton Keema Puff": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
  "BBQ Lamb Ribs": "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60",
  "Dora Kebab with Burnt Garlic Tzatziki": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60",
  "Fish Takrai": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
  "Spicy Coriander Fish and Chips": "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&auto=format&fit=crop&q=60",
  "Thai Fish Tikka": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
  "Charcoal Tempura Prawn": "https://images.unsplash.com/photo-1559737605-de6a255fda3a?w=500&auto=format&fit=crop&q=60",
  "Butter Garlic Prawn": "/images/food/butter_garlic_prawn.png",
  "Summer Shrimp Roll": "https://images.unsplash.com/photo-1559737605-de6a255fda3a?w=500&auto=format&fit=crop&q=60",
  "Crab Phuchka": "https://images.unsplash.com/photo-1545093149-618cddecb8b4?w=500&auto=format&fit=crop&q=60",
  "Kani Furai": "https://images.unsplash.com/photo-1545093149-618cddecb8b4?w=500&auto=format&fit=crop&q=60",
  "Squid Rings": "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&auto=format&fit=crop&q=60",

  // Sushi
  "Veg California": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
  "Asparagus Tempura Roll": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=60",
  "Crab California": "/images/food/crab_california_sushi.png",
  "Crispy Mutton Kosha Roll": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
  "Prawn Tempra Roll": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=60",

  // Entrees
  "Zucchini Roll": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
  "Lemon Grass Grill Chicken": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60",
  "Fish Florentine": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
  "Fish All A Kiev": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
  "Grilled Tiger Prawn": "https://images.unsplash.com/photo-1559737605-de6a255fda3a?w=500&auto=format&fit=crop&q=60",
  "Katsu Curry Chicken": "/images/food/katsu_curry_chicken.png",
  "Nasi Goreng": "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60",
  "Green Thai Curry": "/images/food/green_thai_curry.png",

  // Noodles
  "Hakka Noodle": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Hot Basil Noodle": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Yellow Thai Curry Noodle": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Bami Noodle": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
  "Burnt Garlic Noodle": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",

  // Rice
  "Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60",
  "Hot Basil Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60",
  "Korean Gochujang Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60",
  "Moon Fan": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60",
  "Thai Pineapple Fried Rice": "/images/food/thai_pineapple_fried_rice.png"
};

// Initial state values matching current setup
const initialMenuData: Record<string, MenuItem[]> = {
  "Signature": [
    { name: "Dulce De Leche Iced Coffee", desc: "Caramelised milk iced coffee with dessert richness", price: 269, veg: true },
    { name: "Nolen Gur Iced Coffee", desc: "Seasonal jaggery sweetness blended with iced coffee", price: 249, veg: true },
    { name: "Banana Split Espresso Tonic", desc: "A playful espresso tonic with caramelised banana notes", price: 269, veg: true },
    { name: "Clarified Orange Latte", desc: "A crystal-clear orange-infused latte with a smooth silky finish", price: 269, veg: true },
    { name: "Clarified Pina Colada", desc: "A clarified tropical blend of coconut cream and pineapple brightness", price: 269, veg: true },
    { name: "Clarified Strawberry Matcha", desc: "A clear refined matcha layered with delicate strawberry sweetness", price: 269, veg: true },
  ],
  "Hot Caffeine": [
    { name: "Espresso", desc: "A pure intense shot highlighting bold coffee character", price: 99, veg: true },
    { name: "Cubano", desc: "Espresso sweetened with caramelised brown sugar", price: 129, veg: true },
    { name: "Cortado", desc: "Equal parts espresso and lightly textured milk", price: 169, veg: true },
    { name: "Machiato", desc: "Espresso marked with a touch of milk foam", price: 169, veg: true },
    { name: "Americano", desc: "Espresso diluted with hot water for smooth strength", price: 169, veg: true },
    { name: "Iced Aerocano", desc: "Iced aerated espresso with light crema and airy texture", price: 169, veg: true },
    { name: "Cappuccino", desc: "Balanced espresso with steamed milk and thick foam", price: 199, veg: true },
    { name: "Latte", desc: "A creamy milk-forward coffee with smooth espresso", price: 199, veg: true },
    { name: "Piccolo Latte", desc: "A short velvety latte with bold espresso and lightly textured milk", price: 189, veg: true },
    { name: "Mocha", desc: "Espresso blended with rich chocolate and steamed milk", price: 229, veg: true },
  ],
  "Rever Latte": [
    { name: "Caramel Latte", desc: "A smooth latte finished with buttery caramel notes", price: 229, veg: true },
    { name: "Spanish Latte", desc: "A creamy espresso-based latte sweetened with condensed milk", price: 229, veg: true },
    { name: "Nutella Latte", desc: "A creamy espresso latte infused with rich chocolate-hazelnut indulgence", price: 229, veg: true },
    { name: "Strawberry Vanilla & Matcha Latte", desc: "Creamy vanilla milk layered with strawberry notes and ceremonial matcha", price: 269, veg: true },
    { name: "Biscoff Latte", desc: "A silky espresso milk base enriched with indulgent Biscoff essence", price: 269, veg: true },
    { name: "Maple Walnut Latte", desc: "Espresso blended with warm walnut notes and natural maple sweetness", price: 269, veg: true },
  ],
  "Cold Brew": [
    { name: "House Blend", desc: "Slow-steeped coffee with smooth low-acid finish", price: 199, veg: true },
    { name: "Coconut Cold Brew", desc: "Cold brew balanced with light coconut notes", price: 229, veg: true },
    { name: "Mix Berry Brew", desc: "Cold brew infused with subtle berry brightness", price: 269, veg: true },
    { name: "Tropical Fizz", desc: "Cold brew topped with citrusy sparkling elements", price: 269, veg: true },
    { name: "Whiskey Barrel", desc: "Oak-aged cold brew with smoky depth", price: 269, veg: true },
  ],
  "Cold Coffee": [
    { name: "Classic Cold Coffee", desc: "Chilled blended coffee with creamy texture", price: 199, veg: true },
    { name: "Choco Frappe", desc: "Rich chocolate-blended iced coffee", price: 209, veg: true },
    { name: "Tiramisu Frappe", desc: "A coffee frappe layered with tiramisu flavours and tiramisu mousse", price: 229, veg: true },
    { name: "Cookie and Cream Frappe", desc: "A creamy frappe with cookie crunch", price: 229, veg: true },
    { name: "Jaggery and Peanut Brittle Frappe", desc: "Earthy jaggery sweetness blended with nutty brittle crunch", price: 269, veg: true },
  ],
  "Add-ons": [
    { name: "Hazelnut", desc: "Flavour shot", price: 30, veg: true },
    { name: "Tiramisu", desc: "Flavour shot", price: 30, veg: true },
    { name: "Cinnamon", desc: "Flavour shot", price: 30, veg: true },
    { name: "Oat Milk", desc: "Milk alternative", price: 30, veg: true },
    { name: "Almond Milk", desc: "Milk alternative", price: 30, veg: true },
  ],
  "Small Bites (Veg)": [
    { name: "Nachos Diablo", desc: "Crunchy nachos with spicy cheese and salsa", price: 299, veg: true },
    { name: "Exotic Veg Jhool Momo", desc: "Steamed vegetable dumplings in light spiced broth", price: 299, veg: true },
    { name: "Spinach and Cheese Dragon Roll", desc: "Crispy rolls filled with creamy spinach cheese", price: 329, veg: true },
    { name: "Crispy Chilli Baby Corn", desc: "Crispy Thai-style Panko crumbed corn curd with sweet chilli dip", price: 329, veg: true },
    { name: "Thai Crispy Corn Curd", desc: "Crispy corn with tangy Thai-style curd sauce", price: 329, veg: true },
    { name: "Corn and Jalapeno Croquette", desc: "Crispy croquettes with corn and jalapeno heat", price: 329, veg: true },
    { name: "MC BC", desc: "Mango Cheese Baby Kachulcha", price: 349, veg: true },
    { name: "Mushroom Chettinad Puff", desc: "Spiced Chettinad mushroom filling in flaky puff", price: 329, veg: true },
    { name: "Green Thai Paneer Tikka", desc: "Paneer marinated in fragrant green Thai herbs finished in clay oven", price: 399, veg: true },
    { name: "Apricot Silk Bites", desc: "Creamy dhai ke kebab bites with apricot sweetness", price: 349, veg: true },
    { name: "Pindi Channa Hummus and Amritsari Kulcha", desc: "Spiced chickpea hummus with Karari Kulcha bread", price: 349, veg: true },
    { name: "Edamame Galauti", desc: "Melt-in-mouth edamame kebabs with mild spices", price: 349, veg: true },
    { name: "Mushroom Coco Bao", desc: "Mushroom-filled soft steamed bao dusted with coco powder", price: 329, veg: true },
  ],
  "Small Bites (Non-Veg)": [
    { name: "Yaki Tori Chicken", desc: "Japanese-style skewered chicken glazed with sweet soy sauce", price: 399, veg: false },
    { name: "Tempered Chicken Popcorn", desc: "Crunchy fried chicken bites served with cooling yoghurt dip", price: 399, veg: false },
    { name: "4 Cheese Malai Chicken Tikka", desc: "Creamy Malai Chicken Tikka enriched with four cheeses", price: 429, veg: false },
    { name: "Crispy Plum Chicken", desc: "Crispy fried chicken tossed in sweet and tangy plum sauce", price: 399, veg: false },
    { name: "Schezwan Pepper and Leek Chicken", desc: "Spicy Schezwan-style chicken tossed with pepper and leeks", price: 399, veg: false },
    { name: "Bhatti Da Murgh", desc: "Traditional Punjabi-style charcoal grilled chicken (Half/Full)", price: 449, veg: false },
    { name: "Korean Crispy Chicken Bao", desc: "Crispy Korean-style chicken served inside a soft bao bun", price: 399, veg: false },
    { name: "Pahadi Chicken Jhool Momo", desc: "Hill-style chicken momos served in lightly spiced broth", price: 399, veg: false },
  ],
  "Non-Veg Starters": [
    { name: "Smoked Lamb Croquette", desc: "Crispy croquettes filled with smoked lamb served with garlic aioli", price: 499, veg: false },
    { name: "Mutton Keema Puff", desc: "Flaky puff pastry filled with spiced mutton mince", price: 499, veg: false },
    { name: "BBQ Lamb Ribs", desc: "Slow cooked lamb ribs glazed with smoky barbecue sauce", price: 529, veg: false },
    { name: "Dora Kebab with Burnt Garlic Tzatziki", desc: "Juicy mutton kebabs paired with smoky garlic-flavoured tzatziki", price: 529, veg: false },
    { name: "Fish Takrai", desc: "Crispy fried fish tossed in Asian herb-infused sweet chilli sauce", price: 499, veg: false },
    { name: "Spicy Coriander Fish and Chips", desc: "Crispy fish served with coriander-spiced batter and fries", price: 499, veg: false },
    { name: "Thai Fish Tikka", desc: "Grilled fish marinated in aromatic Thai herbs and spices", price: 499, veg: false },
    { name: "Charcoal Tempura Prawn", desc: "Activated charcoal light tempura prawns with garlic aioli", price: 529, veg: false },
    { name: "Butter Garlic Prawn", desc: "Juicy prawns in rich butter and garlic sauce", price: 529, veg: false },
    { name: "Summer Shrimp Roll", desc: "Fresh shrimp rolls with crisp vegetables and light dressing", price: 495, veg: false },
    { name: "Crab Phuchka", desc: "Kolkata-style phuchka stuffed with flavourful crab filling", price: 449, veg: false },
    { name: "Kani Furai", desc: "Japanese-style crispy fried crab sticks", price: 449, veg: false },
    { name: "Squid Rings", desc: "Crispy fried squid rings seasoned and served with lemon garlic aioli", price: 499, veg: false },
  ],
  "Sushi": [
    { name: "Veg California", desc: "Fresh vegetables rolled with seasoned sushi rice", price: 449, veg: true },
    { name: "Asparagus Tempura Roll", desc: "Crispy tempura asparagus with cream cheese rolled in black sushi rice", price: 449, veg: true },
    { name: "Crab California", desc: "Classic sushi roll with crab stick, avocado, carrot, cucumber, and rice", price: 529, veg: false },
    { name: "Crispy Mutton Kosha Roll", desc: "Bengali kosha mutton wrapped in crispy sushi roll", price: 529, veg: false },
    { name: "Prawn Tempra Roll", desc: "Crispy prawn tempura rolled with black sushi rice", price: 529, veg: false },
  ],
  "Entree": [
    { name: "Zucchini Roll", desc: "Grilled zucchini rolls stuffed with ricotta cheese and walnut served with saffron tomato sauce", price: 449, veg: true },
    { name: "Lemon Grass Grill Chicken", desc: "Grilled chicken marinated with fresh lemongrass flavours with charred leek and coconut broth", price: 599, veg: false },
    { name: "Fish Florentine", desc: "Baked fish served with creamy spinach florentine sauce", price: 599, veg: false },
    { name: "Fish All A Kiev", desc: "Crumb-fried fish filled with melting herb butter and mashed potato", price: 599, veg: false },
    { name: "Grilled Tiger Prawn", desc: "Grilled tiger prawns with mash potato and salsa verde", price: 699, veg: false },
    { name: "Katsu Curry Chicken", desc: "Crispy crumb-fried chicken served with Japanese curry sauce", price: 549, veg: false },
    { name: "Nasi Goreng", desc: "Indonesian-style fried rice with aromatic spices", price: 429, veg: false },
    { name: "Green Thai Curry", desc: "Classic green Thai curry served with fragrant rice (Veg / Chicken / Prawn)", price: 429, veg: true },
  ],
  "Stir Fried Noodle": [
    { name: "Hakka Noodle", desc: "Classic stir-fried Hakka noodles", price: 299, veg: true },
    { name: "Hot Basil Noodle", desc: "Spicy stir-fried noodles with Thai basil", price: 329, veg: true },
    { name: "Yellow Thai Curry Noodle", desc: "Noodles tossed in aromatic yellow Thai curry sauce", price: 349, veg: true },
    { name: "Bami Noodle", desc: "Indonesian-style stir-fried noodles", price: 329, veg: true },
    { name: "Burnt Garlic Noodle", desc: "Noodles with fragrant burnt garlic and vegetables", price: 319, veg: true },
  ],
  "Stir Fried Rice": [
    { name: "Fried Rice", desc: "Classic vegetable fried rice", price: 299, veg: true },
    { name: "Hot Basil Fried Rice", desc: "Spicy fried rice with Thai basil", price: 329, veg: true },
    { name: "Korean Gochujang Fried Rice", desc: "Fried rice tossed in spicy Korean gochujang sauce", price: 349, veg: true },
    { name: "Moon Fan", desc: "Special house fried rice with aromatic spices", price: 339, veg: true },
    { name: "Thai Pineapple Fried Rice", desc: "Fragrant fried rice with pineapple and cashews", price: 349, veg: true },
  ]
};

// Map images onto the initial menu data
Object.keys(initialMenuData).forEach(cat => {
  initialMenuData[cat].forEach(item => {
    item.img = defaultImages[item.name] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60";
  });
});

const initialCafeDetails: CafeDetails = {
  name: "Rever",
  tagline: "COOKED AGAINST CONVENTION • LET APPETITE LEAD",
  address: "8B Maharaj Nanda Kumar Road, Lake Market, Kalighat, Kolkata, West Bengal 700029",
  phone1: "099033 15530",
  phone2: "98315 67830",
  hours: "11:00 AM – 1:00 AM Daily",
  whatsapp: "919903315530",
  instagram: "https://www.instagram.com/revercafekolkata",
  facebook: "https://www.facebook.com/profile.php?id=61575729854062",
  adminPasscode: "admin123",
};

const initialGalleryPhotos = [
  { id: 1, category: "Interior", caption: "Marble Fountain & Floral Balcony", src: "/images/gallery/gallery_fountain.jpg", alt: "Marble fountain with floral balcony inside Rever Glasshouse Cafe Kolkata" },
  { id: 2, category: "Exterior", caption: "Red French Doors — La Prosciutteria", src: "/images/gallery/gallery_red_doors.jpg", alt: "Iconic red French doors at Rever Glasshouse Cafe Lake Market Kalighat" },
  { id: 3, category: "Interior", caption: "Grand Interior with Crystal Chandeliers", src: "/images/gallery/gallery_chandelier_full.jpg", alt: "Two-level grand interior of Rever with crystal chandeliers and checkered floor" },
  { id: 4, category: "Vibe", caption: "The Masquerade Room", src: "/images/gallery/gallery_masquerade.jpg", alt: "Masquerade-themed dining room at Rever Glasshouse Cafe with dramatic crimson lighting" },
  { id: 5, category: "Interior", caption: "Evening Dining — Glasshouse in Full Glow", src: "/images/gallery/gallery_evening_dining.jpg", alt: "Full glasshouse interior of Rever Cafe glowing during evening service with guests dining" },
  { id: 6, category: "Food and Drinks", caption: "Chicken Malai Kabab", src: "/images/food/chicken_malai_kabab.png", alt: "Chicken Malai Kabab signature dish at Rever Glasshouse Cafe" },
  { id: 7, category: "Food and Drinks", caption: "Crab California Sushi", src: "/images/food/crab_california_sushi.png", alt: "Crab California Sushi rolls at Rever Glasshouse Cafe" },
  { id: 8, category: "Food and Drinks", caption: "Clarified Orange Latte", src: "/images/food/clarified_orange_latte.png", alt: "Signature Clarified Orange Latte at Rever Cafe" },
  { id: 9, category: "Food and Drinks", caption: "Green Thai Curry", src: "/images/food/green_thai_curry.png", alt: "Green Thai Curry at Rever Glasshouse Cafe Kolkata" },
];

const initialOffers: Offer[] = [
  { id: "1", title: "Flat 10% Off", code: "REVER10", discount: "10%", active: true, bannerText: "✨ Special Offer: Use coupon REVER10 to get Flat 10% Off on your first order! Dine-in & Delivery. ✨" },
  { id: "2", title: "Monsoon Special Sushi Combo", code: "SUSHIFEST", discount: "15%", active: false, bannerText: "🍣 Sushi Fest: Grab 15% off on our Signature Platters. Use code SUSHIFEST! 🍣" }
];

const initialSEOConfig: SEOConfig = {
  title: "Rever Glasshouse Cafe — Best Cafe in Kalighat Kolkata — Open 11AM to 1AM",
  description: "Visit Rever Glasshouse Cafe — South Kolkata's most Instagram-worthy dining experience with a 23ft glass ceiling, craft coffees, sushi, and global cuisine. Open daily 11AM to 1AM at Lake Market Kalighat.",
  keywords: "rever cafe kolkata, best cafe in kalighat, instagrammable cafe kolkata, glasshouse cafe kolkata, cafes in south kolkata",
  googleSiteVerification: "",
  customHeadScript: ""
};

const initialAdCampaigns: AdCampaign[] = [
  { id: "c1", platform: "Instagram", name: "Glasshouse Aesthetic Promo", budget: 15000, status: "Active", impressions: 84200, clicks: 4210, conversions: 310, ctr: 5.0, cpc: 3.5, spend: 14735, startDate: "2026-05-10" },
  { id: "c2", platform: "Google", name: "Sushi & Special Coffee Search Ads", budget: 20000, status: "Active", impressions: 32400, clicks: 1944, conversions: 120, ctr: 6.0, cpc: 6.2, spend: 12052, startDate: "2026-05-12" },
  { id: "c3", platform: "Facebook", name: "Weekend Dine-In Offers", budget: 10000, status: "Paused", impressions: 45000, clicks: 1350, conversions: 78, ctr: 3.0, cpc: 4.1, spend: 5535, startDate: "2026-05-01" }
];

// LocalStorage keys
const KEYS = {
  MENU: 'rever_menu_data',
  DETAILS: 'rever_details',
  GALLERY: 'rever_gallery',
  OFFERS: 'rever_offers',
  SEO: 'rever_seo',
  CAMPAIGNS: 'rever_campaigns',
  RESERVATIONS: 'rever_reservations',
  VISITS: 'rever_visits_log'
};

// Initialize State in localStorage if not exists
export const initAppState = () => {
  if (!localStorage.getItem(KEYS.MENU)) localStorage.setItem(KEYS.MENU, JSON.stringify(initialMenuData));
  if (!localStorage.getItem(KEYS.DETAILS)) localStorage.setItem(KEYS.DETAILS, JSON.stringify(initialCafeDetails));
  if (!localStorage.getItem(KEYS.GALLERY)) localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialGalleryPhotos));
  if (!localStorage.getItem(KEYS.OFFERS)) localStorage.setItem(KEYS.OFFERS, JSON.stringify(initialOffers));
  if (!localStorage.getItem(KEYS.SEO)) localStorage.setItem(KEYS.SEO, JSON.stringify(initialSEOConfig));
  if (!localStorage.getItem(KEYS.CAMPAIGNS)) localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(initialAdCampaigns));
  
  // Track visits to simulate analytics
  if (!localStorage.getItem(KEYS.VISITS)) {
    const visits = Array.from({ length: 30 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        visits: Math.floor(400 + Math.random() * 300),
        pageViews: Math.floor(900 + Math.random() * 800),
        reservations: Math.floor(8 + Math.random() * 15)
      };
    });
    localStorage.setItem(KEYS.VISITS, JSON.stringify(visits));
  }
};

let isSyncing = false;

// Background Database and Local Server Sync
export const syncFromDatabase = async () => {
  // 1. Try syncing from Local Node Server first
  try {
    const res = await fetch('/api/state');
    if (res.ok) {
      const serverState = await res.json();
      let hasUpdates = false;
      Object.keys(KEYS).forEach(k => {
        const lowerK = k.toLowerCase();
        if (serverState[lowerK]) {
          localStorage.setItem(KEYS[k as keyof typeof KEYS], JSON.stringify(serverState[lowerK]));
          hasUpdates = true;
        }
      });
      if (hasUpdates) {
        window.dispatchEvent(new Event('app_state_changed'));
      }
      return; // If server is running locally and returned state, skip Supabase query to optimize database load
    }
  } catch (err) {
    // Local server not running, fallback to Supabase
  }

  // 2. Fallback to Supabase Database
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');
    
    if (!error && data && data.length > 0) {
      let hasUpdates = false;
      data.forEach((row: any) => {
        const key = row.key.toUpperCase();
        if (KEYS[key as keyof typeof KEYS]) {
          localStorage.setItem(KEYS[key as keyof typeof KEYS], JSON.stringify(row.value));
          hasUpdates = true;
        }
      });
      if (hasUpdates) {
        window.dispatchEvent(new Event('app_state_changed'));
      }
    }
  } catch (err) {
    console.warn("External DB sync deferred:", err);
  }
};

export const syncToDatabase = async (key: string, data: any) => {
  // 1. Try local server first
  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: key.toLowerCase(), data })
    });
  } catch (err) {
    // Local server not reachable, no worries
  }

  // 2. Sync to Supabase in background
  try {
    await supabase
      .from('site_settings')
      .upsert({ key: key.toLowerCase(), value: data });
  } catch (err) {
    console.warn("External DB state save deferred:", err);
  }
};

export const getAppState = () => {
  initAppState();
  if (!isSyncing) {
    isSyncing = true;
    syncFromDatabase();
  }
  return {
    menu: JSON.parse(localStorage.getItem(KEYS.MENU)!),
    details: JSON.parse(localStorage.getItem(KEYS.DETAILS)!),
    gallery: JSON.parse(localStorage.getItem(KEYS.GALLERY)!),
    offers: JSON.parse(localStorage.getItem(KEYS.OFFERS)!),
    seo: JSON.parse(localStorage.getItem(KEYS.SEO)!),
    campaigns: JSON.parse(localStorage.getItem(KEYS.CAMPAIGNS)!),
    visits: JSON.parse(localStorage.getItem(KEYS.VISITS)!)
  };
};

export const saveAppStateField = (field: keyof typeof KEYS, data: any) => {
  localStorage.setItem(KEYS[field], JSON.stringify(data));
  // Fire storage event to notify other components
  window.dispatchEvent(new Event('app_state_changed'));
  // Sync to database
  syncToDatabase(field, data);
};
