import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {withStyles} from '@material-ui/core/styles';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";


const styles = (theme) => {
    console.log(theme)
    return ({
        root: {
            width: '100%',
            // maxWidth: ,
            backgroundColor: theme.palette.background.paper,
        },
    });
}

class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configs: []
        }
    }


    componentDidMount() {
        fetch('http://localhost:5000/config', {mode: 'cors',})
            .then(res => res.json())
            .then((data) => {
                this.setState({configs: data})
            })
            .catch(console.log)
    }

    render() {
        const {classes} = this.props;
        const items = this.state.configs.map((it) =>
            <ListItem key={it.key}>
                <ListItemAvatar>
                    <Avatar>
                        <BuildIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={it.key} secondary={it.value}/>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" style={{marginRight: 35}}>
                        <EditIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )

        return (
            <List className={classes.root}>
                {items}
            </List>
        );
    }
}

Config.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Config);