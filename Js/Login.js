document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Limpiar mensajes previos
    errorMessage.textContent = '';

    // === SIMULACIÓN DE LOGICA LOCAL ===
    // Reemplaza esto cuando tengas tu backend conectado
    const mockUser = "admin";
    const mockPass = "123456";

    const mockUserC = "calaborador";
    const mockPassC = "123456";


    if (usernameInput === mockUser && passwordInput === mockPass) {
        alert('Login successful! Redirecting to user...');
        // Aquí redireccionas a la vista de tu inventario
           window.location.href = '/dashboard.html'; 

    }else if(usernameInput === mockUserC && passwordInput === mockPassC){
           window.location.href = '/user-portal.html'; 
    }else {
        errorMessage.textContent = 'Invalid username or password. Please try again.';
    }

    /* 
    === CUANDO CONECTES TU REPOSITORIO / BACKEND POSTGRES ===
    Descomenta este bloque y borra la simulación de arriba:

    try {
        const response = await fetch('http://tu-api.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Guardar sesión
            window.location.href = '/dashboard.html';
        } else {
            errorMessage.textContent = data.message || 'Authentication failed.';
        }
    } catch (error) {
        errorMessage.textContent = 'Server error. Please try again later.';
    }
    */
});
