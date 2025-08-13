const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const keywordInput = document.getElementById("keyword");
// Seleciona o novo elemento da barra de carregamento
const loadingBar = document.getElementById("loading-bar-container");

searchBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    alert("Digite uma palavra-chave!");
    return;
  }

  // Prepara a UI para a busca
  resultsContainer.innerHTML = "";
  loadingBar.classList.remove("hidden"); // Mostra a barra de carregamento
  searchBtn.disabled = true;

  try {
    const res = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro ao buscar os dados");
    }
    const products = await res.json();

    // Limpa o contêiner antes de adicionar novos resultados
    resultsContainer.innerHTML = "";

    if (products.length === 0) {
      resultsContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    products.forEach(prod => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${prod.imageUrl}" alt="${prod.title}">
        <h3>${prod.title}</h3>
        <p>⭐ ${prod.rating || "Sem avaliação"}</p>
        <p>📦 Avaliações: ${prod.reviews || 0}</p>
      `;
      resultsContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = `<p>Erro: ${err.message}</p>`;
  } finally {
    // Sempre esconde a barra e reabilita o botão no final
    loadingBar.classList.add("hidden");
    searchBtn.disabled = false;
  }
});