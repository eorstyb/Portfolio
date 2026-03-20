import React, { useState, useEffect } from 'react';

const MemoryGame = ({ onClose }) => {
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
      backgroundColor: '#0f172a', padding: '15px', borderRadius: '16px', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '10px', textAlign: 'center', border: '4px solid #f59e0b', 
      boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
      width: '95%', maxWidth: '550px', maxHeight: '95%', 
      boxSizing: 'border-box', position: 'relative', overflowY: 'auto'
    }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888', zIndex: 10 }}>✖</button>
      
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px 0' }}>
          <div style={{ fontSize: '4rem', animation: 'casinoSpin 0.3s infinite linear' }}>🎰</div>
          <div style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', letterSpacing: '2px', color: '#f59e0b' }}>MÉLANGE DU DECK...</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Préparez vos réflexes</div>
        </div>
      ) : isGameOver ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
          <div style={{ fontSize: '4rem' }}>🎉</div>
          <h2 style={{ color: '#f59e0b', margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>VICTOIRE !</h2>
          <p style={{ fontSize: '1.1rem' }}>Deck complété en <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{moves}</span> coups.</p>
          <button onClick={onClose} style={{ backgroundColor: '#f59e0b', padding: '12px 30px', borderRadius: '30px', border: 'none', fontWeight: 'bold', cursor: 'pointer', color: '#0f172a', fontSize: '1rem', transition: 'transform 0.2s' }}>QUITTER</button>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.4rem)', color: '#f59e0b', margin: 0, textTransform: 'uppercase' }}>Memory</h2>
          <div style={{ fontSize: '0.9rem', backgroundColor: '#1e293b', padding: '5px 15px', borderRadius: '20px', border: '1px solid #334155' }}>
            Coups : <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{moves}</span> | Paires : <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{matched.length / 2}</span> / 9
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginTop: '10px', width: '100%', maxWidth: '400px' }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              return (
                <div key={index} onClick={() => handleCardClick(index)} style={{
                  aspectRatio: '1', backgroundColor: isFlipped ? '#fff' : '#1e293b',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', border: isFlipped ? '2px solid #f59e0b' : '2px solid #334155', 
                  transition: 'transform 0.4s, background-color 0.2s',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  {isFlipped ? (
                    <img src={card.img} alt={card.type} style={{ width: '85%', height: '85%', objectFit: 'contain', transform: 'rotateY(180deg)' }} />
                  ) : (
                    <span style={{ fontSize: '1.2rem', color: '#475569', fontWeight: 'bold' }}>?</span>
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

export default MemoryGame;