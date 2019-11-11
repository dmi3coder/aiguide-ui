import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import React from "react";
import clsx from 'clsx';


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZG1pM2NvZGVyIiwiYSI6ImNpeDR4YTBuOTAwMG4ydG54em8zaWh0aW0ifQ.KfztrnDTeHGqwYFj2e5EdA'
});

export default function ProjectMap() {
    return <Map
        style="mapbox://styles/dmi3coder/cixk85sgc00492rrlqtxazomc"
        containerStyle={{
            height: '80vh',
            width: '98vw'
        }}>

        {window.mark.map(it =>
            <Layer type="symbol" id={"marker" + it[0]} layout={{'icon-image': 'marker-15'}}>
                <Feature coordinates={[it[0], it[1]]}/>
            </Layer>)}

    </Map>

}