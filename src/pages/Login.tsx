import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ForgotPassword from "./ForgotPassword";
import LoginForm from "@/components/Login";
import { showNotification } from "@/lib/utils/notify";

export const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // funciones de manejo
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // validaciones
    if (!email.trim()) {
      showNotification({
        message: "Campo requerido",
        description: "Por favor, ingresa tu email",
        type: "error"
      });
      return;
    }

    if (!validateEmail(email)) {
      showNotification({
        message: "Email inválido",
        description: "Por favor, ingresa un email válido",
        type: "error"
      });
      return;
    }

    if (!password.trim()) {
      showNotification({
        message: "Campo requerido",
        description: "Por favor, ingresa tu contraseña",
        type: "error"
      });
      return;
    }

    setLoading(true);
    
    showNotification({
      message: "Iniciando sesión...",
      description: "Validando credenciales",
      type: "info"
    });

    // simula una peticion al servidor con setTimeout
    setTimeout(() => {
      setLoading(false);
      showNotification({
        message: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
        type: "success"
      });
      navigate("/chat");
    }, 3000);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };
  
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPass = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
     className="w-screen h-screen flex justify-center items-center ">
      {/* imagen de fondo */}
      <div className="w-full h-full bg-[url('/images/login/background.png')] bg-cover bg-center absolute -z-10 blur-[10px]" />

      {/* contenedor principal del formulario (animado) */}
      <motion.div
        // animacion: cambia el ancho según el estado (24% para login, 32% para forgot password)
        animate={{
          width: !showForgotPassword ? "24%" : "32%",
          backgroundColor: !showForgotPassword ? "#000000de" : "#ffffff0f",
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        className={`flex flex-col rounded-[25px] justify-center py-8 gap-4 border border-[#880808] ${
          !showForgotPassword ? "items-center px-4" : "items-start px-6"
        }`}
      >
        {/* seccion del header (logo + componente forgot-password) */}
        <motion.div
          animate={{
            justifyContent: !showForgotPassword ? "center" : "space-between",
          }}
          transition={{
            duration: 0.4,
            ease: "linear",
          }}
          className="flex items-center w-full"
        >
          {/* LOGO/IMAGEN PRINCIPAL (ANIMADO) */}
          <motion.div
            animate={{
              scale: !showForgotPassword ? 1 : 0.8,
              x: !showForgotPassword ? 0 : -10,
            }}
            transition={{
              duration: 0.4,
              ease: "linear",
            }}
            className="bg-[url('/favicon/favicon.png')] bg-cover bg-center w-[10rem] h-[10rem] rounded-[25px]"
          />
          
          {/* componente forgot-password (condicional) */}
          {showForgotPassword && (
            <ForgotPassword
              onBackToLogin={handleBackToLogin}
              email={email}
              setEmail={setEmail}
            />
          )}
        </motion.div>

        {/* formulario principal (solo visible en modo login) */}
        <AnimatePresence>
          {!showForgotPassword && (
             <LoginForm
               handleSubmit={handleSubmit}
               email={email}
               setEmail={handleEmailChange}
               password={password}
               setPassword={handlePasswordChange}
               showPassword={showPassword}
               showPass={showPass}
               rememberMe={rememberMe}
               setRememberMe={setRememberMe}
               handleShowForgotPassword={handleShowForgotPassword}
               loading={loading}
             />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Login;
