const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

campeones.forEach((champ) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
      <img src = "${champ.img}">
      <h3> ${champ.nombre}</h3>
      <p class="price">${champ.precio} $</p>
      `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "COMPRAR";
  comprar.className = "Comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatChamp) => repeatChamp.id === champ.id);

    if (repeat) {
      carrito.map((champs) => {
        if (champs.id === champ.id) {
          champs.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: champ.id,
        img: champ.img,
        nombre: champ.nombre,
        precio: champ.precio,
        cantidad: champ.cantidad,
      });
    }
    carritoCounter();
    saveLocal();

    Toastify({
      text: "Se agrego un Campeon al carrito!",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "blue",
        color: "white",
      },
    }).showToast();
  });
});

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
