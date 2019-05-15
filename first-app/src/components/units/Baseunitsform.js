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



class BaseunitsForm extends Component {

    constructor(props) {
        super(props);

        if (props.match.params.id !== null && props.match.params.id !== undefined) {
            console.log(props);
            this.getForEdit(props);
        }
        else {
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
         }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
        
    getForEdit(props) {
        console.log(props)
        fetch('http://api.gabryelkamil.pl/unit/' + props.match.params.id)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                res = res[0];
                console.log(res)
                this.setState({
                    namePl: res.unit_pl,
                    nameEn: res.unit_eng,
                    shortcut: res.shortcut,
                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: '',
                    fromForm: props.location.state !== undefined
                        ? props.location.state.fromForm : false,
                    id: res.id
                });
            });

    }


    onSubmit(event) {
        event.preventDefault();

        let baseUnit;

        if(this.state.id !== undefined && this.state.id !== '') {
            baseUnit = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                shortcut: this.state.shortcut,
                id: this.state.id
            };

            this.updateBaseUnit(baseUnit);
        } else {

            baseUnit = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                shortcut: this.state.shortcut
            };


            this.createBaseUnit(baseUnit);
        }

        // const baseUnit = {
        //     namePl: this.state.namePl,
        //     nameEn: this.state.nameEn,
        //     shortcut: this.state.shortcut
        // };

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

        const redirect = unit.id != null;

        console.log(unit);
        fetch('http://api.gabryelkamil.pl/base_unit',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(unit)
        }).then(response => {
           if(response.status != "204")
               this.setState({open: true, messageVariant: 'error'})
            else {
               this.setState({namePl: '', nameEn: '', shortcut: '', open: true, messageVariant: 'success'})

             //  if(redirect)
               setTimeout(() =>
                   this.props.history.push('/units/baseunits/list'), 800);
           }
        });
    }



    updateBaseUnit(unit) {

        const redirect = unit.id != null;

        console.log(unit);
        fetch('http://api.gabryelkamil.pl/base_unit/' + this.state.id,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(unit)
        }).then(response => {
            if(response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({namePl: '', nameEn: '', shortcut: '', open: true, messageVariant: 'success'})

                //if(redirect)
                    setTimeout(() =>
                        this.props.history.push('/units/baseunits/list'), 800);
            }
        });
    }

     render() {

         if (this.state != null) {

             const {classes} = this.props;
             const {namePl, nameEn, shortcut, open, messageVariant, id} = this.state;
             const {fromForm} = this.state;

             return (
                 <div>

                     <h1 style={{color: '#CCC', fontSize: 40}}>Wprowadzanie jednostki bazowej</h1>
                     <Paper style={{marginLeft: '30%', width: '40%', backgroundColor: '#EEE', borderRadius: '25px'}}>
                         <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                             <br/>
                             <br/>
                             <TextField id="namePl" label="Nazwa PL" variant="outlined"
                                        className={classes.textField} margin="normal" value={namePl}
                                        onChange={this.onChange} name="namePl"
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

                             <TextField id="nameEng" label="Nazwa EN" variant="outlined"
                                        className={classes.textField} margin="normal" value={nameEn}
                                        onChange={this.onChange} name="nameEn"
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

                             <TextField id="shortcut" label="Skrót" variant="outlined"
                                        className={classes.textField} margin="normal" value={shortcut}
                                        onChange={this.onChange} name="shortcut"
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
                                     size="large"
                                     disabled={  this.state.namePl === '' ||
                                                 this.state.nameEn === '' ||
                                                 this.state.shortcut === '' }
                                    >
                                 Dodaj
                             </Button>


                             {fromForm ? <Button style={{marginLeft: '5%', backgroundColor: "#86C232"}}
                                                 variant="contained" color="primary" className={classes.button}
                                                 component={Link} size="large"

                                                 to={'/units/quantities/create'}>Powrót</Button> : ""}


                         </form>

                         <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                     </Paper>

                 </div>


             );
         }
         else
             return null;
     }

}

export default withStyles(styles)(BaseunitsForm);