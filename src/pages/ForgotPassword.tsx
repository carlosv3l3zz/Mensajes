import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgotPasswordProps {
  onBackToLogin: () => void;
  email: string;
  setEmail: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onBackToLogin,
  email,
  setEmail,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula envío de email de recuperación
    setTimeout(() => {
      setLoading(false);
      // Aquí podrías mostrar un mensaje de éxito o redirigir
      alert("Se ha enviado un enlace de recuperación a tu email");
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          x: 50,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          x: 50,
          scale: 0.9,
        }}
        transition={{
          duration: 0.5,
          ease: "linear",
          delay: 0.2,
        }}
        className="poppins-17 w-[65%] bg-gradient-to-r from-[#ffffff0f] to-[#000000dd] rounded-[10px] p-6"
      >
        {/* TÍTULO DEL PANEL FORGOT PASSWORD */}
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "linear",
            delay: 0.4,
          }}
          className="poppins-26 blanco pb-4 !font-bold"
        >
          Recupera tu contraseña
        </motion.h4>

        {/* PÁRRAFO EXPLICATIVO */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "linear",
            delay: 0.6,
          }}
          className="poppins-17 blanco"
        >
          Ingresa tu correo electronico y recibiras un enlace para recuperar el
          acceso a la plataforma
        </motion.p>

        {/* FORMULARIO DE RECUPERACIÓN */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "linear",
            delay: 0.7,
          }}
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-8"
        >
          {/* INPUT DE EMAIL PARA RECUPERACIÓN */}
          <div className="w-full border-b border-[#880808] px-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full blanco poppins-16 placeholder:text-[#880808] bg-transparent outline-none py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* BOTÓN DE ENVIAR RECUPERACIÓN */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-blanco negro rounded-[5px] px-4 py-2 hover:!bg-[#880808] hover:!text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? "cargando" : ""}`}
          >
            {loading ? "Enviando" : "Enviar enlace"}
          </motion.button>
        </motion.form>

        {/* BOTÓN PARA VOLVER AL LOGIN */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "linear",
            delay: 1,
          }}
          onClick={(e) => {
            e.preventDefault();
            onBackToLogin();
          }}
          className="!mt-4 text-sm rojo2 hover:!text-[#b60000] hover:underline transition-all duration-300"
        >
          ← Volver al login
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPassword;
