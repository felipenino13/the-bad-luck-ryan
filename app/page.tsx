import Image from "next/image";
import BadLuckForm from "./BadLuckForm";

export default function Home() {
  return (
    <main className="badluck-page">
      <Image
        className="badluck-background"
        src="/background-ryan-100.jpg"
        alt="Ryan Castro con dibujos de mala suerte alrededor"
        fill
        sizes="100vw"
        priority
      />

      <section className="badluck-card" aria-labelledby="badluck-title">
        <header className="badluck-card__header">
          <h1 id="badluck-title">THE BAD LUCK RYAN</h1>
          <Image
            className="badluck-avatar"
            src="/gif-ryan.gif"
            alt="Ryan Castro"
            width={88}
            height={88}
            unoptimized
            priority
          />
        </header>

        <div className="badluck-card__body">
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
      </section>

      <p className="badluck-warning">
        Advertencia: esta página puede afectar el rendimiento de tu equipo.
      </p>
    </main>
  );
}
