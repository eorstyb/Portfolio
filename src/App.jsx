import React, { useState, useEffect, useRef } from 'react';
import SpaceInvaders from './components/SpaceInvaders'; // Vérifie que le chemin est bon !
import MemoryGame from './components/MemoryGame';       // Vérifie que le chemin est bon !
import { getCvData, clickZones } from './data/cvData';  // On importe nos données depuis le nouveau fichier

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showInvaders, setShowInvaders] = useState(false);
  
  // --- INJECTION DES DONNÉES CV ---
  // On passe les fonctions setShowGame etc. à la donnée pour que les boutons marchent
  const cvData = getCvData(setShowGame, setShowInvaders, setActiveSection);

  // --- ÉTATS POUR L'ANIMATION MACHINE À ÉCRIRE ---
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [introPhase, setIntroPhase] = useState(0); 

  const fullText1 = "Bonjour Ethan Orsolle enchanté, si vous tombez sur ce site c'est que vous voulez en apprendre plus sur moi. Alors, quoi de mieux que de vous faire entrer dans mon univers.";
  const fullText2 = "Bienvenue dans ma chambre...";

  useEffect(() => {
    if (!showWelcome) return;
    
    let timeout;
    if (introPhase === 0) {
      if (displayedText1.length < fullText1.length) {
        timeout = setTimeout(() => setDisplayedText1(fullText1.slice(0, displayedText1.length + 1)), 35);
      } else {
        timeout = setTimeout(() => setIntroPhase(1), 800);
      }
    } else if (introPhase === 1) {
      if (displayedText2.length < fullText2.length) {
        timeout = setTimeout(() => setDisplayedText2(fullText2.slice(0, displayedText2.length + 1)), 50);
      } else {
        timeout = setTimeout(() => setIntroPhase(2), 1500); 
      }
    } else if (introPhase === 2) {
      timeout = setTimeout(() => setShowWelcome(false), 1200); 
    }
    return () => clearTimeout(timeout);
  }, [displayedText1, displayedText2, introPhase, showWelcome]);

  // --- GESTION DE L'ÉCRAN ET DU SWIPE ---
  const scrollWrapperRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPortrait = windowSize.height > windowSize.width;

  useEffect(() => {
    if (scrollWrapperRef.current && isPortrait && !showWelcome) {
      const wrapper = scrollWrapperRef.current;
      // Centre uniquement horizontalement au démarrage
      wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
    }
  }, [windowSize.width, windowSize.height, isPortrait, showWelcome]);

  const roomStyle = isPortrait ? {
    position: 'relative', 
    height: `${windowSize.height}px`, // 100% de la hauteur de l'écran
    width: `${windowSize.height * (16 / 9)}px`, // La largeur s'adapte au ratio 16:9
    margin: 0, 
    flexShrink: 0
  } : {
    position: 'relative', width: '100%', height: '100%', maxWidth: `calc(${windowSize.height}px * (16/9))`, maxHeight: '100vw', aspectRatio: '16/9', margin: 'auto', flexShrink: 0
  };
  return (
    <>
      {/* 👾 CSS GLOBAL : Police Pixel Art VT323 partout ! */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        body { margin: 0; padding: 0; background-color: #000; overflow: hidden; font-family: 'VT323', monospace; letter-spacing: 0.5px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { font-family: inherit; } 
        b, strong { font-weight: normal; color: #3b82f6; text-shadow: 1px 1px 0px rgba(0,0,0,0.2); } 
        @keyframes casinoSpin { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
      `}</style>

      {/* --- ÉCRAN D'ACCUEIL CINÉMATIQUE --- */}
      {showWelcome && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: `${windowSize.height}px`, 
          backgroundColor: '#000', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', zIndex: 100,
          opacity: introPhase === 2 ? 0 : 1, transition: 'opacity 1.2s ease-in-out',
          padding: '20px', boxSizing: 'border-box', color: '#fff',
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', textAlign: 'center', lineHeight: '1.6'
        }}>
          <p style={{ maxWidth: '800px', margin: '0 0 20px 0' }}>{displayedText1}</p>
          <p style={{ maxWidth: '800px', margin: 0, color: '#f59e0b' }}>{displayedText2}</p>
          <button 
            onClick={() => { setIntroPhase(2); setDisplayedText1(fullText1); setDisplayedText2(fullText2); }}
            style={{ position: 'absolute', bottom: '40px', background: 'none', border: 'none', color: '#475569', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            [ Passer ]
          </button>
        </div>
      )}

      {/* --- CHAMBRE INTERACTIVE --- */}
      <div 
        ref={scrollWrapperRef}
        className="hide-scrollbar" 
        style={{ 
          width: '100vw', height: `${windowSize.height}px`, backgroundColor: '#000', 
          overflow: 'auto', display: isPortrait ? 'block' : 'flex', 
          alignItems: 'center', justifyContent: 'center',
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        <div style={roomStyle}>
          <img src="/room-bg.jpg" alt="Chambre" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }} />

          <div style={{ position: 'absolute', top: '64%', left: '79%', transform: 'translate(-50%, -100%)', zIndex: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
            <div style={{ backgroundColor: '#fff', border: '3px solid #000', padding: '6px 12px', borderRadius: '15px', color: '#000', fontSize: '1rem', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>CONTACTS 👇</div>
            <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '15px solid #fff', marginTop: '-2px' }}></div>
          </div>

          {clickZones.map((zone) => (
            <div key={zone.id} onClick={() => setActiveSection(zone.id)} style={{ position: 'absolute', top: zone.top, left: zone.left, width: zone.width, height: zone.height, cursor: 'pointer', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
              {zone.displayTitle && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.8rem', marginTop: '-15px', height: 'fit-content', whiteSpace: 'nowrap' }}>{zone.displayTitle}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP DU CV --- */}
      {activeSection && cvData[activeSection] && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: `${windowSize.height}px`, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="popup-content" style={{ 
            backgroundColor: '#fff', padding: '35px', borderRadius: '16px', 
            maxWidth: (['experience', 'skills', 'education', 'interests', 'divertissements'].includes(activeSection)) ? '750px' : '550px', 
            width: '90%', position: 'relative', maxHeight: `calc(${windowSize.height}px * 0.85)`, overflowY: 'auto'
          }}>
            <button onClick={() => setActiveSection(null)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#ef4444' }}>✖</button>
            <h2 style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '12px', marginTop: 0, fontSize: '2rem' }}>{cvData[activeSection].title}</h2>
            <div style={{ marginTop: '15px' }}>{cvData[activeSection].content}</div>
          </div>
        </div>
      )}

      {/* --- POPUPS DES JEUX --- */}
      {showGame && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: `${windowSize.height}px`, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
          <MemoryGame onClose={() => setShowGame(false)} />
        </div>
      )}
      
      {showInvaders && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: `${windowSize.height}px`, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120 }}>
          <SpaceInvaders onClose={() => setShowInvaders(false)} />
        </div>
      )}
    </>
  );
}