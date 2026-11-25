document.getElementById("contactForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;

    document.getElementById("response").innerHTML =
        "Thank you, " + name + "! Your message is ready.";

    document.getElementById("contactForm").reset();

});