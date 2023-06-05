import React, {useRef, useState} from 'react';
import {FilterType} from './App';

type PropsType = {
    truck: string
    truck2?: number
    truck3?: boolean
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    addTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterType) => void
}
export type TaskType = {
    id: number
    title: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    // const addTaskInputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
        // if (addTaskInputRef.current) {
        // props.addTask(addTaskInputRef.current.value)
        // addTaskInputRef.current.value = ' '
    }
    return (
        <div>
            <h3>{props.truck}</h3>
            <div>
                <input value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               addTask()
                           }else if(e.key="Backspace"){
                               setTitle(e.currentTarget.value)
                           }
                       }}
                />
                <button
                    disabled={!title}
                    onClick={addTask}>+</button>
            </div>
            <ul className={'tasksList'}>
                {props.tasks.map((el) => {
                    const removeTask = () => props.removeTask(el.id)
                    return (
                        <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div className={'butons-blick'}>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>

    )
}
