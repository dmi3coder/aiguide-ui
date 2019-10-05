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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';


const styles = (theme) => {
    console.log(theme)
    return ({
        root: {
            width: '100%',
            // maxWidth: ,
            backgroundColor: theme.palette.background.paper,
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(4),
            right: theme.spacing(3),
        },
    });
}


function ConfigDialog(props) {
    const {onClose, selectedValue, open} = props;
    if (!selectedValue) {
        return (<div></div>)
    }
    const isNew = selectedValue.isNew;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    const onChangeKey = (event) => {
        selectedValue.key = event.target.value

    }
    const onChangeValue = (event) => {
        selectedValue.value = event.target.value

    }

    const handleSave = () => {
        if (!isNew) {
            fetch('http://localhost:5000/config/' + selectedValue.id, {
                method: 'PUT', body: JSON.stringify(selectedValue), headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((data) => {
                })
                .catch(console.log);
        } else {
            fetch('http://localhost:5000/config/', {
                method: 'POST', body: JSON.stringify(selectedValue), headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(console.log);
        }

        onClose(selectedValue)
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{isNew ? 'Add' : 'Edit'} config</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {isNew ? 'Add' : 'Edit'} config for {selectedValue && selectedValue.key}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Key"
                    type="text"
                    defaultValue={selectedValue && selectedValue.key}
                    onChange={onChangeKey}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Value"
                    type="text"
                    onChange={onChangeValue}
                    defaultValue={selectedValue && selectedValue.value}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    {isNew ? 'Add' : 'Edit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfigDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    // selectedValue: PropTypes.string.isRequired,
};


class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configs: [],
            open: false,
            selectedValue: null
        }
    }

    handleClickOpen = (config) => {
        this.setState({open: true, selectedValue: config})
    };

    handleClose = value => {
        this.setState({open: false})
        this.componentDidMount()
    };

    handleNewConfig = () => {
        this.setState({open: true, selectedValue: {isNew: true}})
    };


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
        const fab = {
            color: 'secondary',
            className: classes.fab,
            icon: <AddIcon/>,
            label: 'Add',
        }
        const items = this.state.configs.map((it) =>
            <ListItem key={it.key}>
                <ListItemAvatar>
                    <Avatar>
                        <BuildIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={it.key} secondary={it.value}/>
                <ListItemSecondaryAction onClick={() => this.handleClickOpen(it)}>
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
            <div>
                {/*<Divider variant="inset" component="li"/>*/}
                <List className={classes.root}>
                    {items}
                </List>
                <Fab onClick={this.handleNewConfig} aria-label={fab.label} className={fab.className} color={fab.color}>
                    {fab.icon}
                </Fab>
                <ConfigDialog onClose={this.handleClose} open={this.state.open}
                              selectedValue={this.state.selectedValue}/>
            </div>
        );
    }
}

Config.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Config);