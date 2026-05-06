const url = "https://api.open-meteo.com/v1/forecast?latitude=-22.37&longitude=-46.94&current_weather=true";

async function carregarClima() {
  const loading = document.getElementById("loading");
  const clima = document.getElementById("clima");
  const erro = document.getElementById("erro");

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const dados = await resposta.json();

    loading.style.display = "none";

    const weather = dados.current_weather;

    clima.innerHTML = `
      <div class="card p-3">
        <h3>Temperatura: ${weather.temperature}°C</h3>
        <p>Velocidade do vento: ${weather.windspeed} km/h</p>
        <p>Direção do vento: ${weather.winddirection}°</p>
        <p>Horário: ${weather.time}</p>
      </div>
    `;

  } catch (e) {
    loading.style.display = "none";
    erro.classList.remove("d-none");
  }
}

carregarClima();