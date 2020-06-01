
$(function () {

    //Crear conexion 
    var socket = io.connect('http://localhost:3000')

    //Variables
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Envia mensaje
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() })
    })

    //Escucha nuevos mensajes
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Cambia usuario
    send_username.click(function () {
        socket.emit('change_username', { username: username.val() })
    })

    //Emite evento de estar escribiendo
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Esta a la escucha del evento
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })
});


