const cropSettings = {
  wheat: { moisture: 40, phMin: 6, phMax: 7 },
  corn: { moisture: 50, phMin: 5.5, phMax: 7 },
  rice: { moisture: 70, phMin: 5, phMax: 6.5 }
};

const ctx = document.getElementById("soilChart").getContext("2d");

const soilChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Soil Moisture (%)",
      data: [],
      borderColor: "green",
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function setCardStatus(card, status) {
  card.classList.remove("good", "warning", "bad");
  card.classList.add(status);
}

function updateData() {
  const crop = document.getElementById("cropSelect").value;
  const settings = cropSettings[crop];

  const temp = (Math.random() * 15 + 20).toFixed(1);
  const moisture = Math.floor(Math.random() * 80);
  const ph = (Math.random() * 3 + 5).toFixed(1);
  const nutrients = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];

  document.getElementById("temp").innerText = temp;
  document.getElementById("moisture").innerText = moisture;
  document.getElementById("ph").innerText = ph;
  document.getElementById("nutrients").innerText = nutrients;

  const moistureCard = document.getElementById("moistureCard");
  const phCard = document.getElementById("phCard");

  if (moisture >= settings.moisture) setCardStatus(moistureCard, "good");
  else if (moisture >= settings.moisture - 15) setCardStatus(moistureCard, "warning");
  else setCardStatus(moistureCard, "bad");

  if (ph >= settings.phMin && ph <= settings.phMax) setCardStatus(phCard, "good");
  else setCardStatus(phCard, "warning");

  let advice = [];
  if (moisture < settings.moisture) advice.push("Increase irrigation.");
  if (ph < settings.phMin) advice.push("Soil too acidic — add lime.");
  if (ph > settings.phMax) advice.push("Soil too alkaline — add sulfur.");
  if (nutrients === "Low") advice.push("Apply fertilizer.");

  document.getElementById("adviceText").innerText =
    advice.length ? advice.join(" ") : "Soil conditions are optimal for this crop.";

  soilChart.data.labels.push(new Date().toLocaleTimeString());
  soilChart.data.datasets[0].data.push(moisture);

  if (soilChart.data.labels.length > 10) {
    soilChart.data.labels.shift();
    soilChart.data.datasets[0].data.shift();
  }

  soilChart.update();
}

updateData();
setInterval(updateData, 3000);
