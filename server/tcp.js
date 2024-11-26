const net = require('net');

// Определяем порт и хост для сервера
const PORT = 3001;
const HOST = '127.0.0.1';

const server = net.createServer((socket) => {
    console.log('Клиент подключился:', socket.remoteAddress);
    
    socket.on('data', (data) => {
        // Считываем сообщение от клиента и выводим его
        console.log('Получено сообщение:', data.toString().trim());

        // Отправляем подтверждение обратно клиенту
        socket.write('Сообщение получено');
    });

    socket.on('end', () => {
        console.log('Клиент отключился:', socket.remoteAddress);
    });

    socket.on('error', (err) => {
        console.error('Ошибка соединения:', err);
    });
});

// Обработка Graceful Shutdown
const shutdown = () => {
    console.log('Остановка сервера...');
    server.close(() => {
        console.log('Сервер остановлен.');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Запускаем сервер
server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен на ${HOST}:${PORT}`);
});