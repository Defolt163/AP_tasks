const fs = require('fs');
const tls = require('tls');
const path = require('path');

// Параметры сервера с SSL
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server-key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server-cert.pem'), 'utf8'),
    ca: fs.readFileSync(path.join(__dirname, 'ssl', 'ca-cert.pem'), 'utf8'),
    requestCert: true, 
    rejectUnauthorized: true, 
};

// Создаем сервер
const server = tls.createServer(options, (socket) => {
    console.log('Клиент подключился: ', socket.remoteAddress);

    // Когда сервер получает данные от клиента
    socket.on('data', (data) => {
        console.log('Получено сообщение: ', data.toString().trim());
        socket.write('Сообщение получено');  // Отправляем ответ клиенту
    });

    // Завершаем соединение, если оно закрыто
    socket.on('end', () => {
        console.log('Клиент отключился');
    });

    // Обработка ошибок
    socket.on('error', (err) => {
        console.error('Ошибка соединения:', err);
    });
});

// Запускаем сервер
server.listen(3001, '127.0.0.1', () => {
    console.log('Сервер SSL/TLS запущен на 127.0.0.1:3001');
});
