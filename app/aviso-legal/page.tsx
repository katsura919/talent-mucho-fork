import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal | Talent Mucho",
  description: "Información legal sobre el titular del sitio web Talent Mucho.",
};

export default function AvisoLegalPage() {
  return (
    <section className="pt-32 pb-24 bg-beige-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Legal</p>
          <h1
            className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
          >
            Aviso Legal
          </h1>
          <p className="text-sm text-taupe-400 font-light mb-12">Última actualización: abril de 2026</p>

          <div className="prose prose-sm max-w-none text-espresso-800 font-light leading-relaxed space-y-10">

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">1. Datos identificativos del titular</h2>
              <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:</p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>Denominación:</strong> Talent Mucho</li>
                <li><strong>Titulares:</strong> Joenabie Gamao (Abie Maxey) y Mary Kris Gebe</li>
                <li><strong>Actividad:</strong> Formación, eventos digitales y servicios de consultoría en tecnología e inteligencia artificial</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a></li>
                <li><strong>Sitio web:</strong> <a href="https://talentmucho.com" className="text-clay-500 hover:underline">talentmucho.com</a></li>
                <li><strong>NIF/NIE:</strong> [PLACEHOLDER ~ añadir antes de publicar]</li>
                <li><strong>Domicilio:</strong> [PLACEHOLDER ~ añadir antes de publicar]</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">2. Objeto y ámbito de aplicación</h2>
              <p>
                El presente Aviso Legal regula el acceso y uso del sitio web <strong>talentmucho.com</strong>, así como los servicios y contenidos disponibles en él. El acceso al sitio web implica la aceptación de las condiciones aquí establecidas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">3. Propiedad intelectual e industrial</h2>
              <p>
                Todos los contenidos del sitio web ~ incluyendo textos, imágenes, diseño gráfico, logotipos y código fuente ~ son propiedad de Talent Mucho o de sus titulares, y están protegidos por la legislación española e internacional en materia de propiedad intelectual e industrial.
              </p>
              <p className="mt-3">
                Queda prohibida la reproducción, distribución, comunicación pública o transformación de dichos contenidos sin la autorización expresa y por escrito de Talent Mucho.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">4. Exclusión de responsabilidad</h2>
              <p>
                Talent Mucho no se hace responsable de los daños o perjuicios derivados del uso del sitio web, de interrupciones en el servicio, ni de la información contenida en sitios web de terceros enlazados desde este sitio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">5. Legislación aplicable y jurisdicción</h2>
              <p>
                Este Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales competentes de España, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal-900 mb-3">6. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con este Aviso Legal, puede contactarnos en{" "}
                <a href="mailto:hello@talentmucho.com" className="text-clay-500 hover:underline">hello@talentmucho.com</a>.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-beige-200 flex flex-wrap gap-4 text-sm text-taupe-400 font-light">
            <Link href="/privacy" className="hover:text-clay-500 transition-colors">Privacy Policy</Link>
            <Link href="/tos" className="hover:text-clay-500 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-clay-500 transition-colors">Cookies Policy</Link>
            <Link href="/" className="hover:text-clay-500 transition-colors">← Back to Home</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
