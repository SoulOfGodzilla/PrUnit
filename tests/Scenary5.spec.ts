import { test, expect } from '@playwright/test';

test.describe('Escenario 5: Navegación y experiencia del usuario', () => {

  test('Menú de categorías', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home');
    await page.click('span.a-header__strongLink.nav-desktop-menu-action.pr-3.pb-3');
    await page.click('a[href="/tienda/mujer/catst4003072"]');
    await expect(page).toHaveURL('https://www.liverpool.com.mx/tienda/mujer/catst4003072');
    await page.click('span.a-header__strongLink.nav-desktop-menu-action.pr-3.pb-3');
    await page.click('a[href="/tienda/electrónica/cat5150041"]');
    await expect(page).toHaveURL('https://www.liverpool.com.mx/tienda/electrónica/cat5150041');
  });

  test('Responsive design', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home');
    await page.setViewportSize({ width: 375, height: 667 }); // Simula un dispositivo móvil
    await expect(page.locator('button.a-header__hamburger.mobile-menu-action.p-0')).toBeVisible();
  });

  test('Cambio de imagen en el carrusel de banners', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home', { timeout: 80000 }); // Aumenta el tiempo de espera a 80 segundos
    const carusel = page.locator('img.image_banners_container').first();
    await expect(carusel).toBeVisible();
    
    // Obtener el src de la imagen actual
    const initialSrc = await carusel.getAttribute('src');
    console.log('Initial image src:', initialSrc);
    
    // Verificar que la imagen inicial es una de las esperadas
    expect(["https://assetspwa.liverpool.com.mx/assets/digital/home/img/nov24/bc_AO_Maquillaje_301124_1.jpg"]).toContain(initialSrc);
    
    // Hacer clic en la flecha para cambiar el banner
    await page.click('div.slick-arrow.slick-next.icon-arrow_right');
    await page.waitForTimeout(2000); // Espera 2 segundos
    
    // Obtener el src de la nueva imagen
    const newSrc = await page.locator('img.image_banners_container').first().getAttribute('src');
    console.log('New image src:', newSrc);
    
    // Verificar que la imagen haya cambiado a la otra esperada
    const expectedNewSrc = initialSrc === 'https://assetspwa.liverpool.com.mx/assets/digital/home/img/nov24/bc_AO_Fragancias_301124_m.jpg'
        ? 'https://assetspwa.liverpool.com.mx/assets/digital/home/img/nov24/bc_AO_Maquillaje_301124_1.jpg'
        : 'https://assetspwa.liverpool.com.mx/assets/digital/home/img/nov24/bc_AO_Fragancias_301124_m.jpg';
    
    expect(newSrc).toBe(expectedNewSrc);
  });

  test('Carga rápida', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://www.liverpool.com.mx/tienda/home');
    const loadTime = Date.now() - startTime;
    console.log('Load time:', loadTime); // Verifica que loadTime sea un número
    expect(loadTime).toBeLessThan(10000); // Ajusta el tiempo de carga esperado a 10 segundos
  });

  test('Manejo de errores 404', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/url-inexistente');
    await expect(page.locator('img.img_urlBreak')).toBeVisible(); // Verifica la visibilidad de la imagen de error 404
  });

});