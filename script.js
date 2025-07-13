// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE E PERSONALIZE SEU CONTEÚDO AQUI!
// =======================================================================
const addons = [
    {
        name: "Dragões Elementais Addon",
        image: "dragon_placeholder.png",
        link: "https://LINK-DO-SEU-ADDON.COM", 
        description: "Um addon para Minecraft Bedrock que adiciona 5 tipos de dragões que podem ser domados. Ideal para exploração e combate.",
        version: "2.1.0",
        game_version: "Bedrock 1.20+",
        creator: "CALiXTO",
        category: "Addons" // Categorias: "Addons", "Mods", "Shaders"
    },
    {
        name: "Biomas Aprimorados Mod",
        image: "biomes_placeholder.png",
        link: "https://LINK-DO-SEU-MOD.COM", 
        description: "Este mod para a versão Java expande o mundo com mais de 30 novos biomas deslumbrantes, cheios de novas plantas e árvores.",
        version: "4.0.5",
        game_version: "Java 1.19.2",
        creator: "CALiXTO",
        category: "Mods" 
    },
    {
        name: "CALIX Shader (Java)",
        image: "shader_java_placeholder.png",
        link: "https://LINK-DO-SEU-SHADER-JAVA.COM", 
        description: "Shader focado em performance para Minecraft Java Edition. Traz sombras realistas, água reflexiva e céu dinâmico sem pesar no seu PC.",
        version: "1.3",
        game_version: "Java 1.20.1 (Optifine/Iris)",
        creator: "CALiXTO",
        category: "Shaders"
    },
    {
        name: "Luminous Shader (Bedrock)",
        image: "shader_bedrock_placeholder.png",
        link: "https://LINK-DO-SEU-SHADER-BEDROCK.COM", 
        description: "Um shader vibrante para a versão Bedrock (Render Dragon) que melhora as cores, a iluminação e adiciona um leve movimento às folhas.",
        version: "2.5",
        game_version: "Bedrock 1.20+ (Windows/Mobile)",
        creator: "CALiXTO",
        category: "Shaders"
    }
    // Adicione mais addons, mods ou shaders aqui seguindo o mesmo modelo
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

// Função principal que exibe os resultados
function displayResults(query = '') {
    resultsContainer.innerHTML = '';
    const normalizedQuery = query.toLowerCase().trim();

    // 1. Filtra por categoria, depois por pesquisa
    const filteredAddons = addons.filter(addon => {
        const matchesCategory = currentCategory === 'all' || addon.category === currentCategory;

        // CRITÉRIO DE PESQUISA AMPLIADO
        const searchableText = `
            ${addon.name} 
            ${addon.category} 
            ${addon.description} 
            ${addon.game_version}`
            .toLowerCase();
        
        const matchesSearch = searchableText.includes(normalizedQuery);
        
        return matchesCategory && matchesSearch;
    });

    // Exibe mensagem se não encontrar nada
    notFoundMessage.classList.toggle('hidden', filteredAddons.length > 0);

    // Cria os cards dos addons
    filteredAddons.forEach(addon => {
        const originalIndex = addons.findIndex(a => a.name === addon.name);
      
        const addonCardHTML = `
            <div class="result-item" data-index="${originalIndex}">
                <img src="png/${addon.image}" alt="Imagem do ${addon.name}">
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

// Função para abrir o Modal com as informações
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

// Listener para a barra de pesquisa
searchInput.addEventListener('input', () => {
    displayResults(searchInput.value);
});

// Listeners para os botões de filtro de categoria
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        currentCategory = button.getAttribute('data-category');
        displayResults(searchInput.value);
    });
});

// Adiciona listener aos botões "Ver Detalhes"
function addDetailButtonListeners() {
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.result-item');
            const addonIndex = card.getAttribute('data-index');
            openModal(addonIndex);
        });
    });
}

// Listeners para fechar o modal
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});


// Exibe todos os itens ao carregar a página
window.addEventListener('load', () => {
    displayResults();
});
