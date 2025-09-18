import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useLocation } from 'react-router-dom'
import { showAlert } from "@/lib/utils/showAlert";
import InputPassword from '@/components/UI/InputPassword'
import '@/css/kmeter.css'
import { motion } from "framer-motion";

interface PasswordConditions {
  lengthValid: boolean;
  numberValid: boolean;
  specialValid: boolean;
  coincide: boolean;
}

const Reset = () => {
  const [activeCount, setActiveCount] = useState<number>(0);
  const [leavingCount, setLeavingCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [conditions, setConditions] = useState<PasswordConditions>({
    lengthValid: false,
    numberValid: false,
    specialValid: false,
    coincide: false,
  });

  //const location = useLocation();
  //const params = new URLSearchParams(location.search);
  //const token = params.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        showAlert("Error", "Las contraseñas no coinciden");
        return;
      }
      if (!conditions.lengthValid) {
        showAlert("Error", "La contraseña debe tener al menos 8 caracteres");
        return;
      }
      if (!conditions.numberValid) {
        showAlert("Error", "La contraseña debe tener al menos un número");
        return;
      }
      if (!conditions.specialValid) {
        showAlert("Error", "La contraseña debe tener al menos un caracter especial");
        return;
      }
      setLoading(true);
      //await resetPassword(token, password);
      showAlert("¡Éxito!", "Contraseña restablecida correctamente");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      showAlert("Error", "No se pudo restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const lengthValid = newPassword.length >= 8;
    const numberValid = /\d/.test(newPassword);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const coincide = newPassword === password2;

    setConditions((prev) => ({
      ...prev,
      lengthValid,
      numberValid,
      specialValid,
      coincide,
    }));

    const newCount = Number(lengthValid) + Number(numberValid) + Number(specialValid);

    if (newCount < activeCount) {
      setLeavingCount(activeCount - newCount);
      setTimeout(() => setLeavingCount(0), 400);
    }

    setActiveCount(newCount);
  };

  const handlePasswordChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword2 = e.target.value;
    setPassword2(newPassword2);
    setConditions((prev) => ({
      ...prev,
      coincide: newPassword2 === password,
    }));
  };

  const getSVG = (type: "check" | "error") =>
    type === "check" ? (
      <img src="/svg/login/good.svg" alt="" />
    ) : (
      <img src="/svg/login/error.svg" alt="" />
    );

  const getSVGinput = (type: "check" | "error") => type === "check" ? "/svg/login/padlock-green.svg" : "/svg/login/padlock-red.svg";

  const getColor = (): string => {
    if (activeCount === 3) return "bg-verde verde";
    if (activeCount === 2) return "bg-amarillo amarillo";
    if (activeCount === 1) return "bg-amarillo amarillo";
    return "bg-rojo rojo";
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
     className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full bg-[url('/images/login/background.png')] bg-cover bg-center absolute -z-10 blur-[10px]" />
      <div className="w-full h-full flex flex-col justify-center items-center relative gap-[40px]">

        <div className="w-[90%] h-[90%] max-w-[619px] max-h-[600px] border border-[#fff] shadow-lg bg-[#000000de] rounded-[35px] px-[70px] py-[20px] flex flex-col justify-center items-center gap-[40px]">
          
          <div className="flex flex-col justify-center items-start gap-[10px] w-full pt-[45px]">
            <p className="poppins-32 blanco">Restablecer Contraseña</p>
            <p className="poppins-16 blanco">Ingresa tu nueva contraseña</p>
          </div>

          <div className="w-full h-[90%] flex flex-col justify-center items-start gap-[20px]">
            <form
              className="w-full h-full flex flex-col justify-start gap-[10px]"
              onSubmit={handleSubmit}
            >
                <InputPassword placeholder='Password' value={password} className='w-full' onChange={handlePasswordChange} icon={conditions.lengthValid && conditions.numberValid && conditions.specialValid ? getSVGinput("check") : getSVGinput("error")} label='Contraseña Nueva'/>

              <div className="mb-[10px] flex gap-[6px]">
                {[...Array(activeCount)].map((_, i) => (
                  <div key={`active-${i}`} className={`${getColor()} custom-confirm h-[4px] rounded-full`} />
                ))}
                {[...Array(leavingCount)].map((_, i) => (
                  <div key={`leaving-${i}`} className={`${getColor()} custom-confirm shrink h-[4px] rounded-full`} />
                ))}
              </div>

              <div>
                <p className={`p-reset textos-peques rojo flex gap-2 ${conditions.lengthValid ? "valid" : "invalid"}`}>
                  {getSVG(conditions.lengthValid ? "check" : "error")} 8 caracteres
                </p>
                <p className={`p-reset textos-peques rojo flex gap-2 ${conditions.numberValid ? "valid" : "invalid"}`}>
                  {getSVG(conditions.numberValid ? "check" : "error")} Debe contener al menos un número
                </p>
                <p className={`p-reset textos-peques salmon flex gap-2 ${conditions.specialValid ? "valid" : "invalid"}`}>
                  {getSVG(conditions.specialValid ? "check" : "error")} Debe contener al menos un caracter especial
                </p>
              </div>

                <InputPassword placeholder='Password' value={password2} className='w-full' onChange={handlePasswordChange2} icon={conditions.coincide ? getSVGinput("check") : getSVGinput("error")} label='Confirmar contraseña'/>

              <div>
                <p className={`p-reset textos-peques flex gap-2 ${conditions.coincide ? "valid" : "invalid"}`}>
                  {getSVG(conditions.coincide ? "check" : "error")} La contraseña coincide
                </p>
              </div>

              <div className="flex items-center justify-between w-full py-4">
                <button
                  disabled={loading}
                  className={`p-2 bg-rojo border-2 border-[#000] hover:!border-[#b60000] poppins-16 hover:!bg-[#000] hover:!text-[#b60000] rounded-[5px] transition-all duration-500 ${loading ? "cargando" : ""}`}
                >
                  {loading ? "Procesando" : "Restablecer contraseña"}
                </button>
                <Link
                  to="/"
                  className="negro poppins-16 flex items-center bg-rojo2 p-2 hover:!bg-[#b60000] hover:!text-white rounded-[5px] transition-all duration-300"
                >
                  <img src="/svg/icons/user.svg" alt="" />
                  Iniciar Sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reset;