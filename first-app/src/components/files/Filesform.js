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

const fileTypes = ["pdf","xls","csv","doc","txt","png","jpg"];

class Filesform extends Component {

    constructor(props) {
        super();

        this.state = {
            fileName: '',
            fileType: '',
            hddFilePath: '',
            folder: '',
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

    createFile(file) {

        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(file)
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

        const file = {
            fileName: this.state.fileName,
            fileType: this.state.fileType,
            hddFilePath: this.state.hddFilePath,
            folder: this.state.folder,
        };

        this.createFile(file);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            fileName: '', fileType: '', hddFilePath: '',folder: '',
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { fileName, fileType, hddFilePath, folder, folders } = this.state;
        const { open, messageVariant } = this.state;

        const foldersItems = folders.map((folder) => (
            <MenuItem value={folder.id}>{folder.title}</MenuItem>   //name?
        ));

        const fileTypesItems = fileTypes.map((type) => (
            <MenuItem value={type}>{type}</MenuItem>
        ));

        return (
            <div>
                <h1>Wprowadzanie pliku</h1>
                <Paper style={{marginLeft:'20%',width:'60%'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <TextField id="fileName" label="Nazwa pliku"
                                   className={classes.textField} margin="fileName" value={fileName}
                                   onChange={this.onChange} name="fileName"/>

                        <InputLabel htmlFor="file-type" style={{marginLeft:'2%'}}>Typ pliku</InputLabel>
                        <Select
                            value={this.state.fileType}
                            style={{width:'20%',marginTop: '2%',marginLeft:'2%'}}
                            onChange={this.onChange}
                            placeholder="Typ pliku"
                            input={<Input name="fileType" id="file-type"/>}
                        >
                            {fileTypesItems}
                        </Select>


                        <br/>
                        <TextField id="hddFilePath" label="Hdd file path"
                                   className={classes.textField} margin="normal" value={hddFilePath}
                                   onChange={this.onChange} name="hddFilePath"/>

                        <InputLabel htmlFor="file-forder" style={{marginLeft:'2%'}}>Folder</InputLabel>
                        <Select
                            value={this.state.folder}
                            style={{width:'20%',marginTop:'4%'}}
                            onChange={this.onChange}
                            placeholder="Folder"
                            input={<Input name="folder" id="file-folder"/>}
                        >
                            {foldersItems}
                        </Select>
                        <br/>

                        <Button style={{marginBottom: '5%',marginTop:'5%'}}
                                variant="contained" color="primary" className={classes.button} type="submit" onSubmit={this.onSubmit}>
                            Dodaj
                        </Button>

                    </form>

                    <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                </Paper>

            </div>

        )

    }

}

export default withStyles(styles)(Filesform);