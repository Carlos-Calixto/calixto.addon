// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE SEUS ADDONS AQUI!
// =======================================================================
const addons = [
    {
        name: "Balls Addon",
        image: "ballsaddon.png",
        link: "https://COLOQUE-O-LINK-DO-ADDON-AQUI.COM" // <-- TROQUE ESTE LINK!
    },
    {
        name: "More Tols",
        image: "morettols.png",
        link: "https://COLOQUE-O-LINK-DESTE-OUTRO-ADDON-AQUI.COM" // <-- TROQUE ESTE LINK!
    },
    // Adicione mais addons aqui se precisar
];
// =======================================================================
// FIM DA ÁREA DE CONFIGURAÇÃO - NÃO ALTERE O CÓDIGO ABAIXO
// =======================================================================


// Pega os elementos do HTML que vamos usar
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const notFoundMessage = document.getElementById('notFoundMessage');

// Função que cria e exibe os resultados na tela
function displayResults(query = '') {
    resultsContainer.innerHTML = '';
    const normalizedQuery = query.toLowerCase().trim();
    const filteredAddons = addons.filter(addon => 
        addon.name.toLowerCase().includes(normalizedQuery)
    );

    if (filteredAddons.length === 0 && normalizedQuery !== '') {
        notFoundMessage.classList.remove('hidden');
    } else {
        notFoundMessage.classList.add('hidden');
    }

    const addonsToDisplay = filteredAddons.length > 0 ? filteredAddons : (query === '' ? addons : []);
    
    addonsToDisplay.forEach(addon => {
        const addonCardHTML = `
            <a href="${addon.link}" target="_blank" rel="noopener noreferrer" class="result-link">
                <div class="result-item">
                    <img src="png/${addon.image}" alt="Imagem do addon ${addon.name}">
                    <h3>${addon.name}</h3>
                </div>
            </a>
        `;
        resultsContainer.innerHTML += addonCardHTML;
    });
}

searchInput.addEventListener('input', () => {
    displayResults(searchInput.value);
});

window.addEventListener('load', () => {
    displayResults();
});
