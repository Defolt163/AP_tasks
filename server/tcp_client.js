const net = require('net');
const readline = require('readline');

// Определяем порт и хост для клиента
const PORT = 3001;
const HOST = '127.0.0.1';

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для отправки сообщения
const sendMessage = () => {
    rl.question('Введите ваше сообщение: ', (message) => {
        client.write(message);
    });
};

// Обработка соединения с сервером
client.connect(PORT, HOST, () => {
    console.log(`Подключено к серверу ${HOST}:${PORT}`);
    sendMessage();
});

// Обработка данных от сервера
client.on('data', (data) => {
    console.log('Ответ сервера:', data.toString().trim());
    client.end();  // Завершить соединение после получения ответа
});

// Обработка закрытия соединения
client.on('close', () => {
    console.log('Соединение закрыто');
    rl.close();  // Завершить ввод
});

// Обработка ошибок
client.on('error', (err) => {
    console.error('Ошибка соединения:', err);
});