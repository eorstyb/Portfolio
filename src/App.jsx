import React, { useState, useEffect } from 'react';

// --- COMPOSANT : Le Jeu de Memory ---
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
      backgroundColor: '#0f172a', padding: '20px', borderRadius: '16px', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center',
      border: '4px solid #f59e0b', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
      maxHeight: '90vh', overflowY: 'auto', position: 'relative'
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
          <button onClick={onClose} style={{ backgroundColor: '#f59e0b', padding: '10px 20px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', color: '#0f172a' }}>Quitter</button>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '1.4rem', color: '#f59e0b', margin: 0 }}>Memory Portfolio</h2>
          <div style={{ fontSize: '0.8rem' }}>Coups : {moves} | Paires : {matched.length / 2} / 9</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginTop: '10px', maxWidth: '500px', width: '100%' }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              return (
                <div key={index} onClick={() => handleCardClick(index)} style={{
                  aspectRatio: '1', backgroundColor: isFlipped ? '#fff' : '#1e293b',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', border: '2px solid #334155', transition: 'transform 0.4s',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  {isFlipped ? (
                    <img src={card.img} alt={card.type} style={{ width: '80%', height: '80%', objectFit: 'contain', transform: 'rotateY(180deg)' }} />
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
  const [showGame, setShowGame] = useState(false);

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
          <b>Ingénieur</b>, dynamique et motivé, étudiant le domaine de l'ingénierie du <b>cloud computing</b>. Découvrir le métier de <b>développeur fullstack</b> dans le monde de l'entreprise tout en apprenant de nouvelles technologies est pour moi une réelle ambition.
        </>
      ),
    },
    projects: {
      title: "PROJETS",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          
          {/* PROJET 1 */}
          <div style={{ 
            backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '12px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repo Logo" style={{ width: '40px', height: '40px' }} />
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>Nom_Du_Repo_1</h3>
            </div>
            <div style={{ 
              backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', 
              fontSize: '0.85rem', color: '#475569', maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace' 
            }}>
              <b style={{ color: '#000' }}>📄 README.md Preview:</b><br/><br/>
              Ce projet est une application de [Description courte]. <br/>
              - Technologie : React, Firebase<br/>
              - Fonctionnalité : Authentification, CRUD...
            </div>
            <a href="https://github.com/abdemeh/projet-kosmio-front" target="_blank" rel="noreferrer" style={{
              alignSelf: 'flex-start', backgroundColor: '#24292f', color: '#fff', padding: '8px 16px', 
              borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '16px', filter: 'invert(1)' }} />
              Voir sur GitHub
            </a>
          </div>

          {/* PROJET 2 */}
          <div style={{ 
            backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '12px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repo Logo" style={{ width: '40px', height: '40px' }} />
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>Nom_Du_Repo_2</h3>
            </div>
            <div style={{ 
              backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', 
              fontSize: '0.85rem', color: '#475569', maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace' 
            }}>
              <b style={{ color: '#000' }}>📄 README.md Preview:</b><br/><br/>
              Analyse de données sur [Sujet]. <br/>
              - Technologie : Python, Pandas, Scikit-learn<br/>
            </div>
            <a href="https://github.com/ton-pseudo/repo2" target="_blank" rel="noreferrer" style={{
              alignSelf: 'flex-start', backgroundColor: '#24292f', color: '#fff', padding: '8px 16px', 
              borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '16px', filter: 'invert(1)' }} />
              Voir sur GitHub
            </a>
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

  return (
    <>
      <style>{`
        .landscape-warning { display: none; }
        
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
        @keyframes casinoSpin { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
      `}</style>

      <div className="landscape-warning">
        <div className="rotate-icon">📱</div>
        <h2>Mode Paysage Requis</h2>
        <p>Pour explorer la chambre, pivotez votre téléphone.</p>
      </div>

      <div className="app-content" style={{ width: '100vw', height: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: 'sans-serif' }}>
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

          {activeSection && cvData[activeSection] && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
              <div className="popup-content" style={{ 
                backgroundColor: '#fff', 
                padding: '35px', 
                borderRadius: '16px', 
                maxWidth: (['experience', 'skills', 'education', 'interests', 'divertissements'].includes(activeSection)) ? '750px' : '550px', 
                width: '85%', 
                position: 'relative', 
                maxHeight: '85vh',
                overflowY: 'auto'
              }}>
                <button onClick={() => setActiveSection(null)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✖</button>
                <h2 style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '12px', marginTop: 0 }}>{cvData[activeSection].title}</h2>
                <div style={{ marginTop: '15px' }}>{cvData[activeSection].content}</div>
              </div>
            </div>
          )}

          {showGame && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
              <MemoryGame onClose={() => setShowGame(false)} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}