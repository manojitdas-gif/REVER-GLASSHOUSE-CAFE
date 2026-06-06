# Helper script to copy the captured screenshots to your local workspace folder
$dest = Join-Path $PSScriptRoot "screenshots"
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
    Write-Host "Created screenshots directory: $dest"
}

$srcDir = "C:\Users\MONOJIT\.gemini\antigravity\brain\f1a84041-fb44-48f3-bc84-8b8ff4357ca9"

$mapping = @{
    "home_hero_1779198298584.png" = "home_hero.png"
    "home_about_1779198307826.png" = "home_about.png"
    "home_dishes_1779198325010.png" = "home_dishes.png"
    "home_reserve_1779198348052.png" = "home_reserve.png"
    "menu_page_1779198368863.png" = "menu_page.png"
    "gallery_page_1779198380408.png" = "gallery_page.png"
    "about_page_1779198393391.png" = "about_page.png"
    "reviews_page_1779198402322.png" = "reviews_page.png"
    "locations_page_1779198411355.png" = "locations_page.png"
    "capture_website_sections_1779198263871.webp" = "website_walkthrough.webp"
}

foreach ($key in $mapping.Keys) {
    $srcFile = Join-Path $srcDir $key
    $destFile = Join-Path $dest $mapping[$key]
    if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination $destFile -Force
        Write-Host "Copied $key to $destFile"
    } else {
        Write-Warning "Source file not found: $srcFile"
    }
}

Write-Host "All screenshots copied successfully to $dest"
