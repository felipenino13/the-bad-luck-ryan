import Image from "next/image";
import BadLuckForm from "./BadLuckForm";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    applicationCategory: "EntertainmentApplication",
    description:
      "Genera y comparte una imagen de Ryan Castro usando la camiseta del rival para invocar la mala suerte del otro equipo.",
    image: "https://the-bad-luck-ryan.vercel.app/og-bad-luck-ryan.jpg",
    inLanguage: "es-CO",
    name: "The Bad Luck Ryan",
    operatingSystem: "Web",
    url: "https://the-bad-luck-ryan.vercel.app/",
  };

  return (
    <main className="badluck-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="badluck-hero" aria-labelledby="badluck-title">
        <Image
          className="badluck-background"
          src="/ryan-background-high-100.jpg"
          alt="Ryan Castro con dibujos de mala suerte alrededor"
          fill
          sizes="100vw"
          preload
          quality={75}
        />

        <div className="badluck-title-card">
          <h1 id="badluck-title">
            <span>BAD LUCK</span>
            <Image
              className="badluck-avatar"
              src="/gif-ryan%20(1).gif"
              alt="Ryan Castro"
              width={88}
              height={88}
              unoptimized
            />
            <span>RYAN</span>
          </h1>
        </div>
      </section>

      <section className="badluck-playground" aria-label="Generador Bad Luck Ryan">
        <div className="badluck-form-card">
          <div className="badluck-copy">
            <p>
              Ryan Castro tiene un don que nadie quisiera tener: camiseta que
              usa, equipo que pierde. Por eso esta página existe para algo muy
              simple: <strong>ponerle la camiseta del rival y dejar que la mala suerte haga lo suyo.</strong>
            </p>
            <p>
              Viste a Ryan con los colores del otro equipo, comparte la imagen y
              confía en el poder del “Bad Luck Ryan”.
            </p>
          </div>

          <BadLuckForm />
        </div>

        <p className="badluck-warning">
          Advertencia: Este sitio puede afectar el rendimiento de tu equipo.
        </p>
      </section>
    </main>
  );
}
