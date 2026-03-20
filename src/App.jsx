import React, { useState, useEffect, useRef } from 'react';

const SpaceInvaders = ({ onClose }) => {
  const canvasRef = React.useRef(null);
  const [isDead, setIsDead] = useState(false);
  const gameRef = React.useRef({ score: 0 }); 
  
  const PLAYER_LOGO = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
  const ENEMY_LOGOS = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Docker-svgrepo-com.svg/1280px-Docker-svgrepo-com.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Terraform_Logo.svg/3840px-Terraform_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/DigitalOcean_logo.svg/512px-DigitalOcean_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/1280px-Java_Logo.svg.png"
  ];

  useEffect(() => {
    let isInitialized = true; 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const state = {
      player: { x: 230, y: 380, w: 40, h: 40, speed: 8, dx: 0 },
      bullets: [],
      enemies: [],
      keys: { left: false, right: false },
      score: 0,
      lives: 3,
      spawnTimer: 0,
      lastShot: 0,
      frameId: null
    };

    const pImg = new Image(); pImg.src = PLAYER_LOGO;
    const eImgs = ENEMY_LOGOS.map(url => { const img = new Image(); img.src = url; return img; });

    const update = () => {
      if (state.keys.left && state.player.x > 0) state.player.x -= state.player.speed;
      if (state.keys.right && state.player.x < canvas.width - state.player.w) state.player.x += state.player.speed;

      state.spawnTimer++;
      if (state.spawnTimer > 35) {
        state.enemies.push({
          x: Math.random() * (canvas.width - 35), y: -40, w: 35, h: 35,
          sy: 2 + Math.random() * 2, sx: (Math.random() - 0.5) * 2,
          img: eImgs[Math.floor(Math.random() * eImgs.length)]
        });
        state.spawnTimer = 0;
      }

      for (let i = state.bullets.length - 1; i >= 0; i--) {
        state.bullets[i].y -= 10;
        if (state.bullets[i].y < 0) state.bullets.splice(i, 1);
      }

      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const en = state.enemies[i];
        en.y += en.sy;
        en.x += en.sx;

        state.bullets.forEach((b, bi) => {
          if (b.x < en.x + en.w && b.x + 5 > en.x && b.y < en.y + en.h && b.y + 10 > en.y) {
            state.enemies.splice(i, 1);
            state.bullets.splice(bi, 1);
            state.score += 10;
            gameRef.current.score = state.score;
          }
        });

        if (en.y + en.h > state.player.y && en.x < state.player.x + state.player.w && en.x + en.w > state.player.x) {
          state.enemies.splice(i, 1);
          state.lives -= 1;
          if (state.lives <= 0) {
            cancelAnimationFrame(state.frameId);
            setIsDead(true);
            return;
          }
        }
        if (en.y > canvas.height) state.enemies.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white"; ctx.font = "bold 16px monospace";
      ctx.fillText(`SCORE: ${state.score}`, 20, 30);
      ctx.fillStyle = "#ef4444";
      ctx.fillText(`VIES: ${"❤️".repeat(Math.max(0, state.lives))}`, canvas.width - 130, 30);
      ctx.drawImage(pImg, state.player.x, state.player.y, state.player.w, state.player.h);
      ctx.fillStyle = '#b58a1c';
      state.bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 12));
      state.enemies.forEach(en => ctx.drawImage(en.img, en.x, en.y, en.w, en.h));
    };

    const loop = () => {
      if (!isInitialized) return;
      update();
      draw();
      state.frameId = requestAnimationFrame(loop);
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') state.keys.left = true;
      if (e.key === 'ArrowRight') state.keys.right = true;
      if ((e.key === ' ' || e.key === 'ArrowUp') && Date.now() - state.lastShot > 200) {
        state.bullets.push({ x: state.player.x + 18, y: state.player.y });
        state.lastShot = Date.now();
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft') state.keys.left = false;
      if (e.key === 'ArrowRight') state.keys.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    state.frameId = requestAnimationFrame(loop);

    return () => {
      isInitialized = false; 
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      cancelAnimationFrame(state.frameId);
    };
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#000', padding: '15px', borderRadius: '20px', 
      border: '4px solid #ef4444', textAlign: 'center', position: 'relative', 
      width: '95%', maxWidth: '550px', maxHeight: '95%', 
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
    }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#fff', zIndex: 10 }}>✖</button>
      
      <div style={{ flex: 'none' }}>
        <h2 style={{ color: '#ef4444', margin: '0 0 10px 0', fontFamily: 'monospace', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>CLOUD ATTACK</h2>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas ref={canvasRef} width={500} height={450} style={{ 
          backgroundColor: '#020617', borderRadius: '10px', border: '2px solid #1e293b',
          maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' 
        }} />
      </div>

      {isDead && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', zIndex: 20 }}>
          <h2 style={{ color: '#ef4444', fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', margin: '0 0 10px 0' }}>GAME OVER</h2>
          <p style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 15px 0' }}>Score: {gameRef.current.score}</p>
          <button onClick={onClose} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>QUITTER</button>
        </div>
      )}
    </div>
  );
};

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

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showInvaders, setShowInvaders] = useState(false);
  
  // --- GESTION DE L'ÉCRAN ET DU SWIPE ---
  const scrollWrapperRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPortrait = windowSize.height > windowSize.width;

  // Recentrer la vue lors du premier chargement ou changement d'orientation
  useEffect(() => {
    if (scrollWrapperRef.current && isPortrait) {
      const wrapper = scrollWrapperRef.current;
      // Centrer la vue (milieu de la chambre)
      wrapper.scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
      wrapper.scrollTop = (wrapper.scrollHeight - wrapper.clientHeight) / 2;
    }
  }, [windowSize.width, windowSize.height, isPortrait]);

  const SkillCard = ({ logoUrl, name }) => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '10px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px',
      border: '1px solid #e2e8f0', textAlign: 'center'
    }}>
      <img src={logoUrl} alt={name} style={{ height: '40px', maxWidth: '100%', objectFit: 'contain' }} />
      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#1e293b' }}>{name}</span>
    </div>
  );

  const cvData = {
    about: {
      title: "À PROPOS",
      content: (
        <>
          Ethan Orsolle, <b>ingénieur</b>, dynamique et motivé, étudiant le domaine de l'ingénierie du <b>cloud computing</b>. Découvrir le métier de <b>développeur fullstack</b> dans le monde de l'entreprise tout en apprenant de nouvelles technologies est pour moi une réelle ambition.
        </>
      ),
    },
    projects: {
      title: "PROJETS",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repo Logo" style={{ width: '40px', height: '40px' }} />
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>projet-kosmio-front</h3>
            </div>
            <div style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', fontSize: '0.85rem', color: '#475569', maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace' }}>
              <b style={{ color: '#000' }}>📄 README.md</b><br/><br/>
              Ce projet est une application d'interface web React permettant d'uploader des documents PDF, de déclencher la génération de fiches solutions et secteurs via le pipeline RAG du backend, puis de visualiser, éditer et gérer ces fiches au format Markdown.
            </div>
            <a href="https://github.com/abdemeh/projet-kosmio-front" target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start', backgroundColor: '#24292f', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '16px', filter: 'invert(1)' }} />
              Voir sur GitHub
            </a>
          </div>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repo Logo" style={{ width: '40px', height: '40px' }} />
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>PokemonDrafter</h3>
            </div>
            <div style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', fontSize: '0.85rem', color: '#475569', maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace' }}>
              <b style={{ color: '#000' }}>📄 README.md</b><br/><br/>
              Application web micro-services simulant des combats pokemon en réseau, permettant la gestion des pokemon, équipes.
            </div>
            <a href="https://github.com/SEMGOODD/PokemonDrafter" target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start', backgroundColor: '#24292f', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '16px', filter: 'invert(1)' }} />
              Voir sur GitHub
            </a>
          </div>
          <div onClick={() => { setShowInvaders(true); setActiveSection(null); }} style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fee2e2', borderRadius: '16px', border: '2px dashed #ef4444', textAlign: 'center', cursor: 'pointer', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            🚀 <b>Jouer à Space Invaders</b>
          </div>
        </div>
      ),
    },
    skills: {
      title: "COMPÉTENCES TECHNIQUES",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <h3 style={{ fontSize: '1rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Cloud Providers</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '15px' }}>
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" name="GCP" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" name="AWS" />
          </div>
          <h3 style={{ fontSize: '1rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Langages</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" name="Java" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" name="C" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png" name="C#" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" name="Python" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" name="JS" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" name="TS" />
          </div>
          <h3 style={{ fontSize: '1rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Outils & OS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" name="Docker" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" name="Git" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" name="Linux" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg" name="Windows" />
          </div>
          <h3 style={{ fontSize: '1rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Langues</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" name="Natif" />
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg" name ="Professionnel"/>
            <SkillCard logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/960px-Flag_of_Japan.svg.png" name ="Notions"/>
         </div>
        </div>
      ),
    },
    experience: {
      title: "EXPÉRIENCES PRO",
      content: (
        <div style={{ position: 'relative', borderLeft: '3px solid #bfdbfe', marginLeft: '10px', marginTop: '15px', paddingBottom: '5px' }}>
          <div style={{ position: 'relative', paddingLeft: '30px', paddingBottom: '35px'}}>
            <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>Avril 2024 - Août 2024</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a' }}>Stagiaire IA <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 'normal' }}>@ Osaka Metropolitan University</span></h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>• Recherche de solutions de minimisation des datasets<br/>• Scrapping et analyse de données<br/>• Optimisation et tests de LLM sur le dataset récupéré</p>
          </div>
          <div style={{ position: 'relative', paddingLeft: '30px', paddingBottom: '35px' }}>
            <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>Novembre 2019 - Septembre 2020</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a' }}>Alternant Développeur <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 'normal' }}>@ ACHGO</span></h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>• Développement et maintenance d'une application web Java<br/>• Tests de projets JavaScript pour conseil d'une entreprise cliente<br/>• Création de pages web Wordpress</p>
          </div>
          <div style={{ position: 'relative', paddingLeft: '30px'}}>
            <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>Novembre 2018 - Avril 2021</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a' }}>Stagiaire Ingénieur d'Étude <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 'normal' }}>@ Infotel</span></h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>• Tierce Maintenance Applicative d'une application web Springboot<br/>• Gestion des tickets Jira<br/>• Équipe coordonnée grâce à scrumban</p>
          </div>
        </div>
      ),
    },
    education: {
      title: "FORMATION ET CERTIFS",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid #eee' }}>
              <img src="/CY_Tech.png" alt="Logo CY Tech" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#0f172a' }}>Diplôme Ingénieur Informatique</h4>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}><b>CY TECH Cergy</b> • En cours (Cycle Ingénieur)</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid #eee' }}>
              <img src="/iut_velizy_logo.png" alt="Logo IUT Vélizy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#0f172a' }}>DUT Informatique</h4>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}><b>Université Paris-Saclay</b> • Promotion 2021</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ backgroundColor: '#fff7ed', padding: '15px', borderRadius: '12px', border: '1px solid #ffedd5', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="GCP" style={{ height: '30px', marginBottom: '10px' }} />
               <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#9a3412' }}>Cloud Associate Engineer</span>
               <span style={{ fontSize: '0.75rem', color: '#c2410c' }}>Google Cloud Certified</span>
            </div>
            <div style={{ backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '12px', border: '1px solid #dcfce7', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ width: '40px', height: '40px', backgroundColor: '#16a34a', borderRadius: '50%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>890</div>
               <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#166534' }}>TOEIC Score</span>
               <span style={{ fontSize: '0.75rem', color: '#15803d' }}>Niveau Professionnel</span>
            </div>
          </div>
        </div>
      ),
    },
   contact: {
      title: "CONTACT",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Email_Logo_PNG.png" alt="Mail" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
            <a href="mailto:orsolleeth@cy-tech.fr" style={{ color: '#3b82f6', textDecoration: 'none' }}>orsolleeth@cy-tech.fr</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Phone_icon_rotated.svg/500px-Phone_icon_rotated.svg.png" alt="Tel" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
            <a href="tel:+33651517384" style={{ color: '#3b82f6', textDecoration: 'none' }}>+33 6 51 51 73 84</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" alt="LinkedIn" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            <a href="https://www.linkedin.com/in/ethan-orsolle-tyberg" target="_blank" style={{ color: '#3b82f6', textDecoration: 'none' }}>@ethan-orsolle-tyberg</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="GitHub" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            <a href="" target="_blank" style={{ color: '#3b82f6', textDecoration: 'none' }}>eorstyb</a>
          </div>
          <a href="/CV_ETHAN_ORSOLLE.pdf" target="_blank" style={{
            backgroundColor: '#3b82f6', color: '#fff', border: 'none',
            padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold',
            borderRadius: '25px', cursor: 'pointer', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '10px',
            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            <span>📥</span> Télécharger mon CV (PDF)
          </a>
        </div>
      ),
    },
    interests: {
      title: "PASSIONS",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '15px', marginTop: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fdf4ff', padding: '15px', borderRadius: '12px', border: '1px solid #fae8ff' }}>
            <span style={{ fontSize: '2rem', marginBottom: '5px' }}>🎵</span>
            <b style={{ fontSize: '0.85rem' }}>Musique</b>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eff6ff', padding: '15px', borderRadius: '12px', border: '1px solid #dbeafe' }}>
            <span style={{ fontSize: '2rem', marginBottom: '5px' }}>🏀</span>
            <b style={{ fontSize: '0.85rem' }}>Sport</b>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff7ed', padding: '15px', borderRadius: '12px', border: '1px solid #ffedd5' }}>
            <span style={{ fontSize: '2rem', marginBottom: '5px' }}>👕</span>
            <b style={{ fontSize: '0.85rem' }}>Mode</b>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '2rem', marginBottom: '5px' }}>🎬</span>
            <b style={{ fontSize: '0.85rem' }}>Cinéma</b>
          </div>
        </div>
      ),
    },
    divertissements: {
      title: "DIVERTISSEMENTS",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#ef4444', marginBottom: '15px', borderBottom: '2px solid #fee2e2', paddingBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>
              JEUX VIDÉOS
            </h3>
            <div style={{ color: '#ef4444', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '5px' }}>
              &gt; // Game:
            </div>
            <div 
              onClick={() => { setShowGame(true); setActiveSection(null); }}
              title="Cliquez pour lancer mon Memory Game !"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '25px',
                backgroundColor: '#fff1f2',
                padding: '25px',
                borderRadius: '16px',
                border: '2px dashed #fecdd3',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffe4e6'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff1f2'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
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
              <div style={{ gridColumn: 'span 4', marginTop: '15px', padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '0.85rem', color: '#b91c1c', border: '1px solid #fecdd3', textAlign: 'center' }}>
                💡 <b>Cliquez sur la boîte pour tester mon Memory Game !</b>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#6366f1', marginBottom: '15px', borderBottom: '2px solid #e0e7ff', paddingBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>
              CULTURE
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
              gap: '25px',
              backgroundColor: '#f1f5f9',
              padding: '25px',
              borderRadius: '16px',
              border: '2px dashed #cbd5e1',
              alignItems: 'center',
              justifyContent: 'center'
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
    { id: 'projects', label: 'Documents', displayTitle: 'PROJETS', top: '48%', left: '28%', width: '18%', height: '22%' },
    { id: 'skills', label: 'Serveur', displayTitle: 'COMPÉTENCES', top: '63%', left: '41%', width: '16%', height: '27%' },
    { id: 'experience', label: 'Tableau liège', displayTitle: 'EXPÉRIENCES PRO', top: '5%', left: '12%', width: '22%', height: '28%' },
    { id: 'education', label: 'Diplômes', displayTitle: 'FORMATIONS', top: '40%', left: '45%', width: '22%', height: '15%' },
    { id: 'contact', label: 'Téléphone', displayTitle: null, top: '65%', left: '79%', width: '8%', height: '5%' }, 
    { id: 'interests', label: 'Posters', displayTitle: 'PASSIONS', top: '5%', left: '40%', width: '28%', height: '33%' },
    { id: 'divertissements', label: 'Sunny', displayTitle: 'DIVERTISSEMENTS', top: '10%', left: '72%', width: '25%', height: '30%' },
  ];

  // Le style dynamique pour la "chambre". Si portrait, on force un grand format zoomé.
  const roomStyle = isPortrait ? {
    position: 'relative',
    height: `${windowSize.height * 1.5}px`, // 150% de hauteur pour scroller verticalement
    width: `${windowSize.height * 1.5 * (16 / 9)}px`, // Conserve le ratio 16:9
    margin: 0,
    flexShrink: 0
  } : {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: `calc(${windowSize.height}px * (16/9))`,
    maxHeight: '100vw',
    aspectRatio: '16/9',
    margin: 'auto',
    flexShrink: 0
  };

  return (
    <>
      <style>{`
        body { margin: 0; padding: 0; background-color: #000; overflow: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-height: 500px) {
          h1 { font-size: 1.2rem !important; margin-bottom: 5px !important; }
          .welcome-box { padding: 15px !important; max-width: 450px !important; }
          .welcome-box p { font-size: 0.85rem !important; margin: 10px 0 !important; }
          .welcome-box button { padding: 8px 20px !important; font-size: 0.9rem !important; }
          .popup-content { padding: 15px !important; }
          h2 { font-size: 1rem !important; margin-bottom: 5px !important; }
        }
        @keyframes casinoSpin { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
      `}</style>

      {/* Wrapper principal qui gère le scroll sur mobile */}
      <div 
        ref={scrollWrapperRef}
        className="hide-scrollbar" 
        style={{ 
          width: '100vw', 
          height: `${windowSize.height}px`, 
          backgroundColor: '#000', 
          overflow: 'auto', 
          display: isPortrait ? 'block' : 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          WebkitOverflowScrolling: 'touch' // Rendu natif ultra fluide sur iPhone
        }}
      >
        <div style={roomStyle}>
          
          <img src="/room-bg.jpg" alt="Chambre" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }} />

          <div style={{ position: 'absolute', top: '64%', left: '79%', transform: 'translate(-50%, -100%)', zIndex: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
            <div style={{ backgroundColor: '#fff', border: '3px solid #000', padding: '6px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>CONTACTS 👇</div>
            <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '15px solid #fff', marginTop: '-2px' }}></div>
          </div>

          {clickZones.map((zone) => (
            <div key={zone.id} onClick={() => setActiveSection(zone.id)} style={{ position: 'absolute', top: zone.top, left: zone.left, width: zone.width, height: zone.height, cursor: 'pointer', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
              {zone.displayTitle && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold', marginTop: '-15px', height: 'fit-content', whiteSpace: 'nowrap' }}>{zone.displayTitle}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NOUVEAU : Tous les popups sont en position 'fixed' pour flotter au-dessus du scroll de la chambre */}
      {showWelcome && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: `${windowSize.height}px`, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="welcome-box" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', maxWidth: '600px', width: '90%', textAlign: 'center', maxHeight: '90%', overflowY: 'auto' }}>
            <h1>Bienvenue ! 🎮</h1>
            <p>Salut, je suis <b>Ethan Orsolle</b>.<br/>{isPortrait ? "Swipe pour explorer la chambre et clique sur les objets !" : "Fouillez ma chambre pour découvrir mon parcours."}</p>
            <button onClick={() => setShowWelcome(false)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '16px 32px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer', marginTop: '10px' }}>Entrer dans la chambre</button>
          </div>
        </div>
      )}

      {activeSection && cvData[activeSection] && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: `${windowSize.height}px`, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="popup-content" style={{ 
            backgroundColor: '#fff', padding: '35px', borderRadius: '16px', 
            maxWidth: (['experience', 'skills', 'education', 'interests', 'divertissements'].includes(activeSection)) ? '750px' : '550px', 
            width: '85%', position: 'relative', maxHeight: `calc(${windowSize.height}px * 0.85)`, overflowY: 'auto'
          }}>
            <button onClick={() => setActiveSection(null)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✖</button>
            <h2 style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '12px', marginTop: 0 }}>{cvData[activeSection].title}</h2>
            <div style={{ marginTop: '15px' }}>{cvData[activeSection].content}</div>
          </div>
        </div>
      )}

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