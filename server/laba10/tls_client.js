const fs = require('fs');
const tls = require('tls');
const readline = require('readline');
const path = require('path');

const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'client-key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'client-cert.pem'), 'utf8'),
    ca: fs.readFileSync(path.join(__dirname, 'ssl', 'ca-cert.pem'), 'utf8'),
    rejectUnauthorized: false,
};

const PORT = 3001;
const HOST = '127.0.0.1';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = tls.connect(PORT, HOST, options, () => {
    console.log('Подключено к серверу с SSL/TLS');
    sendMessage(); 
});

const sendMessage = () => {
    rl.question('Введите ваше сообщение: ', (message) => {
        client.write(message); 
    });
};

client.on('data', (data) => {
    console.log('Ответ сервера:', data.toString().trim());
    sendMessage();  // После получения ответа снова запрашиваем ввод
});

// Обработка ошибок
client.on('error', (err) => {
    console.error('Ошибка соединения:', err);
});

// Обработка закрытия соединения
client.on('end', () => {
    console.log('Соединение закрыто');
    rl.close();
});
