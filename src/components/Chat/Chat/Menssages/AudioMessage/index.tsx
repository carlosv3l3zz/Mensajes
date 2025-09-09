import React, { useState, useRef, useEffect } from "react";
import type { AudioMessageProps } from "@/lib/types/Chat";

const AudioMessage: React.FC<AudioMessageProps> = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  // Función para actualizar el progreso de manera fluida
  const startProgressTimer = (): void => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    progressTimerRef.current = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setAudioCurrentTime(audioRef.current.currentTime);
      }
    }, 50); // Actualizar cada 50ms para mayor fluidez
  };

  const stopProgressTimer = (): void => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const playAudio = async (): Promise<void> => {
    if (audioRef.current) {
      try {
        console.log('AudioMessage: Attempting to play audio, src:', audioRef.current.src);
        console.log('AudioMessage: Audio readyState:', audioRef.current.readyState);
        console.log('AudioMessage: Audio duration:', audioRef.current.duration);
        
        await audioRef.current.play();
        setIsPlaying(true);
        startProgressTimer();
        console.log('AudioMessage: Audio started playing successfully');
      } catch (error) {
        console.error('AudioMessage: Error playing audio:', error);
      }
    } else {
      console.error('AudioMessage: audioRef.current is null');
    }
  };

  const pauseAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopProgressTimer();
    }
  };

  // Maneja cuando se carga el metadata del audio (duración)
  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      console.log('AudioMessage: Audio duration loaded:', duration);
      
      // Primero intentar usar la duración personalizada del mensaje
      const customDuration = (message as any).audioDuration;
      if (customDuration && customDuration > 0) {
        setAudioDuration(customDuration);
        console.log('AudioMessage: Using custom duration from message:', customDuration);
        return;
      }
      
      // Si la duración es Infinity (común con MediaRecorder), usar estimación
      if (duration === Infinity || isNaN(duration)) {
        // Intentar calcular duración basada en el tamaño del archivo
        const estimatedDuration = message.fileSize ? Math.max(1, Math.floor(message.fileSize / 16000)) : 30;
        setAudioDuration(estimatedDuration);
        console.log('AudioMessage: Using estimated duration:', estimatedDuration);
      } else {
        setAudioDuration(duration);
        console.log('AudioMessage: Using actual duration:', duration);
      }
    }
  };

  // Reinicia el progreso cuando termina el audio
  const handleAudioEnded = (): void => {
    setIsPlaying(false);
    setAudioCurrentTime(0);
    stopProgressTimer();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const audioUrl = message.file ? URL.createObjectURL(message.file) : message.fileUrl;
  
  // Debug logging para el audio y establecer duración inicial
  useEffect(() => {
    console.log('AudioMessage: Component mounted/updated');
    console.log('AudioMessage: message.file:', message.file);
    console.log('AudioMessage: message.fileSize:', message.fileSize);
    console.log('AudioMessage: audioUrl:', audioUrl);
    
    // Establecer duración personalizada si está disponible
    const customDuration = (message as any).audioDuration;
    if (customDuration && customDuration > 0) {
      setAudioDuration(customDuration);
      console.log('AudioMessage: Set initial custom duration:', customDuration);
    }
  }, [message.file, audioUrl, message]);

  return (
    <div className="flex items-center space-x-3 min-w-[200px]">
      {/* Botón de reproducir/pausar */}
      <button
        onClick={isPlaying ? pauseAudio : playAudio}
        className={`p-2 rounded-full transition-colors ${
          message.senderId === "me"
            ? "text-white hover:bg-[#b60000]"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        title={isPlaying ? "Pausar" : "Reproducir"}
      >
        <img
          src={
            isPlaying ? "/svg/mensajes/pause.svg" : "/svg/mensajes/play.svg"
          }
          alt={isPlaying ? "Pausar" : "Reproducir"}
          className={`w-4 h-4 ${
            message.senderId === "me" ? "filter invert" : ""
          }`}
        />
      </button>

      {/* Audio element oculto */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
          preload="metadata"
        />
      )}

      {/* Barra de progreso y tiempo */}
      <div className="flex-1">
        <div className={`w-full rounded-full h-1.5 ${
          message.senderId === "me" ? "bg-blue-400" : "bg-gray-300"
        }`}>
          <div
            className={`h-1.5 rounded-full transition-all duration-100 ${
              message.senderId === "me" ? "bg-white" : "bg-rojo"
            }`}
            style={{
              width:
                audioDuration > 0
                  ? `${(audioCurrentTime / audioDuration) * 100}%`
                  : "0%",
            }}
          ></div>
        </div>
        
        {/* Tiempo actual y duración */}
        <div className="flex justify-between text-xs mt-1">
          <span className={`${
            message.senderId === "me" ? "text-blue-100" : "text-gray-500"
          }`}>
            {formatTime(audioCurrentTime)}
          </span>
          <span className={`${
            message.senderId === "me" ? "text-blue-100" : "text-gray-500"
          }`}>
            {formatTime(audioDuration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioMessage;
