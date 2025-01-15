'use client'
import { useEffect, useState } from "react";
import './style.sass'
export default function APanel(){
    const [userName, setUserName] = useState('')
    const [userAge, setUserAge] = useState('')
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch('/api/users')
        .then((results)=>{
            return results.json()
        })
        .then((res)=>{
            setUsers(res)
        })
    },[])
    function updateUseInfo(id){
        fetch(`/api/users/${id}`,{
            method: 'PUT',
            body:JSON.stringify({
                userName: userName,
                userAge: userAge
            })
        }).then(()=>{
            console.log("OK")
        }).catch((error)=>{
            console.log("error", error)
        })
    }
    function deleteUser(id){
        fetch(`/api/users/${id}`,{
            method: 'DELETE'
        }).then(()=>{
            console.log("OK")
        }).catch((error)=>{
            console.log("error", error)
        })
    }
    return(
        <div className="flex">
         {users.map((user)=>(
            <div key={user.id} className="user_card">
                <div style={{background: `url(${user.image}) center center/cover no-repeat`}} className="user_card__image"></div>
                <div className="user_info">
                    <input placeholder={user.Name} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                    <input placeholder={user.Age} value={userAge} onChange={(e)=>setUserAge(e.target.value)}/>
                    <h3 className="user_text">Логин: {user.login}</h3>
                    <h3 className="user_text">{user.role}</h3>
                </div>
                <div className="Button" onClick={()=>{updateUseInfo(user.id)}}>Update</div>
                <div className="Button" onClick={()=>{deleteUser(user.id)}}>Delete</div>
            </div>
         ))}
        </div>
    )
}