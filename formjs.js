const respuestas = {
  q1: "Sol",
  q2: "Saturno",
  q3: "Galaxia",
  q4: "Júpiter",
  q5: "Telescopio"
}

let puntos = []

function evaluar() {
  puntos = []
  let total = 0
  for (let i = 1; i <= 5; i++) {
    let op = document.querySelector('input[name="q' + i + '"]:checked')
    if (op && op.value === respuestas["q" + i]) {
      puntos.push(1)
      total++
    } else {
      puntos.push(0)
    }
  }
  document.getElementById("resultado").innerText = "Tu puntuación: " + total + " / 5"
  mostrarGrafica()
}

function mostrarGrafica() {
  let ctx = document.getElementById("grafica").getContext("2d")
  if (window.miGrafica) {
    window.miGrafica.destroy()
  }
  window.miGrafica = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5"],
      datasets: [{
        label: "Puntos",
        data: puntos,
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0"]
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 1 }
      }
    }
  })
}

function crearPDF() {
  const { jsPDF } = window.jspdf
  let doc = new jsPDF()
  doc.setFontSize(16)
  doc.text("Diagnóstico de Astronomía", 10, 20)
  for (let i = 0; i < puntos.length; i++) {
    doc.text("Pregunta " + (i + 1) + ": " + (puntos[i] ? "Correcta" : "Incorrecta"), 10, 30 + i * 10)
  }
  doc.text("Puntuación total: " + puntos.reduce((a, b) => a + b, 0) + " / 5", 10, 90)
  let canvas = document.getElementById("grafica")
  let img = canvas.toDataURL("image/png", 1.0)
  doc.addImage(img, "PNG", 10, 100, 180, 80)
  doc.save("resultado_astronomia.pdf")
}
