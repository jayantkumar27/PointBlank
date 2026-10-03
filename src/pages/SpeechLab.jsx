import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CHALLENGE_TOPICS } from '../topics.js';

export default function SpeechLab() {
  const [appState, setAppState] = useState('IDLE'); // IDLE, PREP, SPEAK, ANALYZING, RESULT
  const [currentTopic, setCurrentTopic] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState(90);

  const [streak, setStreak] = useState(0);
  const [feedbackData, setFeedbackData] = useState(null);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [audioLevel, setAudioLevel] = useState([35, 75, 45, 90, 60, 20, 80, 50, 65, 30, 85, 40]);
  const [errorMsg, setErrorMsg] = useState('');

  const [timeSpent, setTimeSpent] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("");

  const isRecording = appState === 'SPEAK';
  const isAnalyzing = appState === 'ANALYZING';

  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('speech_lab_streak');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed && typeof parsed.streak === 'number') {
          setStreak(parsed.streak);
        }
      }
    } catch (e) {
      console.error("Failed to load streak from localStorage", e);
    }
  }, []);

  useEffect(() => {
    let secondsSpent = 0;
    setCurrentTime(new Date().toLocaleTimeString());

    const interval = setInterval(() => {
      secondsSpent += 1;
      const minutes = Math.floor(secondsSpent / 60);
      const seconds = secondsSpent % 60;
      setTimeSpent(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("YOUR PATHETIC BROWSER DOES NOT SUPPORT SPEECH RECOGNITION. UPGRADE IMMEDIATELY.");
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
         setErrorMsg('');
      };

      recognition.onresult = (event) => {
        setErrorMsg('');
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          transcriptRef.current += ' ' + finalTranscript;
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
           setErrorMsg("MICROPHONE ACCESS DENIED. COWARD. ENABLE IT TO PROCEED.");
           if (appState === 'SPEAK') setAppState('IDLE');
        } else if (event.error === 'audio-capture' || event.error === 'network') {
           setErrorMsg(`SPEECH RECOGNITION FAILED: ${event.error.toUpperCase()}`);
           if (appState === 'SPEAK') setAppState('IDLE');
        }
      };

      recognitionRef.current = recognition;
    }
  }, [appState]);

  // Timer when recording for audio level visualizer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Array.from({ length: 14 }, () => Math.floor(Math.random() * 85) + 15));
      }, 150);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Main countdown timer logic for Prep, Organize, and Speak phases
  useEffect(() => {
    let timerId = null;
    if (appState === 'PREP' || appState === 'ORGANIZE' || appState === 'SPEAK') {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            handlePhaseComplete(appState);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [appState, selectedTime]);

  const handlePhaseComplete = (completedPhase) => {
    if (completedPhase === 'PREP') {
      setAppState('ORGANIZE');
      setTimeLeft(10);
    } else if (completedPhase === 'ORGANIZE') {
      setAppState('SPEAK');
      setTimeLeft(selectedTime);
      transcriptRef.current = '';
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.error(err);
          setErrorMsg("FAILED TO START MICROPHONE. TRY AGAIN.");
        }
      }
    } else if (completedPhase === 'SPEAK') {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
      setAppState('ANALYZING');
      // Cut off - user ran out of 90s time
      analyzeTranscript(null, true);
    }
  };

  const startChallenge = () => {
    if (errorMsg && errorMsg.includes("BROWSER DOES NOT SUPPORT")) return;
    const randomTopic = CHALLENGE_TOPICS[Math.floor(Math.random() * CHALLENGE_TOPICS.length)];
    setCurrentTopic(randomTopic);
    setAppState('PREP');
    setTimeLeft(20);
    setFeedbackData(null);
    setShakeScreen(false);
    setErrorMsg('');
  };

  const analyzeTranscript = async (textToAnalyze, isCutOff = false) => {
      const text = (textToAnalyze || transcriptRef.current).trim();
      
      if (!text) {
         setAppState('RESULT');
         setFeedbackData({
            isFail: true,
            grade: "F",
            verdict: "PREP FRAMEWORK FAILURE",
            score: "0/100",
            breakdown: "POINT: NO | REASON: NO | EXAMPLE: NO | CONCLUSION: NO",
            critique: "You didn't say a single word. Silence isn't a communication strategy. Absolute failure.",
            harshTip: "FIX: FOLLOW THE DAMN PREP FRAMEWORK. DO NOT SKIP STEPS.",
            rewrite: "N/A"
         });
         setShakeScreen(true);
         setStreak(prev => {
            const next = Math.max(0, prev - 1);
            localStorage.setItem('speech_lab_streak', JSON.stringify({ streak: next, date: new Date().toISOString().split('T')[0] }));
            return next;
         });
         setTimeout(() => setShakeScreen(false), 700);
         return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
        
        let sysInstruction = "You are a brutally honest, unforgiving English communication coach. Read the user's transcript and evaluate it strictly against the PREP (Point, Reason, Example, Point) framework. Do not over-correct minor grammar; focus entirely on their logical structure. If they ramble or miss a step, give them brutal, harsh, and direct feedback. In addition to your strict boolean evaluation and brutal feedback, you must act as a master speechwriter. Take the user's messy transcript and rewrite it into a highly polished, presentable, and articulate speech that perfectly follows the PREP framework. Output ONLY a JSON object containing: a boolean for each PREP stage (has_point, has_reason, has_example, has_point_conclusion), a 'brutal_feedback' string, and a 'presentable_rewrite' string.";

        if (isCutOff) {
            sysInstruction += " If the text abruptly cuts off, you must fail them for missing the final Point/Conclusion of the PREP framework, as they ran out of time.";
        }

        const response = await ai.models.generateContent({
            model: 'gemma-4-26b-a4b-it',
            contents: text,
            config: {
                systemInstruction: sysInstruction
            }
        });
        
        let rawText = response.text || "";
        rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        let parsed;
        try {
            parsed = JSON.parse(rawText);
        } catch (parseError) {
            console.error("Failed to parse JSON:", rawText, parseError);
            throw new Error("AI returned invalid format.");
        }
        
        const prepScore = [parsed.has_point, parsed.has_reason, parsed.has_example, parsed.has_point_conclusion]
            .filter(Boolean).length;
            
        const isFail = prepScore < 4;
        
        setFeedbackData({
            isFail: isFail,
            grade: isFail ? (prepScore === 0 ? "F" : prepScore <= 2 ? "D" : "C-") : "A",
            verdict: isFail ? "PREP FRAMEWORK FAILURE" : "ADEQUATE STRUCTURE",
            score: `${prepScore * 25}/100`,
            breakdown: `POINT: ${parsed.has_point ? 'YES' : 'NO'} | REASON: ${parsed.has_reason ? 'YES' : 'NO'} | EXAMPLE: ${parsed.has_example ? 'YES' : 'NO'} | CONCLUSION: ${parsed.has_point_conclusion ? 'YES' : 'NO'}`,
            critique: parsed.brutal_feedback,
            harshTip: isFail ? "FIX: FOLLOW THE DAMN PREP FRAMEWORK. DO NOT SKIP STEPS." : "FIX: MAINTAIN THIS BARE MINIMUM STANDARD.",
            rewrite: parsed.presentable_rewrite
        });
        
        if (isFail) {
            setShakeScreen(true);
            setStreak(prev => {
                const next = Math.max(0, prev - 1);
                localStorage.setItem('speech_lab_streak', JSON.stringify({ streak: next, date: new Date().toISOString().split('T')[0] }));
                return next;
            });
            setTimeout(() => setShakeScreen(false), 700);
        } else {
            setStreak(prev => {
                const next = prev + 1;
                localStorage.setItem('speech_lab_streak', JSON.stringify({ streak: next, date: new Date().toISOString().split('T')[0] }));
                return next;
            });
        }

      } catch (err) {
          console.error("GenAI API Error:", err);
          setErrorMsg("API FAILURE. THE AI REFUSED TO LISTEN TO YOUR DRIVEL (OR RATE LIMIT HIT). CHECK CONSOLE.");
      } finally {
          setAppState('RESULT');
      }
  };

  const manualTriggerHarsh = () => {
    setAppState('ANALYZING');
    if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
    }
    analyzeTranscript("Um, I think we should do this because... yeah, it's just a good idea.", true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#e2dbce] border-[12px] border-[#121212] ${shakeScreen ? 'shake-active' : ''}`}>
      
      {/* TOP HAZARD WARNING STRIP */}
      <div className="w-full h-4 hazard-stripe border-b-4 border-[#121212]"></div>

      {errorMsg && (
        <div className="w-full bg-[#d91b00] text-white font-black text-center p-4 border-b-8 border-[#121212] uppercase tracking-widest animate-pulse shadow-brutal-sm">
           CRITICAL ERROR: {errorMsg}
        </div>
      )}

      {/* COMPACT UTILITY TOP BAR WITH RAISED BUTTON-STYLE STREAK */}
      <header className="w-full bg-[#121212] text-[#ffdd00] border-b-8 border-[#121212] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#0038ff] text-[#ffffff] font-black px-4 py-2 text-2xl tracking-tighter border-4 border-[#121212] shadow-brutal-sm">
            POINTBLANK
          </div>
          <div className="text-sm tracking-widest text-[#e2dbce] uppercase font-bold border-l-4 border-[#ffdd00] pl-4 hidden md:block">
            UNFORGIVING ORAL COACH // ZERO SOFT CRITICISM
          </div>
        </div>

        {/* PUNCHY TACTILE BUTTON-STYLE STREAK COUNTER WITH DEEP SOLID BLACK SHADOW */}
        <div className="flex items-center gap-4">
          <div className="bg-[#d91b00] text-[#ffffff] border-4 border-[#121212] px-6 py-2.5 flex items-center gap-3 shadow-brutal-streak transform transition-transform active:translate-x-1 active:translate-y-1">
            <span className="text-2xl leading-none">🔥</span>
            <span className="font-black text-2xl tracking-tight uppercase">Streak: {streak}</span>
          </div>
          <div className="bg-[#ff5500] text-[#ffffff] font-black border-4 border-[#121212] px-3 py-2 text-sm uppercase shadow-brutal-sm">
            {streak === 0 ? "STATUS: DISGRACE" : streak > 3 ? "STATUS: TOLERATED" : "STATUS: ON NOTICE"}
          </div>
        </div>
      </header>

      {/* MAIN ASYMMETRICAL BLOCK GRID */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-8">
        
        {/* TOP ASYMMETRICAL SPLIT: PROTOCOL BLOCK (LEFT) vs SYSTEM TELEMETRY/TRIGGERS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* TOP-LEFT: PROTOCOL 01 IN VIBRANT MUSTARD YELLOW BLOCK */}
          <div className="lg:col-span-8 bg-[#ffdd00] border-8 border-[#121212] p-6 md:p-8 shadow-brutal-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#121212] text-[#ffdd00] text-xs font-black uppercase px-2.5 py-1 tracking-widest border-2 border-[#121212]">
                  PROTOCOL 01
                </span>
                <span className="bg-[#0038ff] text-white text-xs font-black uppercase px-2.5 py-1 tracking-widest border-2 border-[#121212]">
                  STAGE: RAPID RESPONSE
                </span>
              </div>
              <h1 className="font-serif-brutal text-3xl md:text-5xl lg:text-6xl text-[#121212] tracking-tight leading-none uppercase">
                THINK FAST. SPEAK SHARP.
              </h1>
            </div>
            <div className="mt-4 pt-4 border-t-4 border-[#121212]">
              <p className="font-mono-brutal font-bold text-sm md:text-base text-[#121212] leading-snug">
                20 SECONDS TO PREPARE. 90 SECONDS TO SPEAK. NO EXCUSES.
              </p>
            </div>
          </div>

          {/* TOP-RIGHT: STANDBY STATUS, SESSION TIMER & QUICK ACTION BLOCK */}
          <div className="lg:col-span-4 bg-[#ff5500] border-8 border-[#121212] p-6 shadow-brutal-card flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="bg-[#121212] text-[#ffffff] px-4 py-2 text-sm font-bold border-4 border-[#121212] shadow-brutal-sm">
                MODE: PRESSURE COOKER
              </div>
              
              <div className="bg-[#ffffff] text-[#121212] p-3 border-4 border-[#121212] flex items-center justify-center shadow-brutal-sm">
                <span className="text-xl font-black tracking-widest uppercase">SESSION TIME:</span>
                <span className="font-mono-brutal font-black text-xl text-[#d91b00]">{timeSpent}</span>
              </div>

              <div className="bg-[#121212] text-[#ffdd00] px-3 py-2 text-xs font-black uppercase tracking-wider border-2 border-[#121212]">
                {isRecording ? "MIC LIVE // AUDIO INTAKE ACTIVE" : isAnalyzing ? "AI RUNNING PARSER ENGINE" : "MIC STANDBY // READY"}
              </div>
            </div>

            <div 
              className="w-full bg-[#d91b00] text-white font-black text-xl py-3 px-4 border-4 border-[#121212] shadow-brutal-sm uppercase text-center"
            >
              {currentTime}
            </div>
          </div>

        </div>

        {/* CENTRAL FOCAL STAGE: DARK CHARCOAL SLAB HOUSING MASSIVE PHYSICAL RECORD BUTTON */}
        <div className="w-full bg-[#121212] border-8 border-[#121212] p-6 md:p-10 shadow-brutal-card relative flex flex-col items-center justify-center">
          
          {/* Telemetry Corner Tags */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="bg-[#ffdd00] text-[#121212] border-4 border-[#121212] px-3 py-1 text-xs font-black uppercase shadow-brutal-sm">
              AUDIO INPUT PORT 01 // DIRECT DUAL-BUS
            </div>
            <div className="bg-[#121212] text-[#ffdd00] border-4 border-[#ffdd00] px-3 py-1 text-xs font-black uppercase shadow-brutal-sm">
              CADENCE TELEMETRY ENGINE
            </div>
          </div>

          {appState === 'IDLE' || appState === 'RESULT' ? (
            <div className="my-8 flex flex-col items-center gap-6 w-full max-w-lg">
              <h2 className="text-white text-3xl md:text-5xl font-black font-serif-brutal uppercase text-center mb-2">
                READY FOR A NEW TOPIC?
              </h2>

              <div className="flex flex-col items-center gap-2 mb-4 w-full">
                <span className="text-[#ffdd00] font-black tracking-widest text-sm uppercase">SELECT SPEAKING TIME:</span>
                <div className="flex w-full gap-4">
                   {[50, 70, 90].map(t => (
                     <button
                       key={t}
                       onClick={() => setSelectedTime(t)}
                       className={`flex-1 font-black text-xl md:text-2xl py-3 border-4 border-[#121212] transition-none shadow-brutal-sm ${selectedTime === t ? 'bg-[#d91b00] text-white' : 'bg-[#e2dbce] text-[#121212] hover:bg-[#ffdd00]'}`}
                     >
                       {t}s
                     </button>
                   ))}
                </div>
              </div>

              <button 
                onClick={startChallenge}
                className="w-full bg-[#ffdd00] text-[#121212] font-black text-2xl md:text-4xl uppercase px-8 py-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all cursor-pointer select-none"
              >
                START CHALLENGE
              </button>
            </div>
          ) : (
            <div className="my-6 w-full flex flex-col items-center">
              
              {currentTopic && (
                <div className={`border-4 border-[#121212] p-6 w-full max-w-2xl mb-8 shadow-brutal-sm text-center flex flex-col gap-4 ${appState === 'PREP' ? 'bg-[#ffdd00]' : appState === 'ORGANIZE' ? 'bg-[#ff5500]' : 'bg-[#e2dbce]'}`}>
                   <div>
                     <h3 className="text-2xl md:text-4xl font-black font-serif-brutal text-[#121212] uppercase tracking-tight mb-2">
                       {currentTopic.title}
                     </h3>
                     {appState !== 'PREP' && (
                       <p className="text-sm md:text-base font-bold font-mono-brutal text-[#121212]">
                         {currentTopic.summary}
                       </p>
                     )}
                   </div>
                   {appState === 'PREP' && currentTopic.definition && (
                     <div className="bg-[#121212] text-white p-4 border-2 border-[#121212] shadow-brutal-sm text-left">
                       <span className="text-xs font-black uppercase tracking-widest text-[#ffdd00] block mb-1">DEFINITION:</span>
                       <span className="font-mono-brutal font-bold text-sm">{currentTopic.definition}</span>
                     </div>
                   )}
                </div>
              )}

              {/* Timer Display */}
              <div className="flex flex-col items-center mb-6">
                <div className={`border-4 border-[#121212] px-6 py-4 flex flex-col items-center shadow-brutal-sm ${appState === 'PREP' ? 'bg-[#ffdd00]' : appState === 'ORGANIZE' ? 'bg-[#ff5500]' : appState === 'SPEAK' ? 'bg-[#d91b00]' : 'bg-[#ffffff]'}`}>
                  <span className={`text-sm font-black tracking-widest uppercase mb-1 ${appState === 'SPEAK' ? 'text-[#ffdd00]' : 'text-[#121212]'}`}>
                    {appState === 'PREP' ? 'STAGE 1: COMPREHENSION' : appState === 'ORGANIZE' ? 'STAGE 2: ORGANIZE THOUGHTS' : appState === 'SPEAK' ? 'STAGE 3: EXECUTION' : 'ANALYZING...'}
                  </span>
                  <span className={`font-mono-brutal font-black text-6xl ${appState === 'SPEAK' ? 'text-white' : 'text-[#121212]'}`}>
                    {appState === 'ANALYZING' ? '---' : timeLeft + 's'}
                  </span>
                </div>
              </div>

              {appState === 'SPEAK' && (
                <div className="flex flex-col items-center w-full">
                   <div className="text-[#ffdd00] font-black tracking-widest mb-4 animate-pulse uppercase">
                     MICROPHONE ACTIVE - SPEAK NOW
                   </div>
                   <div className="w-full max-w-md bg-[#181818] p-3 border-4 border-[#ffdd00] shadow-brutal-sm flex items-end justify-center gap-1.5 h-20">
                     {audioLevel.map((lvl, idx) => (
                       <div key={idx} className="w-5 bg-[#ffdd00] border border-[#121212]" style={{ height: `${lvl}%` }}></div>
                     ))}
                   </div>
                </div>
              )}

            </div>
          )}

          {/* Status banner under microphone */}
          <div className="w-full max-w-xl bg-[#ffdd00] text-[#121212] font-mono-brutal text-center py-2.5 px-4 border-4 border-[#121212] shadow-brutal-sm text-xs font-black uppercase tracking-wider mt-8">
            {appState === 'IDLE' ? "SYSTEM READY: AWAITING INITIATION" : appState === 'PREP' ? "GATHER YOUR THOUGHTS. PREPARE THE PREP STRUCTURE." : appState === 'SPEAK' ? "WARNING: DO NOT PAUSE. HESITATION DEDUCTS IMMEDIATE SCORE." : "SYSTEM READY"}
          </div>
        </div>

        {/* FULL-WIDTH BOTTOM SECTION: BRUTAL CRITIQUE TERMINAL */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between bg-[#121212] text-[#ffdd00] px-5 py-3 border-4 border-[#121212] shadow-brutal-sm">
            <span className="font-black tracking-widest text-sm uppercase">BRUTAL CRITIQUE TERMINAL // OUTPUT FEED</span>
            <span className="font-bold text-xs uppercase text-[#e2dbce]">AUTO-EVALUATOR V4.8</span>
          </div>

          {/* Feedback Display Container with heavy bouncy layout shift when rendered */}
          <div className={`w-full min-h-[340px] bg-[#2a2a2a] border-8 border-[#121212] shadow-brutal-card p-6 md:p-8 flex flex-col justify-between ${feedbackData ? 'bounce-drop' : ''}`}>
            
            {feedbackData ? (
              <div className="flex flex-col gap-6">
                {/* Header line of verdict */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-[#ffdd00] pb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`px-5 py-3 text-4xl font-black font-serif-brutal border-4 border-[#121212] shadow-brutal-sm ${
                      feedbackData.isFail ? 'bg-[#d91b00] text-white' : 'bg-[#ffdd00] text-black'
                    }`}>
                      {feedbackData.grade}
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-[#ffdd00]">PRIMARY VERDICT</div>
                      <div className="text-2xl md:text-3xl font-black text-white uppercase font-mono-brutal">
                        {feedbackData.verdict}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#121212] border-4 border-[#ffdd00] px-4 py-2 text-right shadow-brutal-sm">
                    <div className="text-xs font-bold text-[#ffdd00] uppercase">SCORE ASSIGNED</div>
                    <div className="text-2xl font-black text-white">{feedbackData.score}</div>
                  </div>
                </div>

                {/* Harsh AI Body Critique */}
                <div className="bg-[#121212] border-4 border-[#ff5500] p-6 text-white font-mono-brutal shadow-brutal-sm">
                  <div className="text-xs font-bold text-[#d91b00] uppercase tracking-wider mb-2">
                    EXECUTIVE REVIEW // UNRESTRICTED AI FEEDBACK
                  </div>
                  <p className="text-lg md:text-xl font-bold leading-relaxed tracking-tight text-[#ffdd00]">
                    "{feedbackData.critique}"
                  </p>
                </div>

                {/* Breakdown and actionable fix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#121212] p-4 border-4 border-[#0038ff] text-white shadow-brutal-sm">
                    <div className="text-xs font-black text-[#e2dbce] uppercase tracking-wider mb-1">
                      TELEMETRY & CADENCE ANOMALIES
                    </div>
                    <p className="text-sm font-bold text-[#e2dbce]">
                      {feedbackData.breakdown}
                    </p>
                  </div>

                  <div className="bg-[#d91b00] p-4 border-4 border-[#121212] text-white shadow-brutal-sm">
                    <div className="text-xs font-black text-black uppercase tracking-wider mb-1 bg-[#ffdd00] inline-block px-1">
                      IMMEDIATE MANDATORY REMEDY
                    </div>
                    <p className="text-sm font-black text-white">
                      {feedbackData.harshTip}
                    </p>
                  </div>
                </div>

                {/* Presentable Rewrite Box */}
                {feedbackData.rewrite && (
                  <div className="bg-white border-4 border-[#121212] p-6 text-[#121212] font-serif-brutal shadow-brutal-sm mt-4">
                    <div className="text-xs font-black text-white bg-[#0038ff] inline-block px-2 py-1 uppercase tracking-wider mb-3 border-2 border-[#121212]">
                      MASTER SPEECHWRITER // PRESENTABLE REWRITE
                    </div>
                    <p className="text-base md:text-lg font-bold leading-relaxed whitespace-pre-wrap">
                      {feedbackData.rewrite}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[#e2dbce]">
                <div className="w-16 h-16 bg-[#ffdd00] border-4 border-[#121212] shadow-brutal-sm flex items-center justify-center font-black text-[#121212] text-2xl mb-4">
                  !
                </div>
                <h2 className="font-serif-brutal text-2xl md:text-3xl text-white uppercase tracking-tight">
                  NO AUDIT DATA GENERATED YET
                </h2>
                <p className="font-mono-brutal text-sm text-[#ffdd00] max-w-md mt-2 font-bold uppercase">
                  HIT THE START CHALLENGE BUTTON ABOVE. YOU HAVE 20 SECONDS TO PREPARE AND 90 SECONDS TO DELIVER A PERFECT PREP STRUCTURE.
                </p>
              </div>
            )}

            {/* Footer specs inside feedback area */}
            <div className="mt-6 pt-4 border-t-2 border-[#121212] flex flex-wrap items-center justify-between text-xs text-[#e2dbce] font-mono-brutal">
              <span>SAMPLE RATE: 48.0 KHZ</span>
              <span>LATENCY: 18MS</span>
              <span>EVALUATION MODEL: BRUTAL-SPEECH-NEO</span>
            </div>
          </div>
        </div>

      </main>

      {/* BRUTALIST BOTTOM BAR */}
      <footer className="w-full bg-[#121212] text-[#ffdd00] border-t-8 border-[#121212] p-4 flex flex-col md:flex-row items-center justify-between text-xs font-bold gap-3">
        <div>
          BRUTAL SPEECH COACH © 2025 // STRICT NEO-BRUTALISM RUNTIME
        </div>
        <div className="flex flex-wrap gap-3 uppercase">
          <span className="bg-[#ffdd00] text-[#121212] px-2 py-0.5 border-2 border-[#121212]">SHARP 0PX CORNERS</span>
          <span className="bg-[#0038ff] text-white px-2 py-0.5 border-2 border-[#121212]">TACTILE SHADOWS</span>
          <span className="bg-[#ff5500] text-white px-2 py-0.5 border-2 border-[#121212]">COLOR BLOCKING</span>
          <span className="bg-[#2a2a2a] text-[#ffdd00] px-2 py-0.5 border border-[#ffdd00]">SOLID CONTRAST</span>
        </div>
      </footer>
    </div>
  );
}
