import React, {useCallback} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router} from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import './App.css';

import ProjectToolbar from "./components/ProjectToolbar/ProjectToolbar";
import ProjectMap from "./components/ProjectMap/ProjectMap";

//Icons


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

window.mark = [];

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
                            window.mark.push(feature.center)
                            setMarkers([...window.mark])
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
                <ProjectToolbar/>
                <main className={classes.content}  >
                    <div  {...getRootProps()}>
                        <div className={classes.toolbar}/>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                    <ProjectMap/>
                </main>
            </div>
        </Router>
    );
}