import React from "react";

export const getFileIcon = (fileName?: string, size: string = "w-5 h-5"): React.ReactElement => {
  if (!fileName) {
    return (
      <img 
        src="/svg/mensajes/file-generic.svg" 
        alt="Archivo genérico" 
        className={size} 
      />
    );
  }

  const extension = fileName.toLowerCase().split('.').pop() || '';
  
  // Iconos para imágenes
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-image.svg" 
        alt="Imagen" 
        className={`${size}`} 
      />
    );
  }
  
  // Iconos para videos
  if (['mp4', 'webm', 'ogg', 'avi'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-video.svg" 
        alt="Video" 
        className={`${size}`} 
      />
    );
  }
  
  // Iconos para audio
  if (['mp3', 'wav', 'ogg', 'webm'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-audio.svg" 
        alt="Audio" 
        className={`${size}`} 
      />
    );
  }
  
  // Icono para PDF
  if (extension === 'pdf') {
    return (
      <img 
        src="/svg/mensajes/file-pdf.svg" 
        alt="PDF" 
        className={`${size}`} 
      />
    );
  }
  
  // Iconos para documentos Word
  if (['doc', 'docx'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-word.svg" 
        alt="Documento Word" 
        className={`${size}`} 
      />
    );
  }
  
  // Iconos para hojas de cálculo Excel
  if (['xls', 'xlsx'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-excel.svg" 
        alt="Hoja de cálculo Excel" 
        className={`${size}`} 
      />
    );
  }
  
  // Iconos para archivos comprimidos
  if (['zip', 'rar', '7z'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-zip.svg" 
        alt="Archivo comprimido" 
        className={`${size}`} 
      />
    );
  }
  
  // Iconos para presentaciones PowerPoint
  if (['ppt', 'pptx'].includes(extension)) {
    return (
      <img 
        src="/svg/mensajes/file-powerpoint.svg" 
        alt="Presentación PowerPoint" 
        className={`${size}`} 
      />
    );
  }
  
  // Icono genérico para otros tipos de archivos
  return (
    <img 
      src="/svg/mensajes/file-generic.svg" 
      alt="Archivo genérico" 
      className={size} 
    />
  );
};

// También exportamos una versión que funciona con fileType para compatibilidad con PreviewFile
export const getFileIconByType = (fileType: string, size: string = "w-8 h-8"): React.ReactElement => {
  if (fileType.startsWith("image/")) {
    return (
      <img 
        src="/svg/mensajes/file-image.svg" 
        alt="Imagen" 
        className={`${size} rojo`} 
      />
    );
  } else if (fileType.startsWith("video/")) {
    return (
      <img 
        src="/svg/mensajes/file-video.svg" 
        alt="Video" 
        className={`${size}`} 
      />
    );
  } else if (fileType === "application/pdf") {
    return (
      <img 
        src="/svg/mensajes/file-pdf.svg" 
        alt="PDF" 
        className={`${size}`} 
      />
    );
  } else if (fileType.includes("word") || fileType.includes("document")) {
    return (
      <img 
        src="/svg/mensajes/file-word.svg" 
        alt="Documento Word" 
        className={`${size}`} 
      />
    );
  } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
    return (
      <img 
        src="/svg/mensajes/file-excel.svg" 
        alt="Hoja de cálculo Excel" 
        className={`${size}`} 
      />
    );
  } else if (
    fileType.includes("powerpoint") ||
    fileType.includes("presentation")
  ) {
    return (
      <img 
        src="/svg/mensajes/file-powerpoint.svg" 
        alt="Presentación PowerPoint" 
        className={`${size}`} 
      />
    );
  } else if (fileType.includes("audio/")) {
    return (
      <img 
        src="/svg/mensajes/file-audio.svg" 
        alt="Audio" 
        className={`${size}`} 
      />
    );
  } else {
    return (
      <img 
        src="/svg/mensajes/file-generic.svg" 
        alt="Archivo genérico" 
        className={`${size}`} 
      />
    );
  }
};