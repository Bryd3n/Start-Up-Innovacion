import re
import os

html_path = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace login button
content = content.replace('<a href="#unirse" class="btn btn-primary" style="white-space: nowrap; font-size: 14px; padding: 8px 16px; width: auto; height: auto; aspect-ratio: unset;">Iniciar Sesión</a>', '<a href="#" id="btn-login-nav" class="btn btn-primary" style="white-space: nowrap; font-size: 14px; padding: 8px 16px; width: auto; height: auto; aspect-ratio: unset;">Iniciar Sesión</a>')

# 2. Insert Auth Modal before <script>
auth_modal_html = '''
    <!-- Auth Modal (Login/Register) -->
    <div class="modal-overlay" id="auth-modal">
        <div class="modal-content glass-card" style="max-width: 400px; padding: 2.5rem;">
            <button class="close-modal" id="close-auth">×</button>
            <div class="auth-header">
                <div class="auth-switch">
                    <button class="auth-switch-btn active" id="btn-tab-login">Entrar</button>
                    <button class="auth-switch-btn" id="btn-tab-register">Crear Cuenta</button>
                </div>
            </div>
            
            <form id="auth-form" class="upload-form">
                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" class="premium-input" placeholder="estudiante@universidad.edu" required>
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" class="premium-input" placeholder="••••••••" required>
                </div>
                
                <button type="submit" class="btn btn-primary btn-pulse-dynamic" style="width: 100%; border-radius: 12px; margin-top: 1rem;" id="auth-submit-btn">INICIAR SESIÓN</button>
                
                <div class="auth-divider">
                    <span>o</span>
                </div>
                
                <button type="button" class="btn social-login-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Continuar con Google
                </button>
            </form>
        </div>
    </div>

    <script>'''
content = content.replace('    <script>', auth_modal_html)

# 3. Insert JS before </script>
auth_js = '''
        // Auth Modal Logic
        const authModal = document.getElementById('auth-modal');
        const btnLoginNav = document.getElementById('btn-login-nav');
        const closeAuth = document.getElementById('close-auth');
        const btnTabLogin = document.getElementById('btn-tab-login');
        const btnTabRegister = document.getElementById('btn-tab-register');
        const authSubmitBtn = document.getElementById('auth-submit-btn');
        const authForm = document.getElementById('auth-form');

        if (authModal && btnLoginNav) {
            btnLoginNav.addEventListener('click', (e) => {
                e.preventDefault();
                authModal.style.display = 'flex';
            });

            closeAuth.addEventListener('click', () => {
                authModal.style.display = 'none';
            });

            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) {
                    authModal.style.display = 'none';
                }
            });

            btnTabLogin.addEventListener('click', () => {
                btnTabLogin.classList.add('active');
                btnTabRegister.classList.remove('active');
                authSubmitBtn.innerText = 'INICIAR SESIÓN';
            });

            btnTabRegister.addEventListener('click', () => {
                btnTabRegister.classList.add('active');
                btnTabLogin.classList.remove('active');
                authSubmitBtn.innerText = 'CREAR CUENTA';
            });

            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                authSubmitBtn.innerText = 'CARGANDO...';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            });
        }

    </script>'''
content = content.replace('    </script>', auth_js)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated auth modal logic')

