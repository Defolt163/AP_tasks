const io = require("socket.io")(3002, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Пользователь подключен');

    socket.on('sendMessage', (data) => {
        console.log('Получено сообщение:', data);
        // Посылаем сообщение всем подключенным пользователям, кроме отправителя
        socket.broadcast.emit('receiveMessage', { ...data, Sender: 'friend' });
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});