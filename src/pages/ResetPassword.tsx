import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useLocation } from 'react-router-dom'
import { showAlert } from "@/lib/utils/showAlert";
import InputPassword from '@/components/UI/InputPassword'
import '@/css/kmeter.css'
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
      <img src="/svg/icons/good.svg" alt="" />
    ) : (
      <img src="/svg/icons/error.svg" alt="" />
    );

  const getSVGinput = (type: "check" | "error") => type === "check" ? "/svg/icons/padlock-blue.svg" : "/svg/icons/padlock-red.svg";

  const getColor = (): string => {
    if (activeCount === 3) return "bg-verde1 verde1";
    if (activeCount === 2) return "bg-advertencia2 advertencia2";
    if (activeCount === 1) return "bg-advertencia advertencia";
    return "bg-salmon salmon";
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url(/images/ResetPassword/background.png)] bg-cover bg-center">
      <div className="w-full h-full flex flex-col justify-center items-center relative gap-[40px]">

        <img src="/images/ResetPassword/togrowBlanco.gif" className="w-[349px]" />

        <div className="w-[90%] h-[90%] max-w-[619px] max-h-[600px] bg-blanco rounded-[35px] px-[70px] py-[20px] flex flex-col justify-center items-center gap-[40px]">
          
          <div className="flex flex-col justify-center items-start gap-[10px] w-full pt-[45px]">
            <p className="poppins-32">Restablecer Contraseña</p>
            <p className="poppins-16">Ingresa tu correo electrónico y recibirás un enlace para recuperar el acceso a la plataforma </p>
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
                <p className={`p-reset textos-peques salmon ${conditions.lengthValid ? "valid" : "invalid"}`}>
                  {getSVG(conditions.lengthValid ? "check" : "error")} 8 caracteres
                </p>
                <p className={`p-reset textos-peques salmon ${conditions.numberValid ? "valid" : "invalid"}`}>
                  {getSVG(conditions.numberValid ? "check" : "error")} Debe contener al menos un número
                </p>
                <p className={`p-reset textos-peques salmon ${conditions.specialValid ? "valid" : "invalid"}`}>
                  {getSVG(conditions.specialValid ? "check" : "error")} Debe contener al menos un caracter especial
                </p>
              </div>

                <InputPassword placeholder='Password' value={password2} className='w-full' onChange={handlePasswordChange2} icon={conditions.coincide ? getSVGinput("check") : getSVGinput("error")} label='Confirmar contraseña'/>

              <div>
                <p className={`p-reset textos-peques ${conditions.coincide ? "valid" : "invalid"}`}>
                  {getSVG(conditions.coincide ? "check" : "error")} La contraseña coincide
                </p>
              </div>

              <div className="flex items-center justify-start gap-[50px] w-full">
                <button
                  disabled={loading}
                  className={`w-[50%] py-[20px] px-[20px] bg-verde-agua blanco poppins-16 ${loading ? "cargando" : ""}`}
                >
                  {loading ? "Procesando" : "Recuperar contraseña"}
                </button>
                <Link
                  to="/"
                  className="w-[50%] negro poppins-16 flex items-center gap-[10px]"
                >
                    <img src="/svg/icons/user.svg" alt="" />
                  Iniciar Sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;