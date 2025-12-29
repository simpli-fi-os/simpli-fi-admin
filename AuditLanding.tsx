import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  Cpu, 
  ArrowRight, 
  Loader2, 
  Lock,
  Terminal as TerminalIcon,
  X
} from 'lucide-react';

// --- THEME CONSTANTS (SIMPLI-FI OS) ---
const THEME = {
  canopy: '#001E17',
  fern: '#002E24',
  moss: '#064E3B',
  neon: '#CCFF00',
  teal: '#14B8A6',
  red: '#D60036',
  orange: '#FF5F1F',
  white: '#F8FAFC',
  slate: '#94A3B8'
};

export default function AuditLanding() {
  // State: 'idle' | 'scanning' | 'complete'
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // --- LOGIC: SIMULATE PYTHON BACKEND ---
  const simulateScan = () => {
    setStatus('scanning');
    setLogs([]);
    setProgress(0);

    const steps = [
      { msg: 'INITIALIZING_VERTEX_AI_AGENT...', delay: 800, color: 'text-teal-400' },
      { msg: 'INGESTING_PDF: "Q3_Fee_Invoice.pdf"', delay: 1500, color: 'text-white' },
      { msg: 'OCR_PROCESS: EXTRACTING_TABLES...', delay: 2400, color: 'text-slate-400' },
      { msg: '> RUNNING: simplifi.core.waterfall.calculate_pref()', delay: 3200, color: 'text-neon' },
      { msg: '> VERIFYING_WITH_GROK_API...', delay: 4500, color: 'text-orange-500' },
      { msg: 'ALERT: MANAGEMENT_FEE_CALC_ERROR DETECTED', delay: 5500, color: 'text-red-500 font-bold' },
      { msg: 'GENERATING_FORENSIC_REPORT...', delay: 6500, color: 'text-white' },
    ];

    let currentStep = 0;

    const runStep = () => {
      if (currentStep >= steps.length) {
        setStatus('complete');
        return;
      }

      const step = steps[currentStep];
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        setProgress(Math.round(((currentStep + 1) / steps.length) * 100));
        currentStep++;
        runStep();
      }, step.delay - (currentStep > 0 ? steps[currentStep-1].delay : 0));
    };

    runStep();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    simulateScan();
  };

  // --- RENDER COMPONENTS ---

  const TerminalLog = () => (
    <div className="w-full h-64 bg-black/50 rounded border border-emerald-900 p-4 overflow-y-auto font-mono text-xs shadow-inner">
      {logs.map((log, i) => (
        <div key={i} className={`mb-2 ${log.color} animate-fade-in`}>
          <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
          {log.msg}
        </div>
      ))}
      <div className="animate-pulse text-neon">_</div>
    </div>
  );

  const ResultCard = () => (
    <div className="w-full animate-slide-up">
      <div className="bg-emerald-900/20 border border-red-500/50 rounded-lg p-6 relative overflow-hidden group hover:border-red-500 transition-all duration-300">
        
        {/* Background Pulse */}
        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
           <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
        </div>

        <div className="flex items-center space-x-3 mb-4">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-ping"></div>
            <span className="text-red-400 font-mono text-xs tracking-widest uppercase">Anomaly Detected</span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 font-mono">$12,450.00</h2>
        <p className="text-slate-400 text-sm mb-6">
          Potential overpayment identified in Q3 Management Fees. The GP Catchup calculation was applied before the Hurdle was fully cleared.
        </p>

        <div className="bg-black/40 rounded p-3 mb-6 border-l-2 border-orange-500 font-mono text-xs text-orange-400">
          > GROK_VERIFICATION: CONFIRMED <br/>
          > GEMINI_ANALYSIS: CONFIRMED
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="w-full py-4 bg-neon hover:bg-white text-black font-bold font-mono uppercase tracking-wide transition-all hover:scale-[1.02] shadow-[4px_4px_0px_0px_#064E3B]"
        >
          Unlock Full Forensic Report
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#001E17] text-slate-200 font-sans selection:bg-[#CCFF00] selection:text-black overflow-hidden relative">
      
      {/* --- ATMOSPHERICS --- */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#CCFF00]/5 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#14B8A6]/5 rounded-full blur-[120px]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-10 border-b border-[#064E3B] bg-[#001E17]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="p-1 border border-neon rounded bg-neon/10">
                <Cpu className="w-5 h-5 text-neon" />
             </div>
             <span className="font-mono font-bold text-white tracking-tight">SIMPLI-FI<span className="text-neon">_OS</span></span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-teal-500">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            <span>SYSTEM_READY</span>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 max-w-4xl mx-auto pt-20 px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            INITIALIZE <span className="text-neon">SHADOW AUDIT</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">
            Upload a redacted Fee Calculation or LPA. Our Agentic Architecture will scan for compliance failures in real-time.
          </p>
        </div>

        {/* --- SCANNER INTERFACE --- */}
        <div className="bg-[#002E24] border border-[#064E3B] rounded-xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Scan Line Animation */}
          {status === 'scanning' && (
             <div className="absolute top-0 left-0 w-full h-1 bg-neon shadow-[0_0_20px_#CCFF00] animate-[scan_2s_ease-in-out_infinite]"></div>
          )}

          {status === 'idle' && (
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={simulateScan}
              className="border-2 border-dashed border-[#064E3B] hover:border-neon rounded-lg h-80 flex flex-col items-center justify-center cursor-pointer transition-all group bg-[#001E17]/50"
            >
              <div className="p-4 rounded-full bg-[#064E3B]/30 mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-slate-400 group-hover:text-neon transition-colors" />
              </div>
              <h3 className="text-xl text-white font-mono font-bold mb-2">DROP_FILE_HERE</h3>
              <p className="text-sm text-slate-500 font-mono">.PDF, .CSV, .XLSX</p>
              <p className="mt-8 text-xs text-[#14B8A6] border border-[#14B8A6]/30 px-3 py-1 rounded">
                SECURE_ENCLAVE: ACTIVE
              </p>
            </div>
          )}

          {status === 'scanning' && (
            <div className="h-80 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-neon animate-spin" />
                    <span className="text-neon font-mono text-sm tracking-widest">PROCESSING_NEURAL_LAYERS...</span>
                 </div>
                 <span className="text-white font-mono">{progress}%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-[#001E17] h-1 mb-6">
                 <div 
                   className="bg-neon h-full transition-all duration-300"
                   style={{ width: `${progress}%` }}
                 ></div>
              </div>
              <TerminalLog />
            </div>
          )}

          {status === 'complete' && (
            <div className="h-auto animate-fade-in">
              <ResultCard />
            </div>
          )}
        </div>

        {/* Footer Disclaimers */}
        <div className="mt-8 text-center text-[10px] font-mono text-slate-600">
           <p>ENCRYPTION: AES-256-GCM // DATA IS WIPED AFTER SESSION</p>
           <p className="mt-2">SIMPLI-FI_FORENSICS V1.0.4</p>
        </div>

      </main>

      {/* --- LEAD CAPTURE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001E17]/90 backdrop-blur-sm p-4">
          <div className="bg-[#002E24] border border-[#064E3B] p-8 max-w-md w-full rounded shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-3 mb-6">
               <Lock className="w-6 h-6 text-neon" />
               <h3 className="text-xl font-bold text-white font-mono">RECOVER_ASSETS</h3>
            </div>

            <p className="text-slate-400 mb-6 text-sm">
              To download the full breakdown of the $12,450 discrepancy and generate the correction letter for your LP's, please authenticate.
            </p>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Redirecting to Stripe/Onboarding Flow..."); }}>
               <div>
                 <label className="block text-xs font-mono text-[#14B8A6] mb-1">EMAIL_ADDRESS</label>
                 <input type="email" placeholder="gp@fund.com" className="w-full bg-[#001E17] border border-[#064E3B] text-white p-3 focus:border-neon focus:outline-none font-mono text-sm rounded-sm" />
               </div>
               <button className="w-full py-3 bg-white hover:bg-slate-200 text-black font-bold font-mono transition-colors">
                 CONTINUE
               </button>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
