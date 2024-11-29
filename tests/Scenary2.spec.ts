import { test, expect } from '@playwright/test';

test.describe('Escenario 2: Agregar productos al carrito', () => {
  test('Agregar un producto', async ({ page }) => {
    // Navegar al producto
    await page.goto('https://www.liverpool.com.mx/tienda/pdp/playera-tipo-polo-regent-street-para-hombre/1145589536?skuid=1145589581');
    // Seleccionar color
    await page.click('a[data-skuid="1145589581"]');
    // Esperar a que el botón de agregar sea visible
    await page.waitForSelector('button:has-text("Agregar a mi bolsa")', { state: 'visible' });
    // Asegurar que el botón es visible y habilitado
    const botonAgregar = await page.isVisible('button:has-text("Agregar a mi bolsa")') && await page.isEnabled('button:has-text("Agregar a mi bolsa")');
    if (botonAgregar) {
      // Agregar al carrito
      await page.click('button:has-text("Agregar a mi bolsa")');
      // Verificar que aparezca en la vista del carrito
      const mensajeExito = await page.isVisible('div:has-text("Agregaste un producto a tu bolsa")');
      expect(mensajeExito).toBeTruthy();
    } else {
      throw new Error('El botón "Agregar a mi bolsa" no está visible o habilitado.');
    }
  });

  test('Cambiar cantidad', async ({ page }) => {
    // Navegar al carrito
    await page.click('button.a-header__profile');
    // Esperar a que el botón de aumentar cantidad sea visible
    await page.waitForSelector('button.a-btn.a-btn--qty-OCP.btn-qty.-add', { state: 'visible' });
    // Asegurar que el botón es visible y habilitado
    const botonAumentar = await page.isVisible('button.a-btn.a-btn--qty-OCP.btn-qty.-add') && await page.isEnabled('button.a-btn.a-btn--qty-OCP.btn-qty.-add');
    if (botonAumentar) {
      // Aumentar la cantidad de un producto
      await page.click('button.a-btn.a-btn--qty-OCP.btn-qty.-add');
      // Verificar que el total se actualice correctamente (debes ajustar este selector)
      // const totalActualizado = await page.textContent('selector-del-total');
      // expect(totalActualizado).toBe('TOTAL_ESPERADO');
    } else {
      throw new Error('El botón "a-btn a-btn--qty-OCP btn-qty -add" no está visible o habilitado.');
    }
  });

  test('Eliminar del carrito', async ({ page }) => {
    // Navegar al carrito
    await page.click('button.a-header__profile');
    // Esperar a que el icono de eliminar sea visible
    await page.waitForSelector('img[src="https://assetspwa.liverpool.com.mx/static/images/icons/icon-trash.svg"]', { state: 'visible' });
    // Asegurar que el icono es visible y habilitado
    const iconoEliminar = await page.isVisible('img[src="https://assetspwa.liverpool.com.mx/static/images/icons/icon-trash.svg"]') && await page.isEnabled('img[src="https://assetspwa.liverpool.com.mx/static/images/icons/icon-trash.svg"]');
    if (iconoEliminar) {
      // Eliminar un producto del carrito
      await page.click('img[src="https://assetspwa.liverpool.com.mx/static/images/icons/icon-trash.svg"]');
      // Verificar que desaparezca de la lista
      const mensajeEliminado = await page.isVisible('div:has-text("Se eliminaron artículos de tu bolsa.")');
      expect(mensajeEliminado).toBeTruthy();
    } else {
      throw new Error('El icono de eliminar no está visible o habilitado.');
    }
  });

  test('Producto agotado', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/pdp/rifle-mendoza-calibre-5.5/1167472377?skuid=1167472377'); // Reemplaza con la URL del producto agotado que encontraste
    // Esperar a que el botón de agregar sea visible
    await page.waitForSelector('button:has-text("Agregar a mi bolsa")', { state: 'visible' });
    // Intentar agregar al carrito un producto marcado como "agotado"
    await page.click('button:has-text("Agregar a mi bolsa")');
    // Verificar que no sea posible (puedes adaptar según el mensaje de error que aparezca)
    const mensajeDeError = await page.textContent('selector-del-mensaje-de-error');
    expect(mensajeDeError).toBe('Producto agotado');
  });

  test('Persistencia del carrito', async ({ page, context }) => {
    // Agregar productos al carrito
    await page.goto('https://www.liverpool.com.mx/tienda/pdp/playera-tipo-polo-regent-street-para-hombre/1145589536?skuid=1145589581');
    // Esperar a que el botón de agregar sea visible
    await page.waitForSelector('button:has-text("Agregar a mi bolsa")', { state: 'visible' });
    // Asegurar que el botón es visible y habilitado
    const botonAgregar = await page.isVisible('button:has-text("Agregar a mi bolsa")') && await page.isEnabled('button:has-text("Agregar a mi bolsa")');
    if (botonAgregar) {
      await page.click('button:has-text("Agregar a mi bolsa")');
      // Guardar el estado de la sesión
      await context.storageState({ path: 'state.json' });
      // Cerrar y volver a abrir el navegador
      await context.clearCookies();
      await context.newPage();
      await context.storageState({ path: 'state.json' });
      await page.goto('https://www.liverpool.com.mx/tienda/cart'); // Reemplaza con la URL del carrito
      // Verificar que los productos sigan ahí
      const productoEnCarrito = await page.isVisible('selector-del-producto-en-carrito');
      expect(productoEnCarrito).toBeTruthy();
    } else {
      throw new Error('El botón "Agregar a mi bolsa" no está visible o habilitado.');
    }
  });
});
