
// availableProducts est l'ensemble des articles disponible à la vente
// Ils doivent être affichés dans la section, sous forme d'articles

// const img = document.querySelector("img")

const availableProducts = [
    {
        name: "Rolexx",
        image: {
            src: "montre1.png",
            alt: "A super Rolexx watch that's awesome and that you should buy"
        },
        price: 2999,
        number: 1
    },
    {
        name: "Patekk Filippe",
        image: {
            src: "montre2.png",
            alt: "A super Patekk Filippe watch that's awesome and that you should buy"
        },
        price: 2499,
        number: 1
    },
    {
        name: "Pas&nbsp;de Cartier",
        image: {
            src: "montre3.png",
            alt: "A super Pas de Cartier watch that's awesome and that you should buy"
        },
        price: 1499,
        number: 1
    },
    {
        name: "Alpha",
        image: {
            src: "montre4.png",
            alt: "A super Alpha watch that's awesome and that you should buy"
        },
        price: 1599,
        number: 1
    },
    {
        name: "Louis Biddon",
        image: {
            src: "montre5.png",
            alt: "A super Louis Biddon watch that's awesome and that you should buy"
        },
        price: 3999,
        number: 1
    },
    {
        name: "Vélux",
        image: {
            src: "montre6.png",
            alt: "A super Vélux watch that's awesome and that you should buy"
        },
        price: 9999,
        number: 1
    }
];

// Une fonction displayAvailableProducts() qui est appelée une fois au chargement de la page, qui remplit la section avec les différents articles dispo dans notre variable availableProducts .
// La méthode .push() des Array permet d’ajouter un élément à la fin du tableau.
const products = document.querySelector("div#products")

function displayAvailableProducts() {
    for (i = 0; i < availableProducts.length; i++) {
        const divWatches = document.createElement("div");
        divWatches.classList.add("watches");

        divWatches.innerHTML = `
        <a href="article${i + 1}.html"><img src="images/${availableProducts[i].image.src}" alt="${availableProducts[i].image.alt}"></a>
        <a href="article${i + 1}.html">${availableProducts[i].name}</a>
        <div>
            <p>${availableProducts[i].price}&nbsp;$</p>
            <button onclick="addProductToCart(${i})">Ajouter au panier</button>
        </div>`;
        products.append(divWatches)
    }
};



// cart est un tableau dynamique qui contient les éléments que l'on veut acheter
// L'ensemble de ces produits seront affiché dans le cart
let cart = [];

// addProductToCart() qui ajoute un article dans le tableau cart. ⚠️ Cette fonction ne touche pas du tout à l’affichage de votre page HTML, elle ne devrait faire que 2 lignes

function indexInCart(watch) {
    for (i = 0; i < cart.length; i++) {
        if (cart[i].name == watch.name) {
            return i
        }
    }
    return -1
}


function addProductToCart(avPIndex) {
    let watch = availableProducts[avPIndex];
    let index = indexInCart(watch);
    if (index != -1) {
        cart[index].number += 1;
    }
    else {
        cart.push(watch);
    }
    console.log(cart);
    displayCart();

}

function removeWatchFromCart(thisWatch) {
    cart[thisWatch].number = 1;
    cart.splice(thisWatch, 1)
    displayCart();
    //this code must stay
    console.log(cart);
}

displayAvailableProducts()


// displayCart() qui affiche le contenu du panier dans le aside (sous forme de liste).
const ulCart = document.querySelector(".grande ul");

function displayCart() {
    ulCart.innerHTML = ""

    for (let i = 0; i < cart.length; i++) {
        let watchInCart = document.createElement("li");
        watchInCart.innerHTML = `<div>
        <div><img src="images/${cart[i].image.src}" alt="${cart[i].image.alt}"><p>${cart[i].name}</p></div>
    </div>
    <p>${cart[i].price}&nbsp;$</p>
    <span>
        <select name="number">

        </select>
    </span>
        <button class="btn" onclick="removeWatchFromCart(${i})">
            <img src="images/delete.png" alt="icone">
        </button>`;

        ulCart.append(watchInCart);
        let selectElement = document.querySelectorAll("select");
        selectElement[i].addEventListener("change", () => {
            cart[i].number = parseInt(selectElement[i].value, 10);
            console.log("ça marche !");
            totalPrice(cart);
        })

        for (let j = 1; j < 10; j++) {
            let anOption = document.createElement("option")
            anOption.textContent = `${j}`
            if (j == cart[i].number) {
                anOption.selected = true;
            }
            selectElement[i].append(anOption);
        }
    }
    totalPrice(cart);
    showNumberInCartLogo(cart);
};

function totalPrice(i) {

    let totalInCart = document.getElementById("total_in_cart");
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].number
    }
    console.log(total);
    totalInCart.textContent = `Total : ${total} $`
}

totalPrice(cart);

let showCartLogo = document.querySelector("#cart_logo");

////////////////////////////////////////////////////////////////////////////

showCartLogo.addEventListener("click", function () {
    let showCart = document.querySelector(".cart_container");
    if (showCart.style.display === "none") {
        showCart.style.display = "block";
    }
    else {
        showCart.style.display = "none";
    }

});

function showNumberInCartLogo(i) {
    let numberInCartLogo = document.querySelector("#number_of_item_in_cart");
    numberInCartLogo.style.backgroundColor = "black";
    let nbInCart = 0;
    for (let i = 0; i < cart.length; i++) {
        nbInCart += cart[i].number;
        if (cart[i].number < 1) {
            numberInCartLogo.textContent = "";
        }
        numberInCartLogo.textContent = `${nbInCart}`;
    }
}

let searchInput = document.querySelector("input#searchBar")

function showInput() {
    searchInput.classList.toggle("active")
    searchInput.value = "";
    setTimeout(() => {
        filterInput();
    }, 400);
}

function filterInput() {
    let thisWatch = document.querySelectorAll(".watches");
    let filter = searchInput.value.toUpperCase();
    for (let i = 0; i < availableProducts.length; i++) {
        if (availableProducts[i].name.toUpperCase().indexOf(filter) > -1) {
            thisWatch[i].style.display = "";
            console.log("if proc");
        }
        else {
            thisWatch[i].style.display = "none";
            console.log("else proc");
        }
    }
}