import React, {Component} from 'react';
//import logo from './logo.svg';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from "../hoc/withClass";
import Aux from "../hoc/Aux";

class App extends Component{
  constructor (props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      {id: "fjdfdj2", name: "Tony", age: 20},
      {id: "fjdfdj4343", name: "Blony", age: 21},
      {id: "fjdfsadf", name: "Condony", age: 18}
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  switchHandler = (newName) => {
    this.setState( {
      persons: [
        {name: newName, age: 20},
        {name: "Blony", age: 21},
        {name: "Condony", age: 23}
      ]
    })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons; Don't reference original data. Make copy
    //const persons = this.state.persons.slice(); Or...
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  inputHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id; //finds the correct person to edit
    })
    const personToEdit = {
      ...this.state.persons[personIndex] //this creates a copy of the specific Person object
    }
    //now edit the name
    personToEdit.name = event.target.value;
    //copy the state array
    const persons = [...this.state.persons];
    persons[personIndex] = personToEdit; //apply the changes to the correct index;

    //this is the correct way to setState() if it depends on a previous state.
    //This is because setState does not immediately change state, it "schedules" it.
    //With small apps, it happens to run immediately after the schedule. Not so with big apps.
    //So somewhere else, the state could be changed so what you're setting state to here
    //may be relying on a state you weren't expecting.
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1};
      });
  }
  
  togglePersons = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    console.log("[App.js] render");
    let persons = null;
    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons = {this.state.persons}
            click = {this.deletePersonHandler}
            changed = {this.inputHandler} />
          /* <Person 
            name ={this.state.persons[0].name} 
            age = {this.state.persons[0].age}/>
          <Person 
            name ={this.state.persons[1].name} 
            age = {this.state.persons[1].age}
            change = {this.inputHandler}>I like to eat.</Person>
          <Person 
            name ={this.state.persons[2].name} 
            age = {this.state.persons[2].age}
            click = {this.switchHandler.bind(this, "Wony")}/> */
      )
    }
    return (
      <Aux>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <button onClick = {() => {
          const showCockpitCopy = this.state.showCockpit;
          this.setState({showCockpit : !showCockpitCopy})
        }}>
            Remove Cockpit
          </button>
        {this.state.showCockpit ? <Cockpit 
        title = {this.props.appTitle}
        showPersons = {this.state.showPersons}
        personsLength = {this.state.persons.length}
        togglePersons = {this.togglePersons} 
        /> : null}
        {persons}
      </Aux>
    );
  }
}
export default withClass(App, classes.App);
