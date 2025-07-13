// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE E PERSONALIZE SEUS ADDONS AQUI!
// =======================================================================
const addons = [
    {
        name: "Balls Addon",
        image: "ballsaddon.png",
        link: "https://COLOQUE-O-LINK-DO-ADDON-AQUI.COM",
        description: "Este addon adiciona várias bolas esportivas ao jogo, como futebol, basquete e vôlei, cada uma com físicas e interações únicas.",
        version: "1.2.0",
        game_version: "1.20+",
        creator: "Seu Nome",
        category: "Itens"
    },
    {
        name: "More Tools",
        image: "morettols.png",
        link: "https://COLOQUE-O-LINK-DESTE-OUTRO-ADDON-AQUI.COM",
        description: "Expanda seu arsenal com mais de 20 novas ferramentas feitas de materiais vanilla e novos minérios. Inclui martelos, foices e muito mais!",
        version: "2.5.1",
        game_version: "1.19.4 - 1.20.1",
        creator: "Outro Criador",
        category: "Itens"
    },
    {
        name: "Dragões Lendários",
        image: "dragon_placeholder.png",
        link: "https://LINK-DO-ADDON-DRAGAO.COM",
        description: "Adiciona 5 tipos de dragões majestosos que podem ser domados e montados. Cada dragão possui habilidades de fogo, gelo ou veneno.",
        version: "3.0.0",
        game_version: "1.20.1+",
        creator: "Seu Nome",
        category: "Criaturas"
    },
    {
        name: "Interface Melhorada",
        image: "ui_placeholder.png", // Crie uma imagem para este addon
        link: "https://LINK-DO-ADDON-UI.COM",
        description: "Renova completamente a interface do inventário, da hotbar e dos menus, com um design mais limpo e moderno.",
        version: "1.0.0",
        game_version: "1.20+",
        creator: "Seu Nome",
        category: "UI"
    }
];
// =======================================================================
// FIM DA ÁREA DE CONFIGURAÇÃO - O IDEAL É NÃO ALTERAR O CÓDIGO ABAIXO
// =======================================================================

// --- ELEMENTOS DO DOM ---
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFoundMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('addonModal');
const modalBody = document.getElementById('modalBody');
const closeModalButton = document.querySelector('.close-button');

let currentCategory = 'all';

// --- FUNÇÕES ---

// Função que ATUALIZA A GRADE PRINCIPAL de addons
function displayResultsInGrid(query = '') {
    resultsContainer.innerHTML = '';
    const normalizedQuery = query.toLowerCase().trim();

    const filteredAddons = addons.filter(addon => {
        const matchesCategory = currentCategory === 'all' || addon.category === currentCategory;
        const matchesSearch = addon.name.toLowerCase().includes(normalizedQuery);
        return matchesCategory && matchesSearch;
    });

    notFoundMessage.classList.toggle('hidden', filteredAddons.length > 0);

    filteredAddons.forEach(addon => {
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

    addDetailButtonListeners();
}

// NOVA FUNÇÃO: Mostra o dropdown com sugestões de busca
function showSearchSuggestions(query) {
    searchDropdown.innerHTML = '';
    if (!query) {
        searchDropdown.classList.remove('visible');
        return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const filteredAddons = addons.filter(addon => addon.name.toLowerCase().includes(normalizedQuery));

    if (filteredAddons.length > 0) {
        filteredAddons.forEach(addon => {
            const originalIndex = addons.findIndex(a => a.name === addon.name);
            const suggestionItem = document.createElement('a');
            suggestionItem.href = '#';
            suggestionItem.className = 'dropdown-item';
            suggestionItem.textContent = addon.name;
            suggestionItem.dataset.index = originalIndex;
            
            suggestionItem.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(originalIndex);
                searchInput.value = addon.name;
                searchDropdown.classList.remove('visible');
            });

            searchDropdown.appendChild(suggestionItem);
        });
        searchDropdown.classList.add('visible');
    } else {
        searchDropdown.classList.remove('visible');
    }
}

// Função para abrir o Modal
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

// Função para fechar o Modal
function closeModal() {
    modal.style.display = 'none';
}

// --- EVENT LISTENERS ---

// Listener para a barra de pesquisa (mostra SUGESTÕES)
searchInput.addEventListener('input', () => {
    showSearchSuggestions(searchInput.value);
});

// Listener para a tecla "Enter" (ATUALIZA A GRADE)
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Impede o formulário de ser enviado (caso esteja em um)
        displayResultsInGrid(searchInput.value);
        searchDropdown.classList.remove('visible');
    }
});

// Listener para fechar o dropdown ao clicar fora
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('visible');
    }
});

// Listeners para os botões de filtro de categoria
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        currentCategory = button.getAttribute('data-category');
        searchInput.value = ''; // Limpa a busca ao trocar de categoria
        searchDropdown.classList.remove('visible');
        displayResultsInGrid(); // Atualiza a grade com a nova categoria
    });
});

// Listener para os botões "Ver Detalhes"
function addDetailButtonListeners() {
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.result-item');
            const addonIndex = card.getAttribute('data-index');
            openModal(addonIndex);
        });
    });
}

// Listeners para fechar o modal
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Exibe todos os addons ao carregar a página
window.addEventListener('load', () => {
    displayResultsInGrid();
});
