(function () {
  const productos = window.PRODUCTOS || [];
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const producto = productos.find(function (item) {
    return item.id === productId;
  });

  const titleEl = document.getElementById("product-title");
  const priceEl = document.getElementById("product-price");
  const infoEl = document.getElementById("product-info");
  const whatsappBtn = document.getElementById("whatsapp-btn");

  if (!producto) {
    titleEl.textContent = "Producto no encontrado";
    priceEl.textContent = "Verifica el enlace del catálogo.";
    return;
  }

  const nameInput = document.getElementById("cliente-nombre");
  const phoneInput = document.getElementById("cliente-telefono");
  const quantityInput = document.getElementById("cantidad");
  const homeDeliveryInput = document.getElementById("requiere-domicilio");
  const addressInput = document.getElementById("direccion-entrega");
  const noteInput = document.getElementById("nota-extra");

  const puloverFields = document.getElementById("pulover-fields");
  const puloverTalla = document.getElementById("pulover-talla");
  const puloverPosicion = document.getElementById("pulover-posicion");
  const puloverPrendaPropia = document.getElementById("pulover-prenda-propia");

  const lienzoFields = document.getElementById("lienzo-fields");
  const lienzoMedida = document.getElementById("lienzo-medida");

  const viniloFields = document.getElementById("vinilo-fields");
  const viniloDiametro = document.getElementById("vinilo-diametro");

  const bolsaFields = document.getElementById("bolsa-fields");

  const chaquetaFields = document.getElementById("chaqueta-fields");
  const chaquetaPrendaPropia = document.getElementById("chaqueta-prenda-propia");

  const pantalonFields = document.getElementById("pantalon-fields");
  const pantalonPrendaPropia = document.getElementById("pantalon-prenda-propia");

  const homeFields = document.getElementById("domicilio-fields");

  const summaryProduct = document.getElementById("resumen-producto");
  const summaryPrice = document.getElementById("resumen-precio");
  const summaryDetails = document.getElementById("resumen-detalles");
  const summaryDelivery = document.getElementById("resumen-entrega");

  const WHATSAPP_NUMBER = "5355893661";

  function formatPrice(productoActual) {
    if (typeof productoActual.precioCUP === "number" || typeof productoActual.precioUSD === "number") {
      const cup = typeof productoActual.precioCUP === "number" ? productoActual.precioCUP + " CUP" : "-";
      const usd = typeof productoActual.precioUSD === "number" ? productoActual.precioUSD + " USD" : "-";
      return cup + " | " + usd;
    }
    return "Pendiente (CUP / USD)";
  }

  function hideAllGroups() {
    [puloverFields, lienzoFields, viniloFields, bolsaFields, chaquetaFields, pantalonFields].forEach(function (node) {
      node.classList.add("hidden");
    });
  }

  function getFormType() {
    return producto.tipoFormulario || "general";
  }

  function applyProductForm() {
    hideAllGroups();

    const formType = getFormType();
    if (formType === "pulover") {
      puloverFields.classList.remove("hidden");
    } else if (formType === "lienzo") {
      lienzoFields.classList.remove("hidden");
    } else if (formType === "vinilo") {
      viniloFields.classList.remove("hidden");
    } else if (formType === "bolsa") {
      bolsaFields.classList.remove("hidden");
    } else if (formType === "chaqueta") {
      chaquetaFields.classList.remove("hidden");
    } else if (formType === "pantalon") {
      pantalonFields.classList.remove("hidden");
    }
  }

  function updateDeliveryVisibility() {
    homeFields.classList.toggle("hidden", !homeDeliveryInput.checked);
  }

  function getSpecificDetails() {
    const type = getFormType();

    if (type === "pulover") {
      return [
        "Talla: " + ((puloverTalla.value || "").trim() || "Sin especificar"),
        "Diseño en: " + ((puloverPosicion.value || "").trim() || "Sin especificar"),
        "Prenda propia: " + (puloverPrendaPropia.checked ? "Sí" : "No")
      ];
    }

    if (type === "lienzo") {
      return [
        "Medida: " + ((lienzoMedida.value || "").trim() || "Sin especificar")
      ];
    }

    if (type === "vinilo") {
      return [
        "Diámetro: " + ((viniloDiametro.value || "").trim() || "Sin especificar")
      ];
    }

    if (type === "bolsa") {
      return ["Medida: 40x30 cm"];
    }

    if (type === "chaqueta") {
      return ["Prenda propia: " + (chaquetaPrendaPropia.checked ? "Sí" : "No")];
    }

    if (type === "pantalon") {
      return ["Prenda propia (obligatorio): " + (pantalonPrendaPropia.checked ? "Sí" : "No")];
    }

    return ["Sin especificaciones adicionales"];
  }

  function getDeliveryText() {
    if (!homeDeliveryInput.checked) {
      return "Recogida / coordinación directa";
    }

    return "Domicilio | Dirección: " + ((addressInput.value || "").trim() || "Sin especificar");
  }

  function updateSummary() {
    summaryProduct.textContent = "Producto: " + producto.nombre;
    summaryPrice.textContent = "Precio: " + formatPrice(producto);
    summaryDetails.textContent = "Especificaciones: " + getSpecificDetails().join(" | ");
    summaryDelivery.textContent = "Entrega: " + getDeliveryText();
  }

  function validateCommon() {
    if (!(nameInput.value || "").trim()) {
      alert("Escribe tu nombre.");
      return false;
    }

    if (!(phoneInput.value || "").trim()) {
      alert("Escribe tu teléfono.");
      return false;
    }

    if (Number(quantityInput.value || 0) < 1) {
      alert("La cantidad debe ser al menos 1.");
      return false;
    }

    if (homeDeliveryInput.checked && !(addressInput.value || "").trim()) {
      alert("Si marcas domicilio, debes escribir la dirección.");
      return false;
    }

    return true;
  }

  function validateByType() {
    const type = getFormType();

    if (type === "pulover") {
      if (!puloverTalla.value) {
        alert("Selecciona talla de pulóver.");
        return false;
      }
      if (!puloverPosicion.value) {
        alert("Selecciona la ubicación del diseño del pulóver.");
        return false;
      }
    }

    if (type === "lienzo" && !lienzoMedida.value) {
      alert("Selecciona la medida del lienzo.");
      return false;
    }

    if (type === "vinilo" && !viniloDiametro.value) {
      alert("Selecciona el diámetro del vinilo/DVD.");
      return false;
    }

    if (type === "pantalon" && !pantalonPrendaPropia.checked) {
      alert("En pantalón es obligatorio confirmar que traes la prenda.");
      return false;
    }

    return true;
  }

  function buildWhatsappMessage() {
    const lines = [
      "Hola, quiero realizar un pedido en Aninsart.",
      "",
      "Nombre: " + ((nameInput.value || "").trim() || "(sin especificar)"),
      "Teléfono: " + ((phoneInput.value || "").trim() || "(sin especificar)"),
      "Producto: " + producto.nombre,
      "Precio: " + formatPrice(producto),
      "Cantidad: " + ((quantityInput.value || "1").trim() || "1"),
      "",
      "Especificaciones:"
    ];

    getSpecificDetails().forEach(function (item) {
      lines.push("- " + item);
    });

    lines.push("", "Entrega: " + getDeliveryText());

    const note = (noteInput.value || "").trim();
    if (note) {
      lines.push("Nota adicional: " + note);
    }

    lines.push("", "La personalización final la coordinamos directamente por este chat.");

    return lines.join("\n");
  }

  function openWhatsapp() {
    const text = encodeURIComponent(buildWhatsappMessage());
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank", "noopener,noreferrer");
  }

  titleEl.textContent = "Pedido: " + producto.nombre;
  priceEl.textContent = "Precio: " + formatPrice(producto);
  infoEl.textContent = (producto.medidasFijas ? "Medidas: " + producto.medidasFijas + " · " : "") + (producto.nota || "");

  applyProductForm();
  updateDeliveryVisibility();
  updateSummary();

  [
    nameInput,
    phoneInput,
    quantityInput,
    homeDeliveryInput,
    addressInput,
    noteInput,
    puloverTalla,
    puloverPosicion,
    puloverPrendaPropia,
    lienzoMedida,
    viniloDiametro,
    chaquetaPrendaPropia,
    pantalonPrendaPropia
  ].forEach(function (field) {
    if (!field) {
      return;
    }
    field.addEventListener("input", function () {
      updateDeliveryVisibility();
      updateSummary();
    });
    field.addEventListener("change", function () {
      updateDeliveryVisibility();
      updateSummary();
    });
  });

  whatsappBtn.addEventListener("click", function () {
    const isConfigured = /^\d{8,15}$/.test(WHATSAPP_NUMBER);
    if (!isConfigured) {
      alert("Configura tu número de WhatsApp en js/pedido.js (WHATSAPP_NUMBER).");
      return;
    }

    if (!validateCommon() || !validateByType()) {
      return;
    }

    openWhatsapp();
  });
})();
