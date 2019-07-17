import React, {Component} from 'react';

import Person from './Person/Person';

class Persons extends Component {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Person.js] getDerivedStateFromProps');
    //     return state;
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Persons.js] shouldComponentUpdate");
        return nextProps.persons !== this.props.persons;
        //if React should continue updating.
        //Usually have a comparison between nextProps and currentProps
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        //save some data before the update
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: "Snapshot"}; //send an info package to componentDidUpdate()
    }

    componentDidUpdate(prevProp, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log("[Persons.js] componentWillUnmount");
    }

    render () {
        console.log("[Persons.js] rendering...");
        return this.props.persons.map((person, index) => {
            return <Person 
            click = {() => this.props.click(index)}
            name = {person.name}
            age = {person.age}
            key = {person.id}
            change = {(event) => this.props.changed(event, person.id)}/> 
            //for some reason, bind syntax doesn't work with this ^^
        });
    }
}
export default Persons;