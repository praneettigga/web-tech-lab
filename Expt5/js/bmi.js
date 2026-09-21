const bmiForm = document.getElementById("bmi-form");
const bmiResult = document.getElementById("bmi-result");

bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const heightInMetres = Number(document.getElementById("height").value) / 100;
  const weight = Number(document.getElementById("weight").value);
  const bmi = weight / (heightInMetres * heightInMetres);
  let category;

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obesity";

  bmiResult.innerHTML = `Your BMI is <strong>${bmi.toFixed(1)}</strong><br>Category: <strong>${category}</strong>`;
  bmiResult.hidden = false;
});
