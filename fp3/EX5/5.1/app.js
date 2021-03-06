function searchStations() {
    const lat = document.getElementById('paw-form-lat').value || 0;
    const lon = document.getElementById('paw-form-lon').value || 0;
    const max = document.getElementById('paw-form-max').value || 0;
    response(lat, lon, max);
}

function response(lat, lon, max){
    lat = lat || 0;
    lon = lon || 0;
    max = max || 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.response);
            process(response);
        }
    }

    xhttp.open("GET", `https://api.openchargemap.io/v3/poi/?output=json&latitude=${lat}&longitude=${lon}&maxresults=${max}`, true);
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.send();

}

function process(response){
    console.log(response);
    let tbody = document.getElementById("tbody");

    for(let i = 0; i < response.length; i++){
        let row = tbody.insertRow(-1);

        row.insertCell(0).innerHTML = `${ i }`;
        row.insertCell(1).innerHTML = response[i]["AddressInfo"]["Country"]["Title"];
        row.insertCell(2).innerHTML = response[i]["AddressInfo"]["AddressLine1"];
        row.insertCell(3).innerHTML = response[i]["AddressInfo"]["Town"];
        row.insertCell(4).innerHTML = response[i]["AddressInfo"]["Postcode"];
        
    }

    document.getElementById("paw-results-row").style.display = "block";
}