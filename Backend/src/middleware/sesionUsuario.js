let estaLogueado = false;

class SesionUsuarios {
   
    static guardarSesion(){
        estaLogueado=true;

    }

    static obtenerSesionActual(){
        return estaLogueado;

    }

    static finalizarSesion() {
        estaLogueado = false;
    }
}

module.exports = SesionUsuarios;