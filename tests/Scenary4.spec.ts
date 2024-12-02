import { test, expect } from '@playwright/test';

test.describe('Escenario 4: Cuenta de usuario', () => {
  // Prueba 1: Inicio de sesión con credenciales válidas
  test('Inicio de sesión exitoso', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home?gad_source=1&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifgIIcWrwCkpuc-D0RBd_Nj2etv-9GG-EoZuzv8EhsAwWgDGiOEd2jAaArvaEALw_wcB&gclsrc=aw.ds');
    await page.click('span.a-header__topLink:has-text("Iniciar sesión")');
    await page.fill('input[name="username"]', 'michelle.zat28@gmail.com');
    await page.fill('input[name="password"]', 'Caza2809');
    await page.click('button[type="submit"]');

        // Pausar para ingresar el código manualmente
        console.log('Por favor ingresa el código de verificación manualmente.');
        await page.pause();
    
    await page.click('button[type="submit"]'); // Ajusta si es necesario enviar el código
    await page.waitForNavigation();
    await page.goto('https://www.liverpool.com.mx/tienda/users/myAccount');

    await page.pause();
  });

  // Prueba 2: Inicio de sesión fallido
  test('Inicio de sesión fallido', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home?gad_source=1&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifgIIcWrwCkpuc-D0RBd_Nj2etv-9GG-EoZuzv8EhsAwWgDGiOEd2jAaArvaEALw_wcB&gclsrc=aw.ds');
    await page.click('span.a-header__topLink:has-text("Iniciar sesión")');
    await page.fill('input[name="username"]', 'correo.invalido@example.com');
    await page.fill('input[name="password"]', 'ContrasenaIncorrecta123');
    await page.click('button[type="submit"]');
    const errorMessage = page.locator('div.error-message:has-text("Credenciales incorrectas")');
    await expect(errorMessage).toBeVisible();

    await page.pause();
  });

  // Prueba 3: Recuperación de contraseña
  test('Recuperación de contraseña', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home?gad_source=1&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifgIIcWrwCkpuc-D0RBd_Nj2etv-9GG-EoZuzv8EhsAwWgDGiOEd2jAaArvaEALw_wcB&gclsrc=aw.ds');
    await page.click('span.a-header__topLink:has-text("Iniciar sesión")');
    await page.click('a:has-text("¿Olvidaste tu contraseña?")');
    await page.fill('input[name="email"]', 'correo.valido@example.com');
    await page.click('button:has-text("Enviar")');
    const successMessage = page.locator('div.success-message:has-text("Correo enviado exitosamente")');
    await expect(successMessage).toBeVisible();

    await page.pause();
  });

  // Prueba 4: Historial de pedidos
  test('Historial de pedidos', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home?gad_source=1&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifgIIcWrwCkpuc-D0RBd_Nj2etv-9GG-EoZuzv8EhsAwWgDGiOEd2jAaArvaEALw_wcB&gclsrc=aw.ds');
    await page.click('span.a-header__topLink:has-text("Iniciar sesión")');
    await page.fill('input[name="username"]', 'michelle.zat28@gmail.com');
    await page.fill('input[name="password"]', 'Caza2809');
    await page.click('button[type="submit"]');

        // Pausar para ingresar el código manualmente
        console.log('Por favor ingresa el código de verificación manualmente.');
        await page.pause();
    
    await page.click('button[type="submit"]'); // Ajusta si es necesario enviar el código
    await page.waitForNavigation();
    await page.goto('https://www.liverpool.com.mx/tienda/users/miscompras');

    await page.pause();
  });

  // Prueba 5: Actualización de perfil
  test('Actualización de perfil', async ({ page }) => {
    await page.goto('https://www.liverpool.com.mx/tienda/home?gad_source=1&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifgIIcWrwCkpuc-D0RBd_Nj2etv-9GG-EoZuzv8EhsAwWgDGiOEd2jAaArvaEALw_wcB&gclsrc=aw.ds');
    await page.click('span.a-header__topLink:has-text("Iniciar sesión")');
    await page.fill('input[name="username"]', 'michelle.zat28@gmail.com');
    await page.fill('input[name="password"]', 'Caza2809');
    await page.click('button[type="submit"]');

        // Pausar para ingresar el código manualmente
        console.log('Por favor ingresa el código de verificación manualmente.');
        await page.pause();
    
    await page.click('button[type="submit"]'); // Ajusta si es necesario enviar el código
    await page.waitForNavigation();
    await page.goto('https://www.liverpool.com.mx/tienda/users/myAccount');
    await page.fill('input[name="name"]', 'Nuevo Nombre');
    await page.fill('input[name="address"]', 'Nueva Dirección 123');
    await page.click('button:has-text("Guardar cambios")');
    const successMessage = page.locator('div.success-message:has-text("Perfil actualizado correctamente")');
    await expect(successMessage).toBeVisible();

    await page.pause();
  });
});