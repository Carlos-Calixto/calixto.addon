// =======================================================================
// ÁREA DE CONFIGURAÇÃO - ADICIONE SEUS ADDONS AQUI!
// =======================================================================
// Para cada addon, adicione um novo objeto dentro do array `addons`.
// - name: O nome do addon que aparecerá no site.
// - image: O nome do arquivo da imagem (ex: 'meu_addon.png'). A imagem deve estar na pasta 'png'.
// - link: O link para onde o usuário será levado ao clicar.
const addons = [
    {
        name: "Balls Addon",
        image: "ballsaddon.png",
        link: "https://COLOQUE-O-LINK-DO-ADDON-AQUI.COM" // <-- TROQUE ESTE LINK!
    },
    {
        name: "More Tols", // Eu supus que o nome seria "More Tools", você pode ajustar se quiser
        image: "morettols.png",
        link: "https://COLOQUE-O-LINK-DESTE-OUTRO-ADDON-AQUI.COM" // <-- TROQUE ESTE LINK!
    },
    // Adicione quantos addons quiser aqui, seguindo o mesmo formato.
    // {
    //     name: "Nome do Novo Addon",
    //     image: "nome_da_imagem.png",
    //     link: "https://link_para_o_addon.com"
    // },
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
    // Limpa os resultados anteriores
    resultsContainer.innerHTML = '';

    // Normaliza o termo de busca (remove espaços e converte para minúsculas)
    const normalizedQuery = query.toLowerCase().trim();

    // Filtra os addons: mantém apenas aqueles cujo nome inclui o termo pesquisado
    const filteredAddons = addons.filter(addon => 
        addon.name.toLowerCase().includes(normalizedQuery)
    );

    // Verifica se encontrou algum resultado
    if (filteredAddons.length === 0 && normalizedQuery !== '') {
        notFoundMessage.classList.remove('hidden'); // Mostra a mensagem "não encontrado"
    } else {
        notFoundMessage.classList.add('hidden'); // Esconde a mensagem
    }

    // Cria o HTML para cada addon encontrado
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
        // Adiciona o card do addon no container de resultados
        resultsContainer.innerHTML += addonCardHTML;
    });
}

// Adiciona um "ouvinte" para o campo de pesquisa.
// A função displayResults será chamada toda vez que o usuário digitar algo.
searchInput.addEventListener('input', () => {
    displayResults(searchInput.value);
});

// Exibe todos os addons quando a página carrega pela primeira vez
window.addEventListener('load', () => {
    displayResults();
});
