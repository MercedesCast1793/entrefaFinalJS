const stockProductos = [
  {
    id: 1,
    nombre: "El camino a Cristo",
    cantidad: 1,
    desc: "Un clásico de la literatura cristiana. Su lectura ha producido benéficos resultados en miles de personas.",
    precio: 280,
    img: "img/camino-cristo.jpg",
  },
  {
    id: 2,
    nombre: "Cartas a jóvenes enamorados",
    cantidad: 1,
    desc: "¿Tendrías el valor de abrir el sobre y leer su contenido? En este libro hay cartas que fueron escritas por inspiración de Dios y que fueron dirigidas a jóvenes",
    precio: 400,
    img: "img/cartas-jovenes.jpg",
  },
  {
    id: 3,
    nombre: "El conflicto de los Siglos",
    cantidad: 1,
    desc: "Comienza al inicio de la era cristiana, describe el surgimiento y la caída de naciones y de poderes religiosos hasta llegar a nuestros días, entonces, avanza hacia adelante para presentar un vistazo del futuro.",
    precio: 350,
    img: "img/el-conflicto2.jpg",
  },
  {
    id: 4,
    nombre: "El deseado de todas las gentes",
    cantidad: 1,
    desc: " Presenta la divina hermosura de la vida del Salvador, el amor de Dios tal como fue reve- lado en la vida de su Hijo.",
    precio: 350,
    img: "img/el-deseado-de-todas-las-gentes-egw.png",
  },
  {
    id: 5,
    nombre: "Joyas de los Testimonios",
    cantidad: 1,
    desc: "Testimonios reales de las personas que han confiado en los servicios de Fran ... Buen trato, buena calidad, buen precio, y una joya única para nosotros.",
    precio: 200,
    img: "img/joyas-testimonios.jpg",
  },
  {
    id: 6,
    nombre: "Mente, carácter y personalidad",
    cantidad: 1,
    desc: "Acerca de la psicología y la salud mental, puesto que todos estamos involucrados en la batalla por el dominio de la mente..",
    precio: 130,
    img: "img/mente-caracter.jpg",
  },
  {
    id: 7,
    nombre: "Historia de los Patriarcas y Profetas",
    cantidad: 1,
    desc: "Aunque está escrito en un lenguaje sencillo y directo, trata asuntos sublimes que conmueven hasta lo más profundo  el corazón",
    precio: 499,
    img: "img/patriarcas-profetas.jpg",
  },
  {
    id: 8,
    nombre: "El Ministerio de Curación",
    cantidad: 1,
    desc: "Nuestro mundo está enfermo, y doquiera moran los hijos de los hombres abunda el dolor y se busca ...",
    precio: 670,
    img: "img/ministerio-curacion.jpg",
  },
  {
    id: 9,
    nombre: "Eventos de los últimos días",
    cantidad: 1,
    desc: "Jesucristo viene pronto. Los acontecimientos en todos los lugares del mundo. Nos recuerdan que muy pronto ...",
    precio: 130,
    img: "img/ultimos-dias.jpg",
  },
  {
    id: 10,
    nombre: "La verdad acerca de los ángeles",
    cantidad: 1,
    desc: "Una maravillosa obra que levanta el velo entre el mundo visible y el invisible. Revela la actuación de ...",
    precio: 130,
    img: "img/verdad-angeles.jpg",
  },
  {
    id: 11,
    nombre: "El conflicto de los Siglos",
    cantidad: 1,
    desc: "Comienza al inicio de la era cristiana, describe el surgimiento y la caída de naciones y de poderes religiosos hasta llegar a nuestros días, entonces, avanza hacia adelante para presentar un vistazo del futuro.",
    precio: 350,
    img: "img/el-conflicto2.jpg",
  },
  {
    id: 12,
    nombre: "Joyas de los Testimonios",
    cantidad: 1,
    desc: "Testimonios reales de las personas que han confiado en los servicios de Fran ... Buen trato, buena calidad, buen precio, y una joya única para nosotros.",
    precio: 200,
    img: "img/joyas-testimonios.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

let idTimeout;


if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title"><strong> ${nombre} </strong></h5>
      <p class="card-text">Precio: <strong> $${precio} MXN </strong></p>
      <p class="card-text">Descripcion: ${desc.slice(0,80)}...</p>
      <button id="btn-compra" class="btn" onclick="agregarProducto(${id})">Comprar Libro</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: <strong> ${nombre} </strong></p>
      <p>Precio: <strong> $${precio} MXN </strong></p>
      <p>Cantidad: <strong> ${cantidad} </strong> </p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center parrafo">¡Aun no agregaste libros!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};


function cantidad( id_input, operacion){
  var numero=$('#'+id_input).val();
  if(operacion=='1'){
    numero++;
  } else{
    numero--;
  }
  $('#'+id_input).val(numero);
}







function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad, accion } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>$${precio} MXN</td>
            <td>${cantidad}</td>
            <td>$${precio * cantidad} MXN</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}



 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      //alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      //alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const listaCompra = document.querySelector("#lista-compra tbody");
     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
      totalProceso.remove()
      listaCompra.remove()
      alertExito.remove()
     }, 3000)


   }, 3000)
 }


  localStorage.clear();
 

 }

 
