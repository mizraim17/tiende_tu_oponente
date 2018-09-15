$(document).ready(function()
{
    $("#myModal").modal("show");
});

var slider2 = document.getElementById("velocidad_vecina");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
    output2.innerHTML = this.value;
};

var slider = document.getElementById("velocidad_gnomo");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}

