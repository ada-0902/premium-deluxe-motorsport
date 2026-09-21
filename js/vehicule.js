const params = new URLSearchParams(window.location.search);

const vehicleId = params.get("vehicle");

const container = document.getElementById("vehicle-details-page");


const vehicle = vehicles.find(
    vehicle => vehicle.id === vehicleId
);


if (!vehicle) {

    container.innerHTML = `

        <div class="vehicle-not-found">

            <h1>
                Véhicule introuvable
            </h1>

            <p>
                Ce véhicule n'existe pas dans notre catalogue.
            </p>

            <a href="catalogue.html">
                Retour au catalogue
            </a>

        </div>

    `;

} else {


    document.title =
        `${vehicle.name} — Premium Deluxe Motorsport`;


    container.innerHTML = `

        <div class="vehicle-detail-image">

            ${
                vehicle.image

                ? `<img
                    src="${vehicle.image}"
                    alt="${vehicle.name}"
                >`

                : `<span>
                    PHOTO DU VÉHICULE
                </span>`
            }

        </div>


        <div class="vehicle-detail-content">


            <p class="vehicle-detail-brand">
                ${vehicle.brand}
            </p>


            <h1>
                ${vehicle.name}
            </h1>


            <p class="vehicle-detail-category">
                ${vehicle.category}
            </p>


            <div class="vehicle-detail-price">

                ${vehicle.price.toLocaleString("fr-FR")} $

            </div>


            <div class="vehicle-specs">


                <div>

                    <span>
                        Places
                    </span>

                    <strong>
                        ${vehicle.seats}
                    </strong>

                </div>


                <div>

                    <span>
                        Coffre
                    </span>

                    <strong>
                        ${vehicle.trunk} KG
                    </strong>

                </div>


                <div>

                    <span>
                        Catégorie
                    </span>

                    <strong>
                        ${vehicle.category}
                    </strong>

                </div>


            </div>


            <p class="vehicle-description">

                Découvrez la ${vehicle.name},
                proposée par Premium Deluxe Motorsport.
                Contactez notre concessionnaire pour obtenir
                davantage d'informations sur ce véhicule.

            </p>


           <div class="vehicle-actions">

    <button class="favorite-button" id="favorite-button">
        ♡ Ajouter aux favoris
    </button>

    <a href="#" class="contact-button">
        Contacter PDM
    </a>

</div>


        </div>

    `;

}
const favoriteButton = document.getElementById("favorite-button");

if (favoriteButton) {

    let favorites = JSON.parse(
        localStorage.getItem("pdm-favorites") || "[]"
    );

    if (favorites.includes(vehicle.id)) {

        favoriteButton.textContent = "♥ Retirer des favoris";

        favoriteButton.classList.add("is-favorite");

    }


    favoriteButton.addEventListener("click", () => {

        favorites = JSON.parse(
            localStorage.getItem("pdm-favorites") || "[]"
        );


        if (favorites.includes(vehicle.id)) {

            favorites = favorites.filter(
                id => id !== vehicle.id
            );

            favoriteButton.textContent =
                "♡ Ajouter aux favoris";

            favoriteButton.classList.remove("is-favorite");

        } else {

            favorites.push(vehicle.id);

            favoriteButton.textContent =
                "♥ Retirer des favoris";

            favoriteButton.classList.add("is-favorite");

        }


        localStorage.setItem(
            "pdm-favorites",
            JSON.stringify(favorites)
        );

    });

}