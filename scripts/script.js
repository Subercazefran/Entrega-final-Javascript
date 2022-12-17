fetch("./productos.json")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    program(data);
  });

function program(productos) {
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
    document.querySelector("#activarFuncion").click(procesarPedido);
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
          <button id=${el.id} class="boton-agregar" onclick=agregarProducto(${el.id}) >Comprar</button>
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

  let input = document.getElementById("input");
  input.addEventListener("input", fnInput);
}
