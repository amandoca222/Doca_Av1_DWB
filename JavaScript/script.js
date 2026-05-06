document.getElementById("artista").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    buscarDados();
  }
});

async function buscarDados() {
  const artista = document.getElementById("artista").value.trim();

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const cards = document.getElementById("cards");

  if (!artista) {
    error.textContent = "Digite um artista!";
    return;
  }

  try {
    loading.style.display = "block";
    error.textContent = "";
    cards.innerHTML = "";

    const url = `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(artista)}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("Erro na API");

    const data = await response.json();

    loading.style.display = "none";

    if (!data.album) {
      error.textContent = "Nenhum resultado encontrado.";
      return;
    }
    data.album.forEach(album => {

      const imagem = album.strAlbumThumb || "https://via.placeholder.com/300";

      cards.innerHTML += `
        <div class="col-md-3 mb-4">
          <a href="detalhes.html?id=${album.idAlbum}" class="text-decoration-none text-white">

            <div class="card p-2 h-100">

              <img src="${imagem}" class="card-img-top">

              <div class="card-body">
                <h6>${album.strAlbum}</h6>
                <p class="text-success">${album.strArtist}</p>
              </div>

            </div>

          </a>
        </div>
      `;
    });

  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Erro ao buscar dados.";
    console.error(err);
  }
}