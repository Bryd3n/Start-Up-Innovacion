import os

# --- PATCH DASHBOARD ---
dash_path = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\dashboard.html'
with open(dash_path, 'r', encoding='utf-8') as f:
    dash = f.read()

# Route Guard
guard = '''<title>Dashboard | Plataforma de Apuntes</title>
    <!-- ROUTE GUARD (MOCK FIREBASE) -->
    <script>
        if (!localStorage.getItem('user_session_token')) {
            window.location.replace('index.html');
        }
    </script>'''
dash = dash.replace('<title>Dashboard | Plataforma de Apuntes</title>', guard)

# Logout button
logout_btn = '''                <li><a href="#" data-target="sec-configuracion">⚙️ Configuración</a></li>
                <li style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05);"><a href="#" id="btn-logout" style="color: #ef4444;">🚪 Cerrar Sesión</a></li>'''
dash = dash.replace('<li><a href="#" data-target="sec-configuracion">⚙️ Configuración</a></li>', logout_btn)

# Logout JS
logout_js = '''        // Logout Logic
        const btnLogout = document.getElementById('btn-logout');
        if(btnLogout) {
            btnLogout.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user_session_token');
                window.location.replace('index.html');
            });
        }
    </script>'''
dash = dash.replace('    </script>', logout_js, 1) # Only replace the final script closing tag

with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(dash)

# --- PATCH INDEX ---
index_path = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    index = f.read()

# Change auth logic
old_auth = '''            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                authSubmitBtn.innerText = 'CARGANDO...';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            });'''

new_auth = '''            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                authSubmitBtn.innerText = 'AUTENTICANDO...';
                
                // MOCK DE FIREBASE: Guardar sesión en localStorage
                setTimeout(() => {
                    localStorage.setItem('user_session_token', 'firebase_mock_token_12345');
                    window.location.href = 'dashboard.html';
                }, 1000);
            });

            // Si ya está logueado, cambiar botón del navbar y saltar el modal
            if (localStorage.getItem('user_session_token')) {
                const navBtn = document.getElementById('btn-login-nav');
                if (navBtn) {
                    navBtn.innerText = 'Ir a mi Panel';
                    navBtn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = 'dashboard.html';
                    };
                }
            }'''
index = index.replace(old_auth, new_auth)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index)

print('Patched successfully')

