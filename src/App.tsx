import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType={
    [key:string]:TaskType[]
}

function App() {


    // const [tasks, setTasks] = useState<TaskType[]>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},//0
    //     {id: v1(), title: 'JS', isDone: true},//1
    //     {id: v1(), title: 'ReactJS', isDone: false},//2
    // ])



    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState <TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })




    const changeFilter = (todolistId:string,nextFilterValue: FilterType) => {
        setTodolists(todolists.map(el=>el.id===todolistId?{...el,filter:nextFilterValue}:el))
    }

    const removeTask = (todolistId:string,taskId: string) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(el=>el.id!==taskId)})
        // setTasks(
        //     tasks.filter((t) => t.id !== taskId)
        // )
    }

    const addTask = (todolistId:string,title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false,}
        setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})


    }

    const changeTaskStatus = (todolistId:string,taskId: string, newIsDoneValue: boolean) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,isDone:newIsDoneValue}:el)})
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    const removeTodolist=(todolistId:string)=>{
        setTodolists(todolists.filter(el=>el.id!==todolistId))
        delete tasks[todolistId]
    }

    return (
        <div className="App">
            {todolists.map(el => {

                let filteredTasks=tasks[el.id]

                if(el.filter==='active'){
                    filteredTasks=tasks[el.id].filter(task=>!task.isDone)
                }
                if(el.filter==='completed'){
                    filteredTasks=tasks[el.id].filter(task=>task.isDone)
                }

                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        truck={el.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })
            }

        </div>
    );
}


export default App;
