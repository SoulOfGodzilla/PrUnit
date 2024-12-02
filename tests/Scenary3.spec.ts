import { test, expect } from '@playwright/test';

test('Proceso de compra en Liverpool', async ({ page }) => {
  // Aumentar el tiempo de espera predeterminado
  test.setTimeout(600000); // 10 minutos

  // Navegar a la página principal
  await page.goto('https://www.liverpool.com.mx/tienda/home');

  // Hacer clic en "Iniciar sesión"
  await page.click('span.a-header__topLink:has-text("Iniciar sesión")');

  // Llenar el campo de email
  await page.fill('input[name="username"]', 'epicmimikyu@gmail.com');

  // Llenar el campo de contraseña
  await page.fill('input[name="password"]', 'Al121212');

  // Enviar el formulario de inicio de sesión
  await page.click('button[type="submit"]');

  // Esperar a que el usuario ingrese el código de verificación manualmente
  await page.waitForSelector('input[name="code"]');
  console.log('Por favor, ingresa el código de verificación manualmente y haz clic en "Continuar".');

  // Esperar a que el usuario haga clic en "Continuar"
  await page.waitForSelector('button[type="submit"][name="action"][value="default"]', { timeout: 300000 }); // 5 minutos

  // Redirigir a la pantalla principal después de iniciar sesión
  await page.waitForNavigation();
  await page.goto('https://www.liverpool.com.mx/tienda/home');

  // Buscar el producto utilizando el código
  await page.fill('input#mainSearchbar', '1158881141');
  await page.press('input#mainSearchbar', 'Enter');

  // Esperar a que la página del producto cargue
  await page.waitForSelector('#opc_pdp_addCartButton', { visible: true });

  // Hacer clic en "Agregar a mi bolsa"
  await page.click('#opc_pdp_addCartButton');

  // Esperar que el producto se agregue al carrito
  await page.waitForTimeout(2000); // Esperar 2 segundos por si hay animación o proceso de agregar al carrito

  // Ir a la página del carrito
  await page.goto('https://www.liverpool.com.mx/tienda/cart');

  // Hacer clic en "Comprar"
  await page.click('.a-product__buttonBuy');

  // Esperar a que redirija al checkout
  await page.waitForNavigation({ waitUntil: 'load' });

  // Asegurarse de que estamos en la página de checkout
  await expect(page.url()).toContain('/tienda/oneCheckout');

  // Seleccionar método de entrega "Click & Collect"
  await page.click('#opc_addressCCButton');

  // Esperar a que el formulario de dirección cargue
  await page.waitForSelector('#opc_selectCC', { visible: true });

  // Seleccionar forma de pago "Tarjetas / Monedero"
  await page.click('#opc_selectCC');

  // Esperar a que el formulario de pago cargue
  await page.waitForSelector('input[name="nickName"]', { visible: true });

  // Rellenar alias de tarjeta
  await page.fill('input[name="nickName"]', 'Mi Tarjeta');

  // Rellenar número de tarjeta
  await page.fill('input[name="cardNumber"]', '4111111111111111');

  // Rellenar fecha de vencimiento
  await page.fill('input[name="cardExp"]', '12/25');

  // Rellenar código de seguridad
  await page.fill('input[name="cvv"]', '123');

  // Dirigir a la pantalla del cupón
  await page.click('.breakdown-expenses__coupons_button');

  // Rellenar campo para agregar cupón
  await page.fill('input[name="promotionCode"]', 'POCKETMENOS5');

  // Hacer clic en "Aplicar"
  await page.click('.a_myBag__btnApply');

  // Aquí termina el script ya que no se puede simular la aplicación del cupón y la finalización de la compra
  console.log('Cupón aplicado y datos de pago ingresados. Por favor, continúa manualmente para finalizar la compra.');
});