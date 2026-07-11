import re
import os

html_path = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\dashboard.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update sidebar menu
sidebar_orig = '''<ul class="sidebar-menu">
                <li><a href="#" class="active">📚 Mi Biblioteca</a></li>
                <li><a href="#">📤 Mis Subidas</a></li>
                <li><a href="#">💳 Suscripción</a></li>
                <li><a href="#">⚙️ Configuración</a></li>
            </ul>'''

sidebar_new = '''<ul class="sidebar-menu">
                <li><a href="#" class="active" data-target="sec-biblioteca">📚 Mi Biblioteca</a></li>
                <li><a href="#" data-target="sec-subidas">📤 Mis Subidas</a></li>
                <li><a href="#" data-target="sec-suscripcion">💳 Suscripción</a></li>
                <li><a href="#" data-target="sec-configuracion">⚙️ Configuración</a></li>
            </ul>'''
content = content.replace(sidebar_orig, sidebar_new)

# 2. Wrap main content and add new sections
main_start_orig = '''<main class="dashboard-content">
            <div class="dashboard-header">'''

main_start_new = '''<main class="dashboard-content">
            <section id="sec-biblioteca">
            <div class="dashboard-header">'''
content = content.replace(main_start_orig, main_start_new)

main_end_orig = '''</div>
        </main>'''

main_end_new = '''</div>
            </section>

            <section id="sec-subidas" style="display: none;">
                <div class="dashboard-header">
                    <h1 style="font-size: 2rem;">Mis Subidas</h1>
                    <button class="btn btn-primary" onclick="window.location.href='index.html#subir'">Subir Nuevo Apunte</button>
                </div>
                <div class="glass-card" style="padding: 2rem; text-align: center; color: #94a3b8;">Aún no has subido apuntes.</div>
            </section>

            <section id="sec-suscripcion" style="display: none;">
                <div class="dashboard-header">
                    <h1 style="font-size: 2rem;">Suscripción</h1>
                </div>
                <div class="glass-card" style="padding: 2rem; text-align: center; color: #94a3b8;">Detalles de tu suscripción premium.</div>
            </section>

            <section id="sec-configuracion" style="display: none;">
                <div class="dashboard-header">
                    <h1 style="font-size: 2rem;">Configuración</h1>
                </div>
                <div class="glass-card" style="padding: 2rem; text-align: center; color: #94a3b8;">Ajustes de cuenta.</div>
            </section>
        </main>'''
content = content.replace(main_end_orig, main_end_new)

# 3. Inject JS before </body>
js_logic = '''
    <script>
        const menuLinks = document.querySelectorAll('.sidebar-menu a');
        const sections = document.querySelectorAll('.dashboard-content section');

        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 1. Ocultar todas las secciones
                sections.forEach(sec => sec.style.display = 'none');
                
                // 2. Mostrar solo la sección clickeada
                const targetId = link.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if(targetSection) {
                    targetSection.style.display = 'block';
                }

                // 3. Cambiar visualmente la barra activa
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    </script>
</body>'''
content = content.replace('</body>', js_logic)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated dashboard sections and logic')

