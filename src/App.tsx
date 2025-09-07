import { useEffect } from "react";
//import type { ReactNode } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import { disconnectSocket } from "@/settings/socket";
import useAuth from "@/lib/hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import PrincipalLayout from "@/lib/layouts/PrincipalLayout";

import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Tasks from "@/pages/Tasks";
import Chat from "@/pages/Chat";

{
  /*interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (auth === null) return <Navigate to="/" />;
  return children;
};*/
}

function App() {
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth) return;

    const handleDisconnect = () => {
      disconnectSocket();
    };

    window.addEventListener("beforeunload", handleDisconnect);

    return () => {
      window.removeEventListener("beforeunload", handleDisconnect);
      handleDisconnect();
    };
  }, [auth, location.pathname]);

  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/tareas"
          element={
            <PrincipalLayout>
              <Tasks />
            </PrincipalLayout>
          }
        />

        <Route
          path="/chat"
          element={
            <PrincipalLayout>
              <Chat />
            </PrincipalLayout>
          }
        />

        {/* Ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
