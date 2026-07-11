import os

html_path = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\dashboard.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Spotlight CSS
css_injection = '''
        /* Spotlight Effect */
        .spotlight-card {
            position: relative;
            overflow: hidden;
        }
        .spotlight-card::before {
            content: "";
            position: absolute;
            top: var(--y, 0);
            left: var(--x, 0);
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle closest-side, rgba(138, 43, 226, 0.15), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 0;
        }
        .spotlight-card:hover::before {
            opacity: 1;
        }
        .spotlight-card > * {
            position: relative;
            z-index: 1;
        }

        .stat-card .value-green {'''
content = content.replace('.stat-card .value-green {', css_injection)

# 2. Update Stats HTML to include spotlight and the neon chart
stats_old = '''            <div class="stats-grid">
                <div class="stat-card">
                    <h4>Apuntes Guardados</h4>
                    <div class="value">14</div>
                </div>
                <div class="stat-card">
                    <h4>Apuntes Subidos</h4>
                    <div class="value">3</div>
                </div>
                <div class="stat-card">
                    <h4>Ganancias Estimadas</h4>
                    <div class="value value-green">.50</div>
                </div>
            </div>'''

stats_new = '''            <div class="stats-grid">
                <div class="stat-card spotlight-card">
                    <h4>Apuntes Guardados</h4>
                    <div class="value">14</div>
                </div>
                <div class="stat-card spotlight-card">
                    <h4>Apuntes Subidos</h4>
                    <div class="value">3</div>
                </div>
                <div class="stat-card spotlight-card" style="justify-content: space-between; padding-bottom: 1rem;">
                    <div>
                        <h4>Ganancias Estimadas</h4>
                        <div class="value value-green">.50</div>
                    </div>
                    <svg class="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none" style="width: 100%; height: 35px; margin-top: 5px;">
                        <defs>
                            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#00ffff" />
                                <stop offset="100%" stop-color="#8A2BE2" />
                            </linearGradient>
                            <filter id="neonGlow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path d="M0,25 C20,25 30,10 50,15 C70,20 80,5 100,2" fill="none" stroke="url(#neonGradient)" stroke-width="2.5" filter="url(#neonGlow)"/>
                        <path d="M0,25 C20,25 30,10 50,15 C70,20 80,5 100,2" fill="none" stroke="white" stroke-width="1" opacity="0.8"/>
                        <path d="M0,25 C20,25 30,10 50,15 C70,20 80,5 100,2 L100,30 L0,30 Z" fill="url(#neonGradient)" opacity="0.1" />
                    </svg>
                </div>
            </div>'''

content = content.replace(stats_old, stats_new)

# 3. Inject JS Logic
js_old = '''                // 3. Cambiar visualmente la barra activa
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    </script>'''

js_new = '''                // 3. Cambiar visualmente la barra activa
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Spotlight Effect Logic
        const spotlightCards = document.querySelectorAll('.spotlight-card');
        spotlightCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', ${x}px);
                card.style.setProperty('--y', ${y}px);
            });
        });
    </script>'''
content = content.replace(js_old, js_new)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Applied spotlight and neon graph')

