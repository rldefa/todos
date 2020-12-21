import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: props.id,
            category: props.category,
            description: props.description
        }


        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ 
          [event.target.name] : event.target.value
        })
        console.log(id);
      }

    render() { 
        return ( 
            <tr className='taskTable tableBody'>
                <td>{this.state.category}</td>
                <td>{this.state.description}</td>
                <td><button value={this.props.id} onClick={this.props.deleteTask}>Done</button></td>
            </tr>
         );
    }
}

export default Task;