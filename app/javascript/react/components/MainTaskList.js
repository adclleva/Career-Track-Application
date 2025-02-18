import React from "react"
import PropTypes from "prop-types"
import { Link, useParams, Redirect } from 'react-router-dom'
import { Accordion, Card, Button, Toast, Navbar, Nav, ListGroup, ListGroupItem, CardGroup, Jumbotron  } from 'react-bootstrap'

import { useState, useEffect } from 'react'


function MainTaskList(props) { // this is being called from the App.js
    const { current_user_id, apiTasksData, apiJobsData } = props



    const taskList = apiTasksData.map((task, index) => {
        const {description, job_id, user_id} = task // we need the job id to compare
        
        return(
            <div key={index} style={{textAlign: 'center', marginBottom: '0.5em'}}>
                <Link to={`/jobs/${job_id}`}>
                    <button className="btn btn-outline-warning" style={{borderRight: 'none',borderLeft: 'none',borderBottom: 'none',  width: '87%', color: 'black', textAlign: 'left'}}type="button" > 
                        COMPANY <br /><div style={{textTransform: 'lowercase', opacity: 0.6}}>{description}</div> 
                    </button>
                </Link>
            </div>
        )
    })

    return(
      <div>
        {taskList}
      </div>

    )
}

export default MainTaskList

// {
//     description: "Task1 for job 1 User 1",
//     job_id: 1
// },
