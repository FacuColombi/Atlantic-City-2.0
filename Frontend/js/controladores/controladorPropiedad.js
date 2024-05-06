const controladorPropiedad = (() => {

    // Traer propiedades
    function traerPropiedades(tipo = "", id = "") {
        debugger;

        let url;

        if (id){
            url= `http://localhost:9000/propiedad?_id=${id}`
        } else if(tipo){
            url =`http://localhost:9000/propiedad?type=${tipo}`
        } else {
            url='http://localhost:9000/propiedad'
        }
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    function agregarPropiedad(tipo, shortDescription, descripcion, estado, precio, rooms, bathrooms) {

        if (!tipo || !shortDescription || !descripcion || !estado || !precio || !rooms || !bathrooms) return null;

        const nuevaPropiedad = {
            "type": tipo,
            "shortDescription": shortDescription,
            "description": descripcion,
            "state": estado,
            "price": precio,
            "rooms": rooms,
            "bathrooms": bathrooms
        };

        return fetch(`http://localhost:9000/propiedad`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaPropiedad)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    function editarPropiedad(id, shortDescription, descripcion, estado, precio, rooms, bathrooms) {

        if(!id) return null;

        const nuevaPropiedad = {
            "shortDescription": shortDescription,
            "description": descripcion,
            "state": estado,
            "price": precio,
            "rooms": rooms,
            "bathrooms": bathrooms
        };

        return fetch(`http://localhost:9000/propiedad/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaPropiedad)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    function eliminarPropiedad(id) {
        return fetch(`http://localhost:9000/propiedad/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    return {
        traerPropiedades,
        agregarPropiedad,
        editarPropiedad,
        eliminarPropiedad,
    }

})();

export default controladorPropiedad;
