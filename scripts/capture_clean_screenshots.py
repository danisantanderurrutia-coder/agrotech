import os
from playwright.sync_api import sync_playwright

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        )
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        page.goto('http://127.0.0.1:7777/predio/')
        page.wait_for_timeout(4000)

        # Inject CSS to hide all legacy headers, obsolete floating buttons, and old prototype chrome
        page.evaluate("""() => {
            const style = document.createElement('style');
            style.id = 'hide-legacy-chrome';
            style.innerHTML = `
                .app-header,
                #floatingHouseBtn,
                #floatingOrbitCuencaBtn,
                .floating-house-btn,
                #alertBanner,
                .alert-banner,
                #whatsAppAlertModal,
                .btn-info-circle {
                    display: none !important;
                }
                #cesiumContainer {
                    top: 0 !important;
                    height: 100vh !important;
                }
                .side-drawer {
                    top: 0 !important;
                    height: 100vh !important;
                }
                .panel-maestro {
                    top: 16px !important;
                }
            `;
            document.head.appendChild(style);
        }""")
        page.wait_for_timeout(500)

        # 1. House on left + Timeline/Weather panel on right
        page.evaluate("""() => {
            window.mapManager.flyToPreset('house');
            window.uiController.openDrawer();
            window.uiController.expandDrawer();
            const btnWeather = document.getElementById('tab_btn_weather');
            if (btnWeather) btnWeather.click();
        }""")
        page.wait_for_timeout(2500)
        house_path = 'webAgrotech/public/assets/app_screens/predio_house_timeline.jpg'
        page.screenshot(path=house_path, quality=92, type='jpeg')
        print(f"Clean House screenshot saved to {house_path}")

        # 2. Crops / Orchard + Sensors panel on right
        page.evaluate("""() => {
            window.mapManager.flyToPreset('orchard');
            window.uiController.openDrawer();
            window.uiController.expandDrawer();
            const btnSens = document.getElementById('tab_btn_sens');
            if (btnSens) btnSens.click();
            
            const btnAllCards = document.getElementById('btn_sensor_cards_all');
            if (btnAllCards) btnAllCards.click();
        }""")
        page.wait_for_timeout(2500)
        crops_path = 'webAgrotech/public/assets/app_screens/predio_crops_sensors.jpg'
        page.screenshot(path=crops_path, quality=92, type='jpeg')
        print(f"Clean Crops & Sensors screenshot saved to {crops_path}")

        browser.close()

if __name__ == '__main__':
    capture()
