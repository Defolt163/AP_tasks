'use client'
import { useEffect, useState } from "react";

export default function T4_1(){
    const [users, setUsers] = useState([])
    function getUsers(){
        fetch('/api/get-users')
        .then((result)=>{
            return result.json()
        }).then((res)=>{
            setUsers(res)
        })
    }

    useEffect(()=>{
        getUsers()
    },[])

    function addUser(){
        let inputName = prompt("Введите Имя")
        let inputAge = prompt("Введите Возраст")
        fetch('/api/add-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "userName": inputName, 
                "userAge": inputAge
            }),
        }).then(()=>{
            getUsers()
        })
    }

    const [averageAge, setAverageAge] = useState(0)

    useEffect(() => {
        const totalAge = users.reduce((sum, user) => {
            return sum + user.Age
        }, 0)
        
        setAverageAge(totalAge / users.length)
    }, [users])

    function removeUser() {
        let userName = prompt("Введите имя")
        fetch('/api/remove-user',{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "userName": userName
            }),
        }).then(()=>{
            alert(`Пользователи с именем "${userName}" были удалены.`)
            getUsers()
        }).catch(()=>{
            alert(`Пользователь с именем "${userName}" не найден.`)
        })
    }
    


    return(
        <div>
            <div>
                <table className="block-center mb-15">
                    <tr>
                        <th>Имя</th>
                        <th>Возраст</th>
                    </tr>
                    {users && users.map(user =>(
                        <tr key={user.id}>
                            <td>{user.Name}</td>
                            <td>{user.Age}</td>
                        </tr>
                    ))}
                </table>
                <h2>Средний возраст: {averageAge.toFixed(2)}</h2>
                <div className="Button mb-15" onClick={()=>{addUser()}}>Добавить пользователя</div>
                <div className="Button" onClick={()=>{removeUser()}}>Удалить пользователя</div>
            </div>
        </div>
    )
}