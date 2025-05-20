function calcular() {
    var valor1 = document.getElementById("total").value;
    var valor2 = document.getElementById("porcentaje").value;

    if (valor1 == "" || valor2 == "") {
        alert("Por favor llena los dos campos.");
        return;
    }

    var numero1 = parseFloat(valor1);
    var numero2 = parseFloat(valor2);

    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor ingresa números válidos.");
        return;
    }

    var propina = numero1 * numero2 / 100;
    var totalfinal = numero1 + propina;

    document.getElementById("resultados").innerHTML =
        "<br>Propina: $" + propina.toFixed(2) +
        "<br>Total a pagar: $" + totalfinal.toFixed(2);
}
