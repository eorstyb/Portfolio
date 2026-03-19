import React, { useState } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

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
          <b>Ingénieur</b>, dynamique et motivé, étudiant le domaine de l'ingénierie du <b>cloud computing</b> à la recherche d'un <b>stage de fin d'études</b>. Découvrir le métier de <b>développeur fullstack</b> dans le monde de l'entreprise tout en apprenant de nouvelles technologies est pour moi une réelle ambition.
        </>
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
              GAMING & COMPÉTITION
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
              gap: '20px',
              backgroundColor: '#fff1f2',
              padding: '25px',
              borderRadius: '16px',
              border: '2px dashed #fecdd3',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/960px-Valorant_logo_-_pink_color_version.svg.png" title="Valorant" style={{ maxHeight: '45px', maxWidth: '80px', objectFit: 'contain', margin: '0 auto' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Wuthering_Waves_logo.svg/500px-Wuthering_Waves_logo.svg.png" title="Wuthering Waves" style={{ maxHeight: '50px', maxWidth: '80px', objectFit: 'contain', margin: '0 auto' }} />
              <img src="https://upload.wikimedia.org/wikipedia/fr/0/0b/Slay_the_Spire_Logo.png" title="Slay the Spire" style={{ maxHeight: '45px', maxWidth: '80px', objectFit: 'contain', margin: '0 auto' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Elden_Ring_logo_black.svg/960px-Elden_Ring_logo_black.svg.png" title="Elden Ring" style={{ maxHeight: '35px', maxWidth: '100px', objectFit: 'contain', margin: '0 auto' }} />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#6366f1', marginBottom: '15px', borderBottom: '2px solid #e0e7ff', paddingBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>
              CULTURE & MANGAS
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
        
        /* Ajustements spécifiques pour mobile en paysage */
        @media (max-height: 500px) {
          h1 { font-size: 1.2rem !important; margin-bottom: 5px !important; }
          .welcome-box { padding: 15px !important; max-width: 450px !important; }
          .welcome-box p { font-size: 0.85rem !important; margin: 10px 0 !important; }
          .welcome-box button { padding: 8px 20px !important; font-size: 0.9rem !important; }
          .popup-content { padding: 15px !important; }
          h2 { font-size: 1rem !important; margin-bottom: 5px !important; }
        }

        @media (orientation: portrait) and (max-width: 800px) {
          .app-content { display: none !important; }
          .landscape-warning {
            display: flex !important; flex-direction: column; align-items: center; justify-content: center;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: #0f172a; color: white; text-align: center; padding: 2rem; z-index: 9999;
          }
          .rotate-icon { font-size: 4rem; animation: rotatePhone 2s infinite ease-in-out; }
          @keyframes rotatePhone { 0% { transform: rotate(0deg); } 50% { transform: rotate(-90deg); } 100% { transform: rotate(0deg); } }
        }
      `}</style>

      <div className="landscape-warning">
        <div className="rotate-icon">📱</div>
        <h2>Mode Paysage Requis</h2>
        <p>Pour explorer la chambre, pivotez votre téléphone.</p>
      </div>

      <div className="app-content" style={{ width: '100vw', height: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: 'sans-serif' }}>
        {/* On force le conteneur à ne pas dépasser 100vh/100vw */}
        <div style={{ 
          position: 'relative', 
          width: '100%', height: '100%', 
          maxWidth: 'calc(100vh * (16/9))', 
          maxHeight: 'calc(100vw * (9/16))',
          aspectRatio: '16/9', 
          backgroundColor: '#000', 
          overflow: 'hidden' 
        }}>
          
          <img src="/room-bg.jpg" alt="Chambre" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }} />

          {/* Bulle Téléphone */}
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

          {showWelcome && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
              <div className="welcome-box" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', maxWidth: '600px', width: '90%', textAlign: 'center', maxHeight: '90vh', overflowY: 'auto' }}>
                <h1>Bienvenue ! 🎮</h1>
                <p>Salut, je suis <b>Ethan Orsolle</b>. Fouillez ma chambre pour découvrir mon parcours.</p>
                <button onClick={() => setShowWelcome(false)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '16px 32px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer' }}>Entrer dans la chambre</button>
              </div>
            </div>
          )}

          {activeSection && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
              <div className="popup-content" style={{ 
                backgroundColor: '#fff', 
                padding: '35px', 
                borderRadius: '16px', 
                maxWidth: (['experience', 'skills', 'education', 'interests', 'divertissements'].includes(activeSection)) ? '750px' : '550px', 
                width: '85%', 
                position: 'relative', 
                maxHeight: '85vh', // On laisse une petite marge pour voir le fond
                overflowY: 'auto'  // Scroll interne activé
              }}>
                <button onClick={() => setActiveSection(null)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✖</button>
                <h2 style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '12px', marginTop: 0 }}>{cvData[activeSection].title}</h2>
                <div style={{ marginTop: '15px' }}>{cvData[activeSection].content}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}