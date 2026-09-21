const gradeForm = document.getElementById("grade-form");
const gradeResult = document.getElementById("grade-result");

gradeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const marks = [...document.querySelectorAll('input[name="mark"]')].map((input) => Number(input.value));
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const average = total / marks.length;
  let grade;

  if (average >= 90) grade = "A+";
  else if (average >= 80) grade = "A";
  else if (average >= 70) grade = "B";
  else if (average >= 60) grade = "C";
  else if (average >= 50) grade = "D";
  else grade = "F";

  gradeResult.innerHTML = `Total: <strong>${total}/500</strong><br>Average: <strong>${average.toFixed(2)}%</strong><br>Grade: <strong>${grade}</strong>`;
  gradeResult.hidden = false;
});
