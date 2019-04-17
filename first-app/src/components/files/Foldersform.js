import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createQuantity } from "../../actions/quantitiesActions";
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {Link, Redirect} from 'react-router-dom';
import SnackbarFormWrapper from '../view/Snackbarformwrapper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
});


class Foldersform extends Component {

    constructor(props) {
        super();

        this.state = {
            folderName: '',
            folderDescPl: '',
            folderDescEn: '',
            parentFolder: null,
            folders: [],

            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.fetchFolders();
    }

    fetchFolders() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(folders => {
                folders = folders.slice(3,8);   //remove
                this.setState({folders: folders});
            });
    }

    createFolder(folder) {

        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(folder)
        })
            .then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onSubmit(event) {
        event.preventDefault();

        const folder = {
            folderName: this.state.folderName,
            folderDescPl: this.state.folderDescPl,
            folderDescEn: this.state.folderDescEn,
            parentFolder: this.state.parentFolder,
        };

        this.createFolder(folder);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            folderName: '', folderDescPl: '', folderDescEn: '', parentFolder: null,
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { folderName, folderDescPl, folderDescEn, parentFolder, folders } = this.state;
        const { open, messageVariant } = this.state;

        const foldersItems = folders.map((folder) => (
            <MenuItem value={folder.id}>{folder.title}</MenuItem>   //name?
        ));


        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Wprowadzanie folderu</h1>
                <Paper style={{marginLeft:'20%',width:'60%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/><br/>
                        <TextField id="folderName" label="Nazwa folderu" variant="outlined"
                        style={{marginRight:'9%'}}
                                   className={classes.textField}  value={folderName}
                                   onChange={this.onChange} name="folderName"/>
                       
                       <InputLabel htmlFor="parent-folder">Parent folder</InputLabel>
                        <Select
                            value={this.state.parentFolder}
                            style={{width:'20%',marginTop:'2%'}}
                            onChange={this.onChange}
                            placeholder="Parent folder"
                            input={<Input name="parentFolder" id="parent-folder"/>}
                        >
                            {foldersItems}
                        </Select>

                        <br/>
                        <br/>
                        <TextField id="folderDescPl" label="Opis PL" variant="outlined"
                                   className={classes.textField} margin="normal"
                                   style={{width:'60%'}} value={folderDescPl}
                                   onChange={this.onChange} name="folderDescPl"/>

                        <br/>

                        <TextField id="folderDescEn" label="Opis ENG" style={{marginLeft:'10%'}}
                                   style={{width:'60%'}}
                                   className={classes.textField} margin="normal" value={folderDescEn}
                                   variant="outlined"
                                   onChange={this.onChange} name="folderDescEn"/>
                        <br/>

                    
                        <br/>

                        <Button style={{marginBottom: '5%',marginTop:'5%',backgroundColor: "#86C232"}}
                                variant="contained" color="primary" className={classes.button} type="submit" onSubmit={this.onSubmit}
                                size="large">
                            Dodaj
                        </Button>

                    </form>

                    <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                </Paper>

            </div>

        )

    }

}

export default withStyles(styles)(Foldersform);