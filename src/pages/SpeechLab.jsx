import React, { useState, useEffect, useRef } from 'react';

const APP_FEEDBACK_PRESETS = [
  {
    grade: "F",
    verdict: "PITIABLE HESITATION",
    score: "24/100",
    breakdown: "14 FILLER WORDS DETECTED IN 9 SECONDS. YOUR VOCAL CADENCE SOUNDED TERRIFIED.",
    critique: "STOP MUTTERING LIKE AN UNPREPARED INTERN. YOUR CADENCE COLLAPSED AT SECOND 4. SPEAK WITH FORCE OR DO NOT BOTHER SPEAKING AT ALL.",
    harshTip: "FIX: HOLD EYE CONTACT, EXHALE COMPLETELY, CUT OUT 'UM' AND 'LIKE' PERMANENTLY.",
    isFail: true
  },
  {
    grade: "D-",
    verdict: "WEAK PROJECTION",
    score: "41/100",
    breakdown: "MONOTONE FLATLINE DETECTED. ENERGY VARIANCE LESS THAN 6%.",
    critique: "A HYPNOTIST WOULD ADMIRE YOUR MONOTONE. AN AUDIENCE WILL EVACUATE. YOU SOUND UNCONVINCED BY YOUR OWN ARGUMENT.",
    harshTip: "FIX: PUNCH CONSONANTS. VARY PITCH ACROSS TRANSITIONS.",
    isFail: true
  },
  {
    grade: "F+",
    verdict: "RAMBLING AND UNSTRUCTURED",
    score: "32/100",
    breakdown: "NO THESIS STATEMENT LOCATED IN 42 WORDS. 8 VOCAL FRY OCCURRENCES.",
    critique: "YOU WANDERED ACROSS THREE CLAUSES WITHOUT MAKING A SINGLE AUDIBLE POINT. SHUT YOUR MOUTH WHEN A SENTENCE CONCLUDES.",
    harshTip: "FIX: STATE CONCLUSION FIRST. DELETE PARENTHETICAL QUALIFIERS.",
    isFail: true
  },
  {
    grade: "A",
    verdict: "BARELY ACCEPTABLE",
    score: "89/100",
    breakdown: "ZERO FILLER WORDS. STEADY 138 WPM. DIRECT ARTICULATION.",
    critique: "UNEXPECTEDLY ADEQUATE. DO NOT GET COMPLACENT. YOUR VOLUME NEARLY DIPPED ON THE TERMINAL SYLLABLE.",
    harshTip: "FIX: EXTEND DIAPHRAGM CONTROL INTO COMPLEX VOCABULARY.",
    isFail: false
  }
];

export default function SpeechLab() {
      const [isRecording, setIsRecording] = useState(false);
      const [recordTime, setRecordTime] = useState(0);
      const [streak, setStreak] = useState(1);
      const [feedbackData, setFeedbackData] = useState(null);
      const [isAnalyzing, setIsAnalyzing] = useState(false);
      const [shakeScreen, setShakeScreen] = useState(false);
      const [presetIndex, setPresetIndex] = useState(0);
      const [audioLevel, setAudioLevel] = useState([35, 75, 45, 90, 60, 20, 80, 50, 65, 30, 85, 40]);

      // Timer when recording
      useEffect(() => {
        let interval = null;
        if (isRecording) {
          interval = setInterval(() => {
            setRecordTime(prev => prev + 1);
            setAudioLevel(Array.from({ length: 14 }, () => Math.floor(Math.random() * 85) + 15));
          }, 150);
        } else {
          setRecordTime(0);
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isRecording]);

      const triggerRecording = () => {
        if (!isRecording) {
          setIsRecording(true);
          setFeedbackData(null);
          setShakeScreen(false);
        } else {
          setIsRecording(false);
          setIsAnalyzing(true);

          setTimeout(() => {
            setIsAnalyzing(false);
            const currentPreset = APP_FEEDBACK_PRESETS[presetIndex % APP_FEEDBACK_PRESETS.length];
            setPresetIndex(prev => prev + 1);
            setFeedbackData(currentPreset);

            if (currentPreset.isFail) {
              setShakeScreen(true);
              setStreak(prev => Math.max(0, prev - 1));
              setTimeout(() => setShakeScreen(false), 700);
            } else {
              setStreak(prev => prev + 1);
            }
          }, 1100);
        }
      };

      const manualTriggerHarsh = () => {
        setIsAnalyzing(false);
        setIsRecording(false);
        const failPreset = APP_FEEDBACK_PRESETS[0];
        setFeedbackData(failPreset);
        setShakeScreen(true);
        setStreak(prev => Math.max(0, prev - 1));
        setTimeout(() => setShakeScreen(false), 700);
      };

      return (
        <div className={`min-h-screen flex flex-col bg-[#e2dbce] border-[12px] border-[#121212] ${shakeScreen ? 'shake-active' : ''}`}>
          
          {/* TOP HAZARD WARNING STRIP */}
          <div className="w-full h-4 hazard-stripe border-b-4 border-[#121212]"></div>

          {/* COMPACT UTILITY TOP BAR WITH RAISED BUTTON-STYLE STREAK */}
          <header className="w-full bg-[#121212] text-[#ffdd00] border-b-8 border-[#121212] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#0038ff] text-[#ffffff] font-black px-4 py-2 text-2xl tracking-tighter border-4 border-[#121212] shadow-brutal-sm">
                RAW SPEECH AI
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
                      STAGE: INTAKE DIRECTIVE
                    </span>
                  </div>
                  <h1 className="font-serif-brutal text-3xl md:text-5xl lg:text-6xl text-[#121212] tracking-tight leading-none uppercase">
                    DELIVER YOUR PITCH.
                  </h1>
                </div>
                <div className="mt-4 pt-4 border-t-4 border-[#121212]">
                  <p className="font-mono-brutal font-bold text-sm md:text-base text-[#121212] leading-snug">
                    NO STUTTERING. NO HESITATING. NO APOLOGIZING. HIT RECORD AND SPEAK FOR AT LEAST 10 SECONDS.
                  </p>
                </div>
              </div>

              {/* TOP-RIGHT: STANDBY STATUS, SESSION TIMER & QUICK ACTION BLOCK */}
              <div className="lg:col-span-4 bg-[#ff5500] border-8 border-[#121212] p-6 shadow-brutal-card flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="bg-[#121212] text-[#ffffff] px-4 py-2 text-sm font-bold border-4 border-[#121212] shadow-brutal-sm">
                    MODE: ULTRA-BRUTAL EVALUATION
                  </div>
                  
                  <div className="bg-[#ffffff] text-[#121212] p-3 border-4 border-[#121212] flex items-center justify-between shadow-brutal-sm">
                    <span className="text-xs font-black tracking-widest uppercase">CLOCK:</span>
                    <span className="font-mono-brutal font-black text-xl text-[#d91b00]">SESSION TIME: {recordTime}S</span>
                  </div>

                  <div className="bg-[#121212] text-[#ffdd00] px-3 py-2 text-xs font-black uppercase tracking-wider border-2 border-[#121212]">
                    {isRecording ? "MIC LIVE // AUDIO INTAKE ACTIVE" : isAnalyzing ? "AI RUNNING PARSER ENGINE" : "MIC STANDBY // READY"}
                  </div>
                </div>

                <button 
                  onClick={manualTriggerHarsh} 
                  className="w-full bg-[#d91b00] text-white font-black text-sm py-3 px-4 border-4 border-[#121212] active:translate-x-1 active:translate-y-1 shadow-brutal-sm uppercase hover:bg-black transition-none cursor-pointer"
                >
                  TEST HARSH REACTION
                </button>
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

              {/* MASSIVE SOLID-COLORED CIRCULAR RECORDING BUTTON WITH 12PX SOLID OFFSET DROP SHADOW */}
              <div className="my-6 flex flex-col items-center">
                <button
                  onClick={triggerRecording}
                  disabled={isAnalyzing}
                  className={`mic-circle w-64 h-64 md:w-80 md:h-80 border-[10px] border-[#121212] flex flex-col items-center justify-center cursor-pointer select-none transition-none shadow-brutal-mic ${
                    isRecording 
                      ? 'bg-[#d91b00] text-white recording-pulse' 
                      : isAnalyzing 
                        ? 'bg-[#ffdd00] text-[#121212]' 
                        : 'bg-[#ffdd00] text-[#121212]'
                  }`}
                  style={{
                    backgroundColor: isRecording ? '#d91b00' : isAnalyzing ? '#ffdd00' : '#ffdd00'
                  }}
                  title="Click to Record Microphone"
                >
                  {/* Central Icon representation using geometric CSS */}
                  {isRecording ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-[#121212] border-4 border-white mb-3"></div>
                      <span className="font-black text-2xl tracking-tighter uppercase font-mono-brutal">STOP NOW</span>
                      <span className="text-xs font-bold uppercase mt-1 tracking-widest bg-black text-white px-2 py-0.5">RECORDING...</span>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 border-8 border-t-[#d91b00] border-r-[#121212] border-b-[#d91b00] border-l-[#121212] animate-spin mb-4"></div>
                      <span className="font-black text-xl tracking-tighter uppercase font-mono-brutal text-center">ANALYZING FLAWS...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-20 bg-[#121212] border-4 border-[#121212] mic-circle mb-1"></div>
                      <div className="w-20 h-8 border-b-8 border-x-8 border-[#121212] mb-1"></div>
                      <div className="w-4 h-6 bg-[#121212]"></div>
                      <div className="w-20 h-4 bg-[#121212] mt-0.5"></div>
                      <span className="font-black text-3xl tracking-tighter uppercase font-mono-brutal mt-3">RECORD</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#121212]">CLICK TO COMMENCE</span>
                    </div>
                  )}
                </button>

                {/* VISUALIZER FOR ACTIVE RECORDING */}
                {isRecording && (
                  <div className="mt-8 w-full max-w-md bg-[#181818] p-3 border-4 border-[#ffdd00] shadow-brutal-sm flex items-end justify-center gap-1.5 h-20">
                    {audioLevel.map((lvl, idx) => (
                      <div 
                        key={idx} 
                        className="w-5 bg-[#ffdd00] border border-[#121212]" 
                        style={{ height: `${lvl}%` }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status banner under microphone */}
              <div className="w-full max-w-xl bg-[#ffdd00] text-[#121212] font-mono-brutal text-center py-2.5 px-4 border-4 border-[#121212] shadow-brutal-sm text-xs font-black uppercase tracking-wider">
                {isRecording ? "WARNING: DO NOT PAUSE. HESITATION DEDUCTS IMMEDIATE SCORE." : "SYSTEM READY: AWAITING VOICE PACKETS"}
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
                      HIT THE MASSIVE YELLOW MICROPHONE BUTTON ABOVE TO RECORD YOUR SPEECH. AI WILL ANALYZE CADENCE, TIMING, WEAKNESS, AND MONOTONE IN REAL TIME.
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
