import React, { useState, useEffect } from 'react';

// --- COMPOSANT UTILITAIRE : Carte de compétence / Passion avec logo ---
const SkillCard = ({ logoUrl, name, bgColor = "#f8fafc", borderColor = "#e2e8f0" }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '10px', backgroundColor: bgColor, padding: '15px', borderRadius: '12px',
    border: `1px solid ${borderColor}`, textAlign: 'center', transition: 'all 0.2s'
  }}
  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; }}
  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <img src={logoUrl} alt={name} style={{ height: '40px', maxWidth: '100%', objectFit: 'contain' }} />
    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#1e293b' }}>{name}</span>
  </div>
);

// --- NOUVEAU COMPOSANT : Le Jeu de Memory ---
// --- NOUVEAU COMPOSANT : Le Jeu de Memory ---
const MemoryGame = ({ onClose }) => {
  // Définition des paires de cartes (9 paires = 18 cases)
  const initialCards = [
    { id: 1, type: 'java', img: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/1280px-Java_Logo.svg.png' }, 
    { id: 2, type: 'java', img: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/1280px-Java_Logo.svg.png' },
    { id: 3, type: 'docker', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Docker-svgrepo-com.svg/1280px-Docker-svgrepo-com.svg.png' }, 
    { id: 4, type: 'docker', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Docker-svgrepo-com.svg/1280px-Docker-svgrepo-com.svg.png' },
    { id: 5, type: 'op', img: 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/34/One_Piece_%28ja%29_Logo.svg/960px-One_Piece_%28ja%29_Logo.svg.png' }, 
    { id: 6, type: 'op', img: 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/34/One_Piece_%28ja%29_Logo.svg/960px-One_Piece_%28ja%29_Logo.svg.png' },
    { id: 7, type: 'osaka', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Osaka_Metropolitan_University_Logo.png' }, 
    { id: 8, type: 'osaka', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Osaka_Metropolitan_University_Logo.png' },
    { id: 9, type: 'valorant', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/960px-Valorant_logo_-_pink_color_version.svg.png' }, 
    { id: 10, type: 'valorant', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/960px-Valorant_logo_-_pink_color_version.svg.png' },
    { id: 11, type: 'terraform', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Terraform_Logo.svg/3840px-Terraform_Logo.svg.png' }, 
    { id: 12, type: 'terraform', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Terraform_Logo.svg/3840px-Terraform_Logo.svg.png' },
    // NOUVELLES PAIRES
    { id: 13, type: 'linkedin', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png' },
    { id: 14, type: 'linkedin', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png' },
    { id: 15, type: 'react', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { id: 16, type: 'react', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { id: 17, type: 'python', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { id: 18, type: 'python', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  ];

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (index) => {
    if (loading || flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]].type === cards[newFlipped[1]].type) {
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isGameOver = matched.length === cards.length && cards.length > 0;

  return (
    <div style={{
      backgroundColor: '#0f172a', padding: '20px', borderRadius: '16px', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center',
      border: '4px solid #f59e0b', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
      maxHeight: '95vh', overflowY: 'auto'
    }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>✖</button>
      
      {loading ? (
        <div style={{ padding: '40px' }}>
          <div style={{ fontSize: '3rem', animation: 'casinoSpin 0.3s infinite linear' }}>🎰</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}>Mélange du deck...</div>
          <style>{`@keyframes casinoSpin { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }`}</style>
        </div>
      ) : isGameOver ? (
        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <h2 style={{ color: '#f59e0b' }}>Bravo !</h2>
          <p>Deck complété en {moves} coups.</p>
          <button onClick={onClose} style={{ backgroundColor: '#f59e0b', padding: '10px 20px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Quitter</button>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '1.4rem', color: '#f59e0b', margin: 0 }}>Memory Portfolio</h2>
          <div style={{ fontSize: '0.8rem' }}>Coups : {moves} | Paires : {matched.length / 2} / 9</div>
          <div style={{
            display: 'grid', 
            // On passe à 6 colonnes pour les écrans larges ou on reste sur une grille compacte
            gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', 
            gap: '8px', marginTop: '10px', maxWidth: '500px', width: '100%'
          }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              return (
                <div key={index} onClick={() => handleCardClick(index)} style={{
                  aspectRatio: '1', backgroundColor: isFlipped ? '#fff' : '#1e293b',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', border: '2px solid #334155',
                  transition: 'transform 0.4s',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  {isFlipped ? (
                    <img 
                      src={card.img} 
                      alt={card.type} 
                      style={{ 
                        width: '80%', height: '80%', objectFit: 'contain',
                        transform: 'rotateY(180deg)' // Contre la rotation du parent
                      }} 
                    />
                  ) : (
                    <span style={{ fontSize: '1.2rem', color: '#475569' }}>❓</span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // --- NOUVEAU : État pour gérer l'ouverture du jeu ---
  const [showGame, setShowGame] = useState(false);

  const cvData = {
    // ... (Données About, Skills, Experience, Education, Contact, Interests - Mêmes que précédemment) ...
    divertissements: {
      title: "DIVERTISSEMENTS",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '10px' }}>
          
          {/* --- SECTION JEUX VIDÉOS --- */}
<div>
  <h3 style={{ fontSize: '1rem', color: '#ef4444', marginBottom: '15px', borderBottom: '2px solid #fee2e2', paddingBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>
   JEUX VIDÉOS
  </h3>

  
  <div 
    onClick={() => { setShowGame(true); setActiveSection(null); }} 
    title="Cliquez pour lancer mon Memory Game !"
    style={{
      display: 'grid',
      // On fixe à 4 colonnes égales pour éviter le décalage à gauche
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '15px',
      backgroundColor: '#fff1f2',
      padding: '25px',
      borderRadius: '16px',
      border: '2px dashed #fecdd3',
      alignItems: 'center', // Centre verticalement
      justifyContent: 'center', // Centre horizontalement la grille elle-même
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffe4e6'; e.currentTarget.style.transform = 'scale(1.02)'; }}
    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff1f2'; e.currentTarget.style.transform = 'scale(1)'; }}
  >
    {/* Chaque image est enveloppée dans une div pour un centrage parfait dans sa cellule */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/960px-Valorant_logo_-_pink_color_version.svg.png" title="Valorant" style={{ maxHeight: '45px', maxWidth: '100%', objectFit: 'contain' }} />
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Wuthering_Waves_logo.svg/500px-Wuthering_Waves_logo.svg.png" title="Wuthering Waves" style={{ maxHeight: '50px', maxWidth: '100%', objectFit: 'contain' }} />
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src="https://upload.wikimedia.org/wikipedia/fr/0/0b/Slay_the_Spire_Logo.png" title="Slay the Spire" style={{ maxHeight: '45px', maxWidth: '100%', objectFit: 'contain' }} />
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Elden_Ring_logo_black.svg/960px-Elden_Ring_logo_black.svg.png" title="Elden Ring" style={{ maxHeight: '25px', maxWidth: '100%', objectFit: 'contain' }} />
    </div>
    
    {/* Le texte d'invitation prend toute la largeur (4 colonnes) */}
    <div style={{ gridColumn: 'span 4', marginTop: '15px', padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '0.85rem', color: '#b91c1c', border: '1px solid #fecdd3', textAlign: 'center' }}>
      💡 <b>Cliquez sur la boîte pour tester mon Memory Game !</b>
    </div>
  </div>
</div>
          {/* --- SECTION CULTURE & MÉDIAS --- */}
          <div>
            <h3 style={{ fontSize: '1rem', color: '#6366f1', marginBottom: '15px', borderBottom: '2px solid #e0e7ff', paddingBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>
              CULTURE
            </h3>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '25px',
              backgroundColor: '#f1f5f9', padding: '25px', borderRadius: '16px',
              border: '2px dashed #cbd5e1', alignItems: 'center', justifyContent: 'center'
            }}>
              <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/34/One_Piece_%28ja%29_Logo.svg/960px-One_Piece_%28ja%29_Logo.svg.png" title="One Piece" style={{ maxHeight: '45px', maxWidth: '90px', objectFit: 'contain', margin: '0 auto' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Jujutsu_Kaisen_logo_in_Japan.png/960px-Jujutsu_Kaisen_logo_in_Japan.png" title="Jujutsu Kaisen" style={{ maxHeight: '45px', maxWidth: '90px', objectFit: 'contain', margin: '0 auto' }} />
              <img src="https://upload.wikimedia.org/wikipedia/fr/6/6e/Fate_stay_night_Logo.png" title="Fate" style={{ maxHeight: '45px', maxWidth: '90px', objectFit: 'contain', margin: '0 auto' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/One_battle_after_another_logo.svg/960px-One_battle_after_another_logo.svg.png" title="Pulp Fiction" style={{ maxHeight: '45px', maxWidth: '100px', objectFit: 'contain', margin: '0 auto' }} />
            </div>
          </div>
        </div>
      ),
    }
  };

  const clickZones = [
    { id: 'about', label: 'Ordinateur', displayTitle: 'À PROPOS', top: '35%', left: '15%', width: '18%', height: '22%' },
    { id: 'skills', label: 'Serveur', displayTitle: 'COMPÉTENCES', top: '63%', left: '41%', width: '16%', height: '27%' },
    { id: 'experience', label: 'Tableau liège', displayTitle: 'EXPÉRIENCES PRO', top: '5%', left: '12%', width: '22%', height: '28%' },
    { id: 'education', label: 'Diplômes', displayTitle: 'FORMATIONS', top: '40%', left: '45%', width: '22%', height: '15%' },
    { id: 'contact', label: 'Téléphone', displayTitle: null, top: '65%', left: '79%', width: '8%', height: '5%' }, 
    { id: 'interests', label: 'Posters', displayTitle: 'PASSIONS', top: '5%', left: '40%', width: '28%', height: '33%' },
    { id: 'divertissements', label: 'Sunny', displayTitle: 'DIVERTISSEMENTS', top: '10%', left: '72%', width: '25%', height: '30%' },
  ];

  return (
    <>
      <style>{`
        .landscape-warning { display: none; }
        @media (orientation: portrait) and (max-width: 800px) {
          .app-content { display: none !important; }
          .landscape-warning { display: flex !important; flex-direction: column; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #0f172a; color: white; text-align: center; padding: 2rem; z-index: 9999; }
          .rotate-icon { font-size: 4rem; animation: rotatePhone 2s infinite ease-in-out; }
          @keyframes rotatePhone { 0% { transform: rotate(0deg); } 50% { transform: rotate(-90deg); } 100% { transform: rotate(0deg); } }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="landscape-warning">
        <div className="rotate-icon">📱</div>
        <h2>Mode Paysage Requis</h2>
        <p>Pour explorer la chambre, pivotez votre téléphone.</p>
      </div>

      <div className="app-content" style={{ width: '100vw', height: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: 'sans-serif' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: 'calc(100vh * (16/9))', maxHeight: 'calc(100vw * (9/16))', aspectRatio: '16/9', backgroundColor: '#000', overflow: 'hidden' }}>
          
          <img src="/room-bg.jpg" alt="Chambre" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

          {/* Bulle Téléphone */}
          <div style={{ position: 'absolute', top: '64%', left: '79%', transform: 'translate(-50%, -100%)', zIndex: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
            <div style={{ backgroundColor: '#fff', border: '3px solid #000', padding: '6px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>MES CONTACTS 👇</div>
            <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '15px solid #fff', marginTop: '-2px' }}></div>
          </div>

          {clickZones.map((zone) => (
            <div key={zone.id} onClick={() => setActiveSection(zone.id)} style={{ position: 'absolute', top: zone.top, left: zone.left, width: zone.width, height: zone.height, cursor: 'pointer', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
              {zone.displayTitle && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '-15px', height: 'fit-content', whiteSpace: 'nowrap' }}>{zone.displayTitle}</div>
              )}
            </div>
          ))}

          {showWelcome && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', maxWidth: '600px', width: '90%', textAlign: 'center' }}>
                <h1>Bienvenue dans mon univers ! 🎮</h1>
                <p>Salut, je suis <b>Ethan Orsolle</b>. Fouillez ma chambre pour découvrir mon parcours.</p>
                <button onClick={() => setShowWelcome(false)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '16px 32px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer' }}>Entrer dans la chambre</button>
              </div>
            </div>
          )}

          {/* Popup de contenu général */}
          {activeSection && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
              <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '16px', maxWidth: (activeSection === 'experience' || activeSection === 'skills' || activeSection === 'education' || activeSection === 'divertissements') ? '750px' : '550px', width: '85%', position: 'relative', maxHeight: '90%', overflowY: 'auto' }}>
                <button onClick={() => setActiveSection(null)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✖</button>
                <h2 style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '12px', marginTop: 0 }}>{cvData[activeSection].title}</h2>
                <div>{cvData[activeSection].content}</div>
              </div>
            </div>
          )}

          {/* --- NOUVEAU : Popup du Memory Game --- */}
          {showGame && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
              <div style={{ position: 'relative', width: '85%', maxWidth: '600px', animation: 'fadeIn 0.5s ease-out' }}>
                <MemoryGame onClose={() => setShowGame(false)} />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}