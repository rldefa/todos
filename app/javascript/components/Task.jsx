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

    componentWillReceiveProps(nextProps) {
        // Any time props.email changes, update state.
        if (nextProps.id !== this.props.id) {
          this.setState({
            id: nextProps.id,
            category: nextProps.category,
            description: nextProps.description
          });
        }
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
                <td><button value={this.state.id} onClick={this.props.deleteTask}>X</button></td>
            </tr>
         );
    }
}

export default Task;