import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CreateTaskPage(props) { // this should be called JobCard component
    const {apiJobsData, loadJobs, loadTasks, apiTasksData} = props

    const {paramJobId} = useParams() // the id of the job that we are using
    const [ taskSuccess, setTaskSuccess ] = useState(false)
    const [goBack, setGoBack] = useState(false)
    const [ tasksCreatedDone, setTasksCreatedDone ] = useState(false)
    const [ taskData, setTaskData ] = useState(
        {
            description: '',
            job_id: parseInt(paramJobId, 10)
        }
    )

    function createTask(task) {
        return fetch('/tasks', {
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then( resp => {
            let json = resp.json()
            console.log("fetch resp", resp)
            console.log("fetch json", json)
            return json
        })
    }

    useEffect(() => {
        console.log(apiTasksData)
    },[])

    function handleChange(event) {
        const newTaskData = {...taskData, [event.target.name]: event.target.value}
        setTaskData(newTaskData)
    }

    function handleBackClick() {
        setGoBack(true)
    }

    function taskCreatedSuccess() { // this function occurs once a task is created so we can create another task
        setTaskSuccess(true)
        setTaskData({ description: '', job_id: parseInt(paramJobId, 10)})
        loadTasks()
    }

    function handleCreateTask() {
        createTask(taskData)
        .then(() => {
            taskCreatedSuccess()
        })
    }

    function handleDoneClick() {
        setTasksCreatedDone(true)
    }

    useEffect(() => { // to constantly load the tasks
        loadTasks()
    },[taskSuccess])

    const currentJobTasks = apiTasksData.map((task, index) => {
        const {id, name, job_id, description} = task

        return (
            <div key={index}>
                {/* reason why we did not do triple equals is because we are comparing an int with a string*/}
                {job_id == paramJobId &&
                <h1> Task: {id} - {description} </h1>
                }
            </div>
        )
    })

    return (
        <React.Fragment>
            <div>
                <h1> Add Tasks for this Job </h1>
                {currentJobTasks}
            </div>
            <div>
                 <label>Task Description:</label>
                 <input
                   type="text"
                   name="description"
                   onChange={handleChange}
                   value={taskData.description}
                 />
            </div>
            <button variant="primary" onClick={handleBackClick}>
            Back
            </button>
            <button variant="primary" onClick={handleCreateTask}>
            Create Task
            </button>
            <button variant="primary" onClick={handleDoneClick}>
            Done
            </button>

            {tasksCreatedDone &&
               <Redirect to={`/jobs/${paramJobId}`} />
            }
            {goBack &&
                <Redirect to={`/jobs/${paramJobId}`} />
            }
            {taskSuccess &&
                <Redirect to={`/jobs/${paramJobId}/createtaskpage`} />
            }
        </React.Fragment>
    )
}

export default CreateTaskPage
