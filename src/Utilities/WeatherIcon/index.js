export const iconId = (id) => {
    switch (id) {
        // 	thunderstorm with rain
        case '200':
        case '201':
        case '202':
        case '230':
        case '231':
        case '232':
        case '200n':
        case '201n':
        case '202n':
        case '230n':
        case '231n':
        case '232n':
            return require('./ThunderStormRain.png')
        //	thunderstorm 
        case '210':
        case '211':
        case '212':
        case '213':
        case '210n':
        case '211n':
        case '212n':
        case '213n':
            return require('./ThunderStorm.png')
        // drizzle
        case '300':
        case '301':
        case '310':
        case '311':
        case '313':
        case '314':
        case '321':
        case '300n':
        case '301n':
        case '310n':
        case '311n':
        case '313n':
        case '314n':
        case '321n':
            return require('./Drizzle.png')
        // heavy drizzle
        case '302':
        case '312':
        case '302n':
        case '312n':
            return require('./HeavyIntensityDrizzle.png')
        // light rain
        case '500':
        case '520':
            return require('./LightRain.png')
        case '500n':
        case '520n':
            return require('./NightLightRain.png')
        // rain
        case '501':
        case '511':
        case '521':
        case '501n':
        case '511n':
        case '521n':
            return require('./Rain.png');
        // heavy rain
        case '502':
        case '503':
        case '504':
        case '522':
        case '531':
        case '502n':
        case '503n':
        case '504n':
        case '522n':
        case '531n':
            return require('./HeavyRain.png');
        // snow
        case '600':
        case '601':
        case '602':
        case '611':
        case '612':
        case '613':
        case '615':
        case '616':
        case '620':
        case '621':
        case '622':
        case '600n':
        case '601n':
        case '602n':
        case '611n':
        case '612n':
        case '613n':
        case '615n':
        case '616n':
        case '620n':
        case '621n':
        case '622n':
            return require('./Snow.png');
        // fog
        case '701':
        case '711':
        case '721':
        case '731':
        case '741':
        case '751':
        case '761':
        case '762':
        case '771':
        case '701n':
        case '711n':
        case '721n':
        case '731n':
        case '741n':
        case '751n':
        case '761n':
        case '762n':
        case '771n':
            return require('./Fog.png');
        // tornado
        case '781':
        case '781n':
            return require('./Tornado.png')
        // clear cloud
        case '800':
            return require('./Sun.png')
        case '800n':
            return require('./Moon.png')
        // few clouds
        case '801':
            return require('./FewClouds.png')
        case '801n':
            return require('./NightFewClouds.png')
        // scattered clouds
        case '802':
        case '802n':
            return require('./ScatteredClouds.png')
        // broken clouds
        case '804':
        case '804n':
        case '803':
        case '803n':
            return require('./BrokenClouds.png');
        default:

    }
}