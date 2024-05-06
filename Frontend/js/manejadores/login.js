import controladorUsuario from "../controladores/controladorUsuario.js";
const btnInicioSesion = document.getElementById("btnInicioSesion");
const emailInput = document.getElementById("txtEmail");
const passInput = document.getElementById("txtPassword");
const btnCrearCuenta = document.querySelector('#btnCrearCuenta');
const btnVolver = document.querySelector('#btnVolver');
const secLogin = document.getElementById('login');
const secCrearUsuario = document.getElementById('sectionCrearUsuario');
const crearUsuario = document.getElementById('btnCrear');
const firtNameL= document.getElementById('txtFirstName')
const lastNameL= document.getElementById('txtLastName')
const emailL= document.getElementById('txtEmailCU')
const passL= document.getElementById('txtPasswordCU')

btnCrearCuenta.addEventListener('click', () => { switchLogin('register') })
btnVolver.addEventListener('click', () => { switchLogin('login') })

const switchLogin = (tipoLogin) => {
    if(!tipoLogin) return

    if (tipoLogin == 'register') {
        secLogin.style.display = 'none'
        secCrearUsuario.style.display = 'flex'
        return
    }
    secLogin.style.display = 'flex'
    secCrearUsuario.style.display = 'none'
    
}
window.addEventListener('load', () => {
    if(window.location.href.includes("login")){
        const estadoDelUsuario = controladorUsuario.estadoUsuario().then((data) => {
            if(data) return window.location.href ='/site.html'
        })
        
    }
})


btnInicioSesion.addEventListener("click",  () => {

    // Validar datos ingresados por el usuario
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput?.value)) {
        alert("Email invalido");
        return;
    }

    // Check pass
    if (passInput.value == "") {
        alert("Pass invalida");
        return;
    }

    const respuestaLogin =  controladorUsuario.loginUsuario(emailInput.value, passInput.value).then((data) => {

        if(data.error){
            alert("Error al inciar sesion");
            return;
        }
        setTimeout(() => {
            // Redirigar al usuario al sitio
            window.location.href = "/site.html";
        })
    }).catch((error) => {
        console.log(error);
    });

});


crearUsuario.addEventListener('click', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   debugger
    if (!emailRegex.test(emailL?.value)) {
        alert("Email invalido");
        return;
    }
 
    if(!firtNameL.value || !lastNameL.value || !passL.value){
        alert("Por favor llene todos los campos");
        return;
    }
    
    controladorUsuario.crearUsuario(firtNameL.value, lastNameL.value, emailL.value, passL.value).then(data => {
        if(data.error){
            alert("Error al crear usuario");
            return;
        }
        controladorUsuario.loginUsuario(emailL.value, passL.value).then((data) => {

            if(data.error){
                alert("Error al inciar sesion");
                return;
            }
            setTimeout(() => {
                // Redirigar al usuario al sitio
                window.location.href = "/site.html";
            })
        }).catch((error) => {
            console.log(error);
        });
    
    }).catch((error) => {
        console.log(error);
    })
    
})