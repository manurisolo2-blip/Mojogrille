import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Coffee,
  LogOut,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertCircle,
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

// Trazados para la transición orgánica de onda vertical (Jelly Wave divider)
const VERTICAL_WAVE_PATHS = {
  a: "M 0 0 L 0 600 L 40 600 C 110 480, 10 360, 95 240 C 120 150, 40 60, 30 0 Z",
  b: "M 0 0 L 0 600 L 30 600 C 85 450, 115 320, 50 200 C 20 130, 90 40, 35 0 Z",
  c: "M 0 0 L 0 600 L 45 600 C 115 490, 20 380, 105 250 C 130 170, 30 70, 40 0 Z",
};

// Trazados para la onda horizontal en vista móvil
const HORIZONTAL_WAVE_PATHS = {
  a: "M 0 0 L 600 0 L 600 25 C 480 75, 360 10, 240 65 C 150 80, 60 25, 0 35 Z",
  b: "M 0 0 L 600 0 L 600 20 C 450 55, 320 80, 200 35 C 130 15, 40 60, 0 25 Z",
  c: "M 0 0 L 600 0 L 600 30 C 490 80, 380 15, 250 70 C 170 85, 70 20, 0 28 Z",
};

export const AuthSwitch: React.FC<AuthSwitchProps> = ({
  className,
  title,
  initialMode = "login",
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<MojoUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State para Sign Up
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Form State para Sign In
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

    if (!signupName.trim()) {
      setFeedback({ type: "error", message: "Please enter your full name or username." });
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setFeedback({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (signupPassword.length < 6) {
      setFeedback({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newUser: MojoUser = {
        name: signupName.trim(),
        email: signupEmail.trim().toLowerCase(),
        phone: "(305) 555-0100",
        memberId: `MOJO-${Math.floor(10000 + Math.random() * 90000)}`,
        points: 100,
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
        message: "¡Cuenta creada con éxito! Se sumaron 100 puntos y tu cafecito de bienvenida.",
      });

      if (onAuthSuccess) {
        onAuthSuccess(newUser);
      }
    }, 450);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!loginEmail.trim() || !loginEmail.includes("@")) {
      setFeedback({ type: "error", message: "Please enter your registered email." });
      return;
    }
    if (!loginPassword) {
      setFeedback({ type: "error", message: "Please enter your password." });
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
        name: loginEmail.split("@")[0]?.toUpperCase() || "CARLOS HERNÁNDEZ",
        email: loginEmail.trim().toLowerCase(),
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

  const handleSocialAuth = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const names: Record<string, string> = {
        google: "Carlos Hernández",
        facebook: "Sofia Perez",
        twitter: "Marco Diaz",
        linkedin: "Elena Gomez",
      };
      const socialUser: MojoUser = {
        name: names[provider] || "Mojo VIP Club Member",
        email: `${provider}.member@miami.com`,
        phone: "(305) 555-0128",
        memberId: `MOJO-${Math.floor(20000 + Math.random() * 70000)}`,
        points: 150,
        perk: "1 Cafecito Cubano de bienvenida al momento",
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mojo_club_user", JSON.stringify(socialUser));
        } catch {}
      }
      setUser(socialUser);
      setIsSubmitting(false);
      if (onAuthSuccess) onAuthSuccess(socialUser);
    }, 380);
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
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setLoginEmail("");
    setLoginPassword("");
    setFeedback(null);
  };

  const fillDemoData = (target: "signup" | "login") => {
    if (target === "signup") {
      setSignupName("Carlos Hernández");
      setSignupEmail("carlos.cubano@miami.com");
      setSignupPassword("Mojo2026!");
    } else {
      setLoginEmail("carlos.cubano@miami.com");
      setLoginPassword("Mojo2026!");
    }
  };

  // ESTADO 1: SOCIO IDENTIFICADO (PASAPORTE VIP)
  if (user) {
    return (
      <motion.div
        key="passport-view"
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className={cn(
          "relative flex flex-col bg-cream-bg text-charcoal-ink p-8 sm:p-12",
          className
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brand-fire flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 fill-current" />
            CLUB MOJO MIAMI
          </span>
          <span className="font-mono text-xs font-bold text-charcoal-ink/60 bg-surface-sand px-3 py-1 rounded-full">
            {user.memberId}
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-charcoal-ink leading-tight">
          {user.name}
        </h2>
        <p className="font-sans text-xs text-charcoal-ink/70 mt-1">
          {user.email} {user.phone && `· ${user.phone}`}
        </p>

        <div className="grid grid-cols-2 gap-6 pt-6 my-4 border-t border-charcoal-ink/10">
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-charcoal-ink/50 block">
              PUNTOS MOJO
            </span>
            <span className="font-display text-4xl sm:text-5xl font-black text-brand-fire leading-none block mt-1">
              {user.points} <span className="font-sans text-xs font-bold text-charcoal-ink/70">PTS</span>
            </span>
          </div>
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-charcoal-ink/50 block">
              BENEFICIO ACTIVO
            </span>
            <div className="flex items-center gap-2 text-leaf-green mt-2 font-sans text-sm font-bold uppercase tracking-tight">
              <Coffee className="h-5 w-5 shrink-0 stroke-[2.5]" />
              <span>Cafecito Gratis</span>
            </div>
          </div>
        </div>

        <p className="font-sans text-xs text-charcoal-ink/60 mb-6">
          Ganas 10 pts por cada $1 consumido en Little Havana, Brickell o Doral.
        </p>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink/60 hover:text-brand-fire transition-colors cursor-pointer select-none"
          >
            <LogOut className="h-4 w-4 stroke-[2]" />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // Componente de Botones Sociales
  const SocialButtons = ({ label }: { label: string }) => (
    <div className="mt-6 flex flex-col items-center">
      <p className="font-sans text-xs text-charcoal-ink/60 font-medium mb-3">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          aria-label="Sign in with Google"
          className="h-10 w-10 rounded-full border border-charcoal-ink/15 bg-cream-bg hover:border-brand-fire hover:scale-105 transition-all flex items-center justify-center shadow-xs cursor-pointer group"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleSocialAuth("facebook")}
          aria-label="Sign in with Facebook"
          className="h-10 w-10 rounded-full border border-charcoal-ink/15 bg-cream-bg text-charcoal-ink hover:text-brand-fire hover:border-brand-fire hover:scale-105 transition-all flex items-center justify-center shadow-xs cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Twitter / X */}
        <button
          type="button"
          onClick={() => handleSocialAuth("twitter")}
          aria-label="Sign in with X"
          className="h-10 w-10 rounded-full border border-charcoal-ink/15 bg-cream-bg text-charcoal-ink hover:text-brand-fire hover:border-brand-fire hover:scale-105 transition-all flex items-center justify-center shadow-xs cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => handleSocialAuth("linkedin")}
          aria-label="Sign in with LinkedIn"
          className="h-10 w-10 rounded-full border border-charcoal-ink/15 bg-cream-bg text-charcoal-ink hover:text-brand-fire hover:border-brand-fire hover:scale-105 transition-all flex items-center justify-center shadow-xs cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "relative w-full bg-cream-bg text-charcoal-ink overflow-hidden select-none min-h-[560px]",
        className
      )}
    >
      {/* ========================================================================= */}
      {/* VISTA DESKTOP: DUAL PANEL CON PANEL DESLIZANTE Y ONDA JELLY ORGÁNICA     */}
      {/* ========================================================================= */}
      <div className="hidden md:grid md:grid-cols-2 relative w-full min-h-[560px]">
        {/* PANEL IZQUIERDO ESTÁTICO: FORMULARIO SIGN UP (Visible cuando overlay está a la derecha) */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-xs mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-charcoal-ink text-center mb-6">
              Sign up
            </h2>

            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Username Pill */}
              <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                <User className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Username"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                  required
                />
              </div>

              {/* Email Pill */}
              <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                <Mail className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                  required
                />
              </div>

              {/* Password Pill */}
              <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                <Lock className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="text-charcoal-ink/50 hover:text-charcoal-ink p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Mensaje de feedback */}
              {feedback && (
                <div
                  className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    feedback.type === "error"
                      ? "text-brand-fire bg-brand-fire/10"
                      : "text-leaf-green bg-leaf-green/10"
                  }`}
                >
                  {feedback.type === "error" ? (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Solid Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand-fire hover:bg-charcoal-ink text-cream-bg font-sans font-bold text-xs uppercase tracking-wider py-3.5 transition-all shadow-md active:scale-[0.99] cursor-pointer mt-2"
              >
                {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
              </button>
            </form>

            <SocialButtons label="Or sign up with social platforms" />

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => fillDemoData("signup")}
                className="text-[11px] font-sans font-bold text-charcoal-ink/50 hover:text-brand-fire transition-colors underline cursor-pointer"
              >
                Autocompletar demo
              </button>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO ESTÁTICO: FORMULARIO SIGN IN (Visible cuando overlay está a la izquierda) */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-xs mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-charcoal-ink text-center mb-6">
              Sign in
            </h2>

            <form onSubmit={handleLogin} className="space-y-3.5">
              {/* Email Pill */}
              <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                <Mail className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                  required
                />
              </div>

              {/* Password Pill */}
              <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                <Lock className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="text-charcoal-ink/50 hover:text-charcoal-ink p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Mensaje de feedback */}
              {feedback && (
                <div
                  className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    feedback.type === "error"
                      ? "text-brand-fire bg-brand-fire/10"
                      : "text-leaf-green bg-leaf-green/10"
                  }`}
                >
                  {feedback.type === "error" ? (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Solid Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand-fire hover:bg-charcoal-ink text-cream-bg font-sans font-bold text-xs uppercase tracking-wider py-3.5 transition-all shadow-md active:scale-[0.99] cursor-pointer mt-2"
              >
                {isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </button>
            </form>

            <SocialButtons label="Or sign in with social platforms" />

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => fillDemoData("login")}
                className="text-[11px] font-sans font-bold text-charcoal-ink/50 hover:text-brand-fire transition-colors underline cursor-pointer"
              >
                Autocompletar demo
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAY DESLIZANTE EN COLOR ROJO MOJO SCARLET CON ONDA ORGÁNICA */}
        <motion.div
          animate={{
            x: mode === "signup" ? "100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 28,
          }}
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-brand-fire text-cream-bg z-20 flex flex-col justify-center items-center px-10 text-center overflow-visible"
        >
          {/* Borde divisorio con Onda Jelly Orgánica Animada */}
          <motion.div
            animate={{
              left: mode === "signup" ? -48 : "auto",
              right: mode === "login" ? -48 : "auto",
              scaleX: mode === "signup" ? -1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
            }}
            className="absolute top-0 bottom-0 w-12 lg:w-16 h-full overflow-hidden pointer-events-none z-30"
          >
            <svg viewBox="0 0 120 600" preserveAspectRatio="none" className="w-full h-full block">
              <motion.path
                d={VERTICAL_WAVE_PATHS.a}
                animate={{
                  d: [
                    VERTICAL_WAVE_PATHS.a,
                    VERTICAL_WAVE_PATHS.b,
                    VERTICAL_WAVE_PATHS.c,
                    VERTICAL_WAVE_PATHS.a,
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                fill="#E52516"
              />
            </svg>
          </motion.div>

          {/* Contenido Dinámico del Overlay con Fade & Slide cruzado */}
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="new-here-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-xs flex flex-col items-center"
              >
                <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-cream-bg mb-3">
                  New here?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-cream-bg/90 leading-relaxed mb-8">
                  Ready to taste the real Miami criollo press? Join Club Mojo for secret drops, VIP perks, and an instant complimentary cafecito cubano.
                </p>

                {/* Outline Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFeedback(null);
                    setMode("signup");
                  }}
                  className="rounded-full border-2 border-cream-bg text-cream-bg hover:bg-cream-bg hover:text-brand-fire font-sans font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  SIGN UP
                </button>

                {/* Brand Badge Ilustrativo */}
                <div className="mt-8 flex items-center gap-2 text-cream-bg/80 text-xs font-sans font-bold uppercase tracking-widest">
                  <Coffee className="h-4 w-4 text-mojo-citrus" />
                  <span>Cafecito Cubano de Bienvenida</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="one-of-us-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-xs flex flex-col items-center"
              >
                <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-cream-bg mb-3">
                  One of us?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-cream-bg/90 leading-relaxed mb-8">
                  Welcome back to the family. Sign in to your account to check your Mojo points, unlock secret menu discounts, and redeem your perks.
                </p>

                {/* Outline Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFeedback(null);
                    setMode("login");
                  }}
                  className="rounded-full border-2 border-cream-bg text-cream-bg hover:bg-cream-bg hover:text-brand-fire font-sans font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  SIGN IN
                </button>

                {/* Brand Badge Ilustrativo */}
                <div className="mt-8 flex items-center gap-2 text-cream-bg/80 text-xs font-sans font-bold uppercase tracking-widest">
                  <Flame className="h-4 w-4 text-mojo-citrus fill-current" />
                  <span>Sabor Criollo Auténtico Miami</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA MÓVIL: STACK FLUIDO CON TRANSICIÓN DE ONDA HORIZONTAL JELLY        */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full">
        {/* Banner Superior en Rojo Mojo Scarlet */}
        <div className="bg-brand-fire text-cream-bg px-6 pt-8 pb-4 text-center">
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="mobile-new-here"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <h3 className="font-display text-3xl font-black uppercase tracking-tight text-cream-bg">
                  New here?
                </h3>
                <p className="font-sans text-xs text-cream-bg/90 max-w-xs mx-auto">
                  Join Club Mojo for VIP criollo perks and an instant cafecito cubano.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFeedback(null);
                    setMode("signup");
                  }}
                  className="mt-2 inline-block rounded-full border-2 border-cream-bg text-cream-bg hover:bg-cream-bg hover:text-brand-fire font-sans font-bold text-xs uppercase tracking-wider px-6 py-2 transition-all cursor-pointer"
                >
                  SIGN UP
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-one-of-us"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <h3 className="font-display text-3xl font-black uppercase tracking-tight text-cream-bg">
                  One of us?
                </h3>
                <p className="font-sans text-xs text-cream-bg/90 max-w-xs mx-auto">
                  Sign in to check your Mojo points and redeem your benefits.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFeedback(null);
                    setMode("login");
                  }}
                  className="mt-2 inline-block rounded-full border-2 border-cream-bg text-cream-bg hover:bg-cream-bg hover:text-brand-fire font-sans font-bold text-xs uppercase tracking-wider px-6 py-2 transition-all cursor-pointer"
                >
                  SIGN IN
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Onda Divisoria Horizontal Orgánica */}
        <div className="relative w-full overflow-hidden bg-cream-bg select-none pointer-events-none -mt-px">
          <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="block w-full h-8 sm:h-12">
            <motion.path
              d={HORIZONTAL_WAVE_PATHS.a}
              animate={{
                d: [
                  HORIZONTAL_WAVE_PATHS.a,
                  HORIZONTAL_WAVE_PATHS.b,
                  HORIZONTAL_WAVE_PATHS.c,
                  HORIZONTAL_WAVE_PATHS.a,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              fill="#E52516"
            />
          </svg>
        </div>

        {/* Formulario Activo Móvil */}
        <div className="p-6 sm:p-8 bg-cream-bg">
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="mobile-login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-xs mx-auto"
              >
                <h2 className="font-display text-3xl font-black uppercase tracking-tight text-charcoal-ink text-center mb-5">
                  Sign in
                </h2>

                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                    <Mail className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-transparent text-xs font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                      required
                    />
                  </div>

                  <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                    <Lock className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-transparent text-xs font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-charcoal-ink/50 hover:text-charcoal-ink p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {feedback && (
                    <div
                      className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                        feedback.type === "error"
                          ? "text-brand-fire bg-brand-fire/10"
                          : "text-leaf-green bg-leaf-green/10"
                      }`}
                    >
                      {feedback.type === "error" ? (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span>{feedback.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-brand-fire hover:bg-charcoal-ink text-cream-bg font-sans font-bold text-xs uppercase tracking-wider py-3.5 transition-all shadow-md active:scale-[0.99] cursor-pointer mt-2"
                  >
                    {isSubmitting ? "LOGGING IN..." : "LOGIN"}
                  </button>
                </form>

                <SocialButtons label="Or sign in with social platforms" />

                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() => fillDemoData("login")}
                    className="text-[11px] font-sans font-bold text-charcoal-ink/50 hover:text-brand-fire transition-colors underline cursor-pointer"
                  >
                    Autocompletar demo
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-signup-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-xs mx-auto"
              >
                <h2 className="font-display text-3xl font-black uppercase tracking-tight text-charcoal-ink text-center mb-5">
                  Sign up
                </h2>

                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                    <User className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full bg-transparent text-xs font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                      required
                    />
                  </div>

                  <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                    <Mail className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full bg-transparent text-xs font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                      required
                    />
                  </div>

                  <div className="relative flex items-center rounded-full bg-surface-sand/90 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-fire/30 focus-within:bg-surface-sand transition-all">
                    <Lock className="h-4 w-4 text-charcoal-ink/50 ml-1 mr-3 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full bg-transparent text-xs font-sans text-charcoal-ink placeholder:text-charcoal-ink/40 outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-charcoal-ink/50 hover:text-charcoal-ink p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {feedback && (
                    <div
                      className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                        feedback.type === "error"
                          ? "text-brand-fire bg-brand-fire/10"
                          : "text-leaf-green bg-leaf-green/10"
                      }`}
                    >
                      {feedback.type === "error" ? (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span>{feedback.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-brand-fire hover:bg-charcoal-ink text-cream-bg font-sans font-bold text-xs uppercase tracking-wider py-3.5 transition-all shadow-md active:scale-[0.99] cursor-pointer mt-2"
                  >
                    {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
                  </button>
                </form>

                <SocialButtons label="Or sign up with social platforms" />

                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() => fillDemoData("signup")}
                    className="text-[11px] font-sans font-bold text-charcoal-ink/50 hover:text-brand-fire transition-colors underline cursor-pointer"
                  >
                    Autocompletar demo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const Component = AuthSwitch;
export default AuthSwitch;
