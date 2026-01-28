function updateData() {
  let temp = (Math.random() * 20 + 15).toFixed(1);
  let moisture = (Math.random() * 60).toFixed(0);
  let ph = (Math.random() * 3 + 5).toFixed(1);
  let nutrients = ["Low", "Medium", "High"][Math.floor(Math.random()*3)];

  document.getElementById("temp").innerText = temp;
  document.getElementById("moisture").innerText = moisture;
  document.getElementById("ph").innerText = ph;
  document.getElementById("nutrients").innerText = nutrients;

  let advice = "";
  if (moisture < 30) advice += "Soil is dry → Add water. ";
  if (ph < 6) advice += "Soil too acidic → Add lime. ";
  if (nutrients === "Low") advice += "Low nutrients → Add fertilizer.";

  document.getElementById("advice").innerText = advice || "Soil conditions are optimal.";
}

setInterval(updateData, 3000);
updateData();
