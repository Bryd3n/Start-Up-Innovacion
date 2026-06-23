from gtts import gTTS
import os

texto = "Hola profesor. Como grupo hemos planteado nuestra idea de Startup llamada Menú Q R Express. Es un Software como Servicio enfocado en digitalizar pequeños negocios gastronómicos. Notamos que los carritos de comida y cafeterías de barrio no tienen presupuesto para hacer un menú online. Con nuestra plataforma, el dueño entra a la web, llena un formulario simple con sus platos y precios, y el sistema genera automáticamente un PDF con un código Q R listo para imprimir y pegar en la mesa. Es una Startup porque es altamente escalable: el software sirve igual para un local o para diez mil sin aumentar nuestros costos operativos. El modelo de negocio es Freemium: es gratis generar un menú de solo texto, y cobramos una suscripción mensual de 5 dólares si el negocio quiere subir fotos de sus platos y poner su logo. Quedamos atentos a su retroalimentación."

tts = gTTS(text=texto, lang='es', tld='com.mx')
tts.save("C:/Users/bc151/OneDrive/Documents/GitHub/Start-Up Innovacion/adapters/pitch_video/audio_whatsapp_MenuQR_Mejorado.mp3")
print("Audio mejorado generado con éxito.")
