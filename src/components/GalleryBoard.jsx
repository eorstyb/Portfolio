import React, { useState } from 'react';

const GalleryBoard = ({ onClose }) => {
  // État pour savoir quelle image est actuellement zoomée (null = aucune)
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
        backdropFilter: 'blur(4px)'
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
        `}</style>
        
        <div style={{
          backgroundColor: '#d4a373', 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")',
          border: '12px solid #8b5a2b',
          borderRadius: '8px',
          padding: '40px',
          width: '90%', maxWidth: '800px', maxHeight: '85vh',
          overflowY: 'auto', position: 'relative',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 15px 30px rgba(0,0,0,0.5)',
          animation: 'zoomInBoard 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
          
          <button onClick={onClose} style={{
            position: 'absolute', top: '10px', right: '15px', background: '#ef4444',
            border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
            width: '32px', height: '32px', borderRadius: '50%', fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✖</button>

          <h2 style={{ textAlign: 'center', color: '#3e2723', margin: '0 0 30px 0', fontSize: '2.5rem', textShadow: '1px 1px 2px rgba(255,255,255,0.3)' }}>
            GALERIE SOUVENIRS
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '30px', justifyItems: 'center'
          }}>
            {images.map((src, i) => (
              <div 
              key={i} 
              onClick={() => setZoomedImage(src)} // ⬅️ On enregistre l'image cliquée
              style={{
                backgroundColor: '#f8fafc', padding: '10px 10px 35px 10px',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.4)', borderRadius: '2px',
                transform: `rotate(${rotations[i]}deg)`, position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'zoom-in' // ⬅️ Curseur qui indique qu'on peut zoomer
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = `scale(1.1) rotate(0deg)`;
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
                
                {/* J'ai remis height: '120px' car height: '100%' écrase parfois le format polaroid s'il n'y a pas de hauteur parente fixe */}
                <img src={src} alt={`Souvenir ${i+1}`} style={{ width: '100%', height: '120px', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                
                <div style={{ position: 'absolute', bottom: '8px', left: '0', width: '100%', textAlign: 'center', color: '#475569', fontSize: '1.2rem' }}>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- NOUVEAU : LA COUCHE DE ZOOM (LIGHTBOX) --- */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)} // Ferme le zoom si on clique n'importe où
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, // zIndex supérieur au tableau
            cursor: 'zoom-out', animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Bouton de fermeture (optionnel puisque cliquer à côté ferme aussi, mais c'est bon pour l'UX) */}
          <button 
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }} 
            style={{
              position: 'absolute', top: '20px', right: '30px', background: 'none', border: 'none', 
              color: '#fff', fontSize: '2.5rem', cursor: 'pointer', zIndex: 301
            }}
          >
            ✖
          </button>

          <img 
            src={zoomedImage} 
            alt="Zoomed" 
            onClick={(e) => e.stopPropagation()} // Empêche de fermer si on clique pile sur l'image (optionnel)
            style={{
              maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', 
              borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }} 
          />
        </div>
      )}
    </>
  );
};

export default GalleryBoard;