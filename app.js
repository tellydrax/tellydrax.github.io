document.addEventListener('DOMContentLoaded', () => {
  // 1. Matrix Background Animation
  const canvas = document.getElementById('matrix');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*@';
    const fontSize = 14;
    const drops = Array(Math.floor(window.innerWidth / fontSize)).fill(1);

    setInterval(() => {
      ctx.fillStyle = 'rgba(5, 8, 17, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00f5d4';
      ctx.font = fontSize + 'px Fira Code';
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 45);
  }

  // 2. Interactive Terminal (on index.html)
  const termBox = document.getElementById('terminal-box');
  const termOut = document.getElementById('terminal-output');
  const termIn = document.getElementById('terminal-input');

  if (termBox && termOut && termIn) {
    const cmds = {
      help: 'Commandes : <span style="color:#00f5d4">whoami</span>, <span style="color:#00f5d4">skills</span>, <span style="color:#00f5d4">projects</span>, <span style="color:#00f5d4">experience</span>, <span style="color:#00f5d4">contact</span>, <span style="color:#00f5d4">clear</span>',
      whoami: 'Wariboko Praise — Étudiant Bachelor 3 Cybersécurité & Réseaux à Nexa Digital School (Paris). En recherche d\'alternance (3 sem. entreprise / 1 sem. école).',
      skills: '[Cyber] Sécurité opérationnelle, Audit, Gestion des risques | [Systèmes] Linux, Windows, Active Directory | [IT] Déploiement logiciel, Wiki, Git.',
      projects: '9 projets cyber & infrastructure disponibles sur la page <a href="projets.html" style="color:#00f5d4">Projets</a> (Hardening AD, Audit Vulnérabilités, SIEM Wazuh, Scanner Réseau, etc.).',
      experience: '• 07/2025-08/2025 : Stagiaire Informatique @ AXENS<br>• 08/2023-05/2024 : Technicien Support @ The Root HUB<br>• 02/2022-05/2023 : Assistant Bureautique @ Mr Soft',
      contact: '📧 waribokopraise2005@gmail.com | 📱 06.27.09.91.59 | 📍 Paris, Île-de-France'
    };

    const execute = (raw) => {
      const clean = raw.trim().toLowerCase();
      if (!clean) return;
      if (clean === 'clear') {
        termOut.innerHTML = '';
        return;
      }
      const div = document.createElement('div');
      div.style.marginTop = '0.55rem';
      div.innerHTML = `<span style="color:#00f5d4">guest@tellydrax:~$</span> ${raw}<br><span style="color:#cbd5e1">${cmds[clean] || 'Commande inconnue. Tapez <b>help</b>.'}</span>`;
      termOut.appendChild(div);
      termOut.scrollTop = termOut.scrollHeight;
    };

    termBox.addEventListener('click', (e) => {
      if (!e.target.classList.contains('chip')) termIn.focus();
    });

    document.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        execute(btn.getAttribute('data-cmd'));
        termIn.focus();
      });
    });

    termIn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        execute(termIn.value);
        termIn.value = '';
      }
    });
  }

  // 3. Project Category Filter (on projets.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          card.style.display = (filter === 'all' || cat === filter) ? 'flex' : 'none';
        });
      });
    });
  }
});
