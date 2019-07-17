import React, {useEffect} from 'react';

import classes from './Cockpit.module.css';

const Cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect WHY ISN`T THIS APPEARING TWICE');
        //run every update cycle
        setTimeout(() => {
            alert("First time only");
        }, 1000);
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, []);
    //second parameter is array of dependencies that will trigger useEffect.
    //if no 2nd param, runs with every update cycle
    //e.g. [props.person] means useEffect() runs whenever an update to a person is made
    //empty array means useEffect() will only run when first initiaized and destroyed
    //the return statement runs after (first) render cycle but BEFORE the main useEffect function
    //this is because it is cleaning up from the previous useEffect()
    //NOTE: if you have a return, then when this component is unmounted, only the return and not the body will be run
    //as opposed to if there isn't a return, then the body will run after an unmount


    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect THIS SHOULD ALSO BE APPEARING TWICE');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    let btnClass = null;
    const assignedClasses = []; //empty array at first because you will add classes
    if (props.showPersons) btnClass = classes.red;

    if (props.personsLength <= 2) assignedClasses.push(classes.red);
    if (props.personsLength <= 1) assignedClasses.push(classes.bigger);

    return (
        <div className = {classes.Cockpit}>
            <button className = {btnClass}
            onClick={props.togglePersons}>Switch name</button>
            <h1 className = {assignedClasses.join(" ")}> {props.title} </h1>
            {/*assigning classes to the JSX element by joining together the strings in "classes"*/}
        </div>
    );
}

export default React.memo(Cockpit);
//stores snapshot of this component, and only changes component if its inputs (props) changes