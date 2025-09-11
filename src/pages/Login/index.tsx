// ===== IMPORTACIONES =====
import React, { useState } from "react";
import Checkbox from "@/components/UI/Checkbox"; // Componente personalizado de checkbox
import { useNavigate } from "react-router-dom"; // Hook para navegación programática
import { motion, AnimatePresence } from "framer-motion"; // Biblioteca de animaciones
import ForgotPassword from "./ForgotPassword"; // Componente de recuperación de contraseña

export const Login: React.FC = () => {
  // ===== ESTADOS DEL COMPONENTE =====
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Estado del checkbox "Recuérdame"
  const [email, setEmail] = useState<string>(""); // Valor del input de email
  const [password, setPassword] = useState<string>(""); // Valor del input de contraseña
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga del formulario
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false); // Controla si se muestra el componente de recuperación
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // ===== FUNCIONES DE MANEJO =====
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true); // Activa el estado de carga
    // Simula una petición al servidor con setTimeout
    setTimeout(() => {
      setLoading(false); // Desactiva el estado de carga
      navigate("/chat"); // Navega a la página de chat
    }, 3000); // Espera 3 segundos
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  return (
    // ===== CONTENEDOR PRINCIPAL DE LA PÁGINA =====
    <div className="w-screen h-screen flex justify-center items-center ">
      {/* IMAGEN DE FONDO - Posicionada absolutamente detrás del formulario con blur */}
      <div className="w-full h-full bg-[url('/images/login/background.png')] bg-cover bg-center absolute -z-10 blur-[10px]" />

      {/* ===== CONTENEDOR PRINCIPAL DEL FORMULARIO (ANIMADO) ===== */}
      <motion.div
        // ANIMACIÓN: Cambia el ancho según el estado (24% para login, 32% para forgot password)
        animate={{
          width: !showForgotPassword ? "24%" : "32%", // Ancho dinámico basado en el estado
          backgroundColor: !showForgotPassword ? "#000000de" : "#ffffff0f",
        }}
        transition={{
          duration: 1, // Duración de la animación en segundos
          ease: "linear", // Tipo de easing (velocidad constante)
        }}
        className={`flex flex-col rounded-[25px] justify-center py-8 gap-4 border border-[#880808] ${
          !showForgotPassword ? "items-center px-4" : "items-start px-6" // Padding y alineación dinámicos
        }`}
      >
        {/* ===== SECCIÓN DEL HEADER (LOGO + COMPONENTE FORGOT PASSWORD) ===== */}
        <motion.div
          // ANIMACIÓN: Cambia la justificación del contenido (centrado vs space-between)
          animate={{
            justifyContent: !showForgotPassword ? "center" : "space-between", // Centrado para login, distribuido para forgot password
          }}
          transition={{
            duration: 0.4, // Duración de la animación
            ease: "linear", // Velocidad constante
          }}
          className="flex items-center w-full"
        >
          {/* LOGO/IMAGEN PRINCIPAL (ANIMADO) */}
          <motion.div
            // ANIMACIÓN: Escala y posición del logo
            animate={{
              scale: !showForgotPassword ? 1 : 0.8, // Tamaño normal en login, más pequeño en forgot password
              x: !showForgotPassword ? 0 : -10, // Sin desplazamiento en login, se mueve a la izquierda en forgot password
            }}
            transition={{
              duration: 0.4, // Duración de la animación
              ease: "linear", // Velocidad constante
            }}
            className="bg-[url('/favicon/favicon.png')] bg-cover bg-center w-[10rem] h-[10rem] rounded-[25px]"
          />
          {/* ===== COMPONENTE FORGOT PASSWORD (CONDICIONAL) ===== */}
          {showForgotPassword && (
            <ForgotPassword
              onBackToLogin={handleBackToLogin}
              email={email}
              setEmail={setEmail}
            />
          )}
        </motion.div>

        {/* ===== FORMULARIO PRINCIPAL (SOLO VISIBLE EN MODO LOGIN) ===== */}
        <AnimatePresence>
          {!showForgotPassword && (
            <motion.form
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 py-2 w-full"
              onSubmit={handleSubmit}
            >
              {/* ===== CONTENEDOR DE INPUTS ===== */}
              <motion.div
                className="flex flex-col gap-8 pb-2 w-full"
                layout
                transition={{ duration: 0.5, ease: "linear" }}
              >
                {/* ===== INPUT DE EMAIL ===== */}
                <motion.div
                  className="w-full border-b border-[#880808] px-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "linear" }}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full blanco poppins-16 placeholder:text-[#880808] bg-transparent outline-none py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                {/* ===== INPUT DE CONTRASEÑA ===== */}
                <motion.div
                  className="w-full border-b border-[#880808] px-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "linear", delay: 0.1 }}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full blanco poppins-16 placeholder:text-[#880808] bg-transparent outline-none py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </motion.div>
              </motion.div>

              {/* ===== SECCIÓN "RECUÉRDAME" Y "OLVIDÉ CONTRASEÑA" ===== */}
              <motion.div
                className="flex w-full justify-between py-4"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "linear", delay: 0.2 }}
              >
                {/* CHECKBOX "RECUÉRDAME" */}
                <Checkbox
                  className="poppins-16 blanco flex items-center gap-2"
                  label="Recuerdame"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                />

                {/* BOTÓN "¿OLVIDASTE TU CONTRASEÑA?" */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowForgotPassword}
                  transition={{ duration: 0.2 }}
                >
                  <p className="poppins-16 blanco hover:underline hover:!text-[#b60000] transition-all duration-400">
                    ¿Olvidaste tu contraseña?
                  </p>
                </motion.button>
              </motion.div>

              {/* ===== BOTÓN PRINCIPAL DE ENVÍO ===== */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "linear", delay: 0.3 }}
                className="bg-blanco rounded-[5px] group hover:!bg-[#880808] transition-all duration-400 disabled:opacity-80 disabled:!cursor-not-allowed w-full"
              >
                <motion.p
                  className={`poppins-16 negro px-4 py-2 group-hover:!text-[#fff] transition-all duration-400 ${
                    loading ? "cargando" : ""
                  }`}
                  animate={{
                    opacity: loading ? 0.7 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? "Cargando" : "Ingresar Ahora"}
                </motion.p>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;