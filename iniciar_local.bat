@echo off
echo ===================================================
echo Iniciando Start-Up-Innovacion (Modo Local)
echo ===================================================
echo.

echo Instalando dependencias del Backend...
cd menu-qr-backend
call npm install
start "Backend (API)" cmd /c "echo Iniciando Backend... && node server.js"
cd ..

echo Instalando dependencias del Frontend (App)...
cd menu-qr-app
call npm install
start "Frontend (Vite)" cmd /c "echo Iniciando Frontend... && npm run dev"
cd ..

echo.
echo ===================================================
echo ¡Todo listo! Se abrieron dos ventanas nuevas.
echo El backend esta corriendo en http://localhost:3001
echo El frontend te mostrara el link de localhost en su ventana.
echo ===================================================
pause
