import React, {useCallback} from 'react';

import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router} from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import './App.css';
import './dashboard/Dashboard'

import ReactMapboxGl, {Feature, Layer} from 'react-mapbox-gl';
import StartupDialog from "./startup/StartupDialog";

//Icons

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZG1pM2NvZGVyIiwiYSI6ImNpeDR4YTBuOTAwMG4ydG54em8zaWh0aW0ifQ.KfztrnDTeHGqwYFj2e5EdA'
});


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function createItem(newItem, callback) {
    const h = {}; //headers
    let data = new FormData();
    data.append('file', newItem);
    h.Accept = 'application/json'; //if you expect JSON response
    fetch('http://localhost:5000/prediction', {
        method: 'POST',
        headers: h,
        body: data
    }).then(res => res.json())
        .then(callback)
        .catch(err => {
            console.log(err)
        });
}

const mark = []

export default function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [markers, setMarkers] = React.useState([]);


    const onDrop = useCallback(acceptedFiles => {
        /*global mapboxSdk*/
        createItem(acceptedFiles[0], function (data) {
            const mapboxClient = mapboxSdk({
                accessToken:
                    'pk.eyJ1IjoiZG1pM2NvZGVyIiwiYSI6ImNpeDR4YTBuOTAwMG4ydG54em8zaWh0aW0ifQ.KfztrnDTeHGqwYFj2e5EdA'
            });
            Object.keys(data).forEach(it => {
                console.log(it)
                mapboxClient.geocoding.forwardGeocode({
                    query: it,
                    autocomplete: false,
                    limit: 1
                }).send()
                    .then(function (response) {
                        if (response && response.body && response.body.features && response.body.features.length) {
                            var feature = response.body.features[0];
                            mark.push(feature.center)
                            setMarkers([...mark])
                        }
                    });
            });
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {})}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            className={clsx(classes.menuButton, {})}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            AI Guide
                        </Typography>
                        <Typography variant="h7" noWrap style={{marginLeft: '10px'}}>
                            Find similar place by picture
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content} {...getRootProps()}>
                    <div className={classes.toolbar}/>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }

                    <Map
                        style="mapbox://styles/dmi3coder/cixk85sgc00492rrlqtxazomc"
                        containerStyle={{
                            height: '80vh',
                            width: '98vw'
                        }}>

                        {mark.map(it =>
                            <Layer type="symbol" id={"marker" + it[0]} layout={{'icon-image': 'marker-15'}}>
                                <Feature coordinates={[it[0], it[1]]}/>
                            </Layer>)}

                    </Map>
                    <StartupDialog/>

                </main>
            </div>
        </Router>
    );
}