import React, { Component } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'
import { Button, Intent, Spinner } from "@blueprintjs/core";
 

 // using JSX:
 const mySpinner = <Spinner intent={Intent.PRIMARY} />;
 
 // use React.createElement if you're not using JSX.
 const myButton = React.createElement(Button, { intent: Intent.SUCCESS }, "button content");

const TodoForm = ({addTodo}) => {
  let input

  return (
    <div className='name' class='row'>
      <input class="form-control input-text"  ref={node => {
        input = node
      }} />
    

      <button class="pt-intent-primary pt-button pt-icon-add .modifier"  onClick={() => {
        addTodo(input.value)
        input.value = ''
      }}>
      
      </button>
    </div>
  )
}

const Todo = ({todo, remove}) => {
  return (<li onClick={() => (remove(todo.id))}>{todo.text}</li>)
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  })
  return (<ul>{todoNode}</ul>)
}

const Title = ({todoCount}) => {
  return (
    <div class="row justify-content-md-center">
      <div >
        <h1>to-do (todoCount)</h1>
      </div>
    </div>

  )
}

window.id = 0
class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }

  componentDidMount () {
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data: res.data})
      })
  }

  addTodo (val) {
    if (val !== '' || val !== null) {
      const todo = {text: val, id: window.id++}
      // const todo = {text: val}

      axios.post(this.apiUrl, todo).then((res) => {
        this.state.data.push(todo)

        this.setState({data: this.state.data})
      })
    }
  }

  handleRemove (id) {
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo
    })

    axios.delete(this.apiUrl + '/' + id).then((res) => {
      this.setState({data: remainder})
    })
  }

  render () {
    return (
      <div>
        <Title todoCount={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />

      </div>
    )
  }
}

class App extends Component {
  render () {
    return (

      <body>
        <nav class="navbar navbar-light bg-light">
          <div class='container'>
            <span class="navbar-brand mb-0 h1 header-name">TodoApp</span>
          </div>
        </nav>
        <div class='container'>
        
          <div id='container' class='col-md-6 offset-md-3'>
             <TodoApp /> </div>
        </div>

        <script src='https://fb.me/react-15.1.0.js' />
        <script src='https://fb.me/react-dom-15.1.0.js' />
        <script src='https://code.jquery.com/jquery-3.2.1.slim.min.js' integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN' crossorigin='anonymous' />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js' integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q' crossorigin='anonymous' />
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl' crossorigin='anonymous' />

      </body>

    )
  }
}

export default App
