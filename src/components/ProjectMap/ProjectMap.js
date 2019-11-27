import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import React from "react";

const symbolLayout = {
    'text-field': '{place}',
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top'
};
const symbolPaint = {
    'text-color': 'white'
};

const circleLayout = {visibility: 'visible'};
const circlePaint = {
    'circle-color': 'white'
};

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZG1pM2NvZGVyIiwiYSI6ImNpeDR4YTBuOTAwMG4ydG54em8zaWh0aW0ifQ.KfztrnDTeHGqwYFj2e5EdA'
});


export default function ProjectMap() {
    var geojson = {
        "type": "FeatureCollection",
        "features": window.mark.map(it => ({
            "type": "Feature",
            "properties": {
                "place": it[2],
                "login": "espresso",
                "lat": "38.91427",
                "lon": "-77.02827"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    it[0],
                    it[1]
                ]
            }
        }))
    };


    return (<Map
        style="mapbox://styles/dmi3coder/cixk85sgc00492rrlqtxazomc"
        containerStyle={{
            height: '80vh',
            width: '98vw'
        }}>
        <GeoJSONLayer
            data={geojson}
            circleLayout={circleLayout}
            circlePaint={circlePaint}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}>
        </GeoJSONLayer>
    </Map>)

}