document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cardsContainer");
  const xhr = new XMLHttpRequest();

  // Carga el archivo JSON de propiedades
  xhr.open("GET", "depar.json", true);

  xhr.onload = function () {
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);

          if (data.propiedades) {
              // Mostrar todas las tarjetas de propiedades
              data.propiedades.forEach(function (propiedad) {
                  const card = createPropertyCard(propiedad);
                  cardsContainer.appendChild(card);
              });

              // Filtrar propiedades por precio al hacer clic en el botón de filtrar
              document.getElementById("filtrarBtn").addEventListener("click", function () {
                  const precioFiltro = parseFloat(document.getElementById("precioFiltro").value);
                  const resultados = document.getElementById("resultados");
                  resultados.innerHTML = ""; // Limpiar resultados anteriores

                  // Filtrar propiedades según el precio ingresado
                  const filteredProperties = data.propiedades.filter(function (propiedad) {
                      return propiedad.precio <= precioFiltro;
                  });

                  // Mostrar los resultados del filtrado
                  if (filteredProperties.length > 0) {
                      filteredProperties.forEach(function (propiedad) {
                          const resultadoElement = document.createElement("div");
                          resultadoElement.className = "card";
                          resultadoElement.innerHTML = `
                              <img class="property-image" src="${propiedad.imagen}" alt="${propiedad.titulo}">
                              <p>${propiedad.titulo} - Precio: $${propiedad.precio}</p>
                              <button class="buy-button" onclick="comprar('${propiedad.titulo}')">Comprar</button>
                          `;
                          resultados.appendChild(resultadoElement);
                      });
                  } else {
                      const noResultsMessage = document.createElement("p");
                      noResultsMessage.className = "no-results-message";
                      noResultsMessage.textContent = "No se encontraron propiedades con ese precio";
                      resultados.appendChild(noResultsMessage);
                  }
              });
          }
      }
  };

  xhr.send();

  function createPropertyCard(propiedad) {
      const card = document.createElement("div");
      card.classList.add("card", "tamanioCard");

      const image = document.createElement("img");
      image.classList.add("card-img-top");
      image.src = propiedad.imagen;
      image.alt = "Property Image";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = propiedad.precio;

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.textContent = propiedad.descripcion;

      const infoLink = document.createElement("a");
      infoLink.href = propiedad.link;
      infoLink.classList.add("btn", "btn-primary");
      infoLink.textContent = "INFO";

      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(infoLink);

      card.appendChild(image);
      card.appendChild(cardBody);

      return card;
  }

  function comprar(titulo) {
      alert(`Has comprado la propiedad: ${titulo}`);
  }
});
