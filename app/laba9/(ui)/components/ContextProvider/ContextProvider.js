import { useRouter } from 'next/navigation';
import { createContext, useState, useContext, useEffect } from 'react';

// Контекст для данных о пользователе
const UserContext = createContext();

// Провайдер для контекста
export const UserProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Если куки нет
  }

  // Функция для получения данных о пользователе
  function fetchUserData() {
    const token = getCookie('token'); // Получаем токен из куки
  
    return fetch('/api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) { 
          if (response.status === 401) {
            router.push('/laba9');
          }
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });    
  }

  useEffect(() => {
    fetchUserData();
  }, []); // Запрашиваем данные только один раз при монтировании компонента

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для доступа к данным о пользователе
export const useUser = () => {
  return useContext(UserContext);
};
