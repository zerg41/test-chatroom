const httpServer = require('http').createServer();
const CLIENT_URL = "http://localhost:3000";
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
    },
});

const registerMessageHandlers = require('./handlers/messageHandlers');
const registerUserHandlers = require('./handlers/userHandlers');

io.on('connection', (socket) => {
    console.log('user connected');

    // получаем название комнаты из строки запроса "рукопожатия"
    const { roomId } = socket.handshake.query;
    // сохраняем название комнаты в соответствующем свойстве сокета
    socket.roomId = roomId;
  
    // присоединяемся к комнате (входим в нее)
    socket.join(roomId);
  
    // регистрируем обработчики
    // обратите внимание на передаваемые аргументы
    registerMessageHandlers(io, socket, roomId);
    registerUserHandlers(io, socket);
  
    // обрабатываем отключение сокета-пользователя
    socket.on('disconnect', () => {
        // выводим сообщение
        console.log('User disconnected')
        // покидаем комнату
        socket.leave(roomId)
    });
});

const PORT = 4000;

httpServer.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});