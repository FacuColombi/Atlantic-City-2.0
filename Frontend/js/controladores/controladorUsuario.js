const controladorUsuario = (() => {

    // Login usuario
    function loginUsuario(email, pass) {
        if (!email || !pass) return null;

        const credentials = { "email": email, "password": pass };

        return fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
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


    function estadoUsuario() {
        return fetch('http://localhost:9000/estadoSesion')
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


    function logOut(){
        return fetch('http://localhost:9000/logOut',{
            method: 'POST',
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

    function crearUsuario(firstName, lastName, email, pass){
        if (!firstName || !lastName || !email || !pass) return null;

        const credentials = { "firstName": firstName, "lastName":lastName, "email": email, "password": pass };
        return fetch('http://localhost:9000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
            
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
        loginUsuario,
        estadoUsuario,
        logOut,
        crearUsuario

    }
})();

export default controladorUsuario;