async function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const details = document.getElementById("details");

  try {
    const url = `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("Erro");

    const data = await response.json();

    loading.style.display = "none";

    const album = data.album[0];

    const imagem = album.strAlbumThumb || "https://via.placeholder.com/400";
    details.innerHTML = `
      <div class="row">

        <div class="col-md-4">
          <img src="${imagem}" class="img-fluid">
        </div>

        <div class="col-md-8">
          <h2>${album.strAlbum}</h2>

          <p><strong>Artista:</strong> ${album.strArtist}</p>
          <p><strong>Ano:</strong> ${album.intYearReleased}</p>
          <p><strong>Gênero:</strong> ${album.strGenre}</p>
          <p><strong>Estilo:</strong> ${album.strStyle}</p>

          <p class="mt-3">
            ${album.strDescriptionEN || "Sem descrição"}
          </p>
        </div>

      </div>
    `;

  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Erro ao carregar detalhes.";
  }
}

carregarDetalhes();