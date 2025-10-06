const projects = JSON.parse(localStorage.getItem("projects")) || [];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.querySelector(".container");

if (projects.length === 0) {
  container.innerHTML =
    "<h2 class='text-center mt-5'>Project data tidak ditemukan. Silakan kembali ke My Project.</h2>";
} else {
  const project = projects[id];

  if (!project) {
    container.innerHTML =
      "<h2 class='text-center mt-5'>Project tidak ditemukan!</h2>";
  } else {
    container.innerHTML = `
      <h1 class="mb-3">${project.name}</h1>
      <img src="${
        project.imageUrl
      }" class="img-fluid mb-3 rounded" alt="Project Image" style="max-height:400px; object-fit:cover;">
      <p><strong>Duration:</strong> ${project.startDate} - ${
      project.endDate
    }</p>
      <p><strong>Technologies:</strong> 
        ${project.techs
          .map((tech) => `<span class="badge bg-dark me-1">${tech}</span>`)
          .join("")}
      </p>
      <p>${project.description}</p>
      <a href="/myproject" class="btn btn-secondary mt-3">Back</a>
    `;
  }
}
