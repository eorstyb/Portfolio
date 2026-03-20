import React, { useState, useEffect, useRef } from 'react';

const SpaceInvaders = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [isDead, setIsDead] = useState(false);
  const gameRef = useRef({ score: 0 }); 
  
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
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden'
    }}>
      {/* EN-TÊTE FIXE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 'none', marginBottom: '10px' }}>
        <h2 style={{ color: '#ef4444', margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>CLOUD ATTACK</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '32px', cursor: 'pointer', color: '#fff', display: 'flex' }}>✖</button>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas ref={canvasRef} width={500} height={450} style={{ backgroundColor: '#020617', borderRadius: '10px', border: '2px solid #1e293b', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>

      {isDead && ( /* ... ton code pour Game Over reste le même ... */
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', zIndex: 20 }}>
          <h2 style={{ color: '#ef4444', fontSize: 'clamp(2rem, 8vw, 3rem)', margin: '0 0 10px 0' }}>GAME OVER</h2>
          <p style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 15px 0' }}>Score: {gameRef.current.score}</p>
          <button onClick={onClose} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px', cursor: 'pointer', fontSize: '1.2rem' }}>QUITTER</button>
        </div>
      )}
    </div>
  );
};
export default SpaceInvaders;