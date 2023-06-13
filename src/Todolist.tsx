import React, {ChangeEvent, useRef, useState,KeyboardEvent} from 'react';
import {FilterType} from './App';

type PropsType = {
    truck: string
    truck2?: number
    truck3?: boolean
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterType) => void
    filter: FilterType
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}
export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}
export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, seterror] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            seterror(true)
        }
        setTitle('')
    }

    const taskList = (props.tasks.length === 0)
        ? <p>Taskslist is empty</p>
        : <ul className={'tasksList'}>
            {
                props.tasks.map((el) => {
                    const removeTask = () => props.removeTask(el.id)
                    const changetaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, event.currentTarget.checked)
                    }
                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={changetaskStatus}
                            />
                            <span className={el.isDone ? 'task-done' : 'task-span'}>{el.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>

    const oneKeyDownHandler=(e:KeyboardEvent<HTMLInputElement>) => {
        seterror(false)
        if (e.key === 'Enter') {
            addTask()
        } else if (e.key = 'Backspace') {
            setTitle(e.currentTarget.value)
        }
    }
    return (
        <div>
            <h3>{props.truck}</h3>
            <div>
                <input
                    className={error ? 'user-error' : ''}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onKeyDown={oneKeyDownHandler}
                />
                {error && <div style={{'color': 'red'}}>Plase,enter correct title</div>}
                <button
                    disabled={!title}
                    onClick={addTask}>+
                </button>
                {taskList}
            </div>
            <div className={'butons-blick'}>
                <button className={props.filter === 'all' ? 'btn-filter-active' : ''}
                        onClick={() => props.changeFilter('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-filter-active' : ''}
                        onClick={() => props.changeFilter('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-filter-active' : ''}
                        onClick={() => props.changeFilter('completed')}>Completed
                </button>
            </div>
        </div>

    )
}
