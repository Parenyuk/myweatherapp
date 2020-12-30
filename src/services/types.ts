export type WeatherResponseDataType = {
    coord: {
        lon: number,
        lat: number,
    },
    weather: Array<WeatherType>,
    base: string,
    main: MainDataResponseType,
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: SysType,
    id: number,
    name: string,
    cod: number
}


export type WeatherType = {
    id: number,
    main: string,
    description: string,
    icon: string,
}

export type SysType = {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
}

export type MainDataResponseType = {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number,
}


export type ForecastResponseDataType = {
    city: {
        id: number,
        name: string,
        coord:{
            lat: number,
            lon: number
        },
        country: string
    }
    cod: string,
    cnt: number,
    message: number,

    list: Array<ForecastListType>
}

export type ForecastListType = {
    clouds:{
        all: number
    },
    dt: number,
    dt_txt: string,
    main:{
        temp: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level:number,
        humidity: number,
        temp_kf: number
    },
    pop: number,
    sys:{
        pod: string
    },
    visibility: number,
    weather:[
        {
            id: number,
            main:  string,
            description:  string,
            icon:  string
        }
    ],
    wind:{
        speed: number,
        deg: number
    },
}

