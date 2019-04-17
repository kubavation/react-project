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


class FactorNamesForm extends Component {

    constructor(props) {
        super();

        this.state = {
            namePl: '',
            nameEn: '',
            descPl: '',
            descEn: '',

            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    createFactorName(factorName) {
        console.log(factorName);
        fetch('http://api.gabryelkamil.pl/factor_name',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(factorName)
        })
            /*.then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );*/
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onSubmit(event) {
        event.preventDefault();

        const factorName = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            descPl: this.state.descPl,
            descEn: this.state.descEn,
        };

        this.createFactorName(factorName);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            namePl: '', nameEn: '', descPl: '',descEn: '',
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { namePl, nameEn, descPl, descEn } = this.state;
        const { open, messageVariant } = this.state;

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Dodawanie nowego współczynnika</h1>
                <Paper style={{marginLeft:'20%',width:'60%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/>
                        <TextField id="namePl" label="Nazwa PL" style={{width:'25%'}}
                                   className={classes.textField} margin="normal" value={namePl}
                                   onChange={this.onChange} name="namePl" variant="outlined"/>


                        <TextField id="nameEn" label="Nazwa EN" style={{marginLeft:'9%',width:'25%'}}
                                   className={classes.textField} margin="normal" value={nameEn}
                                   onChange={this.onChange} name="nameEn" variant="outlined"/>

                        <br/>
                        <br/>

                        <TextField id="descPl" label="Opis PL" style={{width:'60%'}}
                                   className={classes.textField} margin="normal" value={descPl}
                                   onChange={this.onChange} name="descPl" variant="outlined"/>
                        <br/>


                        <TextField id="descEn" label="Opis EN" style={{width:'60%'}}
                                   className={classes.textField} margin="normal" value={descEn}
                                   onChange={this.onChange} name="descEn" variant="outlined"/>

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

export default withStyles(styles)(FactorNamesForm);