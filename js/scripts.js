function fetchData() {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    const options = {
        method: "GET",
        headers: headers,
    };

    fetch(`https://reqres.in/api/users`, options)
        .then((response) => response.json())
        .then((data) => {
            criarCards(data.data, 0);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
function postData(formData) {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
    };

    fetch("https://reqres.in/api/users", options)
        .then((response) => response.json())
        .then((data) => {
            criarCards(data, 0);
            window.alert("BEM VINDO A EMPRESA");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    console.log(formData);

    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    postData(formDataObject);
});
function criarCards(data) {
    let container = document.querySelector(".container-items");

    if (Array.isArray(data)) {
        data.forEach((elemento) => {
            let textColor = "blue";

            let card = `
                <div id="elemento-${elemento.id}" class="col-sm-12 col-xs-12c ol-md-6 col-lg-4 mb-5">
                    <div class="card" style="border:none">
                        <img src="${elemento.avatar}" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h2 class="card-title">${elemento.first_name} ${elemento.last_name}</h2>
                            <p class="card-text h6">
                                <b>Email: ${elemento.email}</b>
                                <hr>
                            </p>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-danger" onclick="excluirElemento(${elemento.id})">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            container.innerHTML += card;
        });
    } else {
        let card = `
                <div id="elemento-${data.id}" class="col-sm-12 col-xs-12c ol-md-6 col-lg-4 mb-5">
                    <div class="card" style="border:none">
                        <img src="assets/img/avatar.svg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h2 class="card-title">${data.first_name}</h2>
                            <p class="card-text h6">
                                <b>Email: ${data.email}</b>
                                <hr>
                                <b>Cargo: ${data.role}</b>
                                <hr>
                            </p>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-danger" onclick="excluirElemento(${data.id})">Excluir</button>
                            </div>

                        </div>
                    </div>
                </div>
                `;
        container.innerHTML += card;
    }
}
function excluirElemento(elementoId) {
    fetch(`https://reqres.in/api/users/${elementoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao excluir elemento: ${response.status}`);
            }

            const elementoRemovido = document.getElementById(
                `elemento-${elementoId}`
            );
            if (elementoRemovido) {
                elementoRemovido.remove();
                window.alert("Vinculo com a empresa removido");
            } else {
                console.warn(
                    `Elemento com ID ${elementoId} não encontrado na visualização.`
                );
            }
        })
        .catch((error) => console.error("Erro durante a exclusão:", error));
}
fetchData();
