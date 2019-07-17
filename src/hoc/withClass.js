import React from 'react';

// const withClass = props => (
//     <div className = {props.classes}>
//         {props.children}
//     </div>
// );

// export default withClass;

/*
There are two methods for creating a Higher Order Component like this. The above method is preferable in cases
for wrapping for styling purposes. Here is the weird second one. 
This one is preferable in cases where the HOC provides additional logic.
First argument can be named whatever but must becapitalized. It is whatever is being wrapped. 
The rest of the arguments are custom, and depend on whatever the
context needs. In this case, since the HOC will be used for styling, we set the 
second parameter to be a class name. The body returns a functional component.
Then, in App.js, you need to wrap the export default withClass(App, classes.App)
*/
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className = {className}>
            <WrappedComponent {...props}/>
        </div>
    );  
};
export default withClass;