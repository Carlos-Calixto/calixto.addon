// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE E PERSONALIZE SEUS ADDONS AQUI!
// =======================================================================
const addons = [
    {
        name: "Balls Addon",
        image: "ballsaddon.png",
        link: "https://COLOQUE-O-LINK-DO-ADDON-AQUI.COM", // <-- TROQUE ESTE LINK!
        // --- NOVAS INFORMAÇÕES ---
        description: "Este addon adiciona várias bolas esportivas ao jogo, como futebol, basquete e vôlei, cada uma com físicas e interações únicas.",
        version: "1.2.0",
        game_version: "1.20+", // Versão do jogo compatível
        creator: "Seu Nome",
        category: "Itens" // Categorias: "Criaturas", "Itens", "UI", etc.
    },
    {
        name: "More Tools",
        image: "morettols.png",
        link: "https://COLOQUE-O-LINK-DESTE-OUTRO-ADDON-AQUI.COM", // <-- TROQUE ESTE LINK!
        // --- NOVAS INFORMAÇÕES ---
        description: "Expanda seu arsenal com mais de 20 novas ferramentas feitas de materiais vanilla e novos minérios. Inclui martelos, foices e muito mais!",
        version: "2.5.1",
        game_version: "1.19.4 - 1.20.1",
        creator: "Outro Criador",
        category: "Itens"
    },
    {
        name: "Dragões Lendários",
        image: "dragon_placeholder.png", // Crie uma imagem para este addon
        link: "https://LINK-DO-ADDON-DRAGAO.COM",
        // --- NOVAS INFORMAÇÕES ---
        description: "Adiciona 5 tipos de dragões majestosos que podem ser domados e montados. Cada dragão possui habilidades de fogo, gelo ou veneno.",
        version: "3.0.0",
        game_version: "1.20.1+",
        creator: "Seu Nome",
        category: "Criaturas" 
    }
    // Adicione mais addons aqui seguindo o mesmo modelo
];
// =======================================================================
// FIM DA ÁREA DE CONFIGURAÇÃO - O IDEAL É NÃO ALTERAR O CÓDIGO ABAIXO
// =======================================================================

// --- ELEMENTOS DO DOM ---
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFoundMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('addonModal');
const modalBody = document.getElementById('modalBody');
const closeModalButton = document.querySelector('.close-button');

let currentCategory = 'all'; // Categoria selecionada no momento

// --- FUNÇÕES ---

// Função principal que exibe os addons
function displayResults(query = '') {
    resultsContainer.innerHTML = '';
    const normalizedQuery = query.toLowerCase().trim();

    // 1. Filtra por categoria, depois por pesquisa
    const filteredAddons = addons.filter(addon => {
        const matchesCategory = currentCategory === 'all' || addon.category === currentCategory;
        const matchesSearch = addon.name.toLowerCase().includes(normalizedQuery);
        return matchesCategory && matchesSearch;
    });

    // Exibe mensagem se não encontrar nada
    if (filteredAddons.length === 0) {
        notFoundMessage.classList.remove('hidden');
    } else {
        notFoundMessage.classList.add('hidden');
    }

    // Cria os cards dos addons
    filteredAddons.forEach((addon, index) => {
        // Encontra o índice original do addon para o modal funcionar corretamente
        const originalIndex = addons.findIndex(a => a.name === addon.name);
      
        const addonCardHTML = `
            <div class="result-item" data-index="${originalIndex}">
                <img src="png/${addon.image}" alt="Imagem do addon ${addon.name}">
                <div class="item-content">
                    <h3>${addon.name}</h3>
                    <span class="category-tag">${addon.category}</span>
                    <button class="details-btn">Ver Detalhes</button>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += addonCardHTML;
    });

    // Adiciona o listener para os botões "Ver Detalhes" DEPOIS de criá-los
    addDetailButtonListeners();
}

// Função para abrir o Modal com as informações do addon
function openModal(index) {
    const addon = addons[index];
    modalBody.innerHTML = `
        <img src="png/${addon.image}" alt="${addon.name}" class="modal-img">
        <div class="modal-info">
            <h2>${addon.name}</h2>
            <p class="modal-description">${addon.description}</p>
            <ul class="modal-details-list">
                <li><i class="fa-solid fa-code-commit"></i> <strong>Versão:</strong> ${addon.version}</li>
                <li><i class="fa-solid fa-gamepad"></i> <strong>Compatível com:</strong> ${addon.game_version}</li>
                <li><i class="fa-solid fa-user-pen"></i> <strong>Criador:</strong> ${addon.creator}</li>
                <li><i class="fa-solid fa-folder-open"></i> <strong>Categoria:</strong> ${addon.category}</li>
            </ul>
            <a href="${addon.link}" target="_blank" rel="noopener noreferrer" class="download-btn">
                <i class="fa-solid fa-download"></i> Baixar Agora
            </a>
        </div>
    `;
    modal.style.display = 'flex'; // Exibe o modal
}

// Função para fechar o Modal
function closeModal() {
    modal.style.display = 'none';
}

// --- EVENT LISTENERS ---

// Listener para a barra de pesquisa
searchInput.addEventListener('input', () => {
    displayResults(searchInput.value);
});

// Listeners para os botões de filtro de categoria
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos e adiciona no clicado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Atualiza a categoria e renderiza os resultados
        currentCategory = button.getAttribute('data-category');
        displayResults(searchInput.value);
    });
});

// Listener para os botões "Ver Detalhes" (usando delegação de evento)
function addDetailButtonListeners() {
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Pega o 'data-index' do card pai do botão
            const card = event.target.closest('.result-item');
            const addonIndex = card.getAttribute('data-index');
            openModal(addonIndex);
        });
    });
}

// Listeners para fechar o modal
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) { // Se clicar fora do conteúdo do modal
        closeModal();
    }
});
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { // Se pressionar a tecla ESC
        closeModal();
    }
});


// Exibe todos os addons ao carregar a página
window.addEventListener('load', () => {
    displayResults();
});
