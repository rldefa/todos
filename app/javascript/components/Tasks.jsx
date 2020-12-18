import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tasks: []
         }

         this.deleteTask = this.deleteTask.bind(this);
         this.renderTableData = this.renderTableData.bind(this);
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

    deleteTask(event) {
        const task_id = event.target.value
        const url = `/api/v1/destroy/${task_id}`;
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
              throw new Error("Fk u.");
            })
            .then(response => {
                let updated = this.state.tasks.slice();
                updated = updated.filter(task => task.id != task_id)
                this.setState({tasks: updated})
            }
            )
            .catch(error => console.log(error.message));
    }

    renderTableData() {
        return this.state.tasks.map((task, index) => {
                const { description, category } = task //destructuring
                return (
                <tr key={index} className='taskTable tableBody'>
                    <td>{description}</td>
                    <td>{category}</td>
                    <td><button value={task.id} onClick={this.deleteTask}>Delete</button></td>
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
                <form className='center d-flex'>
                    <label className='formEle'>
                    Description: 
                    <input
                        name="description"
                        value={this.state.going}
                        onChange={this.handleInputChange} />
                    </label>
                    <label className='formEle'>
                    Category: 
                    <input
                        name="category"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                    </label>
                    <label className='formEle'>
                        <input type='submit' value='Submit' />
                    </label>
                </form>
            </>
         );
    }
}
 
export default Tasks;