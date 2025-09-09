import React, { useState } from "react";
import Checkbox from "@/components/UI/Checkbox";
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/tareas");
    }, 3000);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/**form */}
      <div className="flex flex-col rounded-[25px] justify-center items-center px-4 py-8 gap-4 border border-[#880808] w-[24%]">
        <div className="bg-[url('/favicon/favicon.png')] bg-cover bg-center w-[10rem] h-[10rem] rounded-[25px]" />
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 w-full"
        >
          <div className="flex flex-col gap-8 pb-2 w-full">
            <div className="w-full border-b border-[#880808] px-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full blanco poppins-16 placeholder:text-[#880808]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full border-b border-[#880808] px-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full blanco poppins-16 placeholder:text-[#880808]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-between py-4">
            <Checkbox
              className="poppins-16 blanco flex items-center gap-2"
              label="Recuerdame"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
            <Link to="forgot-password">
              <p className="poppins-16 blanco">¿Olvidaste tu contraseña?</p>
            </Link>
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`bg-blanco cursor-pointer rounded-[10px]`}
          >
            <p
              className={`poppins-16 negro px-4 py-2 ${
                loading ? "cargando" : ""
              }`}
            >
              {loading ? "Cargando" : "Ingresar Ahora"}
            </p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
