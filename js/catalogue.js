const urlParams = new URLSearchParams(window.location.search);

const categoryFromURL = urlParams.get("category");

const grid = document.getElementById("vehicle-grid");

const searchInput = document.getElementById("search");

const categoryFilter = document.getElementById("category-filter");

const priceFilter = document.getElementById("price-filter");

const seatsFilter = document.getElementById("seats-filter");

const trunkFilter = document.getElementById("trunk-filter");

const sortFilter = document.getElementById("sort-filter");

const vehicleCount = document.getElementById("vehicle-count");

const noResults = document.getElementById("no-results");



function displayVehicles() {

    let filteredVehicles = [...vehicles];


    /* RECHERCHE */

    const search = searchInput.value.toLowerCase().trim();

    if (search !== "") {

        filteredVehicles = filteredVehicles.filter(vehicle =>

            vehicle.name.toLowerCase().includes(search) ||

            vehicle.brand.toLowerCase().includes(search)

        );

    }


    /* CATÉGORIE */

    const category = categoryFilter.value;

    if (category !== "all") {

        filteredVehicles = filteredVehicles.filter(vehicle =>

            vehicle.category === category

        );

    }


  /* PRIX */

const price = priceFilter.value;

if (price !== "all") {

    const [min, max] = price.split("-").map(Number);

    filteredVehicles = filteredVehicles.filter(vehicle =>

        vehicle.price >= min &&

        vehicle.price < max

    );

}


    /* PLACES */

    const seats = seatsFilter.value;

    if (seats !== "all") {

        filteredVehicles = filteredVehicles.filter(vehicle =>

            vehicle.seats === Number(seats)

        );

    }

    /* COFFRE */
const trunk = trunkFilter.value;

if (trunk !== "all") {
    const [min, max] = trunk.split("-").map(Number);

    filteredVehicles = filteredVehicles.filter(vehicle =>
        vehicle.trunk >= min &&
        vehicle.trunk < max
    );
}

    /* TRI */

    const sort = sortFilter.value;

    if (sort === "price-low") {

        filteredVehicles.sort((a, b) =>

            a.price - b.price

        );

    }

    if (sort === "price-high") {

        filteredVehicles.sort((a, b) =>

            b.price - a.price

        );

    }

    if (sort === "name") {

        filteredVehicles.sort((a, b) =>

            a.name.localeCompare(b.name)

        );

    }


    /* COMPTEUR */

    vehicleCount.textContent =

        `${filteredVehicles.length} véhicule${filteredVehicles.length > 1 ? "s" : ""} disponible${filteredVehicles.length > 1 ? "s" : ""}`;


    /* RESET */

    grid.innerHTML = "";


    /* AUCUN RÉSULTAT */

    if (filteredVehicles.length === 0) {

        noResults.style.display = "block";

        return;

    }

    noResults.style.display = "none";


    /* CRÉATION DES CARTES */

    filteredVehicles.forEach(vehicle => {

        const card = document.createElement("article");

        card.className = "vehicle-card";

card.style.cursor = "pointer";

card.addEventListener("click", () => {

    window.location.href =
    `vehicule.html?vehicle=${encodeURIComponent(vehicle.id)}`;

});

        card.innerHTML = `

            <div class="vehicle-image">

                ${
                    vehicle.image

                    ? `<img src="${vehicle.image}" alt="${vehicle.name}">`

                    : `<span>PHOTO DU VÉHICULE</span>`
                }

            </div>


            <div class="vehicle-info">

                <div>

                    <small>
                        ${vehicle.brand}
                    </small>

                    <h2>
                        ${vehicle.name}
                    </h2>

                </div>


                <strong>
                    ${vehicle.price.toLocaleString("fr-FR")} $
                </strong>

            </div>


            <div class="vehicle-details">

                <span>
                    ${vehicle.category}
                </span>

                <span>
                    ${vehicle.seats} places
                </span>

                <span>
                    ${vehicle.trunk} KG
                </span>

            </div>

        `;


        grid.appendChild(card);

    });

}



/* ÉVÉNEMENTS */

searchInput.addEventListener("input", displayVehicles);

categoryFilter.addEventListener("change", displayVehicles);

priceFilter.addEventListener("change", displayVehicles);

seatsFilter.addEventListener("change", displayVehicles);

sortFilter.addEventListener("change", displayVehicles);



/* CATÉGORIE VENANT DE L'URL */

if (categoryFromURL) {

    categoryFilter.value = categoryFromURL;

}


/* PREMIER AFFICHAGE */

displayVehicles();