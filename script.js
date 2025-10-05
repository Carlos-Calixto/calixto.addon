// script.js - funcionalidades básicas para o site CALiLA
// Lembre-se: troque "DOWNLOAD_LINK_HERE" no index.html pelo link real do app

// --- Dados (edite aqui) ---
const FEATURES = [
  {
    title: "Redução de Latência",
    desc: "Escolha rotas e servidores otimizados automaticamente para reduzir ping em jogos.",
    icon: "fa-solid fa-bolt"
  },
  {
    title: "Troca Automática de DNS",
    desc: "Seleciona DNS de baixa latência dependendo do servidor do jogo e da sua região.",
    icon: "fa-solid fa-dns"
  },
  {
    title: "Tuning de CPU & GPU",
    desc: "Perfis prontos (Jogo/Streaming/Produtividade) para melhorar desempenho sem quebrar estabilidade.",
    icon: "fa-solid fa-microchip"
  },
  {
    title: "Monitoramento em Tempo Real",
    desc: "Gráficos e logs simplificados para ver o impacto das otimizações.",
    icon: "fa-solid fa-chart-line"
  },
  {
    title: "Perfis e Automação",
    desc: "Crie perfis automáticos que aplicam configurações quando um jogo é detectado.",
    icon: "fa-solid fa-user-gear"
  },
  {
    title: "Backup & Restauração",
    desc: "Restaure configurações anteriores com um clique se quiser desfazer alterações.",
    icon: "fa-solid fa-file-arrow-up"
  }
];

// --- Render features ---
const featuresGrid = document.getElementById('featuresGrid');
function renderFeatures(){
  featuresGrid.innerHTML = '';
  FEATURES.forEach(f => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:.6rem">
        <div style="width:44px;height:44px;border-radius:10px;background:rgba(0,195,255,0.06);display:flex;align-items:center;justify-content:center">
          <i class="${f.icon}" style="font-size:18px;color:var(--accent)"></i>
        </div>
        <div>
          <h3 style="margin:0">${f.title}</h3>
        </div>
      </div>
      <p>${f.desc}</p>
    `;
    featuresGrid.appendChild(card);
  });
}
renderFeatures();

// --- Screens modal ---
const screensGrid = document.getElementById('screensGrid');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.querySelector('.modal-close');

if (screensGrid){
  screensGrid.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const src = img.getAttribute('src');
    modalImg.setAttribute('src', src);
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  });
}

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
  }
});

// --- Footer year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Download CTA tracking (simples) ---
document.querySelectorAll('#downloadCTA, #downloadTop').forEach(el => {
  el.addEventListener('click', () => {
    // Aqui você pode adicionar analytics / evento para servidor
    console.log('Download clicado - redirecionar para o link real.');
  });
});

// --- Small accessibility: enable Esc to close modal ---
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
  }
});
