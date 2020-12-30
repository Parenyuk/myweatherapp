import React, {useEffect, useState} from 'react';
import {Button, Input, makeStyles, Paper} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import {SearchInput} from './SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {
    searchInputThunk,
    searchWeaklyForecastThunk,
    searchWeatherDataGeolocationThunk
} from '../redux/SearchWeatherReducer';
import {AppStateType, SearchWeatherReducerType} from '../redux/store';
import {ForecastListType, ForecastResponseDataType, WeatherResponseDataType} from '../services/types';


const useMainPageStyles = makeStyles((theme) => ({
    mainField: {
        // backgroundColor: '#7EF9FF',
        widht: '800px',
    },
    title: {
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 36,
    },
    input: {
        widht: 100,
        padding: 10,
    },
    temperatureData: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    detailDayWeather: {
        marginLeft: 80,
    },
    forecastTable: {
        marginLeft: 150,
        marginRight: 'auto',
    },
    forecastTableItem: {
        height: 120,
        padding: 10,
        margin: 10,
        marginTop: 30,
        backgroundColor: 'white',
    },

}));

export const HomePage = () => {

    const classes = useMainPageStyles();

    const [searchValue, SetSearchValue] = useState<string>('')

    const dispatch = useDispatch();


    const dataArray = useSelector<AppStateType, WeatherResponseDataType>(state => state.searchWeatherPage?.dataArray)

    const currentTemperature = Math.round(dataArray.main?.temp);

    const pressure = dataArray.main?.pressure;

    const humidity = dataArray.main?.humidity;

    const windSpeed = Math.round(10 * dataArray.wind?.speed) / 10;

    const forecastData = useSelector<AppStateType, ForecastResponseDataType>(state => state.searchWeatherPage.forecastData);

    const filteredForecastData = forecastData.list?.filter((data:ForecastListType) => data.dt_txt.slice(-8) === '12:00:00')
        // .map((data: ForecastListType) => {
        //     <Grid item xs={2} className={classes.forecastTableItem} key={data.dt}>{data?.main.temp}</Grid>
        // })


   const forecastDataMap = filteredForecastData?.map((data: ForecastListType) => {
        <Grid item xs={2} className={classes.forecastTableItem} key={data.dt} >{data?.main.temp}</Grid>
   })

    console.log(filteredForecastData)
    console.log(forecastDataMap)

    // useEffect(() => {
    //     if( filteredForecastData) {
    //         const forecastDataMap = filteredForecastData?.map((data: ForecastListType) => {
    //             <Grid item xs={2} className={classes.forecastTableItem} key={data.dt} >{data?.main.temp}</Grid>
    //         })
    //     }
    //
    // }, [forecastData.list])



    const [direction, setDirection] = useState<string>('')

    useEffect(() => {
        let windDegree = dataArray.wind?.deg;
        if (windDegree) {
            const dir = checkDirection(windDegree)
            setDirection(dir)
        }
    }, [dataArray.wind])
    const checkDirection = (windDegree: number) => {
        if (windDegree >= 12 || windDegree <= 33) {
            return 'North-Northeast'
        }
        if (windDegree >= 34 || windDegree <= 56) {
            return 'Northeast'
        }
        if (windDegree >= 57 || windDegree <= 78) {
            return 'East-Northeast'
        }
        if (windDegree >= 79 || windDegree <= 101) {
            return 'East'
        }
        if (windDegree >= 124 || windDegree <= 146) {
            return 'Southeast'
        }
        if (windDegree >= 147 || windDegree <= 168) {
            return 'South-Southeast'
        }
        if (windDegree >= 169 || windDegree <= 191) {
            return 'South'
        }
        if (windDegree >= 192 || windDegree <= 213) {
            return 'South-Southwest'
        }
        if (windDegree >= 214 || windDegree <= 236) {
            return 'Southwest'
        }
        if (windDegree >= 237 || windDegree <= 258) {
            return 'West-Southwest'
        }
        if (windDegree >= 237 || windDegree <= 258) {
            return 'West'
        }
        if (windDegree >= 259 || windDegree <= 281) {
            return 'West-Southwest'
        }
        if (windDegree >= 282 || windDegree <= 303) {
            return 'West-Northwest'
        }
        if (windDegree >= 304 || windDegree <= 326) {
            return 'Northwest'
        }
        if (windDegree >= 327 || windDegree <= 348) {
            return 'North-Northwest'
        }
        if (windDegree >= 349 || windDegree <= 360 || windDegree <= 11) {
            return 'North'
        }
        return 'All'
    }


    let dispatchThunk = () => {
        dispatch(searchInputThunk(searchValue))
        dispatch(searchWeaklyForecastThunk(searchValue))
    }

    const searchGeolocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(searchWeatherDataGeolocationThunk(position.coords.latitude, position.coords.longitude))
        });
    }

    return (
        <>
        <Grid container
              direction="column"
              alignItems="center"
              spacing={3}
              className={classes.mainField}
        >
            <Grid item xs={3} className={classes.title}>
                My Weather API
            </Grid>
            <Grid item xs={2}>
                <SearchInput searchValue={searchValue} SetSearchValue={SetSearchValue} dispatchThunk={dispatchThunk}
                             searchGeolocation={searchGeolocation}/>
            </Grid>
            <Grid item xs={4}>
                <Grid container direction={'column'} className={classes.detailDayWeather}>
                    <Grid className={classes.temperatureData}
                          item> Temperature: {currentTemperature == 0 ? '0°C' : !currentTemperature ? '' : `${currentTemperature}°C`}</Grid>
                    <Grid item> Pressure: {`${!pressure ? '' : `${pressure} hpa`}`}</Grid>
                    <Grid item>Humidity: {`${!humidity ? '' : `${humidity} %`}`}</Grid>
                    <Grid item>Wind speed: {`${!windSpeed ? '' : `${windSpeed} m/s`}`} </Grid>
                    <Grid item>Wind direction: {direction} </Grid>
                </Grid>
            </Grid>
        </Grid>

                <Grid container direction={'row'} xs={10} className={classes.forecastTable} >
                    {/*<Grid item xs={2} className={classes.forecastTableItem}>Item 1</Grid>*/}
                    {/*<Grid item xs={2} className={classes.forecastTableItem}>Item 1</Grid>*/}
                    {/*<Grid item xs={2} className={classes.forecastTableItem}>Item 1</Grid>*/}
                    {/*<Grid item xs={2} className={classes.forecastTableItem}>Item 1</Grid>*/}
                    {/*<Grid item xs={2} className={classes.forecastTableItem}>Item 1</Grid>*/}
                    {filteredForecastData && filteredForecastData}
                </Grid>
        </>

    )
};
