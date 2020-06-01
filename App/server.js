//Libreria de express.
const express = require('express')
const app = express()

//Se establece la pagina estatica y el formato.
app.set('view engine', 'ejs')

//Se establece el directorio de los demas recursos del programa.
app.use(express.static('public'))


//Establece la pagina de inicio.
app.get('/', (req, res) => {
    res.render('index')
})

//Servidor a la escucha usando el puerto asignado
server = app.listen(3000)

//Instantiation del servicio
const io = require("socket.io")(server)


//Metodos para cada acción recibida
io.on('connection', (socket) => {
    console.log('New user connected')

    //Usuario por defecto
    socket.username = "Anonymous"

    //Accion de cambiar usuario
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //Escucha de nuevos mensajes
    socket.on('new_message', (data) => {
        //Emitir los mensajes a los que estan en la sala.
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })

    //Anuncia que un usuario está escribiendo.
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    })
})