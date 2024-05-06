import controladorUsuario from "../controladores/controladorUsuario.js";
import controladorPropiedad from "../controladores/controladorPropiedad.js";


//INICIO
const secInicio = document.getElementById('sectionInicio');
const inicioNav = document.getElementById('inicioNav');

//VER PROPIEDADES
const verPropiedaes = document.getElementById('verPropiedades');
const tblDinamica = document.getElementById('tblDianmica');
const optionsFiltro = document.getElementById("tipo-propiedad-filtro");
const containerPropiedades = document.getElementById("container-propiedades");

//LOG OUT
const btnLogOut = document.getElementById('btnLogOut');

//BORRAR PROPIEDAD
const borrarPropiedades = document.getElementById("borrarPropiedades");
const containerBorrarPropiedades = document.getElementById("container-borrar-propiedades");
const selectPropiedadesBorrar = document.getElementById("borrar-propiedades-select");
const borrarPropiedadBtn = document.getElementById("borrar-propiedad-btn");

//VER PROPIEDAD
const verPropiedad = document.getElementById('btnVerPropiedad');
const containerVerPropiedad = document.getElementById('container-ver-propiedad')
const selectVerPropiedad = document.getElementById('ver-propiedad-select');
const tblVerPropiedad = document.getElementById('tblVerPropiedad');

//AGREGAR PROPIEDADES
const btnAgregarPropiedad = document.getElementById('btnAgregarPropiedad');
const containerAgregarPropiedad = document.getElementById('container-agregar-propiedad');
const agrTipo = document.getElementById('agrTipo');
const agrDescCorta = document.getElementById('agrDescCorta');
const agrDescripion = document.getElementById('agrDescripion');
const agrLocalidad = document.getElementById('agrLocalidad');
const agrPrecio = document.getElementById('agrPrecio');
const agrHabitaciones = document.getElementById('agrHabitaciones');
const agrBanios = document.getElementById('agrBanios');
const btnEnvPropiedad = document.getElementById('btnEnvAgregarPropiedad');

//MODIFICAR PROPIEDAD
const btnModificarPropiedad = document.getElementById('btnModificarPropiedad');
const containerModificarPropiedad = document.getElementById('container-modificar-propiedad');
const selectModificarPropiedad = document.getElementById('modificar-propiedad-select');
const modificarDescCorta = document.getElementById('modificarDescCorta');
const modificarDescripion = document.getElementById('modificarDescripion');
const modificarLocalidad = document.getElementById('modificarLocalidad');
const modificarPrecio = document.getElementById('modificarPrecio');
const modificarHabitaciones = document.getElementById('modificarHabitaciones');
const modificarBanios = document.getElementById('modificarBanios');
const btnEnvModificarPropiedad = document.getElementById('btnEnvModificarPropiedad');


//CAMBIAR DE COLOR NAV ITEM

const elementosNav = document.querySelectorAll('.nav-item');
elementosNav.forEach(elemento => {
  elemento.addEventListener('click', () => {
    elementosNav.forEach(el => el.classList.remove('active'));
    elemento.classList.add('active');
  });
});



window.addEventListener('load', () => {
    if (window.location.href.includes("site")) {

        // Si no hay propiedades ocultar borrar propiedad
        controladorPropiedad.traerPropiedades()
            .then(data => {
                // Si hay un error al traer las propiedades mostrar el inicio
                if (!data || data.error) {
                    return;
                }

                const propiedades = data?.datos;
                if (propiedades.length < 1) {
                    borrarPropiedades.style.display = "none";
                    verPropiedaes.style.display = "none";
                }

            })
            .catch(error => {
                console.log("error", error);
            })

        const estadoDelUsuario = controladorUsuario.estadoUsuario().then((data) => {
            if (!data) return window.location.href = '/login.html'
        })
    }

})


btnLogOut.addEventListener('click', (e) => {
    e.preventDefault()
    controladorUsuario.logOut().then((data) => {
        if (!data.error) window.location.href = '/login.html'
    })
});

inicioNav.addEventListener('click', (e) => {
    e.preventDefault()
    containerPropiedades.style.display = "none";
    secInicio.style.display = "block";
    containerBorrarPropiedades.style.display = "none";
    containerAgregarPropiedad.style.display = "none"
    containerVerPropiedad.style.display = "none";
    containerModificarPropiedad.style.display = "none"
})


// ------------------ VER PROPIEDADES ------------------

verPropiedaes.addEventListener('click', (e) => {
    e.preventDefault()
    containerPropiedades.style.display = "block";
    secInicio.style.display = "none";
    containerBorrarPropiedades.style.display = "none";
    containerAgregarPropiedad.style.display = "none"
    containerVerPropiedad.style.display = "none";
    containerModificarPropiedad.style.display = "none"
    
    optionsFiltro.value = "";


    mostrarPropiedades();
})

// Mostrar propiedades filtradas por tipo
optionsFiltro.addEventListener("change", () => {
    tblDinamica.innerHTML = "";

    const tipo = event.target.value || "";

    mostrarPropiedades(tipo);
});
// -----------------------------------------------------


// ------------------ BORRA PROPIEDADES -----------------
borrarPropiedades.addEventListener("click", (e) => {
    debugger;
    e.preventDefault();

    containerPropiedades.style.display = "none";
    secInicio.style.display = "none";
    containerBorrarPropiedades.style.display = "block";
    containerAgregarPropiedad.style.display = "none"
    containerVerPropiedad.style.display = "none";
    containerModificarPropiedad.style.display = "none"




    controladorPropiedad.traerPropiedades()
        .then(data => {
            // Si hay un error al traer las propiedades mostrar el inicio
            if (!data || data.error) {
                secInicio.style.display = "block";
                return;
            }

            const propiedades = data?.datos;
            if (propiedades.length < 1) {

            }
            selectPropiedadesBorrar.innerHTML = '';

            // Se generan las propiedades en la tabla
            propiedades.forEach(propiedad => {
                selectPropiedadesBorrar.innerHTML += `
                <option value="${propiedad._id}">${propiedad.shortDescription}</option>
                `
            });

        })
        .catch(error => {
            console.log("error", error);
        })


})

borrarPropiedadBtn.addEventListener("click", () => {
    const propiedadId = selectPropiedadesBorrar.value || "";
    if (!propiedadId) return;

    // Borrar propiedad
    controladorPropiedad.eliminarPropiedad(propiedadId)
        .then(data => {
            // Si hay un error al traer las propiedades mostrar el inicio
            if (!data || data.error) {
                alert("Ocurrio un error");
                return;
            }

            window.location.reload();

            borrarPropiedades.click();

        })
        .catch(error => {
            console.log("error", error);
        })

})

// ------------------------------------------------------


// ------------------ VER PROPIEDAD -----------------

verPropiedad.addEventListener('click', () => {

    containerPropiedades.style.display = "none";
    secInicio.style.display = "none";
    containerBorrarPropiedades.style.display = "none";
    containerAgregarPropiedad.style.display = "none"
    containerVerPropiedad.style.display = "block";
    containerModificarPropiedad.style.display = "none"

    controladorPropiedad.traerPropiedades()
        .then(data => {
            // Si hay un error al traer las propiedades mostrar el inicio
            if (!data || data.error) {
                secInicio.style.display = "block";
                return;
            }

            const propiedades = data?.datos;
            if (propiedades.length < 1) {

            }
            selectVerPropiedad.innerHTML = '<option value="0">Seleccione una propiedad...</option>';
            propiedades.forEach(propiedad => {
                selectVerPropiedad.innerHTML += `
                <option value="${propiedad._id}">${propiedad.shortDescription}</option>
                `
            });

            selectVerPropiedad.addEventListener("change", () => {
                tblVerPropiedad.innerHTML = "";

                const tipo = event.target.value || "";

                controladorPropiedad.traerPropiedades()
                    .then(data => {
                        tblVerPropiedad.innerHTML = "";

                        // Se generan las propiedades en la tabla
                        propiedades.forEach(propiedad => {
                            if (propiedad._id == selectVerPropiedad.value) {
                                tblVerPropiedad.innerHTML = `
                    <tr>
                        <td>${propiedad.description}</td>
                        <td>${propiedad.state}</td>
                        <td>$${propiedad.price}</td>
                        <td>${propiedad.rooms}</td>
                        <td>${propiedad.bathrooms}</td>
                    </tr>
                    `
                            }
                        });
                    })
            });




        })
        .catch(error => {
            console.log("error", error);
        })
})

//-----------------------------------------------------



// ------------------ AGREGAR PROPIEDAD -----------------

btnAgregarPropiedad.addEventListener('click', () => {
    containerPropiedades.style.display = "none";
    secInicio.style.display = "none";
    containerBorrarPropiedades.style.display = "none";
    containerAgregarPropiedad.style.display = "block"
    containerVerPropiedad.style.display = "none";
    containerModificarPropiedad.style.display = "none"
})


btnEnvPropiedad.addEventListener('click', () => {

    if (!agrTipo || !agrDescCorta || !agrDescripion || !agrLocalidad || !agrPrecio || !agrHabitaciones || !agrBanios) return alert("Llene todo los campos")

    controladorPropiedad.agregarPropiedad(agrTipo.value, agrDescCorta.value, agrDescripion.value, agrLocalidad.value, agrPrecio.value, agrHabitaciones.value, agrBanios.value)
        .then((data => {
            alert('La propiedad se agrego correctamente.');
            window.location.reload();

        }))
})

//-----------------------------------------------------



// ------------------ MODIFICAR PROPIEDAD -----------------

btnModificarPropiedad.addEventListener('click', (e) => {

    e.preventDefault();

    containerPropiedades.style.display = "none";
    secInicio.style.display = "none";
    containerBorrarPropiedades.style.display = "none";
    containerAgregarPropiedad.style.display = "none"
    containerVerPropiedad.style.display = "none";
    containerModificarPropiedad.style.display = "block"


    controladorPropiedad.traerPropiedades()
        .then(data => {
            // Si hay un error al traer las propiedades mostrar el inicio
            if (!data || data.error) {
                window.location.reload()
                return;
            }

            const propiedades = data?.datos;
            if (propiedades.length < 1) {

            }


            // Se generan las propiedades en la tabla
            propiedades.forEach(propiedad => {
                selectModificarPropiedad.innerHTML += `
                <option value="${propiedad._id}">${propiedad.shortDescription}</option>
                `
            });

            selectModificarPropiedad.addEventListener("change", () => {
                modificarDescCorta.value = '';
                modificarDescripion.value = '';
                modificarLocalidad.value = '';
                modificarPrecio.value = 0;
                modificarHabitaciones.value = 0;
                modificarBanios.value = 0;

                const tipo = event.target.value || "";

                controladorPropiedad.traerPropiedades("", selectModificarPropiedad.value)
                    .then(data => {
                        
                        if (!data || data.error) {
                            window.location.reload()
                            return;
                        }
            

                        modificarDescCorta.value = data.datos[0].shortDescription;
                        modificarDescripion.value = data.datos[0].description;
                        modificarLocalidad.value = data.datos[0].state;
                        modificarPrecio.value = data.datos[0].price;
                        modificarHabitaciones.value = data.datos[0].rooms;
                        modificarBanios.value = data.datos[0].bathrooms;
                    })
            });


        })
        .catch(error => {
            console.log("error", error);
        })
})

btnEnvModificarPropiedad.addEventListener('click', () => {



    if (!modificarDescCorta || !modificarDescripion || !modificarLocalidad || !modificarPrecio || !modificarHabitaciones || !modificarBanios) return alert("Llene todo los campos")

    controladorPropiedad.editarPropiedad(selectModificarPropiedad.value,modificarDescCorta.value, modificarDescripion.value, modificarLocalidad.value, modificarPrecio.value, modificarHabitaciones.value, modificarBanios.value)
        .then((data => {
            debugger
            if (!data || data.error) {
                secInicio.style.display = "block";
                return;
            }

            alert('La propiedad se modifico correctamente.');
            window.location.reload();

        }))

})

//-----------------------------------------------------



// -------------- Funciones auxiliares --------------------
function mostrarPropiedades(tipo = "") {
    controladorPropiedad.traerPropiedades(tipo)
        .then(data => {
            // Si hay un error al traer las propiedades mostrar el inicio
            if (!data || data.error) {
                secInicio.style.display = "block";
                return;
            }

            const propiedades = data?.datos;

            tblDinamica.innerHTML = "";

            // Se generan las propiedades en la tabla
            propiedades.forEach(propiedad => {
                tblDinamica.innerHTML += `
                <tr>
                    <td>${propiedad.type}</td>
                    <td>${propiedad.state}</td>
                    <td>$${propiedad.price}</td>
                    <td>${propiedad.shortDescription}</td>
                </tr>
                `
            });

        })
        .catch(error => {
            console.log("error", error);
        })
}

