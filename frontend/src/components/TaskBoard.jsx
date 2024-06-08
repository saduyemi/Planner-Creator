import { useState, useEffect } from 'react'
import './TaskBoard.css'
import { Modal } from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

export function TaskBoard({todoList, listRefresher}) {
    const [isModal, setDisplay] = useState(false);
    const [handleTask, setTask] = useState({}); // note setTask will only remember one task and I already included handling using task id, so don't have to consider handling the closing modal of one task when user wants to edit another task

    function handleDelete(taskID) {
        const options = {
            method: "DELETE"
        };

        fetch(`http://localhost:3000/delete/${taskID}`, options)
            .then(response => {
                 response.json()
                    .then(data => {
                        console.log(data.output); // in here because fetch is async so it cannot be at the end, since this function might run first even though it's on the last line of the function
                        listRefresher();
                    })
            })
            .catch(err => {
                console.log(err);
            }); 
    }

    function handleCheckbox(e, taskID) {
        let isChecked = e.target.checked;
        
        fetch(`http://localhost:3000/update/${taskID}/${isChecked}`, {method: "PATCH"})
            .then((response) => {
                response.json()
                    .then(data => {
                        console.log(data.output);
                        listRefresher();
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    // have to use useState cause program won't remember changes made to local variables because page won't remember changes made to local variables 
    let displayModal = (isModal) ? <Modal givenTask={handleTask} closeThis={() => { setDisplay(false); }} refreshBoard={listRefresher}></Modal> : <></>

    return (
        <>
            {/*displayModal*/}
            <ul>
                {todoList.map((aTask) => (
                    <li key={aTask._id} style={{opacity: (aTask.completed) ? 0.8 : 1}}>
                        <p className='taskItem'>{aTask.task}</p>
                        <button onClick={() => {setTask(aTask); setDisplay(true);}}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button className='deltBtn' onClick={() => { handleDelete(aTask._id); }}><FontAwesomeIcon icon={faTrash} size="xs" /></button>
                        <input type='checkbox' defaultChecked={aTask.completed} onChange={(e) => { handleCheckbox(e, aTask._id); }}/>
                        {(aTask._id === handleTask._id) ? displayModal : <></>}
                    </li>
                ))}
            </ul>
        </>
    );
}

/*
<li>
    <p className='taskItem'>Something</p>
    <button>Edit</button>
    <button>Dele</button>
    <input type='checkbox' />
    <hr/>
</li>
<li>
    <p className='taskItem'>Something2</p>
    <button>Edit</button>
    <button>Dele</button>
    <input type='checkbox' />
    <hr/>
</li>    
*/