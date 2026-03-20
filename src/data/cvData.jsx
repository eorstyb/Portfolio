import React from 'react';

// Transformé en simple fonction (minuscule, non exportée) pour contourner le blocage de Vite
const renderSkill = (logoUrl, name) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '10px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px',
    border: '1px solid #e2e8f0', textAlign: 'center'
  }}>
    <img src={logoUrl} alt={name} style={{ height: '40px', maxWidth: '100%', objectFit: 'contain' }} />
    <span style={{ fontSize: '1.2rem', color: '#1e293b' }}>{name}</span>
  </div>
);

export const clickZones = [
  { id: 'about', label: 'Ordinateur', displayTitle: 'À PROPOS', top: '35%', left: '15%', width: '18%', height: '22%' },
  { id: 'projects', label: 'Documents', displayTitle: 'PROJETS', top: '48%', left: '28%', width: '18%', height: '22%' },
  { id: 'skills', label: 'Serveur', displayTitle: 'COMPÉTENCES', top: '63%', left: '41%', width: '16%', height: '27%' },
  { id: 'mobilite', label: 'Tableau liège', displayTitle: 'MOBILITE', top: '5%', left: '13%', width: '22%', height: '28%' },
  { id: 'experiences', label: 'Sac', displayTitle: 'EXPERIENCES PRO', top: '79%', left: '10%', width: '22%', height: '28%' },
  { id: 'education', label: 'Diplômes', displayTitle: 'FORMATIONS', top: '40%', left: '45%', width: '22%', height: '15%' },
  { id: 'contact', label: 'Téléphone', displayTitle: null, top: '65%', left: '79%', width: '8%', height: '5%' }, 
  { id: 'interests', label: 'Posters', displayTitle: 'PASSIONS', top: '5%', left: '40%', width: '28%', height: '33%' },
  { id: 'divertissements', label: 'Sunny', displayTitle: 'DIVERTISSEMENTS', top: '10%', left: '72%', width: '25%', height: '30%' },
];

export const getCvData = (setShowGame, setShowInvaders, setActiveSection) => ({
  about: {
    title: "À PROPOS",
    content: (
      <div style={{ fontSize: '1.4rem', lineHeight: '1.6' }}>
        Ethan Orsolle, <span style={{ color: '#3b82f6' }}>ingénieur</span>, dynamique et motivé, étudiant le domaine de l'ingénierie du <span style={{ color: '#3b82f6' }}>cloud computing</span>. Découvrir le métier de <span style={{ color: '#3b82f6' }}>développeur fullstack</span> dans le monde de l'entreprise tout en apprenant de nouvelles technologies est pour moi une réelle ambition.
      </div>
    ),
  },
  projects: {
    title: "PROJETS",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repo Logo" style={{ width: '40px', height: '40px' }} />
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>projet-kosmio-front</h3>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', fontSize: '1.1rem', color: '#475569', maxHeight: '150px', overflowY: 'auto' }}>
            <span style={{ color: '#000' }}>📄 README.md</span><br/><br/>
            Ce projet est une application d'interface web React permettant d'uploader des documents PDF, de déclencher la génération de fiches solutions et secteurs via le pipeline RAG du backend, puis de visualiser, éditer et gérer ces fiches au format Markdown.
          </div>
          <a href="https://github.com/abdemeh/projet-kosmio-front" target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start', backgroundColor: '#24292f', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '16px', filter: 'invert(1)' }} />
            Voir sur GitHub
          </a>
        </div>

        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Repo Logo" style={{ width: '40px', height: '40px' }} />
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>PokemonDrafter</h3>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', fontSize: '1.1rem', color: '#475569', maxHeight: '150px', overflowY: 'auto' }}>
            <span style={{ color: '#000' }}>📄 README.md</span><br/><br/>
            Application web micro-services simulant des combats pokemon en réseau, permettant la gestion des pokemon, équipes.
          </div>
          <a href="https://github.com/SEMGOODD/PokemonDrafter" target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start', backgroundColor: '#24292f', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style={{ width: '16px', filter: 'invert(1)' }} />
            Voir sur GitHub
          </a>
        </div>
        
        <div onClick={() => { setShowInvaders(true); setActiveSection(null); }} style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fee2e2', borderRadius: '16px', border: '2px dashed #ef4444', textAlign: 'center', cursor: 'pointer', transition: '0.2s', fontSize: '1.4rem', color: '#ef4444' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          🚀 Jouer à Space Invaders
        </div>
      </div>
    ),
  },
  skills: {
    title: "COMPÉTENCES TECHNIQUES",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Cloud Providers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '15px' }}>
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg", "GCP")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "AWS")}
        </div>
        <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Langages</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
          {renderSkill("https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", "Java")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg", "C")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png", "C#")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", "Python")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg", "JS")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg", "TS")}
        </div>
        <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Outils & OS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg", "Docker")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg", "Git")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg", "Linux")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg", "Windows")}
        </div>
        <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '5px', borderBottom: '1px solid #eee' }}>Langues</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", "Natif")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg", "Professionnel")}
          {renderSkill("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/960px-Flag_of_Japan.svg.png", "Notions")}
       </div>
      </div>
    ),
  },
  experiences: {
    title: "EXPÉRIENCES PRO",
    content: (
      <div style={{ position: 'relative', borderLeft: '3px solid #bfdbfe', marginLeft: '10px', marginTop: '15px', paddingBottom: '5px' }}>
        <div style={{ position: 'relative', paddingLeft: '30px', paddingBottom: '35px'}}>
          <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
          <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '1rem', display: 'inline-block', marginBottom: '10px' }}>Avril 2024 - Août 2024</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', color: '#0f172a' }}>Stagiaire IA <span style={{ color: '#64748b', fontSize: '1.1rem' }}>@ Osaka Metropolitan University</span></h3>
          <p style={{ margin: 0, color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>• Recherche de solutions de minimisation des datasets<br/>• Scrapping et analyse de données<br/>• Optimisation et tests de LLM sur le dataset récupéré</p>
        </div>
        <div style={{ position: 'relative', paddingLeft: '30px', paddingBottom: '35px' }}>
          <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
          <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '1rem', display: 'inline-block', marginBottom: '10px' }}>Novembre 2019 - Septembre 2020</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', color: '#0f172a' }}>Alternant Développeur <span style={{ color: '#64748b', fontSize: '1.1rem' }}>@ ACHGO</span></h3>
          <p style={{ margin: 0, color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>• Développement et maintenance d'une application web Java<br/>• Tests de projets JavaScript pour conseil d'une entreprise cliente<br/>• Création de pages web Wordpress</p>
        </div>
        <div style={{ position: 'relative', paddingLeft: '30px'}}>
          <div style={{ position: 'absolute', left: '-10px', top: '0', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '3px solid #fff', boxShadow: '0 0 0 2px #bfdbfe' }}></div>
          <div style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '1rem', display: 'inline-block', marginBottom: '10px' }}>Novembre 2018 - Avril 2021</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', color: '#0f172a' }}>Stagiaire Ingénieur d'Étude <span style={{ color: '#64748b', fontSize: '1.1rem' }}>@ Infotel</span></h3>
          <p style={{ margin: 0, color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>• Tierce Maintenance Applicative d'une application web Springboot<br/>• Gestion des tickets Jira<br/>• Équipe coordonnée grâce à scrumban</p>
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
            <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1.4rem' }}>Diplôme Ingénieur Informatique</h4>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '1.2rem' }}><b>CY TECH Cergy</b> • En cours (Cycle Ingénieur)</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid #eee' }}>
            <img src="/iut_velizy_logo.png" alt="Logo IUT Vélizy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1.4rem' }}>DUT Informatique</h4>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '1.2rem' }}><b>Université Paris-Saclay</b> • Promotion 2021</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ backgroundColor: '#fff7ed', padding: '15px', borderRadius: '12px', border: '1px solid #ffedd5', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="GCP" style={{ height: '30px', marginBottom: '10px' }} />
             <span style={{ fontSize: '1.2rem', color: '#9a3412' }}>Cloud Associate Engineer</span>
             <span style={{ fontSize: '1rem', color: '#c2410c' }}>Google Cloud Certified</span>
          </div>
          <div style={{ backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '12px', border: '1px solid #dcfce7', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
             <div style={{ width: '40px', height: '40px', backgroundColor: '#16a34a', borderRadius: '50%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.4rem' }}>890</div>
             <span style={{ fontSize: '1.2rem', color: '#166534' }}>TOEIC Score</span>
             <span style={{ fontSize: '1rem', color: '#15803d' }}>Niveau Professionnel</span>
          </div>
        </div>
      </div>
    ),
  },
  contact: {
    title: "CONTACT",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Email_Logo_PNG.png" alt="Mail" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          <a href="mailto:orsolleeth@cy-tech.fr" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '1.4rem' }}>orsolleeth@cy-tech.fr</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Phone_icon_rotated.svg/500px-Phone_icon_rotated.svg.png" alt="Tel" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          <a href="tel:+33651517384" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '1.4rem' }}>+33 6 51 51 73 84</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" alt="LinkedIn" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          <a href="https://www.linkedin.com/in/ethan-orsolle-tyberg" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '1.4rem' }}>@ethan-orsolle-tyberg</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="GitHub" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          <a href="https://github.com/eorstyb" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '1.4rem' }}>eorstyb</a>
        </div>
        <a href="/CV_ETHAN_ORSOLLE.pdf" target="_blank" rel="noreferrer" style={{
          backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '12px 24px', fontSize: '1.4rem',
          borderRadius: '25px', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', 
          justifyContent: 'center', alignSelf: 'center', gap: '10px', marginTop: '10px',
          boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}>
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
          <span style={{ fontSize: '3rem', marginBottom: '5px' }}>🎵</span>
          <b style={{ fontSize: '1.2rem' }}>Musique</b>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eff6ff', padding: '15px', borderRadius: '12px', border: '1px solid #dbeafe' }}>
          <span style={{ fontSize: '3rem', marginBottom: '5px' }}>🏀</span>
          <b style={{ fontSize: '1.2rem' }}>Sport</b>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff7ed', padding: '15px', borderRadius: '12px', border: '1px solid #ffedd5' }}>
          <span style={{ fontSize: '3rem', marginBottom: '5px' }}>👕</span>
          <b style={{ fontSize: '1.2rem' }}>Mode</b>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '3rem', marginBottom: '5px' }}>🎬</span>
          <b style={{ fontSize: '1.2rem' }}>Cinéma</b>
        </div>
      </div>
    ),
  },
  divertissements: {
    title: "DIVERTISSEMENTS",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '10px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#ef4444', marginBottom: '15px', borderBottom: '2px solid #fee2e2', paddingBottom: '8px', letterSpacing: '1px' }}>JEUX VIDÉOS</h3>
          <div style={{ color: '#ef4444', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '5px' }}>&gt; // Game:</div>
          
          <div onClick={() => { setShowGame(true); setActiveSection(null); }} title="Cliquez pour lancer mon Memory Game !"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', backgroundColor: '#fff1f2', padding: '25px',
              borderRadius: '16px', border: '2px dashed #fecdd3', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffe4e6'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff1f2'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/960px-Valorant_logo_-_pink_color_version.svg.png" title="Valorant" style={{ maxHeight: '45px', maxWidth: '100%', objectFit: 'contain' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Wuthering_Waves_logo.svg/500px-Wuthering_Waves_logo.svg.png" title="Wuthering Waves" style={{ maxHeight: '50px', maxWidth: '100%', objectFit: 'contain' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/fr/0/0b/Slay_the_Spire_Logo.png" title="Slay the Spire" style={{ maxHeight: '45px', maxWidth: '100%', objectFit: 'contain' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Elden_Ring_logo_black.svg/960px-Elden_Ring_logo_black.svg.png" title="Elden Ring" style={{ maxHeight: '25px', maxWidth: '100%', objectFit: 'contain' }} /></div>
            <div style={{ gridColumn: 'span 4', marginTop: '15px', padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '1.2rem', color: '#b91c1c', border: '1px solid #fecdd3', textAlign: 'center' }}>
              💡 Cliquez sur la boîte pour tester mon Memory Game !
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#6366f1', marginBottom: '15px', borderBottom: '2px solid #e0e7ff', paddingBottom: '8px', letterSpacing: '1px' }}>CULTURE</h3>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '25px', backgroundColor: '#f1f5f9',
            padding: '25px', borderRadius: '16px', border: '2px dashed #cbd5e1', alignItems: 'center', justifyContent: 'center'
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
});