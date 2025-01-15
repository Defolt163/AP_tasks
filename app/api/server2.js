import mysql from 'mysql2';

// Получение данных из файла окружения
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Создание пула подключений
const accountDB = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 6, // Максимальное количество соединений
});

export default accountDB;