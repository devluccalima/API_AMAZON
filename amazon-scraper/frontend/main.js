const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const keywordInput = document.getElementById("keyword");

searchBtn.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    alert("Digite uma palavra-chave!");
    return;
  }

  resultsContainer.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    if (!res.ok) throw new Error("Erro ao buscar os dados");
    const products = await res.json();

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
    resultsContainer.innerHTML = "<p>Erro ao buscar os produtos.</p>";
  }
});
