let projects = [];

function renderProjects() {
  let projectList = document.getElementById("projectList");
  projectList.innerHTML = "";

  let filteredProjects = projects.filter((p) => p.techs.length > 0);

  projectList.innerHTML = filteredProjects
    .map((project, i) => {
      let techsHTML = project.techs
        .map((t) => `<span class="badge bg-dark me-1">${t}</span>`)
        .join("");

      return `
      <div class="col-md-3">
        <a href="/detail-project?id=${i}" style="text-decoration:none; color:inherit;">
            <div class="card h-100">
                <img src="${project.imageUrl}" class="card-img-top" alt="Project Image" style="height:180px; object-fit:cover;">
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text">${project.description}</p>
                    <div>${techsHTML}</div>
                    <p class="text-muted mb-1">Duration: ${project.startDate} - ${project.endDate}</p>
                </div>
            </div>
        </a>
    </div>
      `;
    })
    .join("");
}

function addProject(event) {
  if (event) event.preventDefault();

  let name = document.getElementById("project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let description = document.getElementById("description").value;

  let techs = [];
  if (document.getElementById("nodejs").checked) techs.push("NodeJS");
  if (document.getElementById("reactjs").checked) techs.push("ReactJS");
  if (document.getElementById("nextjs").checked) techs.push("NextJS");
  if (document.getElementById("typescript").checked) techs.push("TypeScript");

  let imageUrl = "/images/mac.jpg";

  let newProject = {
    name,
    startDate,
    endDate,
    description,
    techs,
    imageUrl,
  };

  projects.push(newProject);

  localStorage.setItem("projects", JSON.stringify(projects));

  renderProjects();
}

renderProjects();
