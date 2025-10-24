function get_city(){
    let city = document.getElementById("city-input").value;
    document.getElementById('city-name').textContent = `City: ${city}`;
}