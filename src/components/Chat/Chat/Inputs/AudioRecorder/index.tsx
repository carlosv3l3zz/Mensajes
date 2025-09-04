import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { AudioRecorderProps } from "@/lib/types/Chat";

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSendAudio, onCancel }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(12).fill(24));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const waveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      if (waveTimerRef.current) {
        clearInterval(waveTimerRef.current);
      }
    };
  }, []);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          // Si está pausado, crear un blob temporal para preview
          if (isPaused) {
            const tempBlob = new Blob(chunks, { type: "audio/wav" });
            setAudioBlob(tempBlob);
            setAudioUrl(URL.createObjectURL(tempBlob));
          }
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        // Establecer la duración basada en el tiempo de grabación
        setAudioDuration(recordingTime);
        console.log('Recording stopped, duration set to:', recordingTime);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      startWaveAnimation(); // Iniciar animación de ondas

      // Timer para mostrar el tiempo de grabación
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopWaveAnimation(); // Detener animación de ondas
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const pauseRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      stopWaveAnimation(); // Pausar animación de ondas
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Crear un blob temporal con lo grabado hasta el momento
      mediaRecorderRef.current.requestData();
      // Establecer la duración temporal basada en el tiempo grabado
      setAudioDuration(recordingTime);
      console.log('Recording paused, temporary duration set to:', recordingTime);
    }
  };

  const resumeRecording = (): void => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startWaveAnimation(); // Reanudar animación de ondas
      // Limpiar el preview temporal al reanudar
      setAudioBlob(null);
      setAudioUrl(null);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const deleteRecording = (): void => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    setIsPlaying(false);
    setAudioDuration(0);
    setAudioCurrentTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    if (waveTimerRef.current) {
      clearInterval(waveTimerRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onCancel();
  };

  const sendAudio = (): void => {
    if (audioBlob) {
      onSendAudio(audioBlob);
      deleteRecording();
    }
  };

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

  // Función para animar las ondas de audio de manera fluida
  const startWaveAnimation = (): void => {
    if (waveTimerRef.current) {
      clearInterval(waveTimerRef.current);
    }
    
    waveTimerRef.current = setInterval(() => {
      setWaveHeights(prev => 
        prev.map((_, index) => {
          // Crear ondas más realistas con diferentes frecuencias
          const maxHeight = 35;
          const minHeight = 8;
          
          // Usar seno y coseno para ondas más naturales
           const time = Date.now() / 1000;
           const frequency = 2 + index * 0.3; // Diferentes frecuencias por barra (sin propagación)
           
           const wave = Math.sin(time * frequency) * Math.cos(time * 0.5);
          const normalizedWave = (wave + 1) / 2; // Normalizar entre 0 y 1
          
          return minHeight + (normalizedWave * (maxHeight - minHeight));
        })
      );
    }, 100); // Actualizar cada 100ms para fluidez óptima
  };

  const stopWaveAnimation = (): void => {
    if (waveTimerRef.current) {
      clearInterval(waveTimerRef.current);
      waveTimerRef.current = null;
    }
    // Resetear a altura base
    setWaveHeights(Array(12).fill(24));
  };

  const playAudio = async (): Promise<void> => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        startProgressTimer(); // Iniciar timer fluido
        console.log('Audio started playing');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const pauseAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopProgressTimer(); // Detener timer fluido
    }
  };

  // Maneja cuando se carga el metadata del audio (duración)
  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      console.log('Audio duration loaded:', duration);
      
      // Si la duración es Infinity (común con MediaRecorder), usar el tiempo de grabación
      if (duration === Infinity || isNaN(duration)) {
        setAudioDuration(recordingTime);
        console.log('Using recording time as duration:', recordingTime);
      } else {
        setAudioDuration(duration);
      }
    }
  };

  // Reinicia el progreso cuando termina el audio
  const handleAudioEnded = (): void => {
    setIsPlaying(false);
    setAudioCurrentTime(0);
    stopProgressTimer(); // Detener timer fluido
    console.log('Audio ended');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Iniciar grabación automáticamente al montar el componente
  useEffect(() => {
    startRecording();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-3 w-[50%]"
    >
      {/* Botón de borrar - Elimina la grabación actual y cancela el proceso */}
      <button
        onClick={deleteRecording}
        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
        title="Borrar grabación"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />{" "}
        </svg>
      </button>

      {/* Indicador de grabación */}
      {isRecording && (
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording ? "bg-red-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {formatTime(recordingTime)}
          </span>
        </div>
      )}

      {/* Visualización de audio (ondas fluidas de grabación) */}
      {isRecording && (
        <div className="flex items-center space-x-1 flex-1 w-full">
          {waveHeights.map((height, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-blue-500 transition-all duration-100 ease-out"
              style={{
                height: `${height}px`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Controles de audio - Reproducir/pausar el audio grabado (solo visible cuando hay audio disponible) */}
      {audioUrl && (isPaused || !isRecording) && (
        <>
          {/* Botón de reproducir/pausar - Permite escuchar el audio grabado antes de enviarlo */}
          <button
            onClick={isPlaying ? pauseAudio : playAudio}
            className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            <img
              src={
                isPlaying ? "/svg/mensajes/pause.svg" : "/svg/mensajes/play.svg"
              }
              alt={isPlaying ? "Pausar" : "Reproducir"}
              className="w-4"
            />
          </button>

          <audio
            ref={audioRef}
            src={audioUrl}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnded}
          />
          {/* Barra de progreso del audio */}
          <div className="flex-1 mx-2">
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                style={{
                  width:
                    audioDuration > 0
                      ? `${(audioCurrentTime / audioDuration) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
            {/* Tiempo actual */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(Math.floor(audioCurrentTime))}</span>
            </div>
          </div>
        </>
      )}

      {/* Botones de control de grabación */}
      <div className="flex items-center space-x-2">
        {/* Botón de pausar grabación - Pausa temporalmente la grabación en curso */}
        {isRecording && !isPaused && (
          <button
            onClick={pauseRecording}
            className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
            title="Pausar grabación"
          >
            <img
              src="/svg/mensajes/pause.svg"
              alt="Pausar grabación"
              className="w-4"
            />
          </button>
        )}

        {/* Botón de continuar grabación - Reanuda la grabación después de una pausa */}
        {isPaused && (
          <button
            onClick={resumeRecording}
            className="p-2 text-green-500 hover:text-green-600 transition-colors"
            title="Continuar grabación"
          >
            <img
              src="/svg/mensajes/play.svg"
              alt="Continuar grabación"
              className="w-4"
            />
          </button>
        )}

        {/* Botón de detener grabación - Finaliza completamente la grabación */}
        {isRecording && (
          <button
            onClick={stopRecording}
            className="p-2 text-red-500 hover:text-red-600 transition-colors"
            title="Detener grabación"
          >
            <img
              src="/svg/mensajes/stop.svg"
              alt="Detener grabación"
              className="w-5"
            />
          </button>
        )}

        {/* Botón de enviar audio - Envía el audio grabado al chat (solo visible cuando hay audio listo) */}
        {audioBlob && (isPaused || !isRecording) && (
          <button
            onClick={sendAudio}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            title="Enviar audio"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />{" "}
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AudioRecorder;
