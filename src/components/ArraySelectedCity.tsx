import Typography from '@material-ui/core/Typography';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../redux/store';
import {Grid, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {searchInputTC} from '../redux/SearchWeatherReducer';

const useArraySelectedCitiesStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
    }
}));

export const ArraySelectedCity = () => {

    const classes = useArraySelectedCitiesStyles();

    const dispatch = useDispatch();

    const dispatchCity = (city: string) => {
        dispatch(searchInputTC(city))
    }

    const selectedCitesArray = useSelector<AppStateType, Array<string>>(state => state.selectedCityPage?.selectedCitiesArray);

    const map = selectedCitesArray.map((city: string) => {
        return <Typography onClick={() => dispatchCity(city)}>{city}</Typography>
    })

    return (
        <Typography>
            <Typography>
                Selected cites array:
            </Typography>
            <Grid container direction={'column'}>
                <Grid item>
                    <Link to={'/'} className={classes.link}>{map}</Link>
                </Grid>
            </Grid>
        </Typography>
    )
};

