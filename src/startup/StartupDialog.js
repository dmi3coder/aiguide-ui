import React from 'react';
import {Dialog} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function StartupDialog() {

    return (
        <Dialog aria-labelledby="customized-dialog-title" open={false}>
            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Typography align={"center"}>Set Your Origin and Upload Image</Typography>
                        <Typography align={"center"}>Find cities that looks like photo with cheap prices</Typography>
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>
            </Container>
        </Dialog>)
}

export default StartupDialog