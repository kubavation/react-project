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


class FactorNamesForm extends Component {

    constructor(props) {
        super();

        if (props.match.params.id !== null && props.match.params.id !== undefined){
            this.getForEdit(props);
        }
        else {

            this.state = {
                namePl: '',
                nameEn: '',
                descPl: '',
                descEn: '',
                shortcut: '',

                open: false,
                vertical: 'top',
                horizontal: 'center',

                messageVariant: ''
            };

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    getForEdit(props) {
        fetch('http://api.gabryelkamil.pl/factor_name/' + props.match.params.id)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                console.log(res)
                this.setState({
                    namePl: res.factor_name_pl,
                    nameEn: res.factor_name_eng,
                    descPl: res.factor_description_pl,
                    descEn: res.factor_description_eng,
                    id: res.factor_id,
                    shortcut: res.shortcut,
                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: '',
                });
            });
    }


    createFactorName(factorName) {
        console.log(factorName);
        fetch('http://api.gabryelkamil.pl/factor_name', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(factorName)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({open: true, messageVariant: 'success'})
                setTimeout(() =>
                    this.props.history.push('/factors/factornames/list'), 800);
            }
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

        const factorName = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            descPl: this.state.descPl,
            descEn: this.state.descEn,
            shortcut: this.state.shortcut,
        };

        if(this.id != null)
            this.updateFactorName(factorName);
        else
            this.createFactorName(factorName);


    };

    updateFactorName(factorName) {
        console.log(factorName);
        fetch('http://api.gabryelkamil.pl/factor_name/' + this.state.id, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(factorName)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({open: true, messageVariant: 'success'})
                setTimeout(() =>
                    this.props.history.push('/factors/factornames/list'), 800);
            }
        });
    }

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {

        if(this.state != null) {

            const {classes} = this.props;
            const {namePl, nameEn, shortcut, descPl, descEn} = this.state;
            const {open, messageVariant} = this.state;

            return (
                <div>
                    <h1 style={{color: '#CCC', fontSize: 40}}>Dodawanie nowego współczynnika</h1>
                    <Paper style={{marginLeft: '20%', width: '60%', backgroundColor: '#EEE', borderRadius: '25px'}}>
                        <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                            <br/>
                            <TextField id="namePl" label="Nazwa PL" style={{width: '25%'}}
                                       className={classes.textField} margin="normal" value={namePl}
                                       onChange={this.onChange} name="namePl" variant="outlined"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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


                            <TextField id="nameEn" label="Nazwa EN" style={{marginLeft: '9%', width: '25%'}}
                                       className={classes.textField} margin="normal" value={nameEn}
                                       onChange={this.onChange} name="nameEn" variant="outlined"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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
                            <TextField id="shortcut" label="Skrót" style={{width: '30%'}}
                                       className={classes.textField} margin="normal" value={shortcut}
                                       onChange={this.onChange} name="shortcut" variant="outlined"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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

                            <TextField id="descPl" label="Opis PL" style={{width: '60%'}}
                                       className={classes.textField} margin="normal" value={descPl}
                                       onChange={this.onChange} name="descPl" variant="outlined"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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


                            <TextField id="descEn" label="Opis EN" style={{width: '60%'}}
                                       className={classes.textField} margin="normal" value={descEn}
                                       onChange={this.onChange} name="descEn" variant="outlined"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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
                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: "#86C232"}}
                                    variant="contained" color="primary" className={classes.button} type="submit"
                                    onSubmit={this.onSubmit}
                                    size="large">
                                {this.state.id != null ? 'Zmień' : 'Dodaj'}
                            </Button>


                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: "#86C232",
                                marginLeft:'2%'}}
                                    variant="contained" color="primary" className={classes.button}
                                    onClick={() => window.history.go(-1)}
                                    size="large">
                                Anuluj
                            </Button>

                        </form>

                        <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                    </Paper>

                </div>

            )

        }else return null;
    }

}

export default withStyles(styles)(FactorNamesForm);