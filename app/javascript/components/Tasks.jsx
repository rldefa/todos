import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tasks: []
         }
    }
    componentDidMount() {
        const url = "/api/v1/tasks/index";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ tasks: response }))
          .catch();
    }

    deleteTask = (id) => {
        const url = '/api/v1/destroy/${id}';
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
              "X-CSRF-Token": token,
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then(() => this.props.history.push("/tasks"))
            .catch(error => console.log(error.message));
        
        this.componentDidMount();
    }

    renderTableData(tasks) {
        return tasks.map((task, index) => {
                const { description, category } = task //destructuring
                return (
                <tr key={index} className='taskTable tableBody'>
                    <td>{description}</td>
                    <td>{category}</td>
                    <td><button onClick={() => console.log(index)}>Delete</button></td>
                </tr>
                )
                
        })
     }

     renderTableHeader() {
        return (
            <tr className='taskTable tableHeader'>
                <td>Description</td>
                <td>Category</td>
                <td></td>
            </tr>
        )
     }

    render() { 
        const { tasks } = this.state;
        const allTasks = (
            <div>
                <table id='tasks'>
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData(tasks)}
                    </tbody>
                </table>
            </div>
        )
        const noTask = (
              <h4 className='center'>
                No tasks yet.
              </h4>
          );
        return ( 
            <>
                {tasks.length > 0 ? allTasks : noTask}
            </>
         );
    }
}
 
export default Tasks;