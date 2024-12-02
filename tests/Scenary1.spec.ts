import { test, expect } from '@playwright/test';

test('Buscar un producto válido en Liverpool', async ({ page }) => {
  // Ir a la página de inicio de Liverpool
  await page.goto('https://www.liverpool.com.mx', { timeout: 60000 });

  // Esperar que el campo de búsqueda esté disponible
  await page.waitForSelector('input[placeholder*="Buscar por producto"]', { state: 'attached', timeout: 60000 });

  // Llenar el campo de búsqueda
  await page.fill('input[placeholder*="Buscar por producto"]', 'celular');
  await page.press('input[placeholder*="Buscar por producto"]', 'Enter');

  // Esperar explícitamente a que los resultados estén visibles
  await page.waitForSelector('.o-card__image__container', { state: 'visible', timeout: 60000 });

  // Obtener la cantidad de resultados
  const resultados = await page.locator('.searchNum-result');
  const cantidad = await resultados.count();

  // Verificar que al menos un resultado sea encontrado
  expect(cantidad).toBeGreaterThan(0);  // Asegurarse de que haya al menos un resultado

  await page.pause();
});

test('Verificar mensaje de no hay resultados', async ({ page }) => {
  await page.goto('https://www.liverpool.com.mx');

  // Realizar una búsqueda sin resultados
  await page.fill('input[placeholder*="Buscar por producto"]', 'hgjhghhgcghjhkh');
  await page.press('input[placeholder*="Buscar por producto"]', 'Enter');

  // Esperar y verificar el mensaje de "sin resultados"
  const noResultados = page.locator('.o-content__noResultsNullSearch');
  await page.waitForSelector('.o-content__noResultsNullSearch', { state: 'attached', timeout: 60000 });

  await expect(noResultados).toBeVisible();
  await page.pause();
});

test('Verificar sugerencias automáticas', async ({ page }) => {
  // Navegar al sitio web
  await page.goto('https://www.liverpool.com.mx');

  // Seleccionar el campo de búsqueda e ingresar "zapat"
  await page.fill('input[placeholder*="Buscar por producto"]', 'zapat');

  // Esperar que las sugerencias aparezcan
  const sugerencias = page.locator('.m-header__searchLinkResult');
  await page.waitForSelector('.m-header__searchLinkResult', { state: 'visible', timeout: 10000 });

  // Verificar que haya al menos una sugerencia
  const cantidad = await sugerencias.count();
  expect(cantidad).toBeGreaterThan(0);

  // Verificar que las sugerencias contengan palabras relevantes
  for (let i = 0; i < cantidad; i++) {
    const texto = await sugerencias.nth(i).textContent();
    expect(texto).toMatch(/zapatos|zapatillas/i);
  }

  await page.pause();
});

test('Buscar un producto con filtro', async ({ page }) => {
  // Ir a la página de inicio de Liverpool
  await page.goto('https://www.liverpool.com.mx');

  // Esperar a que el campo de búsqueda esté visible y realizar la búsqueda de un producto
  await page.waitForSelector('input[placeholder*="Buscar por producto"]', { state: 'visible', timeout: 5000 });
  await page.fill('input[placeholder*="Buscar por producto"]', 'tocador');
  await page.press('input[placeholder*="Buscar por producto"]', 'Enter');

  // Esperar a que los resultados de búsqueda estén visibles
  await page.waitForSelector('.o-card__image__container', { state: 'visible', timeout: 10000 });

  // Buscar y hacer clic en el botón por su texto visible
  await page.click('button:has-text("Color")'); 

  // Esperar a que el enlace con el atributo data-color esté visible
  await page.waitForSelector('a[data-color="#ffffff"]', { state: 'visible', timeout: 10000 });

  // Hacer clic en el enlace
  await page.click('a[data-color="#ffffff"]');

  // Esperar a que los productos se filtren según el color seleccionado
  await page.waitForSelector('.o-card__image__container', { state: 'visible', timeout: 10000 });
  await page.pause();
});

test('Buscar con caracteres especiales', async ({ page }) => {
  // Navegar al sitio web
  await page.goto('https://www.liverpool.com.mx');

  // Ingresar caracteres especiales en el campo de búsqueda
  await page.fill('input[placeholder*="Buscar por producto"]', '@#$%^&*');
  await page.press('input[placeholder*="Buscar por producto"]', 'Enter');

  // Verificar el mensaje de resultados no encontrados
  const mensaje = await page.locator('.o-content__noResultsNullSearch');
  await page.waitForSelector('.o-content__noResultsNullSearch', { state: 'visible', timeout: 60000 });

  // Comprobar que el mensaje sea visible
  await expect(mensaje).toBeVisible();

  // Comprobar que el mensaje contiene texto relacionado con "Sin resultados"
  const textoMensaje = await mensaje.textContent();
  expect(textoMensaje).toMatch(/no encontramos|sin resultados/i);

  await page.pause();
});
