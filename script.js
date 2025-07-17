// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE E PERSONALIZE SEU CONTEÚDO AQUI!
// =======================================================================
const addons = [
    {
        name: "Block Armor",
        image: "blockarmor.png",
        link: "https://shrinkme.ink/0WikC", 
        description: "Este addon adiciona armaduras de blocos, como terra, madeira e muito outros.",
        version: "1.9.3",
        game_version: "Bedrock 1.21+",
        creator: "SystemTv",
        category: "Addons",
        displayTag: "Addons"
    },
    {
        name: "Phase Block",
        image: "phaseblock.png",
        link: "https://shrinkme.ink/d0HWHgp", 
        description: "crie passagens secretas, atravesse os blocos, se divirta e seja criativo.",
        version: "V1.0.0.8",
        game_version: "1.21.90+",
        creator: "Four Worlds Studios",
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
        const originalIndex = addons.findIndex(a => a.name === addon.name);
        
        const addonCardHTML = `
            <div class="result-item" data-index="${originalIndex}">
                <img src="png/${addon.image}" alt="Imagem do ${addon.name}">
                <div class="item-content">
                    <h3>${addon.name}</h3>
                    <span class="category-tag">${addon.displayTag}</span>
                    <button class="details-btn">
                        <i class="fa-solid fa-download"></i> Baixar Agora
                    </button>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += addonCardHTML;
    });

    addDetailButtonListeners();
}

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

// Esta função foi reativada
function addDetailButtonListeners() {
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.result-item');
            const addonIndex = card.getAttribute('data-index');
            openModal(addonIndex);
        });
    });
}

closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});

window.addEventListener('load', () => displayResults());
