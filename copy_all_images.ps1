# ============================================================
# Rever Cafe - Copy ALL Images to Project
# Run this ONCE to set up all images for the website
# ============================================================

$currentBrain = "C:\Users\MONOJIT\.gemini\antigravity\brain\e0df4b34-7b5a-410d-9bbe-fcc4db239485"
$oldBrain     = "C:\Users\MONOJIT\.gemini\antigravity\brain\e521b3ef-671f-4b11-ab2c-5fb413a19c40"
$project      = "C:\Users\MONOJIT\Desktop\new\public\images"

# Create directories
New-Item -ItemType Directory -Force "$project\gallery" | Out-Null
New-Item -ItemType Directory -Force "$project\food"    | Out-Null

Write-Host ""
Write-Host "===================================================" -ForegroundColor Magenta
Write-Host "  REVER CAFE — IMAGE SETUP" -ForegroundColor Magenta
Write-Host "===================================================" -ForegroundColor Magenta
Write-Host ""

# ──────────────────────────────────────────────
# GALLERY IMAGES (from current session uploads)
# Order matches the 5 photos you shared:
#  1. media__1779186430414.png  = Fountain + floral balcony (big interior shot)
#  2. media__1779186435934.jpg  = Red French doors (La Prosciutteria)
#  3. media__1779186445776.jpg  = Grand chandelier overhead view
#  4. media__1779186451795.jpg  = Masquerade mask room
#  5. media__1779186458533.jpg  = Evening dining glasshouse full view
# ──────────────────────────────────────────────
Write-Host "Copying GALLERY images..." -ForegroundColor Cyan

$galleryMap = @(
    @{ src = "$currentBrain\media__1779186430414.png"; dst = "$project\gallery\gallery_interior_chandelier.jpg"; label = "Interior chandelier overview" },
    @{ src = "$currentBrain\media__1779186435934.jpg"; dst = "$project\gallery\gallery_red_doors.jpg";           label = "Red French doors" },
    @{ src = "$currentBrain\media__1779186445776.jpg"; dst = "$project\gallery\gallery_chandelier_full.jpg";     label = "Grand chandelier full" },
    @{ src = "$currentBrain\media__1779186451795.jpg"; dst = "$project\gallery\gallery_masquerade.jpg";          label = "Masquerade room" },
    @{ src = "$currentBrain\media__1779186458533.jpg"; dst = "$project\gallery\gallery_evening_dining.jpg";      label = "Evening dining" },
    # Also copy fountain photo as the separate gallery_fountain entry
    @{ src = "$currentBrain\media__1779186430414.png"; dst = "$project\gallery\gallery_fountain.jpg";            label = "Fountain + balcony" }
)

foreach ($item in $galleryMap) {
    if (Test-Path $item.src) {
        Copy-Item $item.src $item.dst -Force
        Write-Host "  OK: $($item.label)" -ForegroundColor Green
    } else {
        Write-Host "  MISSING: $($item.src)" -ForegroundColor Red
    }
}

# ──────────────────────────────────────────────
# FOOD IMAGES (from previous session)
# ──────────────────────────────────────────────
Write-Host ""
Write-Host "Copying FOOD images..." -ForegroundColor Cyan

$foodMap = @(
    @{ src = "$oldBrain\chicken_malai_kabab_1779185293580.png";       dst = "$project\food\chicken_malai_kabab.png";        label = "Chicken Malai Kabab" },
    @{ src = "$oldBrain\thai_pineapple_fried_rice_1779185312427.png"; dst = "$project\food\thai_pineapple_fried_rice.png";  label = "Thai Pineapple Fried Rice" },
    @{ src = "$oldBrain\cold_brew_coffee_1779185328248.png";          dst = "$project\food\cold_brew_coffee.png";           label = "Cold Brew Coffee" },
    @{ src = "$oldBrain\nolen_gur_iced_coffee_1779185360022.png";     dst = "$project\food\nolen_gur_iced_coffee.png";      label = "Nolen Gur Iced Coffee" },
    @{ src = "$oldBrain\crab_california_sushi_1779185376852.png";     dst = "$project\food\crab_california_sushi.png";      label = "Crab California Sushi" },
    @{ src = "$oldBrain\smoked_lamb_croquette_1779185395480.png";     dst = "$project\food\smoked_lamb_croquette.png";      label = "Smoked Lamb Croquette" },
    @{ src = "$oldBrain\green_thai_curry_1779185420096.png";          dst = "$project\food\green_thai_curry.png";           label = "Green Thai Curry" },
    @{ src = "$oldBrain\clarified_orange_latte_1779185437153.png";    dst = "$project\food\clarified_orange_latte.png";     label = "Clarified Orange Latte" },
    @{ src = "$oldBrain\espresso_coffee_1779185452990.png";           dst = "$project\food\espresso_coffee.png";            label = "Espresso Coffee" },
    @{ src = "$oldBrain\nachos_diablo_1779185477259.png";             dst = "$project\food\nachos_diablo.png";              label = "Nachos Diablo" },
    @{ src = "$oldBrain\katsu_curry_chicken_1779185492666.png";       dst = "$project\food\katsu_curry_chicken.png";        label = "Katsu Curry Chicken" },
    @{ src = "$oldBrain\butter_garlic_prawn_1779185508025.png";       dst = "$project\food\butter_garlic_prawn.png";        label = "Butter Garlic Prawn" }
)

foreach ($item in $foodMap) {
    if (Test-Path $item.src) {
        Copy-Item $item.src $item.dst -Force
        Write-Host "  OK: $($item.label)" -ForegroundColor Green
    } else {
        Write-Host "  MISSING: $($item.label)" -ForegroundColor Red
    }
}

# ──────────────────────────────────────────────
# SUMMARY
# ──────────────────────────────────────────────
Write-Host ""
Write-Host "===================================================" -ForegroundColor Yellow
Write-Host "  ALL IMAGES COPIED!" -ForegroundColor Green
Write-Host ""
Write-Host "  Gallery: $project\gallery\" -ForegroundColor Cyan
Write-Host "  Food:    $project\food\" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Next: npm run dev" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Yellow
Write-Host ""
