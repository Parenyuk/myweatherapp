import {Container, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {HomePage} from './components/HomePage';
import {ArraySelectedCity} from './components/ArraySelectedCity';


const useMainFieldStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: '#73C2FB',
        height: '100vh',
    },
}));


function App() {

    const classes = useMainFieldStyles();

    return (
        <Container className={classes.app}>
            <HomePage/>
            <ArraySelectedCity/>
        </Container>
    );
}

export default App;
