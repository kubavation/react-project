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


class FactorSourcesform extends Component {

    constructor(props) {
        super();

        this.state = {
            date: '',
            desc: '',
            doi: '',
            bibtex: '',
            file: '',
            files: [],

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
        this.fetchFiles();
    }

    createFactorSource(factorSource) {

        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(factorSource)
        })
            .then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );
    }

    fetchFiles() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(files => {
                files = files.slice(3,8);   //remove
                this.setState({files: files});
            });
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onSubmit(event) {
        event.preventDefault();

        const factorSource = {
            date: this.state.date,
            desc: this.state.desc,
            doi: this.state.doi,
            bibtex: this.state.bibtex,
            file: this.state.file
        };

        this.createFactorSource(factorSource);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            date: '', desc: '', doi: '',bibtex: '',file: '',
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { date, desc, doi, bibtex, file, files } = this.state;
        const { open, messageVariant } = this.state;

        const fileItems = files.map(file => (
            <MenuItem value={file.id}>{file.title}</MenuItem>
        ));

        return (
            <div>
                <h1>Dodawanie nowego współczynnika</h1>
                <Paper style={{marginLeft:'20%',width:'60%'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <TextField
                            id="date"
                            label="Data"
                            value={date}
                            name="date"
                            type="date"
                            onChange={this.onChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <br/>


                        <TextField id="doi" label="DOI"
                                   className={classes.textField} margin="normal" value={doi}
                                   onChange={this.onChange} name="doi"/>

                        <br/>

                        <TextField id="desc" label="Opis"
                                   className={classes.textField} margin="normal" value={desc}
                                   onChange={this.onChange} name="desc"/>

                        <br/>

                        <TextField id="bibtex" label="BibText" //textarea
                                   className={classes.textField} margin="normal" value={bibtex}
                                   onChange={this.onChange} name="bibtex"/>
                        <br/>
                        <br/>
                        <InputLabel htmlFor="file">Plik</InputLabel>
                        <Select
                            value={file}
                            style={{width:'20%'}}
                            onChange={this.onChange}
                            placeholder="Plik"
                            input={<Input name="file" id="file"/>}
                        >
                            {fileItems}
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

export default withStyles(styles)(FactorSourcesform);