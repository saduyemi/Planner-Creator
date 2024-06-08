import { useState, useContext, useEffect } from 'react'
import './App.css'
import { InputField } from './components/InputField'
import { TaskBoard } from './components/TaskBoard'
import { LoaderCicle } from './components/LoadCircle'

function App() {
  const [list, setList] = useState([]);
  const [isLoaded, setLoaded] = useState(false); // set to true when intial data is finished loading so undefined data does not cause a crash
  
  // could also make a screen if data from fetch is undefined
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
        .then((response) => {
            response.json()
              .then(data => { 
                  if (!(undefined === data)) {
                    setList(data);
                    setLoaded(true);
                  }
              })
        })
        .catch(err => {
            console.log(err);
        });
  }, []);
  
  function refreshScreen() {
    console.log("Refreshing.....");

    fetch("http://localhost:3000/tasks")
        .then((response) => {
            response.json()
                .then(data => setList(data))
        })
        .catch(err => {
            console.log(err);
        });
  }

  function closeModal() {
    setDisplay(false);
  }

  //let displayModal = (isModal) ? <Modal givenTask={list[0]} closeThis={closeModal} refreshBoard={refreshScreen} /> : <></>;

  if (isLoaded){
    return (
      <>
        <div className='container'>
          <InputField updateBoard={refreshScreen}></InputField>
          <TaskBoard todoList={list} listRefresher={refreshScreen}></TaskBoard>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <LoaderCicle></LoaderCicle>
      </>
    );
  }
}

export default App



/*
import { useState, useContext, useEffect } from 'react'
import './App.css'
import { InputField } from './components/InputField'
import { TaskBoard } from './components/TaskBoard'
import { Modal } from './components/Modal'


function App() {
  const [list, setList] = useState([]);
  const [isLoaded, setLoaded] = useState(false); // set to true when intial data is finished loading so undefined data does not cause a crash
  
  //const [isModal, setDisplay] = useState(true); // going to be moved to InputField.jsx
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
        .then((response) => {
            response.json()
              .then(data => { 
                  if (!(undefined === data)) {
                    setList(data);
                    setLoaded(true);
                  }
              })
        })
        .catch(err => {
            console.log(err);
        });
  }, []);

  function refreshScreen() {
    console.log("Refreshing.....");

    fetch("http://localhost:3000/tasks")
        .then((response) => {
            response.json()
                .then(data => setList(data))
        })
        .catch(err => {
            console.log(err);
        });
  }

  function closeModal() {
    setDisplay(false);
  }

  //let displayModal = (isModal) ? <Modal givenTask={list[0]} closeThis={closeModal} refreshBoard={refreshScreen} /> : <></>;

  if (isLoaded){
    return (
      <>
        <div className='container'>
          <InputField updateBoard={refreshScreen}></InputField>
          <TaskBoard todoList={list} listRefresher={refreshScreen}></TaskBoard>
        </div>
        {displayModal}
      </>
    );
  }
  else {
    return (
      <>
        <p>Loading Data....</p>
      </>
    );
  }
}

export default App

*/