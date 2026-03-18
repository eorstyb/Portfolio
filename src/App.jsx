import React, { useState } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  
  // NOUVEAU : État pour le popup d'accueil (affiché par défaut au chargement)
  const [showWelcome, setShowWelcome] = useState(true);

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
      title: "COMPÉTENCES",
      content: (
        <>
          • <b>Cloud Provider</b> : Google Cloud Platform / AWS<br />
          • <b>Langages</b> : Java, C, C#, Python, JS, TypeScript<br />
          • <b>Outils</b> : Docker, Git<br />
          • <b>OS</b> : Linux, Windows<br />
          • <b>Langues</b> : Français (natif), Anglais (pro), Japonais (notions)
        </>
      ),
    },
    experience: {
      title: "EXPÉRIENCES PRO",
      // FRISE CHRONOLOGIQUE INTÉGRÉE ICI
      content: (
        <div style={{ position: 'relative', borderLeft: '3px solid #bfdbfe', marginLeft: '10px', marginTop: '15px', paddingBottom: '5px' }}>
          
          {/* Expérience 3 (La plus récente) : Osaka */}
          <div style={{ position: 'relative', paddingLeft: '30px',  paddingBottom: '35px' }}>
            <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
              Avril 2024 - Août 2024
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a' }}>
              Stagiaire IA <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 'normal' }}>@ Osaka Metropolitan University</span>
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              • Recherche de solutions de minimisation des datasets<br/>
              • Scrapping et analyse de données<br/>
              • Optimisation et tests de LLM sur le dataset récupéré
            </p>
          </div>

          {/* Expérience 1 (La plus ancienne) : Infotel */}
          <div style={{ position: 'relative', paddingLeft: '30px', paddingBottom: '35px' }}>
            <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
              Novembre 2020 - Avril 2021
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a' }}>
              Stagiaire Ingénieur d'Étude <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 'normal' }}>@ Infotel</span>
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              • Tierce Maintenance Applicative d'une application web Springboot<br/>
              • Gestion des tickets Jira<br/>
              • Équipe coordonnée grâce à scrumban
            </p>
          </div>

          {/* Expérience 2 : ACHGO */}
          <div style={{ position: 'relative', paddingLeft: '30px' }}>
            <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
              Novembre 2019 - Septembre 2020
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#0f172a' }}>
              Alternant Développeur <span style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 'normal' }}>@ ACHGO</span>
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              • Développement et maintenance d'une application web Java<br/>
              • Tests de projets JavaScript pour conseil d'une entreprise cliente<br/>
              • Création de pages web Wordpress
            </p>
          </div>

          

        </div>
      ),
    },
    education: {
      title: "FORMATION ET CERTIFS",
      content: (
        <>
          • <b>Diplôme Ingénieur Informatique</b> - CY TECH (En cours)<br />
          • <b>DUT Informatique</b> - IUT Vélizy-Villacoublay<br />
          • <b>TOEIC : 890/990</b><br />
          • <b>Certification Google Cloud Associate Cloud Engineer</b>
        </>
      ),
    },
    contact: {
      title: "CONTACT",
      content: (
        <>
          <b>Email :</b> orsolleeth@cy-tech.fr<br />
          <b>Tél :</b> +33 6 51 51 73 84<br />
          <b>LinkedIn :</b> @ethan-orsolle-tyberg
        </>
      ),
    },
    interests: {
      title: "PASSIONS",
      content: (
        <>
          <b>Musique</b>, <b>sport</b>, <b>mode</b>, <b>cinéma</b> (Pulp Fiction).
        </>
      ),
    },
    divertissements: {
      title: "DIVERTISSEMENTS",
      content: (
        <>
          • <b>Jeux vidéo en coopération</b> (Valorant)<br />
          • <b>Manga / Anime / Visual Novel</b> (One Piece, Fate, Kingdom...)
        </>
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
        .landscape-warning {
          display: none;
        }

        @media (max-width: 900px) {
          .zone-badge { font-size: 0.6rem !important; padding: 2px 6px !important; }
        }

        @media (orientation: portrait) and (max-width: 800px) {
          .app-content {
            display: none !important;
          }
          .landscape-warning {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background-color: #0f172a;
            color: white;
            text-align: center;
            padding: 2rem;
            z-index: 9999;
            font-family: sans-serif;
            box-sizing: border-box;
          }
          .rotate-icon {
            font-size: 4rem;
            animation: rotatePhone 2s infinite ease-in-out;
            margin-bottom: 1rem;
          }
          @keyframes rotatePhone {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(-90deg); }
            100% { transform: rotate(0deg); }
          }
        }
      `}</style>

      <div className="landscape-warning">
        <div className="rotate-icon">📱</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: '900' }}>Mode Paysage Requis</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.5', maxWidth: '300px' }}>
          Pour explorer la chambre interactive correctement, veuillez pivoter votre téléphone à l'horizontale.
        </p>
      </div>

      <div className="app-content" style={{ 
        width: '100vw', height: '100vh', backgroundColor: '#000', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        margin: 0, padding: 0, overflow: 'hidden', fontFamily: 'sans-serif' 
      }}>
        
        {/* Le conteneur optimisé pour prendre 100% de l'espace dispo en gardant le ratio 16/9 */}
        <div style={{ 
          position: 'relative', 
          width: '100%', height: '100%', 
          maxWidth: 'calc(100vh * (16/9))', 
          maxHeight: 'calc(100vw * (9/16))',
          aspectRatio: '16/9', 
          backgroundColor: '#000', 
          overflow: 'hidden'
        }}>
          
          <img 
            src="/room-bg.jpg" 
            alt="Chambre" 
            style={{ 
              position: 'absolute', top: 0, left: 0, 
              width: '100%', height: '100%', objectFit: 'cover' 
            }} 
          />

          <div style={{
            position: 'absolute', top: '64%', left: '79%',
            transform: 'translate(-50%, -100%)',
            zIndex: 15,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              backgroundColor: '#fff', border: '3px solid #000',
              padding: '6px 12px', borderRadius: '15px',
              color: '#000', fontWeight: 'bold', fontSize: '0.8rem',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap', textTransform: 'uppercase'
            }}>
              Click mes contacts 👇
            </div>
            <div style={{
              width: 0, height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '15px solid #fff',
              marginTop: '-2px'
            }}></div>
          </div>

          {clickZones.map((zone, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(zone.id)}
              title={`Voir : ${zone.label}`}
              style={{
                position: 'absolute',
                top: zone.top, left: zone.left,
                width: zone.width, height: zone.height,
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {zone.displayTitle && (
                <div className="zone-badge" style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  marginTop: '-15px',
                  height: 'fit-content',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  {zone.displayTitle}
                </div>
              )}
            </div>
          ))}

          {/* --- POPUP D'ACCUEIL --- */}
          {showWelcome && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
            }}>
              <div style={{
                backgroundColor: '#ffffff', padding: '40px', borderRadius: '20px',
                maxWidth: '600px', width: '90%', textAlign: 'center',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)', color: '#1e293b',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <h1 style={{ marginTop: 0, fontSize: '2.2rem', fontWeight: '900', color: '#0f172a' }}>
                  Bienvenue dans mon univers ! 🎮
                </h1>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: '20px 0', color: '#475569' }}>
                  Salut, je suis <b>Ethan Orsolle</b>, étudiant Ingénieur Cloud Computing.<br/><br/>
                  J'ai transformé mon CV en une petite expérience interactive. Fouillez ma chambre en cliquant sur les différents objets (l'ordinateur, les posters, mon téléphone...) pour découvrir mon parcours, mes compétences et mes passions.
                </p>
                <button 
                  onClick={() => setShowWelcome(false)}
                  style={{
                    backgroundColor: '#3b82f6', color: '#fff', border: 'none',
                    padding: '16px 32px', fontSize: '1.1rem', fontWeight: 'bold',
                    borderRadius: '30px', cursor: 'pointer', transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)', marginTop: '10px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Entrer dans la chambre
                </button>
              </div>
            </div>
          )}

          {/* POPUP DE CONTENU */}
          {activeSection && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(5px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
            }}>
              <div style={{
                backgroundColor: '#ffffff', padding: '35px', borderRadius: '16px',
                // NOUVEAU : On élargit le popup si c'est la section experience pour la frise
                maxWidth: activeSection === 'experience' ? '750px' : '550px', 
                width: '85%', position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)', color: '#1e293b',
                maxHeight: '90%', overflowY: 'auto'
              }}>
                <button 
                  onClick={() => setActiveSection(null)}
                  style={{
                    position: 'absolute', top: '15px', right: '20px',
                    background: 'none', border: 'none', fontSize: '24px',
                    cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#ef4444'}
                  onMouseOut={(e) => e.target.style.color = '#94a3b8'}
                >
                  ✖
                </button>
                <h2 style={{ 
                  marginTop: 0, borderBottom: '3px solid #3b82f6', 
                  paddingBottom: '12px', color: '#0f172a', fontWeight: '900'
                }}>
                  {cvData[activeSection].title}
                </h2>
                {/* Remplacement de la balise <p> par <div> pour autoriser le JSX complexe de la frise */}
                <div style={{ 
                  lineHeight: '1.7', fontSize: '16px', margin: 0
                }}>
                  {cvData[activeSection].content}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}