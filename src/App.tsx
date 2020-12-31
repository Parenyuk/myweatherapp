import {Button, Container, IconButton, makeStyles} from '@material-ui/core';
import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {HomePage} from './components/HomePage';
import {ArraySelectedCity} from './components/ArraySelectedCity';
import HomeIcon from '@material-ui/icons/Home';

const useMainFieldStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: '#73C2FB',
        height: '100vh',
        position: 'absolute',
        marginLeft: '8%'
    },
    link: {
        textDecoration: 'none'
    }
}));


function App() {

    const classes = useMainFieldStyles();

    return (
        <Container className={classes.app}>
            <Link to='/' className={classes.link} >
                <IconButton>
                    <HomeIcon fontSize={'large'} />
                </IconButton>
            </Link>
            <Link to='/arrayselectedcity' className={classes.link} >
                <Button> Selected cities </Button>
            </Link>
             <Switch>
                 <Route exact path={'/'} component={HomePage} />
                 <Route  path={'/arrayselectedcity'} component={ArraySelectedCity}  />
             </Switch>
        </Container>
    );
}

export default App;



