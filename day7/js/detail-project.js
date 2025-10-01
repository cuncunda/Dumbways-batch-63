const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const projects = JSON.parse(localStorage.getItem("projects")) || [];

const project = projects[id];

if (project) {
  document.getElementById("project-title").innerText = project.name;
  document.getElementById("project-image").src = project.imageUrl;
  document.getElementById(
    "project-date"
  ).innerText = `${project.startDate} - ${project.endDate}`;
  document.getElementById("project-duration").innerText = hitungDurasi(
    project.startDate,
    project.endDate
  );
  document.getElementById("project-description").innerText =
    project.description;

  document.getElementById("project-techs").innerHTML = project.techs
    .map((tech) => `<div class="value-teknologi"><p>${tech}</p></div>`)
    .join("");
} else {
  document.querySelector(".container").innerHTML =
    "<h2>Project not found!</h2>";
}

// hitung lama proyek
function hitungDurasi(start, end) {
  return "-";
}
