class respuestaJson {
    constructor(mensaje, error = false, datos = null) {
        this.error = error
        this.mensaje = mensaje
        this.datos = datos
    }
  }

module.exports = respuestaJson;