/*!
 * Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector("#mainNav");
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove("navbar-shrink");
        } else {
            navbarCollapsible.classList.add("navbar-shrink");
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector("#mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#mainNav",
            rootMargin: "0px 0px -40%",
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

    function fetchData() {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key":
                "{{live_HGeyowjomx5eFiOqhGebZpAwQT65cQdIqdGzJUMYQstGB4LeA1vRkfGUNa7TztAY}}",
        });

        const options = {
            method: "GET",
            headers: headers,
        };

        fetch(
            `https://api.thedogapi.com/v1/images/search?format=json&limit=10`,
            options
        )
            .then((response) => response.json())
            .then((data) => {
                criarCards(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function criarCards(data) {
        let container = document.querySelector(".container-items");

        data.forEach((elemento) => {
            let textColor = "blue"; // Default color

            let card = `
            <div class="col-sm-12 col-xs-12c ol-md-6 col-lg-4 mb-5">
                <div class="card" style="border:none">
                    <img src="${elemento.url}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h2 class="card-title">${elemento.name}</h2>
                        <p class="card-text h5">
                            <b>Species:</b> ${elemento.species}
                            <hr>
                            <b class="h5">Status:<span style="color: ${textColor};"> ${elemento.status}</span></b>
                        </p>
                    </div>
                </div>
            </div>
            `;
            container.innerHTML += card;
        });
    }
    function criarCardsManual(data) {
        let container = document.querySelector(".container-items");

        data.forEach((elemento) => {
            let textColor = "blue"; // Default color

            let card = `
            <div class="col-sm-12 col-xs-12c ol-md-6 col-lg-4 mb-5">
                <div class="card" style="border:none">
                    <img src="${elemento.url}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h2 class="card-title">${elemento.name}</h2>
                        <p class="card-text h5">
                            <b>Species:</b> ${elemento.species}
                            <hr>
                            <b class="h5">Status:<span style="color: ${textColor};"> ${elemento.status}</span></b>
                        </p>
                    </div>
                    <div class="card-body d-flex justify-content-center">
                        <button class="btn btn-danger card-link" onclick="deleteCharacter('${elemento.id}')">EXCLUIR</button>
                    </div>
                </div>
            </div>
            `;
            container.innerHTML += card;
        });
    }
    fetchData();
});
function deleteCharacter(dogId) {
    console.log(dogId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        "x-api-key",
        "live_HGeyowjomx5eFiOqhGebZpAwQT65cQdIqdGzJUMYQstGB4LeA1vRkfGUNa7TztAY"
    );

    var raw = "";

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(`https://api.thedogapi.com/v1/images/${dogId}`, requestOptions)
    .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}
