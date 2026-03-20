import React, { useState } from 'react';

const GalleryBoard = ({ onClose }) => {
  const [zoomedImage, setZoomedImage] = useState(null);

  const images = [
    "/chateau1.JPEG",
    "/ramen.JPEG",
    "/osaka-tower.JPEG",
    "/pagode.jpg",
    "/chateau2.JPEG",
    "/onigiri.JPEG",
    "/tokyo-temple.JPEG",
    "/mario.JPEG"
  ];

  const rotations = [-4, 3, -2, 5, -5, 2, -3, 4];

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        backdropFilter: 'blur(4px)',
        padding: '15px' // ⬅️ Empêche le tableau de toucher les bords physiques de l'écran
      }}>
        <style>{`
          @keyframes zoomInBoard {
            0% { transform: scale(0.3); opacity: 0; }
            70% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          /* NOUVEAU : Grille responsive pour de belles images sur mobile */
          .polaroid-grid {
            display: grid;
            /* Sur PC : colonnes de 200px. Sur mobile : s'adapte à la largeur de l'écran (1 seule grosse colonne) */
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
            gap: 30px;
            justify-items: center;
          }
          
          .polaroid-card {
            background-color: #f8fafc;
            padding: 10px 10px 35px 10px;
            box-shadow: 2px 4px 10px rgba(0,0,0,0.4);
            border-radius: 2px;
            position: relative;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: zoom-in;
            width: 100%; /* S'assure que l'image remplit l'espace disponible */
            max-width: 260px; /* Évite qu'elles soient gigantesques sur tablette */
            box-sizing: border-box;
          }
        `}</style>
        
        <div style={{
          backgroundColor: '#d4a373', 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")',
          border: '12px solid #8b5a2b',
          borderRadius: '8px',
          width: '100%', maxWidth: '800px', 
          maxHeight: '80dvh', // ⬅️ SECRET ANTI-SAFARI : dvh prend en compte la vraie hauteur visible
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 15px 30px rgba(0,0,0,0.5)',
          animation: 'zoomInBoard 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
          
          {/* EN-TÊTE FIXE (Ne sera jamais masqué) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', flex: 'none', borderBottom: '4px dashed rgba(139, 90, 43, 0.4)' }}>
            <h2 style={{ color: '#3e2723', margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', textShadow: '1px 1px 2px rgba(255,255,255,0.3)' }}>
              GALERIE SOUVENIRS
            </h2>
            <button onClick={onClose} style={{
              background: '#ef4444', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
              width: '36px', height: '36px', borderRadius: '50%', fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>✖</button>
          </div>

          {/* CORPS SCROLLABLE */}
          <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '25px 20px' }}>
            <div className="polaroid-grid">
              {images.map((src, i) => (
                <div 
                  key={i} 
                  className="polaroid-card"
                  onClick={() => setZoomedImage(src)}
                  style={{ transform: `rotate(${rotations[i]}deg)` }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = `scale(1.05) rotate(0deg)`;
                    e.currentTarget.style.boxShadow = '4px 8px 15px rgba(0,0,0,0.5)';
                    e.currentTarget.style.zIndex = 10;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotations[i]}deg)`;
                    e.currentTarget.style.boxShadow = '2px 4px 10px rgba(0,0,0,0.4)';
                    e.currentTarget.style.zIndex = 1;
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)',
                    width: '14px', height: '14px', backgroundColor: '#ef4444', borderRadius: '50%',
                    boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 1px 2px 3px rgba(0,0,0,0.4)', zIndex: 2
                  }} />
                  
                  {/* Hauteur ajustée pour un meilleur rendu polaroid */}
                  <img src={src} alt={`Souvenir ${i+1}`} style={{ width: '100%', height: '160px', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LA COUCHE DE ZOOM (LIGHTBOX) */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300,
            cursor: 'zoom-out', animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }} 
            style={{
              position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', 
              color: '#fff', fontSize: '2.5rem', cursor: 'pointer', zIndex: 301
            }}
          >
            ✖
          </button>
          <img 
            src={zoomedImage} 
            alt="Zoomed" 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95vw', maxHeight: '90dvh', objectFit: 'contain', 
              borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }} 
          />
        </div>
      )}
    </>
  );
};

export default GalleryBoard;