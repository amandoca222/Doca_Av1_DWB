async function buscarAlbuns() {
  const artista = document.getElementById("artista").value;
  const resultado = document.getElementById("resultado");
  const loading = document.getElementById("loading");
  const erro = document.getElementById("erro");

  resultado.innerHTML = "";
  erro.classList.add("d-none");

  if (!artista) {
    erro.textContent = "Digite um artista!";
    erro.classList.remove("d-none");
    return;
  }

  try {
    loading.classList.remove("d-none");

    const url = `https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${artista}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const dados = await resposta.json();

    if (!dados.album) {
      throw new Error("Nenhum álbum encontrado");
    }

    mostrarAlbuns(dados.album);

  } catch (e) {
    erro.textContent = e.message;
    erro.classList.remove("d-none");
  } finally {
    loading.classList.add("d-none");
  }
}
function mostrarAlbuns(albuns) {
  const resultado = document.getElementById("resultado");

  albuns.forEach(album => {
    const imagem = album.strAlbumThumb || "https://via.placeholder.com/300x300";

    resultado.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow">
          <img src="${imagem}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${album.strAlbum}</h5>
            <p><strong>Ano:</strong> ${album.intYearReleased || "N/A"}</p>
            <p><strong>Gênero:</strong> ${album.strGenre || "N/A"}</p>
          </div>
        </div>
      </div>
    `;
  });
}