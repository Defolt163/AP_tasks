'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { UserProvider } from "../components/ContextProvider/ContextProvider"

export default function Template({ children }) {
    const router = useRouter()
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Если куки нет
    }
    useEffect(()=>{
        const token = getCookie('token')
        if(!token){
            router.push('/laba9')
        }else{
            router.push('/laba9/dashboard')
        }
    })
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

    return (
        <UserProvider>
            <div className="dark">
                <SidebarProvider>
                    <AppSidebar/>
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Главная
                                </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                <BreadcrumbPage>{hash}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </UserProvider>
    )
}