import React from "react";
import { Link } from "react-router-dom";
import Tasks from "./Tasks"

export default () => (
    <>
        <h1 className="center title">To Dos!</h1>
        <Tasks />
        <h2 className="center btn btn-lg newTask">Create New Task</h2>
    </>
) 