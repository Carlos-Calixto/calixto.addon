// script.js - Versão final, completa e sem erros
// Inclui: render de features, modal de screenshots, year no footer,
// tracking simples de download, acessibilidade (Esc) e remoção do placeholder de imagem.
// Coloque este arquivo em /js/script.js (ou substitua o atual).

/* ========= Dados (edite quando quiser) ========= */
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

/* ========= Helpers e UI ========= */
(function initSiteScripts() {
  // Garante que o DOM esteja pronto (o arquivo normalmente é carregado antes do </body>, mas assim é mais seguro)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  function onReady() {
    renderFeatures();
    setupScreensModal();
    setFooterYear();
    setupDownloadTracking();
    setupEscClose();
    removeHeroPlaceholders();
  }

  /* --------- Render features dinamicamente --------- */
  function renderFeatures() {
    const featuresGrid = document.getElementById('featuresGrid');
    if (!featuresGrid) return;

    featuresGrid.innerHTML = '';
    FEATURES.forEach(f => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:.6rem">
          <div style="width:44px;height:44px;border-radius:10px;background:rgba(0,195,255,0.06);display:flex;align-items:center;justify-content:center">
            <i class="${escapeHtml(f.icon)}" style="font-size:18px;color:var(--accent)"></i>
          </div>
          <div>
            <h3 style="margin:0">${escapeHtml(f.title)}</h3>
          </div>
        </div>
        <p>${escapeHtml(f.desc)}</p>
      `;
      featuresGrid.appendChild(card);
    });
  }

  // simples escape para evitar injeção acidental (mínimo)
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* --------- Modal de screenshots --------- */
  function setupScreensModal() {
    const screensGrid = document.getElementById('screensGrid');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.querySelector('.modal-close');

    if (!screensGrid || !modal || !modalImg) return;

    // abrir modal ao clicar na thumbnail
    screensGrid.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      const src = img.getAttribute('src');
      if (!src) return;
      showModal(src);
    });

    // fechar com o botão
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // fechar clicando no backdrop
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    function showModal(src) {
      modalImg.setAttribute('src', src);
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      // limpa src para evitar reprodução de vídeos ocultos ou uso de memória
      modalImg.setAttribute('src', '');
    }
  }

  /* --------- Footer year --------- */
  function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
  }

  /* --------- Download CTA tracking (simples) --------- */
  function setupDownloadTracking() {
    const selectors = ['#downloadCTA', '#downloadTop'];
    const els = selectors
      .map(sel => Array.from(document.querySelectorAll(sel)))
      .flat();

    if (!els.length) return;

    els.forEach(el => {
      el.addEventListener('click', (ev) => {
        // Exemplo: analytics local (substitua por real se tiver)
        try {
          console.log('Download clicado - elemento id/class:', el.id || el.className || el.href);
          // Ex.: navigator.sendBeacon('/track', JSON.stringify({event:'download_click', href: el.href}));
        } catch (err) {
          // não quebra se analytics falhar
          console.warn('erro no tracking de download', err);
        }
      });
    });
  }

  /* --------- Acessibilidade: fechar modal com Esc --------- */
  function setupEscClose() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    window.addEventListener('keydown', (e) => {
      const active = modal.getAttribute('aria-hidden') === 'false' || modal.style.display === 'flex';
      if (e.key === 'Escape' && active) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        const modalImg = document.getElementById('modalImg');
        if (modalImg) modalImg.setAttribute('src', '');
      }
    });
  }

  /* --------- Remoção do placeholder / ícone de imagem quebrada na hero --------- */
  function removeHeroPlaceholders() {
    const heroMedia = document.querySelector('.hero-media');
    if (!heroMedia) return;

    // Remover imagens pequenas ou que falharam no carregamento,
    // preservando a imagem principal com a classe .hero-preview
    const imgs = Array.from(heroMedia.querySelectorAll('img'));
    imgs.forEach(img => {
      if (img.classList.contains('hero-preview')) return; // mantém a preview
      // naturalWidth/naturalHeight indicam se a imagem carregou corretamente
      const w = img.naturalWidth || img.width || 0;
      const h = img.naturalHeight || img.height || 0;

      // condição: imagem falhou (já completa e largura 0) ou é apenas um ícone muito pequeno (<=32px)
      if ((img.complete && w === 0) || w <= 32 || h <= 32) {
        img.remove();
      }
    });

    // Injeta um CSS seguro para esconder qualquer resquício de placeholders pequenos
    if (!document.getElementById('hide-hero-placeholder-styles')) {
      const style = document.createElement('style');
      style.id = 'hide-hero-placeholder-styles';
      style.textContent = `
        /* Garante aparência limpa na hero */
        .hero-media { overflow: hidden; position: relative; }
        /* Esconde imagens que tipicamente são placeholders por atributos comuns */
        .hero-media img[alt=""], .hero-media img[width="16"], .hero-media img[height="16"], .hero-media img[alt="placeholder"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

})(); // fim IIFE
