// script
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// segmentos de html para carga dinamica de propiedades
let rentCards = document.querySelector("#rent-cards");
let salesCards = document.querySelector("#sales-cards");
let summaryRentCards = document.querySelector("#summary-rent-cards");
let summarySalesCards = document.querySelector("#summary-sales-cards");

// contadores para limitar tarjetas en resumen
let rentCount = 0;
let salesCount = 0;

// obtener nivel de profundidad para rutas de imagenes
const params = new URLSearchParams(window.location.search);
const level = params.get("level") ? null : 1;

// recorrer propiedades y crear tarjetas
PROPERTIES.forEach((property) => {
  let cardTemplate = `
    <div class="col-md-4 mb-4">    
        <div class="card">
            <img
            src="${level == 1 ? "." : "../"}${property.image}"
            class="card-img-top"
            alt="Imagen del departamento"
            />
            <div class="card-body">
            <h5 class="card-title">${property.name}</h5>
            <p class="card-text">${property.description}</p>
            <p>
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </p>
            <p>
                <i class="fas fa-bed"></i> ${property.room} Habitaciones |
                <i class="fas fa-bath"></i> ${property.bathroom} Baños
            </p>
            <p><i class="fas fa-dollar-sign"></i> ${property.cost} ${
    property.currency
  }</p> 
            
            ${
              property.smoke
                ? `
                <p class="text-success">
                    <i class="fas fa-smoking"></i> Permitido fumar
                </p>`
                : `
                <p class="text-danger">
                    <i class="fas fa-smoking-ban"></i> No se permite fumar
                    </p>
                `
            }
            ${
              property.pets
                ? `
                <p class="text-success">
                    <i class="fas fa-paw"></i> Mascotas permitidas
                </p>                    
                `
                : `
                <p class="text-danger">
                <i class="fa-solid fa-ban"></i> No se permiten mascotas
                </p>
                `
            }
            </div>
        </div>
    </div>
    `;

  // lógica para agregar tarjetas a secciones correspondientes (venta, arriendo o resumenes)
  if (property.type === TYPE.RENT) {
    if (rentCards) rentCards.innerHTML += cardTemplate;
    if (rentCount < 3) {
      if (summaryRentCards) summaryRentCards.innerHTML += cardTemplate;
    }
    rentCount++;
  } else if (property.type === TYPE.SALES) {
    if (salesCards) salesCards.innerHTML += cardTemplate;
    if (salesCount < 3) {
      if (summarySalesCards) summarySalesCards.innerHTML += cardTemplate;
    }
    salesCount++;
  }
});
