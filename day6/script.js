let projects = [];

function renderProjects() {
  let projectList = document.getElementById("project-list");
  projectList.innerHTML = ""; // clear isi

  for (let i = 0; i < projects.length; i++) {
    let techsHTML = projects[i].techs
      .map((t) => `<span class="badge bg-dark me-1">${t}</span>`)
      .join("");
    projectList.innerHTML += `
      <div class="col-md-3">
        <a href="detail.html?id=${i}" style="text-decoration:none; color:inherit;">
          <div class="card h-100">
            <img src="${projects[i].imageUrl}" class="card-img-top" alt="Project Image" style="height:180px; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">${projects[i].name}</h5>
              <p class="card-text">${projects[i].description}</p>
              <div>${techsHTML}</div>
              <p class="text-muted mb-1">Duration: ${projects[i].startDate} - ${projects[i].endDate}</p>
            </div>
          </div>
        </a>
      </div>
    `;
  }
}

function addProject() {
  let name = document.getElementById("project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let description = document.getElementById("description").value;

  let techs = [];
  if (document.getElementById("nodeJs").checked) techs.push("NodeJS");
  if (document.getElementById("reactJs").checked) techs.push("ReactJS");
  if (document.getElementById("nextJs").checked) techs.push("NextJS");
  if (document.getElementById("typeScript").checked) techs.push("TypeScript");

  let imageUrl = "../../asset/mac.jpg";

  let newProject = {
    name,
    startDate,
    endDate,
    description,
    techs,
    imageUrl,
  };

  projects.push(newProject);

  renderProjects();
}
