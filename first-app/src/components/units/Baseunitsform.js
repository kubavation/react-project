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

import SnackbarFormWrapper from '../view/Snackbarformwrapper'


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



class BaseunitsForm extends Component {

    constructor(props) {
        super();
        console.log(props.location.state);
        this.state = {

            namePl: '',
            nameEn: '',
            shortcut: '',

            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: '',
            fromForm: props.location.state !== undefined
                    ? props.location.state.fromForm : false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);

      //  console.log(props.location.state.fromForm);
    }


    componentWillReceiveProps(props) {
        console.log(props);
    }

    onSubmit(event) {
        event.preventDefault();

        const baseUnit = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            shortcut: this.state.short
        };

        this.createBaseUnit(baseUnit);

        const variant = 'success';  // ? fail?

        //if success
        this.setState({namePl: '', nameEn: '', shortcut: '', open: true, messageVariant: variant})
        //this.setState({userId: '', title: '', redirect: true, open: true, messageVariant: variant});
    };

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    createBaseUnit(unit) {
        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(unit)
        })
            .then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );
    }


    render() {

        const { classes } = this.props;
        const { namePl, nameEn, shortcut, open, messageVariant } = this.state;
        const { fromForm } = this.state;

        return (
            <div>
                <h1>Wprowadzanie jednostki bazowej</h1>
                <Paper style={{marginLeft:'20%',width:'60%'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <TextField id="namePl" label="Nazwa PL"
                                   className={classes.textField} margin="normal" value={namePl}
                                   onChange={this.onChange} name="namePl"/>

                        <TextField id="nameEng" label="Nazwa EN"
                                   className={classes.textField} margin="normal" value={nameEn}
                                   onChange={this.onChange} name="nameEn"/>
                        <br/>

                        <TextField id="shortcut" label="Skrót"
                                   className={classes.textField} margin="normal" value={shortcut}
                                   onChange={this.onChange} name="shortcut"/>

                        <br/>

                        <Button style={{marginBottom: '5%',marginTop:'5%'}}
                                variant="contained" color="primary" className={classes.button} type="submit" onSubmit={this.onSubmit}>
                            Dodaj
                        </Button>


                        { fromForm ? <Button style={{marginLeft: '5%'}}
                            variant="contained" color="primary" className={classes.button}
                             component={Link}
                             to={'/units/quantities/create'}>Powrót</Button> : ""}


                    </form>

                    <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                </Paper>

            </div>


        );
    }

}

export default withStyles(styles)(BaseunitsForm);