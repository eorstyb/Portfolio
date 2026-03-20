import React from 'react';

const GalleryBoard = ({ onClose }) => {
  // Remplacer ces liens par tes propres images (ex: "/ma-photo1.jpg")
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

  // Rotations aléatoires pour donner l'impression qu'elles sont "jetées" sur le tableau
  const rotations = [-4, 3, -2, 5, -5, 2, -3, 4];

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
      backdropFilter: 'blur(4px)'
    }}>
      {/* L'animation de zoom élastique */}
      <style>{`
        @keyframes zoomInBoard {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Le fond du Tableau en liège */}
      <div style={{
        backgroundColor: '#d4a373', 
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")',
        border: '12px solid #8b5a2b', // Cadre en bois
        borderRadius: '8px',
        padding: '40px',
        width: '90%', maxWidth: '800px', maxHeight: '85vh',
        overflowY: 'auto', position: 'relative',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 15px 30px rgba(0,0,0,0.5)',
        animation: 'zoomInBoard 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
      }}>
        
        {/* Bouton Fermer */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '15px', background: '#ef4444',
          border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
          width: '32px', height: '32px', borderRadius: '50%', fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>✖</button>

        <h2 style={{ textAlign: 'center', color: '#3e2723', margin: '0 0 30px 0', fontSize: '2.5rem', textShadow: '1px 1px 2px rgba(255,255,255,0.3)' }}>
          GALERIE SOUVENIRS
        </h2>

        {/* Grille des photos façon Polaroid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '30px', justifyItems: 'center'
        }}>
          {images.map((src, i) => (
            <div key={i} style={{
              backgroundColor: '#f8fafc', padding: '10px 10px 35px 10px',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.4)', borderRadius: '2px',
              transform: `rotate(${rotations[i]}deg)`, position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer'
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
              {/* La punaise */}
              <div style={{
                position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)',
                width: '14px', height: '14px', backgroundColor: '#ef4444', borderRadius: '50%',
                boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 1px 2px 3px rgba(0,0,0,0.4)', zIndex: 2
              }} />
              
              <img src={src} alt={`Souvenir ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryBoard;