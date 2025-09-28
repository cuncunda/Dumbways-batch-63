// Data dumy semntara
let projects = [
  {
    name: "Cunda Web App",
    description: "Website portfolio dengan Bootstrap",
    startDate: "2024-01-12",
    endDate: "2024-02-12",
    imageUrl: "../../asset/mac.jpg",
  },
  {
    name: "E-Commerce App",
    description: "Toko online sederhana",
    startDate: "2024-03-01",
    endDate: "2024-04-15",
    imageUrl: "../../asset/mac.jpg",
  },
  {
    name: "Landing Page",
    description: "Landing Page PT. Cundarojat Sidiq",
    startDate: "2025-03-01",
    endDate: "2025-04-15",
    imageUrl: "../../asset/mac.jpg",
  },
];

function renderProjects() {
  let projectList = document.getElementById("project-list");
  projectList.innerHTML = ""; // clear isi

  for (let i = 0; i < projects.length; i++) {
    projectList.innerHTML += `
      <div class="col-md-3">
        <a href="detail.html?id=${i}" style="text-decoration:none; color:inherit;">
          <div class="card h-100">
            <img src="${projects[i].imageUrl}" class="card-img-top" alt="Project Image" style="height:180px; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">${projects[i].name}</h5>
              <p class="card-text">${projects[i].description}</p>
              <p class="text-muted mb-1">Duration: ${projects[i].startDate} - ${projects[i].endDate}</p>
            </div>
          </div>
        </a>
      </div>
    `;
  }
}

renderProjects(); // jalankan sekali saat halaman load
