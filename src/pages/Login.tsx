import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Checkbox from '@/components/UI/Checkbox'
import InputText from '@/components/UI/InputText'
import InputPassword from '@/components/UI/InputPassword'
declare function showAlert(title: string, message: string): void;

interface AuthResponse {
  token: string;
  [key: string]: unknown;
}

interface FormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      showAlert('Error', 'Incomplete fields');
      return;
    }

    try {
      const response = await axios.post<AuthResponse>('auth/login', {
        username: email,
        password,
      });

      const { data } = response;
      if (data?.token) {
        localStorage.setItem('authResponse', JSON.stringify(data));
        navigate('/dashboard');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errMsg = axiosError.response?.data;

      if (errMsg === 'invalid credentials: authentication error: JIFU responded 401') {
        showAlert('Error', 'Incorrect data');
      } else {
        showAlert('Error', 'An unexpected error occurred. Please try again.');
        console.error(error);
      }
    }
  };

  return (
    <div className='w-screen h-screen flex justify-between gap-2'>
      {/**form */}
      <div className='w-[45%] h-full flex flex-col'>

        <div className='w-[100%] h-[100%] flex flex-col px-[80px] py-[43px]'>

          <img src="/images/Login/togrowGif.gif" alt="" className='min-w-[424px] w-[424px]'/>

          <form action="" className='flex flex-col gap-[16px] items-start justify-start w-[calc(100%_-_80px)] py-[40px] h-full' onSubmit={handleSubmit}>
            
            <p className='negro poppins-32 !text-left'>Hola, Bienvenido</p>
            <p className='negro poppins-16 !text-left'>Ingresa tu usuario y contraseña para acceder a la plataforma</p>

              <InputText placeholder='Email' value={formData.email} className='w-full mt-[48px]' onChange={(e) => handleChange(e, 'email')} icon='/svg/icons/user.svg' label='Correo Electrónico'/>

              <InputPassword placeholder='Password' value={formData.password} className='w-full' onChange={(e) => handleChange(e, 'password')} icon='/svg/icons/padlock-blue.svg' label='Escribe tu contraseña'/>

              <div className='flex w-full justify-between'>
                <Checkbox className='poppins-16' label='Recordar datos de usuario' checked={rememberMe} onChange={() => setRememberMe((prev) => !prev)}/>
                <Link to='forgot-password' className='azul-navy poppins-16'>¿Olvidaste tu contraseña?</Link>
              </div>


              <button type={'submit'} className='w-[278px] blanco poppins-16 bg-verde-agua h-[51px] cursor-pointer'>
                Ingresar Ahora
              </button>

          </form>
        </div>
      </div>
      {/**background */}
      <div className='w-[55%] h-full bg-[url(/images/Login/RightImage.png)] bg-cover bg-left'></div>
    </div>
  )
}

export default Login;
