let productos = [];

function agregarProducto() {
  const producto = document.getElementById("producto").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);

  if (!producto || isNaN(cantidad) || cantidad <= 0 || isNaN(precio) || precio <= 0) {
    alert("Ingresa datos válidos del producto.");
    return;
  }

  productos.push({ producto, cantidad, precio, importe: cantidad * precio });
  actualizarTabla();
  limpiarCampos();
}

function actualizarTabla() {
  const cuerpo = document.querySelector("#tablaProductos tbody");
  cuerpo.innerHTML = "";
  let subtotal = 0;

  productos.forEach(p => {
    const fila = cuerpo.insertRow();
    fila.innerHTML = `
      <td>${p.producto}</td>
      <td>${p.cantidad}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>$${p.importe.toFixed(2)}</td>
    `;
    subtotal += p.importe;
  });

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("iva").innerText = iva.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);

  const mensaje = document.getElementById("mensajeInfo");
  if (total > 10000) {
    mensaje.innerText = "⚠ El total supera $10,000. Verifica si es necesaria una autorización.";
  } else {
    mensaje.innerText = "";
  }
}

function limpiarCampos() {
  document.getElementById("producto").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
}

async function generarPDF() {
  const cliente = document.getElementById("cliente").value.trim();
  if (!cliente) {
    alert("Debes ingresar el nombre del cliente.");
    return;
  }

  if (productos.length === 0) {
    alert("No hay productos agregados para facturar.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Comprobante de Factura", 70, 20);
  doc.setFontSize(12);
  doc.text(`Cliente: ${cliente}`, 20, 30);

  let y = 50;
  doc.text("Producto       Cantidad    Precio     Importe", 20, y);
  y += 10;

  let subtotal = 0;
  productos.forEach(p => {
    doc.text(
      `${p.producto.padEnd(12)}   ${p.cantidad.toString().padEnd(8)}  $${p.precio.toFixed(2).padEnd(8)}  $${p.importe.toFixed(2)}`,
      20, y
    );
    y += 10;
    subtotal += p.importe;
  });

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  y += 10;
  doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, y);
  y += 10;
  doc.text(`IVA (16%): $${iva.toFixed(2)}`, 20, y);
  y += 10;
  doc.text(`Total: $${total.toFixed(2)}`, 20, y);

  doc.save("comprobante_factura.pdf");
}
