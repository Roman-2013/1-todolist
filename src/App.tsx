import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterType = 'all' | 'active' | 'completed'

function App() {


    const truck = 'What to learn 1'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},//0
        {id: v1(), title: 'JS', isDone: true},//1
        {id: v1(), title: 'ReactJS', isDone: false},//2
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const changeFilter = (nextFilterValue: FilterType) => {
        setFilter(nextFilterValue)
    }

    const removeTask = (taskId: string) => {
        setTasks(
            tasks.filter((t) => t.id !== taskId)
        )
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const updatdTasks = [newTask, ...tasks]
        setTasks(updatdTasks)
    }

    const changeTaskStatus=(taskId: string, newIsDoneValue:boolean)=>{
        setTasks(tasks.map(t=>t.id===taskId?{...t, isDone: newIsDoneValue}:t))
    }


    const getFilteredTasks = (allTasks: Array<TaskType>, currentValue: FilterType): Array<TaskType> => {
        switch (currentValue) {
            case 'completed':
                return allTasks.filter(t => t.isDone)
            case 'active':
                return allTasks.filter(t => !t.isDone)
            default:
                return allTasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist
                truck={truck}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}

            />
        </div>
    );
}


export default App;
