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

  // Función utilitaria para manejar el timer de manera segura
  const startTimer = (): void => {
    console.log('AudioRecorder: Starting timer...');
    if (timerRef.current) {
      console.log('AudioRecorder: Clearing existing timer before starting new one');
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        const newTime = prev + 1;
        console.log('AudioRecorder: Timer tick, new time:', newTime);
        return newTime;
      });
    }, 1000);
    console.log('AudioRecorder: Timer started successfully');
  };

  const stopTimer = (): void => {
    console.log('AudioRecorder: Stopping timer...');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      console.log('AudioRecorder: Timer stopped successfully');
    } else {
      console.log('AudioRecorder: No timer to stop');
    }
  };

  const startRecording = async (): Promise<void> => {
    try {
      console.log('AudioRecorder: Starting recording...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          console.log('AudioRecorder: Data available, chunk size:', event.data.size);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('AudioRecorder: MediaRecorder stopped, creating final blob...');
        const blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
        console.log('AudioRecorder: Created final blob:', blob);
        console.log('AudioRecorder: Final blob size:', blob.size);
        console.log('AudioRecorder: Final blob type:', blob.type);
        
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        console.log('AudioRecorder: Audio URL created:', url);
        
        // Detener completamente el stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
            console.log('AudioRecorder: Track stopped:', track.kind);
          });
          streamRef.current = null;
        }
      };

      mediaRecorder.start(100); // Recopilar datos cada 100ms
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      startWaveAnimation();

      // Timer para mostrar el tiempo de grabación
      startTimer();
      
      console.log('AudioRecorder: Recording started successfully');
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
    }
  };

  const stopRecording = (): void => {
    console.log('AudioRecorder: Stopping recording...');
    if (mediaRecorderRef.current && (isRecording || isPaused)) {
      // Guardar el tiempo de grabación antes de resetear el estado
      const finalRecordingTime = recordingTime;
      
      // Detener el MediaRecorder
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      
      // Limpiar timers
      stopTimer();
      
      // Actualizar estados
      setIsRecording(false);
      setIsPaused(false);
      stopWaveAnimation();
      
      // IMPORTANTE: NO detener el stream aquí, se detendrá en sendAudio() o deleteRecording()
      // Esto permite que el audio se procese correctamente antes de liberar el stream
      
      // Establecer la duración final basada en el tiempo de grabación guardado
      setAudioDuration(finalRecordingTime);
      console.log('AudioRecorder: Recording stopped, duration set to:', finalRecordingTime);
    }
  };

  const pauseRecording = (): void => {
    console.log('AudioRecorder: Pausing recording...');
    console.log('AudioRecorder: Current state before pause:', {
      isRecording,
      isPaused,
      mediaRecorderState: mediaRecorderRef.current?.state,
      timerExists: !!timerRef.current,
      currentTime: recordingTime
    });
    
    if (mediaRecorderRef.current && isRecording && mediaRecorderRef.current.state === 'recording') {
      // PRIMERO: Detener el timer ANTES de hacer cualquier otra cosa
      stopTimer();
      
      // SEGUNDO: Pausar el MediaRecorder
      mediaRecorderRef.current.pause();
      console.log('AudioRecorder: MediaRecorder paused');
      
      // TERCERO: Actualizar estados
      setIsPaused(true);
      stopWaveAnimation();
      
      // CUARTO: Crear blob temporal
      mediaRecorderRef.current.requestData();
      
      // QUINTO: Establecer duración
      setAudioDuration(recordingTime);
      console.log('AudioRecorder: Recording paused completely, final time:', recordingTime);
    } else {
      console.log('AudioRecorder: Cannot pause - invalid state');
    }
  };

  const resumeRecording = (): void => {
    console.log('AudioRecorder: Resuming recording...');
    if (mediaRecorderRef.current && isPaused && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startWaveAnimation();
      
      // Limpiar el preview temporal al reanudar
      setAudioBlob(null);
      setAudioUrl(null);
      
      // Reanudar el timer
      startTimer();
      
      console.log('AudioRecorder: Recording resumed');
    }
  };

  const deleteRecording = (): void => {
    console.log('AudioRecorder: Deleting recording and cleaning up...');
    
    // Detener MediaRecorder si está activo
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    // Limpiar todos los timers
    stopTimer();
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (waveTimerRef.current) {
      clearInterval(waveTimerRef.current);
      waveTimerRef.current = null;
    }
    
    // Detener y limpiar el stream (si aún no se ha hecho)
    if (streamRef.current) {
      console.log('AudioRecorder: Stopping remaining stream tracks during cleanup...');
      streamRef.current.getTracks().forEach((track) => {
        if (track.readyState !== 'ended') {
          track.stop();
          console.log('AudioRecorder: Track stopped during cleanup:', track.kind);
        } else {
          console.log('AudioRecorder: Track was already stopped:', track.kind);
        }
      });
      streamRef.current = null;
    } else {
      console.log('AudioRecorder: No stream to clean up');
    }
    
    // Limpiar URLs de blob para evitar memory leaks
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    // Resetear todos los estados
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    setIsPlaying(false);
    setAudioDuration(0);
    setAudioCurrentTime(0);
    
    console.log('AudioRecorder: Cleanup completed');
    onCancel();
  };

  const sendAudio = (): void => {
    if (audioBlob) {
      console.log('AudioRecorder: Sending audio blob:', audioBlob);
      console.log('AudioRecorder: Blob size:', audioBlob.size);
      console.log('AudioRecorder: Blob type:', audioBlob.type);
      console.log('AudioRecorder: Audio duration:', audioDuration);
      
      // PRIMERO: Detener y limpiar el stream INMEDIATAMENTE
      console.log('AudioRecorder: Stopping stream before sending...');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          console.log('AudioRecorder: Track stopped before send:', track.kind);
        });
        streamRef.current = null;
      }
      
      // SEGUNDO: Detener MediaRecorder si aún está activo
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        console.log('AudioRecorder: MediaRecorder stopped before send');
      }
      
      // TERCERO: Crear blob con metadatos
      const audioWithDuration = new Blob([audioBlob], { 
        type: audioBlob.type 
      });
      
      // Agregar la duración como propiedad personalizada
      (audioWithDuration as any).duration = audioDuration;
      
      // CUARTO: Enviar el audio
      onSendAudio(audioWithDuration);
      
      // QUINTO: Limpiar el resto
      deleteRecording();
    } else {
      console.error('AudioRecorder: No audio blob available to send');
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
              className="w-1.5 rounded-full bg-rojo transition-all duration-100 ease-out"
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
            className="p-2 text-rojo hover:text-[#880808] transition-colors"
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
                className="bg-rojo h-2 rounded-full transition-all duration-100"
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
            className="p-2 text-rojo hover:text-[#880808] transition-colors"
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
            className="p-2 transition-colors"
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
            className="p-2 transition-colors"
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
            className="p-2 bg-rojo text-white rounded-full hover:bg-[#880808] transition-colors"
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
