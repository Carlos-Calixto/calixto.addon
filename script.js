// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE E PERSONALIZE SEU CONTEÚDO AQUI!
// =======================================================================
const addons = [
    {
        name: "Balls Addon",
        image: "ballsaddon.png",
        link: "https://COLOQUE-O-LINK-DO-BALLS-ADDON.COM", 
        description: "Este addon adiciona várias bolas esportivas ao jogo, como beisebol, futebol e vôlei, cada uma com físicas e interações únicas.",
        version: "1.1.0",
        game_version: "Bedrock 1.20+",
        creator: "Daniye",
        category: "Addons",
        displayTag: "Addons"
    },
    {
        name: "More Tools",
        image: "morettools.png",
        link: "https://COLOQUE-O-LINK-DO-MORE-TOOLS.COM", 
        description: "Expanda seu arsenal com mais de 20 novas ferramentas e armaduras feitas de materiais vanilla e novos minérios. Inclui martelos, foices e muito mais!",
        version: "2.5.1",
        game_version: "Bedrock 1.20+",
        creator: "SorYPMod",
        category: "Addons",
        displayTag: "Addons"
    },
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

let currentCategory = 'all'; 

// --- FUNÇÕES ---

function displayResults(query = '') {
    resultsContainer.innerHTML = '';
    const normalizedQuery = query.toLowerCase().trim();

    const filteredAddons = addons.filter(addon => {
        const matchesCategory = currentCategory === 'all' || addon.category === currentCategory;
        const searchableText = `${addon.name} ${addon.category} ${addon.displayTag} ${addon.description} ${addon.game_version}`.toLowerCase();
        const matchesSearch = searchableText.includes(normalizedQuery);
        return matchesCategory && matchesSearch;
    });

    notFoundMessage.classList.toggle('hidden', filteredAddons.length > 0);

    filteredAddons.forEach(addon => {
        const addonCardHTML = `
            <div class="result-item">
                <img src="png/${addon.image}" alt="Imagem do ${addon.name}">
                <div class="item-content">
                    <h3>${addon.name}</h3>
                    <span class="category-tag">${addon.displayTag}</span>
                    <a href="${addon.link}" target="_blank" rel="noopener noreferrer" class="download-btn">
                        <i class="fa-solid fa-download"></i> Baixar Agora
                    </a>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += addonCardHTML;
    });
}

// O modal ainda existe, mas não é mais aberto a partir dos cards.
// Você pode reativar essa funcionalidade no futuro se quiser.
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
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// --- EVENT LISTENERS ---
searchInput.addEventListener('input', () => displayResults(searchInput.value));

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        displayResults(searchInput.value);
    });
});

// A função que adicionava o evento de clique para os botões de detalhes foi removida
// pois os botões agora são links de download direto.

// Eventos para fechar o modal (mantidos caso o modal seja usado de outra forma)
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});

// Exibe os resultados iniciais quando a página carrega
window.addEventListener('load', () => displayResults());
