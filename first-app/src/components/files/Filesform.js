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
    },
    cssLabel: {
        '&$cssFocused': {
            color: '#86C232'
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#86C232'
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#86C232'
        }
    },
    notchedOutline: {}
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
            file :  React.createRef(),

            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
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

    onFileChange(event) {
        console.log(this.state.file.current.files[0]);

        const name = this.state.file.current.files[0].name;
        const ext = this.state.file.current.files[0].name.split('.').pop();
        this.setState({fileName: name, fileType: ext});
        console.log('xd');
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
            file: this.state.file.current.files[0]
        };

        console.log("FILE " + file.file)

        this.createFile(file);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            fileName: '', fileType: '', hddFilePath: '',folder: '',
            file: React.createRef(),
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { fileName, fileType, hddFilePath, folder, folders, file } = this.state;
        const { open, messageVariant } = this.state;

        console.log(fileName);
        const foldersItems = folders.map((folder) => (
            <MenuItem value={folder.id}>{folder.title}</MenuItem>   //name?
        ));

        const fileTypesItems = fileTypes.map((type) => (
            <MenuItem value={type}>{type}</MenuItem>
        ));

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Wprowadzanie pliku</h1>
                <Paper style={{marginLeft:'25%',width:'50%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/>
                        <br/>
                        <div>
                       <Button variant="contained" component="label" style={{marginTop:'2%',backgroundColor: "#86C232",color:'#fff'}}
                        size="large">
                           Upload file
                           <input type="file" style={{display: 'none'}} name="file" ref={file}   onChange={this.onFileChange}
                           />
                       </Button>
                        </div>
                        <br/>

                        <div>
                        <TextField id="fileName" label="Nazwa pliku" style={{marginLeft:'2%',marginTop:'3%'}}
                                   className={classes.textField}  value={fileName} variant="outlined"
                                   onChange={this.onChange} name="fileName" disabled/>

                        <TextField id="fileType" label="Typ pliku" style={{marginTop:'3%'}}
                                   className={classes.textField} value={fileType} variant="outlined"
                                   onChange={this.onChange} name="fileType" disabled/>
                        </div>
                        {/*<InputLabel htmlFor="file-type" style={{marginLeft:'2%'}}>Typ pliku</InputLabel>*/}
                        {/*<Select*/}
                            {/*value={this.state.fileType}*/}
                            {/*style={{width:'20%',marginTop: '2%',marginLeft:'2%'}}*/}
                            {/*onChange={this.onChange}*/}
                            {/*placeholder="Typ pliku"*/}
                            {/*input={<Input name="fileType" id="file-type"/>}*/}
                        {/*>*/}
                            {/*{fileTypesItems}*/}
                        {/*</Select>*/}

                        <TextField id="hddFilePath" label="Hdd file path" style={{marginLeft:'4%',marginTop:'2%',width:'30%'}}
                                   className={classes.textField}  value={hddFilePath}
                                   onChange={this.onChange} name="hddFilePath" variant="outlined"
                                   InputLabelProps={{
                                       classes: {
                                           root: classes.cssLabel,
                                           focused: classes.cssFocused,
                                       },
                                   }}
                                   InputProps={{
                                       classes: {
                                           root: classes.cssOutlinedInput,
                                           focused: classes.cssFocused,
                                           notchedOutline: classes.notchedOutline,
                                       }
                                   }}/>

                        <br/>
                        <InputLabel htmlFor="file-forder" style={{marginLeft:'1%'}}>Folder</InputLabel>
                        <Select
                            value={this.state.folder}
                            style={{width:'15%',marginTop:'4%',marginLeft:'2%'}}
                            onChange={this.onChange}
                            placeholder="Folder"
                            input={<Input name="folder" id="file-folder"/>}
                        >
                            {foldersItems}
                        </Select>

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

export default withStyles(styles)(Filesform);