import React from "react";
import { motion } from "framer-motion";
import Checkbox from "../UI/Checkbox";

interface LoginProps {
  handleSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  showPass: () => void;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  handleShowForgotPassword: () => void;
  loading: boolean;
}

const Login: React.FC<LoginProps> = ({ handleSubmit, email, setEmail, password, setPassword, showPassword, showPass, rememberMe, setRememberMe, handleShowForgotPassword, loading }) => {
  return (
    <motion.form
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 py-2 w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <motion.div
        className="flex flex-col gap-8 pb-2 w-full"
        layout
        transition={{ duration: 0.5, ease: "linear" }}
      >

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
          />
        </motion.div>

        <motion.div
          className="w-full border-b border-[#880808] px-2 flex items-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "linear", delay: 0.1 }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full blanco poppins-16 placeholder:text-[#880808] bg-transparent outline-none py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={
              showPassword
                ? "/svg/login/eye-selected.svg"
                : "/svg/login/eye.svg"
            }
            className="cursor-pointer w-6"
            onClick={showPass}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex w-full justify-between py-4"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear", delay: 0.2 }}
      >
        {/* checkbox de recuerdame */}
        <Checkbox
          className="poppins-16 blanco flex items-center gap-2"
          label="Recuerdame"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />

        {/* boton de olvidaste tu contraseña */}
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

      {/* boton de ingresar */}
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
  );
};

export default Login;
