import { useState } from 'react'
import './Modal.css' 

export function Modal({givenTask, closeThis, refreshBoard}) {
    const [assign, setAssign] = useState('');
    // Create handler for POST request Checked

    function handleTaskChange(e) {
        e.preventDefault();

        const givenID = givenTask._id;
        const changedTask = assign;
        const info = {id : givenID, someTask: changedTask};

        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)
        };

        fetch("http://localhost:3000/changetask", options)
            .then(response => {
                response.json()
                    .then(result => {
                        console.log(result.output);
                        closeThis();
                        refreshBoard();
                    })
            })
            .catch(err => {
                console.log(err);
                closeThis();
            });    
    }
    // could make form's action just be handleTaskChange to ensure user can also use enter on keyboard instead of clicking "Confirm"
    // although still enter works as desired, could just make changes above for more clearness
    
    return (
            <>
                <div className='modal'>
                    <div className='modal-content'>
                        <form className='modal-form' >
                            <input type='text' placeholder={givenTask.task} onChange={(e) => setAssign(e.target.value)}></input>
                            <button onClick={(e) => { handleTaskChange(e);}}>Confirm</button>
                            <button className='closeBtn' onClick={(e) => { e.preventDefault(); closeThis(); }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </>
        );
    
    
}

/*export function Modal({taskItem, isOpen}) {
    const [task, setTask] = useState('');
    
    if (isOpen) {
        return (
            <>
                <div className='modalContainer'>
    
                </div>
            </>
        );
    }

    else {
        return (
            <>
            
            </>
        )
    }
    
}*/