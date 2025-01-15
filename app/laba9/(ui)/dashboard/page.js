'use client'
import { useEffect, useState } from "react";
import APanel from "../components/APanel/APanel";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { useUser } from "@/app/laba9/(ui)/components/ContextProvider/ContextProvider"

export default function Page() {
  const { user } = useUser()
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

  const renderContent = () => {
    switch (hash) {
      case 'admin':
        return <>
        {user && user.role == 'admin' ? <APanel/> : <h1>У вас нет прав доступа</h1>}
        </>;
      case 'map':
        return <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abf81c15134225d5a1c381ffb464097eba1dfc315efba24daabb5743899492ecd&amp;source=constructor" width="100%" height="100%"></iframe>
      default:
        return <div>
          <h1>Выберите функцию</h1>
          <div className="flex">
            <a href={'#map'} className="Button">Открыть карту</a>
            {user && user.role == 'admin' ? <a href={'#admin'} className="Button">Панель администратора</a> : null}
          </div>
        </div>;
    }
  }
  return (
    <>{renderContent()}</>
  )
}
