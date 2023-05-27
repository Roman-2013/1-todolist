import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    const truck = "What to lern 1 What to lern 1 What to lern 1"
    const trucNew = "What to lern 2"

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},//0
        {id: 2, title: "JS", isDone: true},//1
        {id: 3, title: "ReactJS", isDone: false},//2
        {id: 4, title: "ReactJS", isDone: false},//2
        {id: 4, title: "ReactJS", isDone: false},//2
    ]

    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist truck={truck} truck2={353364} tasks={tasks1}/>
            <Todolist truck={trucNew} truck3={true} tasks={tasks2}/>
        </div>
    );
}

export default App;
