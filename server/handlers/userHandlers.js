// нормализованная структура
// имитация БД
const users = {
    1: { username: 'Alice', online: false, inRoom: '' },
    2: { username: 'Bob', online: false, inRoom: '' },
};



module.exports = (io, socket) => {
    // обрабатываем запрос на получение пользователей
    // свойство "roomId" является распределенным,
    // поскольку используется как для работы с пользователями,
    // так и для работы с сообщениями
    const getUsers = () => {
        io.in(socket.roomId).emit('users', users);
        console.log(users);
    }

    // обрабатываем добавление пользователя
    // функция принимает объект с именем пользователя и его id
    const addUser = ({ username, userId }) => {
        // проверяем, имеется ли пользователь в БД
        if (!users[userId]) {
            // если не имеется, добавляем его в БД
            users[userId] = { username, online: true, inRoom: socket.roomId };
        } else {
            // если имеется, меняем его статус на онлайн
            users[userId].online = true;
            // и обновляем значение текущей комнаты
            users[userId].inRoom = socket.roomId;
            // обновляем имя в случае если пользователь вышел из чата и заменил имя
            if (users[userId].username !== username) {
                users[userId].username = username;
            }
        }
        // выполняем запрос на получение пользователей
        getUsers()
    }

    // обрабатываем удаление пользователя
    const removeUser = (userId) => {
        // под удалением подразумеваем его исключение из списка онлайн
        users[userId].online = false;
        users[userId].inRoom = '';
        getUsers();
    }

    // регистрируем обработчики
    socket.on('user:get', getUsers)
    socket.on('user:add', addUser)
    socket.on('user:leave', removeUser)
}