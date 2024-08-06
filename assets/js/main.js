// Función constructora para crear objetos de tipo Libro
function Libro(titulo, autor, editorial, año) {
    this.titulo = titulo;
    this.autor = autor;
    this.editorial = editorial;
    this.año = año;
}

// Método para formatear y mostrar la información detallada del libro
Libro.prototype.mostrarInformacion = function () {
    return `${this.titulo} de ${this.autor}, editorial ${this.editorial}, ${this.año}`;
};

// Crear un arreglo de libros
let libros = [
    new Libro("El Señor de los Anillos", "J.R.R. Tolkien", "Minotauro", 1954),
    new Libro("El Hobbit", "J.R.R. Tolkien", "Minotauro", 1937),
    new Libro(
        "Cien años de soledad",
        "Gabriel García Márquez",
        "Sudamericana",
        1967
    ),
    new Libro(
        "El amor en los tiempos del cólera",
        "Gabriel García Márquez",
        "Sudamericana",
        1985
    ),
];

// Método para buscar libros por nombre de autor
function buscarLibrosPorAutor(autor) {
    return libros.filter((libro) =>
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

// Método para filtrar libros por editorial
function filtrarLibrosPorEditorial(editorial) {
    return libros.filter((libro) =>
        libro.editorial.toLowerCase().includes(editorial.toLowerCase())
    );
}

// Ejemplo de uso
console.log(buscarLibrosPorAutor("Tolkien"));
console.log(filtrarLibrosPorEditorial("Sudamericana"));

// Utilizando operadores de ES.NEXT
let libro =
    libros.find((libro) => libro.titulo === "El Señor de los Anillos") ?? {};
console.log(libro.mostrarInformacion());

// Utilizando métodos del prototipo String
let titulo = "  El Señor de los Anillos  ";
console.log(titulo.trimStart());

// Función para mostrar todos los libros
function mostrarLibros(libros) {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th id="ancho_libro">Título</th>
          <th>Autor</th>
          <th>Editorial</th>
          <th>Año de publicación</th>
          <th id="ancho_acciones">Acciones</th>
        </tr>
      </thead>
      <tbody id="tbody-libros">
      </tbody>
    </table>
  </div>
`;

    let tbody = document.getElementById("tbody-libros");
    libros.slice(0, 10).forEach((libro) => {
        tbody.innerHTML += `
    <tr>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.editorial}</td>
        <td>${libro.año}</td>
        <td>
            <button class="btn btn-danger btn-eliminar" data-id="${libro.titulo}"><i class='bx bxs-trash' ></i></button>
            <button class="btn btn-primary btn-copiar" data-id="${libro.titulo}"><i class='bx bxs-copy' ></i></button>
            <button class="btn btn-warning btn-editar" data-id="${libro.titulo}"><i class='bx bxs-edit' ></i></button>
        </td>
    </tr>
  `;
    });

    // Botones para eliminar y copiar
    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
        boton.addEventListener("click", function () {
            const titulo = this.getAttribute("data-id");
            const libros = JSON.parse(localStorage.getItem("libros"));
            const indice = libros.findIndex((libro) => libro.titulo === titulo);
            if (indice !== -1) {
                libros.splice(indice, 1);
                localStorage.setItem("libros", JSON.stringify(libros));
                mostrarLibros(JSON.parse(localStorage.getItem("libros")));

                const notificacion = document.createElement("div");
                notificacion.innerHTML = "Libro eliminado con éxito";
                notificacion.className = "notificacion notificacion-success";
                document.body.appendChild(notificacion);
                setTimeout(() => {
                    notificacion.remove();
                }, 3000); // 3000 milisegundos = 3 segundos
            }
        });
    });

    document.querySelectorAll(".btn-copiar").forEach((boton) => {
        boton.addEventListener("click", function () {
            const titulo = this.getAttribute("data-id");
            const libros = JSON.parse(localStorage.getItem("libros"));
            const libro = libros.find((libro) => libro.titulo === titulo);
            if (libro) {
                console.log("Libro encontrado:", libro);
                const texto = `Título: ${libro.titulo}\nAutor: ${libro.autor}\nEditorial: ${libro.editorial}\nAño: ${libro.año}`;
                console.log("Texto a copiar:", texto);
                navigator.clipboard
                    .writeText(texto)
                    .then(() => {
                        console.log("Texto copiado al portapapeles");
                        const notificacion = document.createElement("div");
                        notificacion.innerHTML = "Datos copiados al portapapeles";
                        notificacion.className = "notificacion notificacion-info";
                        document.body.appendChild(notificacion);
                        setTimeout(() => {
                            notificacion.remove();
                        }, 3000); // 3000 milisegundos = 3 segundos
                    })
                    .catch((err) => {
                        console.error("Error al copiar texto:", err);
                    });
            } else {
                console.log("Libro no encontrado");
            }
        });
    });

    // Botón para editar libro
    document.querySelectorAll('.btn-editar').forEach(boton => {
        boton.addEventListener('click', function () {
            const titulo = this.getAttribute('data-id');
            const libros = JSON.parse(localStorage.getItem('libros'));
            const libro = libros.find(libro => libro.titulo === titulo);
            if (libro) {
                const formulario = document.getElementById('formularioEditarLibro');
                formulario.elements.titulo.value = libro.titulo;
                formulario.elements.autor.value = libro.autor;
                formulario.elements.editorial.value = libro.editorial;
                formulario.elements.año.value = libro.año;

                const modal = document.getElementById('modalEditarLibro');
                const modalInstance = new bootstrap.Modal(modal); // Inicializar el modal
                modalInstance.show();

                document.getElementById('botonEditarLibro').addEventListener('click', function () {
                    const titulo = formulario.elements.titulo.value;
                    const autor = formulario.elements.autor.value;
                    const editorial = formulario.elements.editorial.value;
                    const año = formulario.elements.año.value;

                    const indice = libros.findIndex(libro => libro.titulo === titulo);
                    if (indice !== -1) {
                        libros[indice] = { titulo, autor, editorial, año };
                        localStorage.setItem('libros', JSON.stringify(libros));
                        mostrarLibros(JSON.parse(localStorage.getItem('libros')));
                        modalInstance.hide();

                        // Mostrar notificación
                        const notificacion = document.createElement("div");
                        notificacion.innerHTML = "Libro editado con éxito";
                        notificacion.className = "notificacion notificacion-success";
                        document.body.appendChild(notificacion);
                        setTimeout(() => {
                            notificacion.remove();
                        }, 3000); // 3000 milisegundos = 3 segundos
                    }
                });
            }
        });
    });
}

// Llamar a la función mostrarLibros cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    //mostrarLibros(libros); //mostrar libros predefinidos

    //mostrar libros desde localstorage
    mostrarLibros(JSON.parse(localStorage.getItem("libros")));
});

// Buscador de libro
document.getElementById("boton-buscar").addEventListener("click", function () {
    // Utilizamos trimStart() y trimEnd()
    let autor = document.getElementById("buscador").value.trimStart().trimEnd();
    console.log("Valor del input:", autor);

    // Obtener libros de localStorage
    const libros = JSON.parse(localStorage.getItem("libros")) || [];

    // Buscar libros por autor
    let librosEncontrados = libros.filter((libro) =>
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );

    console.log("Resultados:", librosEncontrados);

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = `
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th id="ancho_libro">Título</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Año de publicación</th>
              <th id="ancho_acciones">Acciones</th>
            </tr>
          </thead>
          <tbody id="tbody-libros">
          </tbody>
        </table>
      </div>
    `;

    let tbody = document.getElementById("tbody-libros");
    librosEncontrados.forEach((libro) => {
        tbody.innerHTML += `
        <tr>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.editorial}</td>
            <td>${libro.año}</td>
            <td>
                <button class="btn btn-danger btn-eliminar" data-id="${libro.titulo}"><i class='bx bxs-trash' ></i></button>
                <button class="btn btn-primary btn-copiar" data-id="${libro.titulo}"><i class='bx bxs-copy' ></i></button>
                <button class="btn btn-warning btn-editar" data-id="${libro.titulo}"><i class='bx bxs-edit' ></i></button>
            </td>
        </tr>
      `;
    });
});

// Obtener el formulario y el botón de guardar
const formulario = document.getElementById("formularioAgregarLibro");
const botonGuardar = document.getElementById("botonGuardarLibro");

// Agregar evento al botón de guardar
botonGuardar.addEventListener("click", function () {
    // Obtener los valores del formulario
    const titulo = formulario.elements.titulo.value;
    const autor = formulario.elements.autor.value;
    const editorial = formulario.elements.editorial.value;
    const año = formulario.elements.año.value;

    // Crear un nuevo objeto Libro
    const libro = {
        titulo,
        autor,
        editorial,
        año,
    };

    // Guardar el libro en localStorage
    const libros = JSON.parse(localStorage.getItem("libros")) || [];
    libros.push(libro);
    localStorage.setItem("libros", JSON.stringify(libros));

    // Cerrar el modal
    const modal = document.getElementById("modalAgregarLibro");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

    // Mostrar los libros actualizados
    mostrarLibros(JSON.parse(localStorage.getItem("libros")));

    actualizarTotalLibros();
});

// Actualizar el número total de libros
function actualizarTotalLibros() {
    const totalLibros = JSON.parse(localStorage.getItem('libros')).length;
    document.getElementById('totalLibros').textContent = totalLibros;
}

// Llamar a la función cuando se cargue la página
actualizarTotalLibros();