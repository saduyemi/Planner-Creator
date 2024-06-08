import { useState } from 'react'
import './InputField.css'

export function InputField({updateBoard}) {
    const [todo, setTask] = useState("");

    function handleSumbit(e) {
        e.preventDefault();
        const newTask = {task: todo, completed: false};

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTask)
        }

        fetch('http://localhost:3000/create', options)
            .then((resp) => {
                resp.json()
                    .then((data) => {
                        console.log(data);
                        updateBoard(); // in here because fetch is async so it cannot be at the end, since this function might run first even though it's on the last line of the function  
                        setTask("");
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    

    return (
        <>
            <div className='formContainer'>
                <form>
                    <input type='text' placeholder='Enter a ToDo' value={todo} onChange={(e) => { setTask(e.target.value); }}></input>
                    <button id='addBtn' onClick={(e) => { handleSumbit(e); }}> Add </button>
                </form>
            </div>
        </>
    );
}

/* function handleSubmit(e) {
        e.preventDefault();
        
        const newTask = {task: todo, completed: false };

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"} ,
            body: JSON.stringify(newTask)    
        };

        fetch('http://localhost:3000', options)
            .then((response) => { 
                response.json()
                    .then((data) => console.log(data))
            })
            .catch(err => {
                console.log(err);
            });

        
    } */