(function () {
  const productos = window.PRODUCTOS || [];
  const grid = document.getElementById("catalogo-grid");

  function formatPrice(producto) {
    if (typeof producto.precioCUP === "number" || typeof producto.precioUSD === "number") {
      const cup = typeof producto.precioCUP === "number" ? producto.precioCUP + " CUP" : "-";
      const usd = typeof producto.precioUSD === "number" ? producto.precioUSD + " USD" : "-";
      return "Precio: " + cup + " | " + usd;
    }

    return "Precio: pendiente (CUP / USD)";
  }

  function formatMedidas(producto) {
    return "Medidas: " + (producto.medidasFijas || "Por confirmar");
  }

  if (!grid) {
    return;
  }

  if (!productos.length) {
    grid.innerHTML = "<p>No hay productos disponibles por el momento.</p>";
    return;
  }

  grid.innerHTML = productos
    .map(function (producto) {
      return (
        "<article class='catalog-card'>" +
          "<img src='" + producto.imagen + "' alt='" + producto.nombre + "' loading='lazy' />" +
          "<div class='catalog-card-content'>" +
            "<h3>" + producto.nombre + "</h3>" +
            "<p class='price-tag'>" + formatPrice(producto) + "</p>" +
            "<p class='card-meta'>" + formatMedidas(producto) + "</p>" +
            "<p class='card-meta'>" + (producto.nota || "") + "</p>" +
            "<div class='actions'>" +
              "<a class='btn btn-primary' href='producto.html?id=" + encodeURIComponent(producto.id) + "'>Pedir ahora</a>" +
              "<a class='btn btn-outline' href='galeria.html?producto=" + encodeURIComponent(producto.id) + "'>Ver galería</a>" +
            "</div>" +
          "</div>" +
        "</article>"
      );
    })
    .join("");
})();