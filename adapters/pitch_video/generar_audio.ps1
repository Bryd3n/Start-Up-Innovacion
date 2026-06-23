Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Intentar seleccionar una voz en español si está disponible en Windows
$voices = $synth.GetInstalledVoices()
foreach ($voice in $voices) {
    if ($voice.VoiceInfo.Culture.Name -like "es-*") {
        $synth.SelectVoice($voice.VoiceInfo.Name)
        break
    }
}

# Configurar archivo de salida
$outPath = "C:\Users\bc151\OneDrive\Documents\GitHub\Start-Up Innovacion\adapters\pitch_video\audio_whatsapp_MenuQR.wav"
$synth.SetOutputToWaveFile($outPath)

# El texto a leer
$texto = "Hola profesor. Como grupo hemos planteado nuestra idea de Startup llamada Menu QR Express. Es un Software como Servicio enfocado en digitalizar pequeños negocios gastronómicos. Notamos que los carritos de comida y cafeterías de barrio no tienen presupuesto para hacer un menú online. Con nuestra plataforma, el dueño entra a la web, llena un formulario simple con sus platos y precios, y el sistema genera automáticamente un PDF con un código QR listo para imprimir y pegar en la mesa. Es una Startup porque es altamente escalable: el software sirve igual para un local o para diez mil sin aumentar nuestros costos operativos. El modelo de negocio es Freemium: es gratis generar un menú de solo texto, y cobramos una suscripción mensual de 5 dólares si el negocio quiere subir fotos de sus platos y poner su logo. Quedamos atentos a su retroalimentación."

# Generar el audio
$synth.Speak($texto)
$synth.Dispose()

Write-Output "Archivo de audio generado exitosamente en: $outPath"
