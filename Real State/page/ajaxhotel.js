document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cardsContainer");
  const xhr = new XMLHttpRequest();

  // Carga el archivo JSON de hoteles
  xhr.open("GET", "hotel.json", true);

  xhr.onload = function () {
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);

          if (data.hoteles) {
              // Mostrar todas las tarjetas de hoteles
              data.hoteles.forEach(function (hotel) {
                  const card = createHotelCard(hotel);
                  cardsContainer.appendChild(card);
              });

              // Filtrar hoteles por precio al hacer clic en el botón de filtrar
              document.getElementById("filtrarBtn").addEventListener("click", function () {
                  const precioFiltro = parseFloat(document.getElementById("precioFiltro").value);
                  const resultados = document.getElementById("resultados");
                  resultados.innerHTML = ""; // Limpiar resultados anteriores

                  // Filtrar hoteles según el precio ingresado
                  const filteredHotels = data.hoteles.filter(function (hotel) {
                      return hotel.precio <= precioFiltro;
                  });

                  // Mostrar los resultados del filtrado
                  if (filteredHotels.length > 0) {
                      filteredHotels.forEach(function (hotel) {
                          const resultadoElement = document.createElement("div");
                          resultadoElement.className = "card";
                          resultadoElement.innerHTML = `
                              <img class="hotel-image" src="${hotel.imagen}" alt="${hotel.titulo}">
                              <p>${hotel.titulo} - Precio: $${hotel.precio}</p>
                              <button class="info-button" onclick="verInfo('${hotel.titulo}')">Ver Info</button>
                          `;
                          resultados.appendChild(resultadoElement);
                      });
                  } else {
                      const noResultsMessage = document.createElement("p");
                      noResultsMessage.className = "no-results-message";
                      noResultsMessage.textContent = "No se encontraron hoteles con ese precio";
                      resultados.appendChild(noResultsMessage);
                  }
              });
          }
      }
  };

  xhr.send();

  function createHotelCard(hotel) {
      const card = document.createElement("div");
      card.classList.add("card", "tamanioCard");

      const image = document.createElement("img");
      image.classList.add("card-img-top");
      image.src = hotel.imagen;
      image.alt = "Hotel Image";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h5");
      title.classList.add("card-title", "text-center");
      title.textContent = hotel.titulo;

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.textContent = hotel.descripcion;

      const infoLink = document.createElement("a");
      infoLink.href = hotel.enlace;
      infoLink.classList.add("btn", "btn-primary", "bg-transparent", "text-dark", "border-dark");
      infoLink.textContent = "INFO";

      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(infoLink);

      card.appendChild(image);
      card.appendChild(cardBody);

      return card;
  }

  function verInfo(titulo) {
      alert(`Más información sobre el hotel: ${titulo}`);
  }
});
