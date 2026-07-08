import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--secondary)', padding: '3rem', borderRadius: '12px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ border: 'none', marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> Volver
        </button>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Términos y Condiciones de Servicio</h1>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Última actualización: {new Date().toLocaleDateString()}</p>

        <div style={{ color: '#ccc', lineHeight: '1.6' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>1. Aceptación de los Términos</h2>
            <p style={{ marginBottom: '1rem' }}>Al acceder, navegar o utilizar la plataforma MenuQR Express (en adelante, "la Plataforma", "nosotros", o "nuestro"), usted (el "Usuario", "Cliente" o "Establecimiento") acepta estar sujeto a estos Términos y Condiciones de Servicio en su totalidad. Si no está de acuerdo con alguno de los términos o condiciones aquí establecidos, debe abstenerse de utilizar nuestros servicios inmediatamente. Este documento constituye un contrato legalmente vinculante entre usted y MenuQR Express.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>2. Descripción del Servicio y Licencia de Uso</h2>
            <p style={{ marginBottom: '1rem' }}>MenuQR Express proporciona a los establecimientos gastronómicos una solución de Software as a Service (SaaS) que permite la creación, gestión y publicación de menús digitales accesibles a través de códigos QR. Sujetos a su cumplimiento continuo de estos Términos, le otorgamos una licencia limitada, no exclusiva, intransferible y revocable para acceder y utilizar la Plataforma estrictamente para sus operaciones comerciales internas.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>3. Obligaciones y Responsabilidades del Usuario</h2>
            <p style={{ marginBottom: '0.5rem' }}>Al crear una cuenta, usted garantiza y acepta que:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Proporcionará información veraz, precisa, actual y completa sobre usted y su negocio.</li>
              <li style={{ marginBottom: '0.5rem' }}>Mantendrá la estricta confidencialidad de sus credenciales de acceso. Cualquier actividad realizada bajo su cuenta es de su absoluta responsabilidad.</li>
              <li style={{ marginBottom: '0.5rem' }}>Notificará inmediatamente a MenuQR Express sobre cualquier uso no autorizado de su cuenta o cualquier brecha de seguridad.</li>
              <li style={{ marginBottom: '0.5rem' }}>No utilizará la plataforma para propósitos ilegales, fraudulentos, o para subir contenido que promueva el odio, la violencia, o que infrinja derechos de propiedad intelectual de terceros.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>4. Propiedad Intelectual y Contenido del Usuario</h2>
            <p style={{ marginBottom: '1rem' }}>MenuQR Express no reclama la propiedad de las imágenes, descripciones de platillos, logotipos ni marcas registradas que usted suba a la Plataforma ("Contenido del Usuario"). Sin embargo, al subir dicho contenido, usted nos otorga una licencia mundial, libre de regalías, no exclusiva para alojar, mostrar y procesar dicho contenido exclusivamente con el fin de proveerle el servicio. Toda la infraestructura, código fuente, diseño de interfaz y la marca MenuQR Express son propiedad exclusiva nuestra y están protegidos por leyes de derechos de autor.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>5. Pagos, Facturación y Reembolsos (Suscripciones)</h2>
            <p style={{ marginBottom: '1rem' }}>En caso de optar por un plan de pago (Premium/Pro), usted acepta pagar las tarifas correspondientes estipuladas al momento de la suscripción. Los pagos se procesan de manera anticipada (mensual o anualmente). Salvo que la ley exija lo contrario, todas las compras son definitivas y no se emitirán reembolsos por períodos de facturación parcialmente utilizados. Nos reservamos el derecho de modificar nuestras tarifas con un aviso previo mínimo de 30 días.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>6. Disponibilidad del Servicio y Limitación de Responsabilidad</h2>
            <p style={{ marginBottom: '1rem' }}>Nos esforzamos por asegurar un tiempo de actividad (uptime) del 99.9%. No obstante, la Plataforma se proporciona "tal cual" y "según disponibilidad". MenuQR Express, sus directores, empleados o afiliados NO SERÁN RESPONSABLES bajo ninguna circunstancia por:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Cualquier lucro cesante, pérdida de ventas, pérdida de clientela o interrupción del negocio.</li>
              <li style={{ marginBottom: '0.5rem' }}>Pérdida de datos debido a fallas en los servidores, ciberataques o desastres naturales.</li>
              <li style={{ marginBottom: '0.5rem' }}>Cualquier daño indirecto, incidental o consecuente derivado del uso o imposibilidad de usar la Plataforma.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>7. Modificaciones a los Términos</h2>
            <p style={{ marginBottom: '1rem' }}>MenuQR Express se reserva el derecho de modificar o reemplazar estos Términos en cualquier momento. Si realizamos cambios materiales, publicaremos una notificación destacada en el Dashboard o enviaremos un correo electrónico a los usuarios registrados. Su uso continuado del servicio tras la publicación de cambios constituye la aceptación de los nuevos términos.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>8. Ley Aplicable y Resolución de Disputas</h2>
            <p style={{ marginBottom: '1rem' }}>Estos Términos se regirán e interpretarán de acuerdo con las leyes del país de registro de la empresa, sin dar efecto a ningún principio de conflictos de leyes. Cualquier disputa que surja en relación con la plataforma se someterá exclusivamente a la jurisdicción de los tribunales competentes en nuestra sede principal.</p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Terms;
