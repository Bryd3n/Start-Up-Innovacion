import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--secondary)', padding: '3rem', borderRadius: '12px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ border: 'none', marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> Volver
        </button>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Políticas de Privacidad y Manejo de Datos</h1>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Última actualización: {new Date().toLocaleDateString()}</p>

        <div style={{ color: '#ccc', lineHeight: '1.6' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>1. Introducción y Alcance</h2>
            <p style={{ marginBottom: '1rem' }}>En MenuQR Express, estamos profundamente comprometidos con la protección de la privacidad y los datos personales de nuestros usuarios. Esta Política de Privacidad describe exhaustivamente cómo recopilamos, utilizamos, almacenamos, protegemos y, en casos específicos, compartimos su información cuando usted utiliza nuestra plataforma web, aplicación de administración y servicios de menú digital.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>2. Información que Recopilamos</h2>
            <p style={{ marginBottom: '0.5rem' }}>Recopilamos dos tipos de información principal:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Información proporcionada por usted:</strong> Incluye los datos introducidos durante el registro (Nombre completo, correo electrónico, contraseña cifrada) y los datos de su restaurante (Nombre comercial, logo, colores de marca, menú, descripciones y precios de platillos).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Información recopilada automáticamente:</strong> Cuando interactúa con la plataforma, nuestros servidores registran automáticamente información técnica, como su dirección IP, tipo de navegador, sistema operativo, páginas visitadas y tiempos de acceso, con el fin de diagnosticar problemas y mejorar la plataforma.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>3. Uso de la Información Recopilada</h2>
            <p style={{ marginBottom: '0.5rem' }}>La información recopilada se utiliza de forma exclusiva para los siguientes fines legítimos:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Provisión del Servicio:</strong> Crear y gestionar su cuenta, verificar su identidad al iniciar sesión y alojar el menú digital de su restaurante.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Comunicación:</strong> Enviar correos electrónicos transaccionales (recuperación de contraseñas, confirmación de cuenta) y notificaciones críticas sobre cambios en el servicio o políticas.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Mejora Continua:</strong> Analizar tendencias de uso y comportamiento agregado para mejorar la interfaz de usuario, velocidad y funcionalidad de MenuQR Express.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>4. Uso de Cookies y Almacenamiento Local (LocalStorage)</h2>
            <p style={{ marginBottom: '1rem' }}>No utilizamos cookies invasivas o de rastreo para publicidad de terceros. Utilizamos exclusivamente tecnologías de "Almacenamiento Local" (LocalStorage y SessionStorage) para guardar tokens de autenticación de forma encriptada en su navegador. Esto es un requisito técnico indispensable para mantener su sesión iniciada de manera segura mientras administra su restaurante. Si desactiva esta función en su navegador, no podrá utilizar el panel de administración.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>5. Protección y Seguridad de los Datos</h2>
            <p style={{ marginBottom: '1rem' }}>Implementamos medidas de seguridad de grado industrial para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción. Las contraseñas de los usuarios no se guardan en texto plano; son procesadas a través de algoritmos de hash criptográfico avanzados (Bcrypt). Todas las comunicaciones entre su navegador y nuestros servidores están cifradas mediante protocolos SSL/TLS (HTTPS).</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>6. Divulgación a Terceros</h2>
            <p style={{ marginBottom: '1rem' }}><strong>MenuQR Express no vende, alquila ni comercializa su información personal.</strong> Solo podemos compartir su información en las siguientes circunstancias excepcionales: (a) Si requerimos el uso de proveedores de infraestructura en la nube (ej. Amazon Web Services) que actúan como encargados de tratamiento bajo estrictos acuerdos de confidencialidad; (b) Si nos vemos obligados legalmente a hacerlo por orden judicial; o (c) Para proteger los derechos legales y la seguridad de MenuQR Express.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>7. Sus Derechos (Acceso, Rectificación y Borrado)</h2>
            <p style={{ marginBottom: '1rem' }}>De acuerdo con las normativas internacionales de protección de datos, usted goza de los siguientes derechos:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Derecho de Acceso y Rectificación:</strong> Puede acceder a sus datos personales y actualizarlos directamente desde la pestaña "Configuración" de su Dashboard.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Derecho al Olvido (Borrado):</strong> Si desea cancelar su cuenta, tiene el derecho a solicitar la eliminación permanente de toda su información personal de nuestros servidores. Puede hacerlo poniéndose en contacto con nuestro equipo de soporte. El borrado será ejecutado en un plazo no mayor a 30 días, salvo obligaciones legales de retención.</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
