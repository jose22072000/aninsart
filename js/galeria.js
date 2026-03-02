(function () {
  const productos = window.PRODUCTOS || [];
  const galeria = window.GALERIA || {};
  const wrap = document.getElementById("galeria-wrap");

  if (!wrap) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const filterId = params.get("producto");

  const filtered = filterId
    ? productos.filter(function (producto) {
        return producto.id === filterId;
      })
    : productos;

  if (!filtered.length) {
    wrap.innerHTML = "<p>No se encontraron resultados para esa categoría.</p>";
    return;
  }

  wrap.innerHTML = filtered
    .map(function (producto) {
      const images = galeria[producto.id] || [];
      const galleryItems = images.length
        ? images
            .map(function (img, index) {
              return "<figure class='gallery-item'>" +
                "<img src='" + img + "' alt='" + producto.nombre + " ejemplo " + (index + 1) + "' loading='lazy' onerror='this.parentElement.style.display=\"none\"' />" +
              "</figure>";
            })
            .join("")
        : "<p class='card-meta'>Próximamente nuevas imágenes para esta categoría.</p>";

      return "<section class='gallery-section'>" +
        "<div class='gallery-head'>" +
          "<h2>" + producto.nombre + "</h2>" +
          "<a class='btn btn-primary' href='producto.html?id=" + encodeURIComponent(producto.id) + "'>Hacer pedido</a>" +
        "</div>" +
        "<p class='card-meta'>" + (producto.nota || "") + "</p>" +
        "<div class='gallery-grid' id='gallery-" + producto.id + "'>" + galleryItems + "</div>" +
      "</section>";
    })
    .join("");

  // Verificar si hay imágenes visibles en cada sección después de que carguen
  setTimeout(function() {
    filtered.forEach(function(producto) {
      const gridId = "gallery-" + producto.id;
      const grid = document.getElementById(gridId);
      if (grid) {
        const visibleItems = grid.querySelectorAll(".gallery-item:not([style*='display: none'])");
        if (visibleItems.length === 0) {
          grid.innerHTML = "<p class='card-meta empty-gallery'>Aún no hay imágenes en esta categoría. Agrega fotos en la carpeta <strong>assets/galeria/" + producto.id.split('-')[0] + "/</strong></p>";
        }
      }
    });
  }, 500);
})();
