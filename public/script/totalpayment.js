function calculatePayment() {
    var totalPayment = 0;

    var cat3price = 100;
    var cat3numberOfTickets = parseInt(document.getElementById("NO3").value);
    totalPayment += cat3price * cat3numberOfTickets;

    var cat2price = 200;
    var cat2numberOfTickets = parseInt(document.getElementById("NO2").value);
    totalPayment += cat2price * cat2numberOfTickets;

    var cat1price = 300;
    var cat1numberOfTickets = parseInt(document.getElementById("NO1").value);
    totalPayment += cat1price * cat1numberOfTickets;

    document.getElementById("Paymenth1").textContent = "Total Payment = " + totalPayment + " EGP";
}