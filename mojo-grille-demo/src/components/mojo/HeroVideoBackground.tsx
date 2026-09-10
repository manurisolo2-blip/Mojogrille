import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * El bucle del hero es decoración pura: el mensaje vive en el titular. Si la
 * conexión pide ahorrar datos o va a rastras no compensa gastar megas, y se
 * queda el fotograma fijo. Safari y Firefox no exponen la API; ahí no
 * penalizamos y damos por buena la conexión.
 */
function connectionAllowsVideo(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return connection.effectiveType !== "slow-2g" && connection.effectiveType !== "2g";
}

export interface HeroVideoBackgroundProps {
  /**
   * Bucle autoalojado. El CSP del sitio es `default-src 'self'` sin `media-src`
   * propio (ver `public/_headers`), así que un origen externo lo bloquearía el
   * navegador: el archivo tiene que salir de `public/`.
   */
  videoSrc?: string;
  /** Fotograma de respaldo. Se pinta siempre primero y es el fallback definitivo. */
  posterSrc: string;
  /**
   * Opacidad de la imagen bajo el velo crema. Se ajusta a 0.45 para dar
   * transparencia y permitir apreciar el vídeo y textura de fondo con claridad.
   */
  opacity?: number;
}

/**
 * Fondo del hero: bucle ambiental de cocina que reacciona al scroll con
 * parallax, un punto de escala y un velo crema que cierra según sale de
 * pantalla. No hay scrub de fotogramas a propósito: el CTA vive en el hero y
 * fijar la sección para ganar recorrido lo empujaría fuera de la primera
 * pantalla.
 */
export function HeroVideoBackground({
  videoSrc,
  posterSrc,
  opacity = 0.45,
}: HeroVideoBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useReducedMotion();

  // Arranca en false en servidor y en el primer render de cliente: el HTML
  // hidratado coincide y nadie descarga vídeo antes de saber si le conviene.
  const [videoEligible, setVideoEligible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!videoSrc || reducedMotion || videoFailed) {
      setVideoEligible(false);
      return;
    }
    setVideoEligible(connectionAllowsVideo());
  }, [videoSrc, reducedMotion, videoFailed]);

  // Reproducción sólo mientras el hero está en pantalla y la pestaña visible.
  // Un bucle corriendo detrás de diez secciones sólo gasta batería.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEligible) return undefined;

    // El autoplay puede rechazarse (política del navegador, batería baja). No
    // es un error recuperable: el póster ya está debajo y el hero se ve igual.
    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    // El elemento puede alcanzar estado pintable antes de que React enganche su
    // handler (vídeo servido desde caché), y entonces `canplay` no llega nunca.
    // Por eso se consulta `readyState` a mano además de escuchar. Con
    // HAVE_CURRENT_DATA ya hay fotograma que mostrar.
    let announced = false;
    const markReady = () => {
      if (announced || video.readyState < 2) return;
      announced = true;
      setVideoReady(true);
      // El vídeo cambia lo que ocupa el hero; sin refresco los triggers de las
      // secciones siguientes quedan desplazados.
      ScrollTrigger.refresh();
    };
    markReady();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(video);

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (video.getBoundingClientRect().bottom > 0) {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      document.removeEventListener("visibilitychange", handleVisibility);
      video.pause();
    };
  }, [videoEligible]);

  // Reacción al scroll: parallax + velo. Con prefers-reduced-motion se deja
  // todo quieto, que es justo lo que pide la preferencia.
  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    const veil = veilRef.current;
    if (!root || !media || !veil) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      gsap.set(media, { yPercent: 0, scale: 1 });
      gsap.set(veil, { opacity: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      } as const;

      // La imagen se desplaza menos que la página: el hero gana profundidad
      // sin que el texto se despegue de su sitio.
      gsap.fromTo(
        media,
        { yPercent: -6, scale: 1.06 },
        { yPercent: 6, scale: 1, ease: "none", scrollTrigger },
      );

      // El velo cierra en crema conforme el hero sale, para entregar la
      // sección siguiente sin corte duro.
      gsap.fromTo(veil, { opacity: 0 }, { opacity: 0.55, ease: "none", scrollTrigger });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, videoEligible]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {/*
        Capa de medios sobredimensionada un 10% por arriba y por abajo: el
        parallax la desplaza sin llegar a descubrir el borde de la sección.
      */}
      <div
        ref={mediaRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-10%", bottom: "-10%" }}
      >
        {/*
          Se apaga en cuanto el vídeo puede pintar. Si se quedaran las dos capas
          al 20% compondrían más oscuro que la foto sola y el titular perdería
          el contraste que da por bueno el comentario de arriba.
        */}
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
          style={{ opacity: videoReady ? 0 : opacity }}
        />

        {videoEligible && !videoFailed ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
            // Entra fundido sobre el póster para que no haya salto de fotograma.
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
            style={{ opacity: videoReady ? opacity : 0 }}
            onError={() => {
              setVideoFailed(true);
              setVideoReady(false);
            }}
          />
        ) : null}
      </div>

      {/* Velo crema en degradado sutil y muy transparente para que el
          vídeo y textura de fondo se aprecien con gran claridad. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-bg/15 to-cream-bg/35" />

      {/* Segundo velo, conducido por el scroll. Empieza invisible. */}
      <div ref={veilRef} className="absolute inset-0 bg-cream-bg opacity-0" />
    </div>
  );
}

export default HeroVideoBackground;
