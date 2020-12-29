import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Task from './Task';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tasks: [],
      description: '',
      category: '',
    }

      this.deleteTask = this.deleteTask.bind(this);
      this.renderTableData = this.renderTableData.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
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
        event.preventDefault();
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
              throw new Error("Something is wrong.");
            })
            .then(response => {
                let updated = this.state.tasks.slice();
                updated = updated.filter(task => task.id != task_id)
                this.setState({tasks: updated})
            },
            this.componentDidMount()
            )
            .catch(error => console.log(error.message));
    }

    renderTableData() {
        return this.state.tasks.map((task, index) => {
                const { description: des, category: cat } = task //destructuring
                return (
                  <Task 
                    description={des} 
                    category={cat} 
                    id={task.id} 
                    key={index} 
                    deleteTask={this.deleteTask}
                  />  
                )     
        })
     }

    renderTableHeader() {
        return (
            <tr className='taskTable tableHeader'>
                <td>Category</td>
                <td>Description</td>
                <td></td>
            </tr>
        )
     }

    stripHtmlEntities(str) {
        return String(str)
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

    handleSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/tasks/create";
        const { description, category } = this.state;
    
        if (description.length == 0 || category.length == 0)
          return;
    
        const body = {
          description,
          category,
        };
    
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })

        .then(response => {
          let new_state = this.state.tasks.slice()
          new_state.unshift(response)
          this.setState({
              description: '',
              category: '',
              tasks: new_state})
        })
        .catch(error => console.log(error.message));
      }

    handleChange(event) {
      this.setState({ 
        [event.target.name] : event.target.value 
      })
    }

    handleBlur(event) {
      this.setState({ 
        text : event.target.value 
      })
    }

    render() { 
        const { tasks } = this.state;
        let allTasks = (
            <div>
                <table className='tasks'>
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
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
                <form className='center d-flex newTask' onSubmit={this.handleSubmit}>
                    <h4>Create New Task!</h4>
                    <label className='formEle'>
                        Category: 
                        <input
                            className='catInput'
                            name="category"
                            placeholder='Category'
                            value={this.state.category}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label className='formEle'>
                        Description: 
                        <input
                            className='desInput'
                            name="description"
                            placeholder='New Description'
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label className='formEle'>
                        <input type='submit' value='Submit' />
                    </label>
                </form>
                {tasks.length > 0 ? allTasks : noTask}
            </>
         );
    }
}


export default Tasks;