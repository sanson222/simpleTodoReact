import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { mongoSimulator } from "./database";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoId: null, // todo ID from the current id (null if is new)
      todoName: "",
      todoDesc: "",
      todos: [] // All fetch todos from the database
    };

    // bind's
    this.agregarTodo = this.agregarTodo.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.setCurrent = this.setCurrent.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  // store the value of inputs in our state
  handleKey(e) {
    let { name, value } = e.target; //ES6
    this.setState({
      [name]: value
    });
  }

  agregarTodo(e) {
    e.preventDefault();
    let { todoName, todoDesc, todoId } = this.state; //ES6
    // fetch POST
    mongoSimulator.save({ todoId, todoName, todoDesc });

    // fetch GET
    let todos = mongoSimulator.getAll();
    this.setState({
      todoName: "",
      todoDesc: "",
      todoId: null,
      todos: todos
    });
  }
  setCurrent(e) {
    e.preventDefault();

    // get the key from the custom data attr "data-todoid"
    let { todoid } = e.target.dataset; //data-todoid = "key"
    // Fecth GET
    let { todoName, todoDesc } = mongoSimulator.get(todoid);

    this.setState({
      todoId: todoid,
      todoName,
      todoDesc
    });
  }

  deleteTodo(e) {
    e.preventDefault();

    // get the key from the custom data attr "data-todoid"
    let { todoid } = e.target.dataset;
    // fetch DELETE
    mongoSimulator.delete(todoid);

    this.setState({
      todoId: todoid,
      todoName: "",
      todoDesc: ""
    });
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-sm">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tarea</label>
                <input
                  type="text"
                  className="form-control"
                  id="todoName"
                  aria-describedby="todoName"
                  name="todoName"
                  placeholder="insertar nombre de tarea"
                  onChange={this.handleKey}
                  value={this.state.todoName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="todoDesc"
                  name="todoDesc"
                  placeholder="Descripcion"
                  onChange={this.handleKey}
                  value={this.state.todoDesc}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.agregarTodo}>
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map((todo, key) => {
                  return (
                    <tr key={key}>
                      <td> {todo.todoName} </td>
                      <td> {todo.todoDesc} </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          data-todoid={key}
                          onClick={this.setCurrent}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger"
                          data-todoid={key}
                          onClick={this.deleteTodo}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
