document.getElementById("payment").addEventListener("click", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("price").value);
    let unit = parseInt(document.getElementById("unit").value);
    let img = 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80';

    fetch(`/payment/new?price=${price}&name=${name}&unit=${unit}&img=${img}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://sportsiete.test",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        })
        .then(function(response) {
            if (response.ok) {
                return response.text()
            } else {
                throw "Error en la llamada Ajax";
            }

        })
        .then(function(texto) {
            console.log(texto);
        })
        .catch(function(err) {
            console.log(err);
        });
});