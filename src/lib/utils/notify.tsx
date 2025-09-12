import React from 'react';
import { toast, type ToastOptions } from 'react-toastify';
import '@/css/notify.css';

type NotificationType = 'info' | 'success' | 'error' | 'warning';

interface ShowNotificationProps {
  message: string;
  description?: string;
  type?: NotificationType;
}

interface NotificationConfig {
  duration: number;
  className: string;
}

const getNotificationConfig = (type: NotificationType): NotificationConfig => {
  const configs: Record<NotificationType, NotificationConfig> = {
    success: {
      duration: 4000,
      className: 'toast-success',
    },
    error: {
      duration: 6000,
      className: 'toast-error',
    },
    warning: {
      duration: 5000,
      className: 'toast-warning',
    },
    info: {
      duration: 4000,
      className: 'toast-info',
    },
  };

  return configs[type];
};

// Componente personalizado para el contenido del toast
const ToastContent: React.FC<{ message: string; description?: string }> = ({ 
  message, 
  description
}) => (
  <div className="toast-content">
    <div className="toast-text">
      <div className="toast-message">{message}</div>
      {description && <div className="toast-description">{description}</div>}
    </div>
  </div>
);

export const showNotification = ({ message, description, type = 'info' }: ShowNotificationProps): void => {
  const config = getNotificationConfig(type);
  
  const toastOptions: ToastOptions = {
    autoClose: config.duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: config.className,
    progressClassName: `toast-progress-${type}`,
    position: 'top-left',
  };

  const content = (
    <ToastContent 
      message={message} 
      description={description}
    />
  );

  // Usar el método específico de toast según el tipo
  switch (type) {
    case 'success':
      toast.success(content, toastOptions);
      break;
    case 'error':
      toast.error(content, toastOptions);
      break;
    case 'warning':
      toast.warn(content, toastOptions);
      break;
    case 'info':
    default:
      toast.info(content, toastOptions);
      break;
  }
};