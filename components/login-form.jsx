'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
      const handleHashChange = () => {
      setHash(window.location.hash.slice(1));
      };
      window.addEventListener('hashchange', handleHashChange);
      handleHashChange();
      return () => {
      window.removeEventListener('hashchange', handleHashChange);
      };
  }, [pathname])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresStr = "expires=" + expires.toUTCString();
    document.cookie = `${name}=${value}; ${expiresStr}; path=/`;
  }

  async function auth(){
    if (!login || !password) {
      alert('Введите логин и пароль');
      return;
    }
    if(hash === 'register'){
      try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, login, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Успех регистрации');
            setHash('')
        }else {
            alert(data.message)
        }
      } catch (err) {
          alert("Ошибка регистрации")
      }
    }else{
      try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setCookie('token', data.token, 7);
            alert('Успех');
            router.push('/laba9/dashboard/')
        }else if (!response.ok) {
            if(response.status === 404){
              alert("Такого пользователя не существует")
            }else if(response.status === 401){
              alert("Неверный пароль")
            }
        } else {
            alert(data.message)
        }
      } catch (err) {
          alert("Ошибка")
      }
    }
  }
  return (
    (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{hash === 'register' ? "Регистрация" : "Авторизация"}</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {hash === 'register' ? 
            <div className="flex">
              <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" value={name} onChange={(e)=>{setName(e.target.value)}} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Возраст</Label>
                <Input id="age" placeholder="Возраст" value={age} onChange={(e)=>{setAge(e.target.value)}} required />
              </div>
            </div>
            : null}
          <div className="grid gap-2">
            <Label htmlFor="email">Логин</Label>
            <Input id="email" placeholder="m@example.com" value={login} onChange={(e)=>{setLogin(e.target.value)}} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Пароль</Label>
            </div>
            <Input id="password" type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <Button className="w-full" onClick={()=>{auth()}}>
            {hash === 'register' ? "Зарегистрироваться" : "Войти"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {hash === 'register' ? "Нет аккаунта?" : "Есть аккаунт?"}{" "}
          <a href={hash === 'register' ? "#" : "#register"} className="underline">
            {hash === 'register' ? "Авторизоваться" : "Зарегистрироваться"}
          </a>
        </div>
      </CardContent>
    </Card>)
  );
}
