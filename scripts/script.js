// fetch("../productos.json")
//   .then((respuesta) => respuesta.json())
//   .then((data) => {
//     program(data);
//   });


// function program(productos) {
let productos = [
  {
    "id": 1,
    "nombre": "Rollo de canela",
    "cantidad": 1,
    "img": "./images/canela.jpg",
    "desc": "El anhelado rollo de canela en tus manos.",
    "precio": "$ 245"
  },
  {
    "id": 2,
    "nombre": "dona rellena",
    "cantidad": 1,
    "img": "./images/rellena.jpg",
    "desc": "Dona rellena de exquisito  chocolate.",
    "precio": "$ 232"
  },
  {
    "id": 3,
    "nombre": "Dona de frambuesa",
    "cantidad": 1,
    "img": "./images/frambuesa.jpg",
    "desc": "La mejor dona de frambuesa de la zona.",
    "precio": "$ 235"
  },
  {
    "id": 4,
    "nombre": "Dona de oreo",
    "cantidad": 1,
    "img": "./images/oreo.jpg",
    "desc": "Una de las donas mas codiciadas de los amantes de la oreo",
    "precio": "$ 232"
  },
  {
    "id": 5,
    "nombre": "Batidos",
    "cantidad": 1,
    "img": "./images/milkshake.jpg",
    "desc": " Batidos de helado y mas!.",
    "precio": "$ 330"
  },
  {
    "id": 6,
    "nombre": "Media docena",
    "cantidad": 1,
    "img": "./images/media.jpg",
    "desc": "La media docena al mejor precio",
    "precio": "$ 340"
  }
]

  let body = "";
  let carrito = [];

  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector("#procesar-pago");

  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }

  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    // document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if (formulario) {
    formulario.addEventListener("submit", enviarCompra);
  }

  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }

  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Pon algo en el carrito para vaciarlo!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "index.html";
      }
    });
  }

  productos.forEach((el) => {
    body += `
      <div class=" donas">
        <img src=${el.img} class="imagenes " ></img>
        <div>
          <h4 class="donas__titulo">${el.nombre}</h4>
          <p class= "donas__parrafo"> ${el.desc}</p>
          <p class= "donas__parrafo"> ${el.precio}</p>
          <button class="boton-agregar" onclick=agregarProducto(${el.id}) >Comprar</button>
        </div>
      </div>
  `;
    let boton = document.getElementById(`agregar${el.id}`);
  });

  document.getElementById("contenedor").innerHTML = body;

  const agregarProducto = (id) => {
    const existe = carrito.some((prod) => prod.id === id);

    if (existe) {
      const prod = carrito.map((prod) => {
        if (prod.id === id) {
          prod.cantidad++;
        }
      });
    } else {
      const item = productos.find((prod) => prod.id === id);
      carrito.push(item);
    }
    mostrarCarrito();
  };

  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, cantidad, img, desc, precio } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
      });
    }

    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
      precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
    }

    guardarStorage();
  };

  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function eliminarProducto(id) {
    const donaId = id;
    carrito = carrito.filter((dona) => dona.id !== donaId);
    mostrarCarrito();
  }


// }
