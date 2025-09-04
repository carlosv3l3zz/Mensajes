import React, { useState } from 'react';
import InputTextNoLabel from '@/components/UI/InputTextNoLabel'

export const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState<string>('')

  return (
    <div className='w-screen h-screen flex justify-center items-center gap-2'>
      <div className='w-full h-[calc(100%_-_24px)] mx-[16px] rounded-[25px] bg-[url(/images/ForgotPassword/forgot.png)] bg-cover bg-center flex justify-center items-center'>

        <div className='w-[50vw] max-w-[862px] h-[50vh] max-h-[460px] bg-blanco rounded-[35px] flex justify-center items-center'>

          <form action="" className='flex flex-col justify-center items-center gap-[10px] w-[50%] min-h-[400px] h-full'>
            <img src="/images/Login/togrowGif.gif" alt="" className='min-w-[374px] w-[374px]'/>
            <p className='poppins-32 w-full text-left'>Recupera tu contraseña</p>
            <p className='poppins-16 w-full text-left gris-oscuro'>Escribe tu correo electrónico y te llegará un enlace para que recuperes tu acceso a la plataforma</p>
            <InputTextNoLabel placeholder='Correo electrónico' value={email} className='w-full' onChange={(e) => setEmail(e.target.value)} icon='/svg/icons/email.svg' />
            <button className='h-[51px] bg-verde-agua blanco poppins-16 w-full'>Enviar enlace de recuperación</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
