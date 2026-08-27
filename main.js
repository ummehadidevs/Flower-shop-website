/* =========================================
   PETALORA FLOWER SHOP
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   DEFAULT PRODUCTS
========================================= */

const defaultProducts = [

    {
        id: 1,

        name: "Blush Rose Bouquet",

        category: "rose",

        price: 39.99,

        description: "Soft blush roses arranged with fresh greenery.",

        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=90",

        tag: "Best Seller"
    },


    {
        id: 2,

        name: "Golden Sunflower",

        category: "sunflower",

        price: 29.99,

        description: "Bright sunflowers to bring instant happiness.",

        image: "https://images.unsplash.com/photo-1597848212624-e19e7e7b4a85?auto=format&fit=crop&w=800&q=90",

        tag: "Popular"
    },


    {
        id: 3,

        name: "Pink Tulip Garden",

        category: "tulip",

        price: 34.99,

        description: "Elegant pink tulips with a soft natural finish.",

        image: "https://images.unsplash.com/photo-1523438885200-ea040b4f6a2d?auto=format&fit=crop&w=800&q=90",

        tag: "New"
    },


    {
        id: 4,

        name: "Garden Romance",

        category: "bouquet",

        price: 49.99,

        description: "A dreamy mix of seasonal flowers and greenery.",

        image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=90",

        tag: "Featured"
    },


    {
        id: 5,

        name: "Classic Red Roses",

        category: "rose",

        price: 44.99,

        description: "Deep red roses made for unforgettable moments.",

        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=90",

        tag: "Romantic"
    },


    {
        id: 6,

        name: "Spring Tulip Mix",

        category: "tulip",

        price: 37.99,

        description: "A cheerful mix of fresh colorful tulips.",

        image: "https://images.unsplash.com/photo-1520763185298-1b434c919abe?auto=format&fit=crop&w=800&q=90",

        tag: "Fresh"
    },


    {
        id: 7,

        name: "Sunshine Garden",

        category: "sunflower",

        price: 31.99,

        description: "Golden flowers arranged with delicate greenery.",

        image: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7b?auto=format&fit=crop&w=800&q=90",

        tag: "Bright"
    },


    {
        id: 8,

        name: "Pastel Dream",

        category: "bouquet",

        price: 54.99,

        description: "A premium pastel bouquet for special celebrations.",

        image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=800&q=90",

        tag: "Premium"
    }

];



/* =========================================
   LOAD SAVED PRODUCTS
========================================= */

let customProducts =
    JSON.parse(
        localStorage.getItem("petaloraProducts")
    ) || [];


let products =
    [...defaultProducts, ...customProducts];



/* =========================================
   CART
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem("petaloraCart")
    ) || [];



/* =========================================
   WISHLIST
========================================= */

let wishlist =
    JSON.parse(
        localStorage.getItem("petaloraWishlist")
    ) || [];



/* =========================================
   CURRENT FILTER
========================================= */

let currentCategory = "all";



/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderProducts();

        updateCart();

        updateWishlist();

    }
);



/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(list = null) {


    const grid =
        document.getElementById(
            "productGrid"
        );


    const empty =
        document.getElementById(
            "emptyProducts"
        );


    const productList =
        list || products;


    grid.innerHTML = "";


    if (productList.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    productList.forEach(function (product) {


        const isLiked =
            wishlist.includes(product.id);


        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span class="product-tag">
                    ${product.tag || "New"}
                </span>


                <button
                    class="product-heart ${isLiked ? "liked" : ""}"
                    onclick="toggleWishlist(${product.id}, this)">
                    ${isLiked ? "♥" : "♡"}
                </button>


                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div class="product-overlay">

                    <button
                        class="quick-view"
                        onclick="openProductModal(${product.id})">
                        QUICK VIEW
                    </button>

                </div>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        $${Number(product.price).toFixed(2)}
                    </strong>


                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">

                        Add to Bag

                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}



/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts(category, button) {


    currentCategory = category;


    if (button) {

        document
            .querySelectorAll(".filter")
            .forEach(function (item) {

                item.classList.remove("active");

            });


        button.classList.add("active");

    }


    let filtered;


    if (category === "all") {

        filtered = products;

    } else {

        filtered =
            products.filter(
                function (product) {

                    return product.category === category;

                }
            );

    }


    renderProducts(filtered);


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================================
   SEARCH
========================================= */

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("show");


    setTimeout(function () {

        document
            .getElementById("searchInput")
            .focus();

    }, 200);

}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("show");


    document
        .getElementById("searchInput")
        .value = "";


    renderProducts();

}


function searchProducts() {


    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    if (!search) {

        renderProducts();

        return;

    }


    const results =
        products.filter(
            function (product) {

                return (

                    product.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.description
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    renderProducts(results);

}



/* =========================================
   SORT PRODUCTS
========================================= */

function sortProducts() {


    const value =
        document
            .getElementById("sortProducts")
            .value;


    let sorted =
        [...products];


    if (value === "low") {

        sorted.sort(
            (a, b) =>
                Number(a.price) -
                Number(b.price)
        );

    }


    if (value === "high") {

        sorted.sort(
            (a, b) =>
                Number(b.price) -
                Number(a.price)
        );

    }


    if (value === "name") {

        sorted.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    renderProducts(sorted);

}



/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {


    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) return;


    const existing =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            category: product.category,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    showToast(
        product.name +
        " added to your bag."
    );

}



/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "petaloraCart",
        JSON.stringify(cart)
    );

}



/* =========================================
   UPDATE CART
========================================= */

function updateCart() {


    const count =
        document.getElementById(
            "cartCount"
        );


    const items =
        document.getElementById(
            "cartItems"
        );


    const empty =
        document.getElementById(
            "cartEmpty"
        );


    const total =
        document.getElementById(
            "cartTotal"
        );


    const quantity =
        cart.reduce(
            function (sum, item) {

                return sum + item.quantity;

            },
            0
        );


    count.innerText =
        quantity;


    items.innerHTML = "";


    if (cart.length === 0) {

        empty.classList.add("show");

    } else {

        empty.classList.remove("show");

    }


    let cartTotal = 0;


    cart.forEach(function (item) {


        cartTotal +=
            item.price *
            item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-item-info">

                <small>
                    ${item.category}
                </small>

                <strong>
                    ${item.name}
                </strong>

                <span>
                    $${item.price.toFixed(2)}
                </span>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})">
                ×
            </button>

        `;


        items.appendChild(element);

    });


    total.innerText =
        "$" +
        cartTotal.toFixed(2);

}



/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {


    const item =
        cart.find(
            function (product) {

                return product.id === id;

            }
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (product) {

                    return product.id !== id;

                }
            );

    }


    saveCart();

    updateCart();

}



/* =========================================
   REMOVE CART ITEM
========================================= */

function removeFromCart(id) {


    cart =
        cart.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveCart();

    updateCart();


    showToast(
        "Flower removed from your bag."
    );

}



/* =========================================
   OPEN CART
========================================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("show");


    document
        .getElementById("cartOverlay")
        .classList.add("show");

}



/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("show");


    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}



/* =========================================
   WISHLIST
========================================= */

function toggleWishlist(id, button) {


    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                function (item) {

                    return item !== id;

                }
            );


        button.innerText = "♡";

        button.classList.remove("liked");


        showToast(
            "Removed from wishlist."
        );

    } else {

        wishlist.push(id);

        button.innerText = "♥";

        button.classList.add("liked");


        showToast(
            "Added to wishlist."
        );

    }


    localStorage.setItem(
        "petaloraWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlist();

}



function updateWishlist() {

    document
        .getElementById("wishlistCount")
        .innerText =
        wishlist.length;

}



/* =========================================
   PRODUCT MODAL
========================================= */

function openProductModal(id) {


    const product =
        products.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!product) return;


    document
        .getElementById("modalImage")
        .src = product.image;


    document
        .getElementById("modalName")
        .innerText = product.name;


    document
        .getElementById("modalCategory")
        .innerText =
        product.category;


    document
        .getElementById("modalDescription")
        .innerText =
        product.description;


    document
        .getElementById("modalPrice")
        .innerText =
        "$" +
        Number(product.price).toFixed(2);


    document
        .getElementById("modalCartButton")
        .onclick =
        function () {

            addToCart(product.id);

            closeProductModal();

        };


    document
        .getElementById("productModal")
        .classList.add("show");

}



function closeProductModal() {

    document
        .getElementById("productModal")
        .classList.remove("show");

}



/* =========================================
   ADD NEW FLOWER
========================================= */

document
    .getElementById("flowerForm")
    .addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            const imageInput =
                document.getElementById(
                    "flowerImage"
                );


            const name =
                document.getElementById(
                    "flowerName"
                ).value.trim();


            const price =
                Number(
                    document.getElementById(
                        "flowerPrice"
                    ).value
                );


            const category =
                document.getElementById(
                    "flowerCategory"
                ).value;


            const description =
                document.getElementById(
                    "flowerDescription"
                ).value.trim()
                ||
                "Fresh and beautiful flowers.";


            if (
                imageInput.files.length === 0
            ) {

                showToast(
                    "Please select an image."
                );

                return;

            }


            const file =
                imageInput.files[0];


            const reader =
                new FileReader();


            reader.onload =
                function (event) {


                    const newProduct = {

                        id:
                            Date.now(),

                        name:
                            name,

                        category:
                            category,

                        price:
                            price,

                        description:
                            description,

                        image:
                            event.target.result,

                        tag:
                            "New"

                    };


                    customProducts.push(
                        newProduct
                    );


                    products.push(
                        newProduct
                    );


                    localStorage.setItem(
                        "petaloraProducts",
                        JSON.stringify(
                            customProducts
                        )
                    );


                    renderProducts();


                    document
                        .getElementById(
                            "flowerForm"
                        )
                        .reset();


                    showToast(
                        name +
                        " added to your shop!"
                    );


                    document
                        .getElementById(
                            "shop"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                };


            reader.readAsDataURL(file);

        }
    );



/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {


    document
        .getElementById("navigation")
        .classList.toggle("show");

}



/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

document
    .querySelectorAll(".navigation a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                document
                    .getElementById(
                        "navigation"
                    )
                    .classList.remove(
                        "show"
                    );

            }
        );

    });



/* =========================================
   SCROLL TO SHOP
========================================= */

function scrollToShop() {

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================================
   NEWSLETTER
========================================= */

function subscribeNewsletter(event) {

    event.preventDefault();


    showToast(
        "You're on the list! 🌸"
    );


    event.target.reset();

}



/* =========================================
   CONTACT
========================================= */

function sendMessage(event) {

    event.preventDefault();


    showToast(
        "Your message has been sent successfully!"
    );


    event.target.reset();

}



/* =========================================
   CHECKOUT
========================================= */

function checkout() {


    if (cart.length === 0) {

        showToast(
            "Your shopping bag is empty."
        );

        return;

    }


    showToast(
        "Checkout is ready for your payment system."
    );

}



/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {


    const toast =
        document.getElementById(
            "toast"
        );


    const text =
        document.getElementById(
            "toastMessage"
        );


    text.innerText =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}



/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {


        if (event.key === "Escape") {

            closeSearch();

            closeProductModal();

            closeCart();

        }

    }
);



/* =========================================
   CLOSE PRODUCT MODAL OUTSIDE
========================================= */

document
    .getElementById("productModal")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target === this
            ) {

                closeProductModal();

            }

        }
    );