
const socket = io.connect()

//-----------------------------------------// Renderizamos en Html ----------------------------------------

socket.on( 'mensajesAlMain', (data) => { //Recibimos desde el servidor
    render(data)
})

function render( data ) {
    let html = data.map( e =>{
        return(
            ` 
            <div style="display: flex;">
                <p style='color:blue'>${e.autor}</p>
                <p style='color:brown'>[${' - ' + new Date().toLocaleDateString()  + ' - ' +  new Date().toLocaleTimeString() + ' - ' }] : </p>  
                <p style='color:green'>  ${e.consulta}</p> \n
            </div>
            `
        )
    })

    document.getElementById('message').innerHTML = html         // Insertamos el mensaje en el div del HTML
}

const agregarMensaje = () => {

    const mensaje = {
        autor : document.getElementById('email').value,
        consulta : document.getElementById('consulta').value
    }

    socket.emit( 'mensajeNuevo', mensaje )                   // NuevoMensaje  es el nombre del evento (recordar)

    document.getElementById('consulta').value = ' '
    document.getElementById('consulta').focus()       // al enviar no deja el cursor en el texto
    
    return false                                                     // Nos permite que no se recargue la pagina
}

