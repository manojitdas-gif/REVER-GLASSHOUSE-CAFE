# ============================================================
# Rever Cafe - Copy Images to Project
# Double-click this file OR right-click > "Run with PowerShell"
# ============================================================

$brain = "C:\Users\MONOJIT\.gemini\antigravity\brain\e521b3ef-671f-4b11-ab2c-5fb413a19c40"
$project = "C:\Users\MONOJIT\Desktop\new\public\images"

# Create directories
New-Item -ItemType Directory -Force "$project\gallery" | Out-Null
New-Item -ItemType Directory -Force "$project\food" | Out-Null

Write-Host "Copying gallery (cafe interior) photos..." -ForegroundColor Cyan

# --- GALLERY IMAGES (your cafe photos - rename to match) ---
# Map your cafe photo files to gallery names
# If you have the original photos, copy them here with these names:
# gallery_fountain.jpg        = the fountain + floral balcony photo
# gallery_red_doors.jpg       = the red French doors photo  
# gallery_chandelier_full.jpg = the interior with chandelier overhead view
# gallery_masquerade.jpg      = the masquerade mask room
# gallery_evening_dining.jpg  = the evening dining glasshouse full view

Write-Host ""
Write-Host "Copying food images..." -ForegroundColor Cyan

$foodMap = @{
    "chicken_malai_kabab_1779185293580.png"    = "chicken_malai_kabab.png"
    "thai_pineapple_fried_rice_1779185312427.png" = "thai_pineapple_fried_rice.png"
    "cold_brew_coffee_1779185328248.png"        = "cold_brew_coffee.png"
    "nolen_gur_iced_coffee_1779185360022.png"   = "nolen_gur_iced_coffee.png"
    "crab_california_sushi_1779185376852.png"   = "crab_california_sushi.png"
    "smoked_lamb_croquette_1779185395480.png"   = "smoked_lamb_croquette.png"
    "green_thai_curry_1779185420096.png"        = "green_thai_curry.png"
    "clarified_orange_latte_1779185437153.png"  = "clarified_orange_latte.png"
    "espresso_coffee_1779185452990.png"         = "espresso_coffee.png"
    "nachos_diablo_1779185477259.png"           = "nachos_diablo.png"
    "katsu_curry_chicken_1779185492666.png"     = "katsu_curry_chicken.png"
    "butter_garlic_prawn_1779185508025.png"     = "butter_garlic_prawn.png"
}

foreach ($src in $foodMap.Keys) {
    $srcPath = Join-Path $brain $src
    $dstPath = Join-Path "$project\food" $foodMap[$src]
    if (Test-Path $srcPath) {
        Copy-Item $srcPath $dstPath -Force
        Write-Host "  OK: $($foodMap[$src])" -ForegroundColor Green
    } else {
        Write-Host "  MISSING: $src" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=============================" -ForegroundColor Yellow
Write-Host "Food images copied!" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEP - Copy your 5 cafe photos manually:" -ForegroundColor Yellow
Write-Host "  From your phone/downloads, rename and copy to:" -ForegroundColor White
Write-Host "  C:\Users\MONOJIT\Desktop\new\public\images\gallery\" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Photo 1 (fountain + balcony)     -> gallery_fountain.jpg" -ForegroundColor White
Write-Host "  Photo 2 (red French doors)       -> gallery_red_doors.jpg" -ForegroundColor White
Write-Host "  Photo 3 (chandelier overhead)    -> gallery_chandelier_full.jpg" -ForegroundColor White
Write-Host "  Photo 4 (masquerade mask room)   -> gallery_masquerade.jpg" -ForegroundColor White
Write-Host "  Photo 5 (evening full glasshouse)-> gallery_evening_dining.jpg" -ForegroundColor White
Write-Host ""
Write-Host "Then run: npm install && npm run dev" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Yellow

Read-Host "Press Enter to close"
