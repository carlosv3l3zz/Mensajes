// ===== IMPORTACIONES =====
import React, { useState } from "react";
import Checkbox from "@/components/UI/Checkbox"; // Componente personalizado de checkbox
import { useNavigate } from "react-router-dom"; // Hook para navegación programática
import { motion, AnimatePresence } from "framer-motion"; // Biblioteca de animaciones

export const Login: React.FC = () => {
  // ===== ESTADOS DEL COMPONENTE =====
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Estado del checkbox "Recuérdame"
  const [email, setEmail] = useState<string>(""); // Valor del input de email
  const [password, setPassword] = useState<string>(""); // Valor del input de contraseña
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga del formulario
  const [forgotPassword, setForgotPassword] = useState<boolean>(false); // Controla si se muestra el panel de recuperación
  const [login, setLogin] = useState<boolean>(true); // Controla si estamos en modo login (true) o forgot password (false)
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // ===== FUNCIÓN DE MANEJO DEL FORMULARIO =====
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true); // Activa el estado de carga
    // Simula una petición al servidor con setTimeout
    setTimeout(() => {
      setLoading(false); // Desactiva el estado de carga
      navigate("/chat"); // Navega a la página de chat
    }, 3000); // Espera 3 segundos
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
          width: login ? "24%" : "32%", // Ancho dinámico basado en el estado
        }}
        transition={{
          duration: 0.6, // Duración de la animación en segundos
          ease: "linear", // Tipo de easing (velocidad constante)
        }}
        className={`flex flex-col rounded-[25px] bg-[#000000de] justify-center py-8 gap-4 border border-[#880808] ${
          login ? "items-center px-4" : "items-start px-6" // Padding y alineación dinámicos
        }`}
      >
        {/* ===== SECCIÓN DEL HEADER (LOGO + TEXTO FORGOT PASSWORD) ===== */}
        <motion.div
          // ANIMACIÓN: Cambia la justificación del contenido (centrado vs space-between)
          animate={{
            justifyContent: login ? "center" : "space-between", // Centrado para login, distribuido para forgot password
          }}
          transition={{
            duration: 0.6, // Duración de la animación
            ease: "linear", // Velocidad constante
          }}
          className="flex items-center w-full"
        >
          {/* LOGO/IMAGEN PRINCIPAL (ANIMADO) */}
          <motion.div
            // ANIMACIÓN: Escala y posición del logo
            animate={{
              scale: login ? 1 : 0.8, // Tamaño normal en login, más pequeño en forgot password
              x: login ? 0 : -10, // Sin desplazamiento en login, se mueve a la izquierda en forgot password
            }}
            transition={{
              duration: 0.6, // Duración de la animación
              ease: "linear", // Velocidad constante
            }}
            className="bg-[url('/favicon/favicon.png')] bg-cover bg-center w-[10rem] h-[10rem] rounded-[25px]"
          />
          {/* ===== PANEL DE TEXTO "FORGOT PASSWORD" (CONDICIONAL Y ANIMADO) ===== */}
          <AnimatePresence>
            {forgotPassword && ( // Solo se muestra cuando forgotPassword es true
              <motion.div
                // ESTADO INICIAL: Invisible, desplazado a la derecha y ligeramente pequeño
                initial={{
                  opacity: 0, // Invisible
                  x: 50, // Desplazado 50px a la derecha
                  scale: 0.9, // Ligeramente más pequeño
                }}
                // ESTADO FINAL: Visible, en posición normal y tamaño normal
                animate={{
                  opacity: 1, // Completamente visible
                  x: 0, // En su posición normal
                  scale: 1, // Tamaño normal
                }}
                // ESTADO DE SALIDA: Vuelve al estado inicial
                exit={{
                  opacity: 0, // Se desvanece
                  x: 50, // Se mueve a la derecha
                  scale: 0.9, // Se hace más pequeño
                }}
                transition={{
                  duration: 0.5, // Duración de la animación
                  ease: "linear", // Velocidad constante
                  delay: 0.2, // Retraso de 0.2s antes de empezar
                }}
                className="poppins-17 w-[65%] bg-[#ffffff0f] rounded-[5px] p-6"
              >
                {/* TÍTULO DEL PANEL FORGOT PASSWORD */}
                <motion.h4
                  initial={{ opacity: 0, y: 20 }} // Invisible y desplazado hacia abajo
                  animate={{ opacity: 1, y: 0 }} // Visible y en posición normal
                  transition={{
                    duration: 0.4, // Duración de la animación
                    ease: "linear", // Velocidad constante
                    delay: 0.4, // Retraso para crear efecto en cascada
                  }}
                  className="poppins-26 blanco pb-4 !font-bold"
                >
                  Recupera tu contraseña
                </motion.h4>
                {/* PÁRRAFO EXPLICATIVO */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }} // Invisible y desplazado hacia abajo
                  animate={{ opacity: 1, y: 0 }} // Visible y en posición normal
                  transition={{
                    duration: 0.4, // Duración de la animación
                    ease: "linear", // Velocidad constante
                    delay: 0.6, // Retraso mayor para que aparezca después del título
                  }}
                  className="poppins-17 blanco-suave"
                >
                  Ingresa tu correo electronico y recibiras un enlace para
                  recuperar el acceso a la plataforma
                </motion.p>
                {/* BOTÓN PARA VOLVER AL LOGIN */}
                <motion.button
                  type="button" // Importante: type="button" para evitar submit del formulario
                  initial={{ opacity: 0, y: 10 }} // Invisible y ligeramente desplazado hacia abajo
                  animate={{ opacity: 1, y: 0 }} // Visible y en posición normal
                  transition={{
                    duration: 0.3, // Animación más rápida
                    ease: "linear", // Velocidad constante
                    delay: 0.8, // Retraso mayor para que aparezca al final
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Previene cualquier comportamiento por defecto
                    setForgotPassword(false); // Oculta el panel de forgot password
                    setLogin(true); // Activa el modo login
                  }}
                  className="mt-4 text-sm text-[#880808] hover:text-[#b60000] hover:underline transition-all duration-300"
                >
                  ← Volver al login
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {/* ===== FORMULARIO PRINCIPAL (ANIMADO) ===== */}
        <motion.form
          // ANIMACIÓN: Cambia la alineación de los elementos internos
          animate={{
            alignItems: login ? "stretch" : "center", // stretch para login, center para forgot password
          }}
          transition={{
            duration: 0.6, // Duración de la animación
            ease: "linear", // Velocidad constante
          }}
          className="flex flex-col gap-4 py-2 w-full"
        >
          {/* ===== CONTENEDOR DE INPUTS (CON LAYOUT ANIMATION) ===== */}
          <motion.div
            className="flex flex-col gap-8 pb-2 w-full"
            layout // Habilita animaciones automáticas cuando cambia el layout
            transition={{ duration: 0.5, ease: "linear" }} // Configuración para layout animations
          >
            {/* ===== INPUT DE EMAIL (SIEMPRE VISIBLE) ===== */}
            <motion.div
              className="w-full border-b border-[#880808] px-2"
              initial={{ opacity: 0, y: 20 }} // Invisible y desplazado hacia abajo
              animate={{ opacity: 1, y: 0 }} // Visible y en posición normal
              transition={{ duration: 0.4, ease: "linear" }} // Animación de entrada
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full blanco poppins-16 placeholder:text-[#880808] bg-transparent outline-none py-2"
                value={email} // Valor controlado por el estado
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando cambia
              />
            </motion.div>
            
            {/* ===== INPUT DE CONTRASEÑA (CONDICIONAL - SOLO EN MODO LOGIN) ===== */}
            <AnimatePresence>
              {login && ( // Solo se muestra cuando estamos en modo login
                <motion.div
                  className="w-full border-b border-[#880808] px-2"
                  // ANIMACIÓN DE ENTRADA: Invisible, desplazado hacia arriba y sin altura
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  // ANIMACIÓN FINAL: Visible, en posición normal y altura automática
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  // ANIMACIÓN DE SALIDA: Vuelve al estado inicial
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.4, ease: "linear" }} // Configuración de la animación
                >
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full blanco poppins-16 placeholder:text-[#880808] bg-transparent outline-none py-2"
                    value={password} // Valor controlado por el estado
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando cambia
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* ===== SECCIÓN "RECUÉRDAME" Y "OLVIDÉ CONTRASEÑA" (CONDICIONAL - SOLO EN MODO LOGIN) ===== */}
          <AnimatePresence>
            {login && ( // Solo se muestra cuando estamos en modo login
              <motion.div
                className="flex w-full justify-between py-4"
                // ANIMACIÓN DE ENTRADA: Invisible, desplazado hacia arriba y sin altura
                initial={{ opacity: 0, y: -20, height: 0 }}
                // ANIMACIÓN FINAL: Visible, en posición normal y altura automática
                animate={{ opacity: 1, y: 0, height: "auto" }}
                // ANIMACIÓN DE SALIDA: Vuelve al estado inicial
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.4, ease: "linear", delay: 0.1 }} // Pequeño retraso
              >
                {/* CHECKBOX "RECUÉRDAME" */}
                <Checkbox
                  className="poppins-16 blanco flex items-center gap-2"
                  label="Recuerdame"
                  checked={rememberMe} // Valor controlado por el estado
                  onChange={() => setRememberMe((prev) => !prev)} // Toggle del estado
                />
                
                {/* BOTÓN "¿OLVIDASTE TU CONTRASEÑA?" */}
                <motion.button
                  type="button" // Importante: evita que actúe como submit
                  // MICRO-ANIMACIONES DE INTERACCIÓN
                  whileHover={{ scale: 1.05 }} // Se agranda ligeramente al pasar el mouse
                  whileTap={{ scale: 0.95 }} // Se encoge ligeramente al hacer clic
                  onClick={(e) => {
                    e.preventDefault(); // Previene comportamiento por defecto
                    setForgotPassword(true); // Muestra el panel de forgot password
                    setLogin(false); // Desactiva el modo login
                  }}
                  transition={{ duration: 0.2 }} // Animación rápida para las interacciones
                >
                  <p className="poppins-16 blanco hover:underline hover:!text-[#b60000] transition-all duration-400">
                    ¿Olvidaste tu contraseña?
                  </p>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ===== BOTÓN PRINCIPAL DE ENVÍO (ANIMADO) ===== */}
          <motion.button
            disabled={loading} // Se desactiva durante el estado de carga
            onClick={handleSubmit} // Maneja el envío del formulario
            // ANIMACIÓN: Cambia el ancho según el estado
            animate={{
              width: login ? "100%" : "50%", // Ancho completo para login, 50% para forgot password
            }}
            // MICRO-ANIMACIONES DE INTERACCIÓN
            whileHover={{ scale: 1.02 }} // Se agranda ligeramente al pasar el mouse
            whileTap={{ scale: 0.98 }} // Se encoge ligeramente al hacer clic
            transition={{
              duration: 0.4, // Duración de la animación de ancho
              ease: "linear", // Velocidad constante
            }}
            className="bg-blanco rounded-[5px] group hover:!bg-[#880808] transition-all duration-400 disabled:opacity-80 disabled:!cursor-not-allowed"
          >
            {/* TEXTO DEL BOTÓN (ANIMADO) */}
            <motion.p
              className={`poppins-16 negro px-4 py-2 group-hover:!text-[#fff] transition-all duration-400 ${
                loading ? "cargando" : "" // Clase adicional cuando está cargando
              }`}
              // ANIMACIÓN: Cambia la opacidad durante la carga
              animate={{
                opacity: loading ? 0.7 : 1, // Más transparente cuando está cargando
              }}
              transition={{ duration: 0.3 }} // Animación rápida de opacidad
            >
              {loading ? "Cargando" : "Ingresar Ahora"} {/* Texto dinámico según el estado */}
            </motion.p>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
