/* ============================
   CROP SOIL DATA (FIXED VALUES)
   ============================ */

const cropData = {
  wheat:    { temp: 22, moisture: 40, ph: 6.5, nutrients: "Medium" },
  corn:     { temp: 25, moisture: 50, ph: 6.2, nutrients: "High" },
  rice:     { temp: 28, moisture: 70, ph: 5.8, nutrients: "High" },
  tomato:   { temp: 24, moisture: 45, ph: 6.3, nutrients: "Medium" },
  potato:   { temp: 18, moisture: 60, ph: 5.5, nutrients: "Medium" },
  lettuce:  { temp: 17, moisture: 50, ph: 6.5, nutrients: "Low" },
  soybean:  { temp: 23, moisture: 45, ph: 6.6, nutrients: "Medium" },
  cotton:   { temp: 30, moisture: 55, ph: 6.2, nutrients: "High" },
  barley:   { temp: 20, moisture: 35, ph: 6.8, nutrients: "Low" },
  chili:    { temp: 27, moisture: 45, ph: 6.4, nutrients: "Medium" }
};

/* ============================
   CROP YIELD GROWTH DATA (%)
   ============================ */

const cropYieldGrowth = {
  wheat:    [5, 15, 30, 55, 80, 100],
  corn:     [10, 25, 45, 70, 95, 120],
  rice:     [12, 30, 55, 85, 115, 140],
  tomato:   [8, 22, 40, 65, 90, 115],
  potato:   [9, 28, 50, 78, 105, 130],
  lettuce:  [6, 18, 35, 55, 70, 85],
  soybean:  [7, 20, 38, 62, 88, 110],
  cotton:   [6, 18, 36, 60, 85, 105],
  barley:   [5, 14, 28, 50, 72, 90],
  chili:    [9, 24, 45, 72, 98, 120]
};

/* ============================
   GROWTH STAGES
   ============================ */

const growthStages = [
  "Germination",
  "Vegetative Growth",
  "Flowering",
  "Fruit Development",
  "Maturation",
  "Harvest"
];

/* ============================
   CHART SETUP
   ============================ */

const ctx = document.getElementById("soilChart").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: growthStages,
    datasets: [{
      label: "Crop Yield Growth (%)",
      data: [],
      borderColor: "#2e7d32",
      backgroundColor: "rgba(46,125,50,0.1)",
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Yield Increase (%)"
        }
      },
      x: {
        title: {
          display: true,
          text: "Growth Stages"
        }
      }
    }
  }
});

/* ============================
   UPDATE DASHBOARD
   ============================ */

function updateDashboard() {
  const crop = document.getElementById("cropSelect").value;
  const data = cropData[crop];

  document.getElementById("temp").textContent = data.temp;
  document.getElementById("moisture").textContent = data.moisture;
  document.getElementById("ph").textContent = data.ph;
  document.getElementById("nutrients").textContent = data.nutrients;

  updateChart(crop);
  updateExplanation(crop);
}

/* ============================
   UPDATE CHART (PER CROP)
   ============================ */

function updateChart(crop) {
  chart.data.datasets[0].data = cropYieldGrowth[crop];
  chart.update();
}

/* ============================
   YIELD PREDICTION EXPLANATION
   ============================ */

function updateExplanation(crop) {
  const explanation = `
The projected yield growth for ${crop.charAt(0).toUpperCase() + crop.slice(1)}
is based on optimal soil conditions measured by probes.
Stable temperature, moisture, pH, and nutrient availability
allow the plant to progress efficiently through all growth stages.
This results in higher photosynthesis efficiency, stronger biomass development,
and increased final crop yield.
  `;

  document.getElementById("adviceText").textContent = explanation;
}

/* ============================
   INITIAL LOAD + CROP CHANGE
   ============================ */

document.getElementById("cropSelect").addEventListener("change", updateDashboard);

updateDashboard();
