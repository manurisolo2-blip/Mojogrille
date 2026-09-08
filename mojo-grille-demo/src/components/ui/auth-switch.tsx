import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  LogOut,
  Award,
  Coffee,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MojoUser {
  name: string;
  email: string;
  phone?: string;
  memberId: string;
  points: number;
  perk: string;
}

export interface AuthSwitchProps {
  className?: string;
  title?: string;
  initialMode?: "signup" | "login";
  onAuthSuccess?: (user: MojoUser) => void;
}

export const AuthSwitch: React.FC<AuthSwitchProps> = ({
  className,
  title,
  initialMode = "signup",
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<MojoUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptPerks, setAcceptPerks] = useState(true);

  // Cargar usuario existente de localStorage al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mojo_club_user");
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch {
        // Modo seguro sin acceso a storage
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name.trim()) {
      setFeedback({ type: "error", message: "Por favor, ingresa tu nombre completo." });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFeedback({ type: "error", message: "Por favor, ingresa un correo electrónico válido." });
      return;
    }
    if (password.length < 6) {
      setFeedback({ type: "error", message: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newUser: MojoUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || "(305) 555-0100",
        memberId: `MOJO-${Math.floor(10000 + Math.random() * 90000)}`,
        points: 100, // Bono de bienvenida
        perk: "1 Cafecito Cubano de bienvenida al momento",
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mojo_club_user", JSON.stringify(newUser));
        } catch {
          // ignore
        }
      }

      setUser(newUser);
      setIsSubmitting(false);
      setFeedback({
        type: "success",
        message: "¡Cuenta creada con éxito! Se han sumado 100 puntos y tu cafecito de bienvenida.",
      });

      if (onAuthSuccess) {
        onAuthSuccess(newUser);
      }
    }, 450);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!email.trim() || !email.includes("@")) {
      setFeedback({ type: "error", message: "Por favor, ingresa tu correo registrado." });
      return;
    }
    if (!password) {
      setFeedback({ type: "error", message: "Por favor, ingresa tu contraseña." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let existingUser: MojoUser | null = null;
      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("mojo_club_user");
          if (saved) {
            existingUser = JSON.parse(saved);
          }
        } catch {
          // ignore
        }
      }

      const loggedUser: MojoUser = existingUser || {
        name: email.split("@")[0]?.toUpperCase() || "SOCIO MOJO",
        email: email.trim().toLowerCase(),
        phone: "(305) 555-0199",
        memberId: "MOJO-30588",
        points: 250,
        perk: "1 Cafecito Cubano de bienvenida al momento",
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mojo_club_user", JSON.stringify(loggedUser));
        } catch {
          // ignore
        }
      }

      setUser(loggedUser);
      setIsSubmitting(false);
      setFeedback({
        type: "success",
        message: `¡Bienvenido de vuelta, ${loggedUser.name}!`,
      });

      if (onAuthSuccess) {
        onAuthSuccess(loggedUser);
      }
    }, 400);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("mojo_club_user");
      } catch {
        // ignore
      }
    }
    setUser(null);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setFeedback(null);
  };

  const fillDemoData = () => {
    setName("Carlos Hernández");
    setEmail("carlos.cubano@miami.com");
    setPhone("(305) 555-0177");
    setPassword("Mojo2026!");
  };

  // ESTADO 1: SOCIO IDENTIFICADO (PASAPORTE VIP - Minimalista, sin recuadros ni cajas)
  if (user) {
    return (
      <motion.div
        key="passport-view"
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className={cn(
          "relative flex flex-col bg-transparent text-charcoal-ink space-y-4",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-fire stroke-[2.2]" />
            <div>
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-brand-fire block leading-none">
                PASAPORTE VIP
              </span>
              <span className="font-display text-lg font-black uppercase tracking-tight text-charcoal-ink">
                CLUB MOJO MIAMI
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-charcoal-ink/60">
            {user.memberId}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/60 block">
              SOCIO TITULAR
            </span>
            <p className="font-display text-3xl font-bold uppercase tracking-tight text-charcoal-ink leading-tight">
              {user.name}
            </p>
            <p className="font-sans text-xs text-charcoal-ink/75 truncate mt-0.5">
              {user.email} {user.phone && `· ${user.phone}`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal-ink/60 block">
                PUNTOS MOJO
              </span>
              <span className="font-display text-3xl font-black text-brand-fire leading-none">
                {user.points} <span className="text-xs font-sans text-charcoal-ink/70">PTS</span>
              </span>
            </div>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal-ink/60 block">
                BENEFICIO ACTIVO
              </span>
              <div className="flex items-center gap-1.5 text-leaf-green mt-1">
                <Coffee className="h-4 w-4 shrink-0 stroke-[2.5]" />
                <span className="font-sans text-xs font-bold uppercase tracking-tight leading-tight">
                  Cafecito Gratis
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-charcoal-ink/80 text-xs font-sans">
            <Sparkles className="h-3.5 w-3.5 text-brand-fire shrink-0" />
            <span>Ganas 10 pts por cada $1 consumido en Little Havana, Brickell o Doral.</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full pt-3 flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink/70 hover:text-brand-fire transition-colors cursor-pointer select-none"
          >
            <LogOut className="h-3.5 w-3.5 stroke-[2]" />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className={cn(
        "flex flex-col bg-transparent text-charcoal-ink",
        className
      )}
    >
      {title && (
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-charcoal-ink mb-3 text-center">
          {title}
        </h2>
      )}

      {/* Selector de Pestañas (Minimalista, sin cajas) */}
      <div
        role="tablist"
        aria-label="Opciones de cuenta"
        className="relative flex gap-6 mb-5 select-none"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          onClick={() => {
            setMode("signup");
            setFeedback(null);
          }}
          className={cn(
            "font-display text-xl uppercase font-black tracking-tight transition-colors duration-200 cursor-pointer select-none pb-1",
            mode === "signup"
              ? "text-brand-fire border-b-2 border-brand-fire"
              : "text-charcoal-ink/50 hover:text-charcoal-ink"
          )}
        >
          CREAR CUENTA
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          onClick={() => {
            setMode("login");
            setFeedback(null);
          }}
          className={cn(
            "font-display text-xl uppercase font-black tracking-tight transition-colors duration-200 cursor-pointer select-none pb-1",
            mode === "login"
              ? "text-brand-fire border-b-2 border-brand-fire"
              : "text-charcoal-ink/50 hover:text-charcoal-ink"
          )}
        >
          INICIAR SESIÓN
        </button>
      </div>

      {/* Mensajes de Feedback Animados */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={cn(
              "mb-3 p-2 font-sans text-xs font-semibold leading-relaxed",
              feedback.type === "error"
                ? "text-brand-fire"
                : "text-leaf-green"
            )}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulario con Transición Suave */}
      <AnimatePresence mode="wait" initial={false}>
        {mode === "signup" ? (
          <motion.form
            key="signup-mode-form"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <div>
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/70 block mb-1">
                NOMBRE Y APELLIDO *
              </label>
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-ink/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Carlos Rodríguez"
                  required
                  className="w-full rounded-none border-b border-charcoal-ink/25 bg-transparent pl-6 pr-3 py-2 font-sans text-xs text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-none focus:border-brand-fire transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/70 block mb-1">
                CORREO ELECTRÓNICO *
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-ink/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@miami.com"
                  required
                  className="w-full rounded-none border-b border-charcoal-ink/25 bg-transparent pl-6 pr-3 py-2 font-sans text-xs text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-none focus:border-brand-fire transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/70 block mb-1">
                TELÉFONO MÓVIL (MIAMI / WHATSAPP)
              </label>
              <div className="relative">
                <Phone className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-ink/40" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(305) 555-0199"
                  className="w-full rounded-none border-b border-charcoal-ink/25 bg-transparent pl-6 pr-3 py-2 font-sans text-xs text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-none focus:border-brand-fire transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/70 block mb-1">
                CONTRASEÑA (MÍNIMO 6 CARACTERES) *
              </label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-ink/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-none border-b border-charcoal-ink/25 bg-transparent pl-6 pr-8 py-2 font-sans text-xs text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-none focus:border-brand-fire transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-charcoal-ink/50 hover:text-charcoal-ink cursor-pointer transition-transform active:scale-90"
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptPerks}
                onChange={(e) => setAcceptPerks(e.target.checked)}
                className="mt-0.5 rounded-none border-charcoal-ink text-brand-fire focus:ring-0 cursor-pointer"
              />
              <span className="font-sans text-[11px] text-charcoal-ink/80 leading-snug">
                Activar mi <strong>Cafecito Cubano gratis</strong> de bienvenida y 100 puntos Club Mojo.
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-none bg-brand-fire py-3 px-4 font-sans text-xs font-bold uppercase tracking-wider text-cream-bg transition-colors duration-300 hover:bg-charcoal-ink cursor-pointer select-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>CREANDO CUENTA...</span>
              ) : (
                <>
                  <span>CREAR MI CUENTA MOJO</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </>
              )}
            </motion.button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={fillDemoData}
                className="font-sans text-[10px] uppercase font-bold tracking-wider text-charcoal-ink/60 hover:text-brand-fire underline cursor-pointer transition-colors"
              >
                Completar datos de prueba
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            key="login-mode-form"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <div>
              <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/70 block mb-1">
                CORREO ELECTRÓNICO *
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-ink/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu-correo@miami.com"
                  required
                  className="w-full rounded-none border-b border-charcoal-ink/25 bg-transparent pl-6 pr-3 py-2 font-sans text-xs text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-none focus:border-brand-fire transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/70">
                  CONTRASEÑA *
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setFeedback({
                      type: "success",
                      message: "Te enviaremos un enlace de recuperación a tu correo de Miami.",
                    })
                  }
                  className="font-sans text-[10px] font-semibold text-brand-fire hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-ink/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-none border-b border-charcoal-ink/25 bg-transparent pl-6 pr-8 py-2 font-sans text-xs text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-none focus:border-brand-fire transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-charcoal-ink/50 hover:text-charcoal-ink cursor-pointer transition-transform active:scale-90"
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-none bg-charcoal-ink py-3 px-4 font-sans text-xs font-bold uppercase tracking-wider text-cream-bg transition-colors duration-300 hover:bg-brand-fire cursor-pointer select-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>ENTRANDO...</span>
              ) : (
                <>
                  <span>ENTRAR A MI CUENTA</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </>
              )}
            </motion.button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setEmail("carlos.cubano@miami.com");
                  setPassword("Mojo2026!");
                }}
                className="font-sans text-[10px] uppercase font-bold tracking-wider text-charcoal-ink/60 hover:text-brand-fire underline cursor-pointer transition-colors"
              >
                Completar datos de acceso demo
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-4 pt-3 border-t border-charcoal-ink/10 flex items-center justify-center gap-1.5 text-charcoal-ink/60 text-[10px] font-sans">
        <ShieldCheck className="h-3.5 w-3.5 text-leaf-green" />
        <span>Tus datos están protegidos y optimizados para pedidos al momento.</span>
      </div>
    </motion.div>
  );
};

export const Component = AuthSwitch;
export default AuthSwitch;

