import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "bootswatch/dist/lux/bootstrap.min.css";


function MainTaskList(props) {
    const { current_user_id, apiTasksData, apiJobsData} = props

    // const {apiJobsData}


    const taskList = apiTasksData.map((task, index) => {
        const {description, job_id, user_id} = task // we need the job id to compare

        return(
            <div key={index} style = {{borderStyle: 'inset'}}>

                <h1> description: {description}</h1>

            </div>
        )
    })

    return(
        <div style = {{borderStyle: 'inset'}}>
            {taskList}
        </div>
    )
}

export default MainTaskList

// {
//     description: "Task1 for job 1 User 1",
//     job_id: 1
// },
