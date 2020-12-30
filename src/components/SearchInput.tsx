import React, {ChangeEvent} from 'react';
import {Button, Grid, Input, makeStyles, Paper, Typography} from '@material-ui/core';

const useSearchInputStyles = makeStyles((theme) => ({
    input: {
        widht: 160,
        padding: 10,
        marginLeft: 60,
    },
    button: {
        marginTop: 20,
        marginLeft: 10,
        maxHeight: 45,
        maxWidth: 160,
    }
}));

type PropsType = {
    searchValue: string
    SetSearchValue: (s: string) => void
    dispatchThunk: () => void
    searchGeolocation: () => void
}

export const SearchInput = ({searchValue, SetSearchValue, dispatchThunk, searchGeolocation}: PropsType) => {

    const classes = useSearchInputStyles();

    const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        SetSearchValue(e.currentTarget.value)

    }

    return (
        <Typography >
            <Input className={classes.input} placeholder={"Enter a city"} color={'secondary'} onChange={changeSearchValue} />
            <Grid container>
                <Grid item xs={6}> <Button className={classes.button} color={'secondary'} variant={'contained'} onClick={dispatchThunk} >Search by city</Button></Grid>
                <Grid item xs={6}>  <Button className={classes.button} onClick={searchGeolocation} variant="contained" color={'secondary'} >Search by geolocation</Button></Grid>
            </Grid>
        </Typography>
    )
}
