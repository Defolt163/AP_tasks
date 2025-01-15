'use client'
import { LoginForm } from "@/components/login-form";
import { UserProvider } from "./(ui)/components/ContextProvider/ContextProvider";

export default function LabaPage(){

    return(
        <UserProvider>
            <div className="dark">
                <div className="center">
                    <LoginForm/>
                </div>
            </div>
        </UserProvider>
    )
}