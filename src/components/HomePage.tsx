import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import {SearchInput} from './SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {searchInputTC, searchWeaklyForecastTC, searchWeatherDataGeolocationTC} from '../redux/SearchWeatherReducer';
import {AppStateType} from '../redux/store';
import {
    ForecastListType,
    ForecastResponseDataType,
    WeatherResponseDataType,
    WindDirectionType
} from '../services/types';


const useMainPageStyles = makeStyles((theme) => ({
    title: {
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 36,
    },
    input: {
        width: 100,
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
        backgroundColor: 'Aquamarine',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
        borderRadius: 10,
    },
    temp: {
        fontSize: 20,
        fontWeight: 'bold',
    }

}));

export const HomePage: React.FC = () => {

    const classes = useMainPageStyles();

    const [searchValue, setSearchValue] = useState<string>('')
    const [direction, setDirection] = useState<WindDirectionType>()

    const weatherDataArray = useSelector<AppStateType, WeatherResponseDataType>(state => state.searchWeatherPage?.dataArray)
    const forecastData = useSelector<AppStateType, ForecastResponseDataType>(state => state.searchWeatherPage.forecastData);

    const dispatch = useDispatch();


    useEffect(() => {
        let windDegree = weatherDataArray.wind?.deg;
        if (windDegree) {
            const dir = checkDirection(windDegree)
            setDirection(dir)
        }
    }, [weatherDataArray.wind])

    const currentTemperature = Math.round(weatherDataArray.main?.temp);

    const pressure = weatherDataArray.main?.pressure;

    const humidity = weatherDataArray.main?.humidity;

    const windSpeed = Math.round(10 * weatherDataArray.wind?.speed) / 10;


    const filteredForecastData = forecastData.list?.filter((data: ForecastListType) => data.dt_txt.slice(-8) === '12:00:00')


    const checkDirection = (windDegree: number): WindDirectionType => {
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
        if (windDegree >= 259 || windDegree <= 281) {
            return 'West'
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
        dispatch(searchInputTC(searchValue))
        dispatch(searchWeaklyForecastTC(searchValue))
    }

    const searchGeolocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(searchWeatherDataGeolocationTC(position.coords.latitude, position.coords.longitude))
            //  dispatch(searchWeaklyForecastThunk(searchValue))
        });
    }

    const forecastDataMap = filteredForecastData?.map((data: ForecastListType) => {
        return <Grid item xs={2} className={classes.forecastTableItem} key={data.dt}>
            <Typography>
                <Typography>Weather forecast for</Typography>
                <Typography className={classes.temp}>  {data.dt_txt.slice(0, 10)}</Typography>

                <Typography>at 12.00 p.m.:</Typography>
                <Typography className={classes.temp}> {`${Math.round(10 * data.main.temp) / 10} °C`}  </Typography>
            </Typography>
        </Grid>
    })

    return (
        <>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item xs={3} className={classes.title}>
                    My Weather API
                </Grid>
                <Grid item xs={2}>
                    <SearchInput searchValue={searchValue} SetSearchValue={setSearchValue} dispatchThunk={dispatchThunk}
                                 searchGeolocation={searchGeolocation}/>
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction={'column'} className={classes.detailDayWeather}>
                        <Typography className={classes.temperatureData}>{`Temperature: `}
                            {
                                currentTemperature == 0
                                    ? ' 0°C'
                                    : !currentTemperature
                                    ? ''
                                    : `${`${currentTemperature}`} °C`
                            }
                        </Typography>
                        <Typography> Pressure: {`${!pressure ? '' : `${pressure} hpa`}`}</Typography>
                        <Typography>Humidity: {`${!humidity ? '' : `${humidity} %`}`}</Typography>
                        <Typography>Wind speed: {`${!windSpeed ? '' : `${windSpeed} m/s`}`} </Typography>
                        <Typography>Wind direction: {direction} </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction={'row'} className={classes.forecastTable}>
                {forecastDataMap}
            </Grid>
        </>

    )
};
