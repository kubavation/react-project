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
import Icon from '@material-ui/core/Icon';

import SnackBarForm from '../view/Snackbarform'
import Snackbar from '@material-ui/core/Snackbar';
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

class QuantitiesForm extends Component {

    constructor(props) {
        super();

        this.state = {
            userId: '',
            title: '',
            redirect: false,

            namePl: '',
            nameEn: '',
            baseUnit: '',
            baseUnits: [],
            fromForm: props.location.state !== undefined
                ? props.location.state.fromForm : false,

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
        this.fetchBaseUnits();
    }

    fetchBaseUnits() {
        fetch('http://api.gabryelkamil.pl/get_base_unit')
            .then(response => response.json())
            .then(result => {
                //result = result.slice(3,8);
                result = result.map(t => t.unit);
                console.log(result);
                this.setState({baseUnits: result});
            });
    }

    createQuantity(qnt) {
        console.log(qnt);
        fetch('http://api.gabryelkamil.pl/quantity',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(qnt)
        })
            /*.then(response => response.json())
            .then(qnt => {
                console.log(qnt)
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

        const quantity = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            id: Math.floor(Math.random()*1000)
        };

        this.createQuantity(quantity);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            namePl: '', nameEn: '', baseUnit: '',redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
       this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { userId, title , namePl, nameEn } = this.state;
        const { baseUnits } = this.state;
        const { vertical, horizontal, open, messageVariant } = this.state;
        const { fromForm } = this.state;

        const unitsItems = baseUnits.map((unit) => (
            <MenuItem value={unit}>{unit}</MenuItem>
        ));

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Wprowadzanie wielkości fiz/chem</h1>
                <Paper style={{marginLeft:'30%',width:'40%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                    <br/>
                    <br/>
                    <TextField id="namePl" label="Nazwa PL"
                               className={classes.textField} margin="normal" value={namePl}
                               onChange={this.onChange} name="namePl"
                               variant="outlined"
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
                               }}

                    />

                    <TextField id="nameEng" label="Nazwa EN"
                               className={classes.textField} margin="normal" value={nameEn}
                               onChange={this.onChange} name="nameEn"
                               variant="outlined"
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
                               }}
                    />
                    <br/>
                    <br/>

                    <br/>
                    <InputLabel style={{marginRight:'2%'}}htmlFor="base-unit">Jednostka bazowa</InputLabel>
                    <Select
                        value={this.state.baseUnit}
                        style={{width:'20%'}}
                        onChange={this.onChange}
                        placeholder="Jednostka bazowa"
                        input={<Input name="baseUnit" id="base-unit"/>}
                    >
                        {unitsItems}
                    </Select>

                    <Button style={{marginLeft: '2%',color: "#86C232"}} color="primary" className={classes.button} component={Link}
                            to={{pathname: '/units/baseunits/create', state: {fromForm: true}}}>
                        Dodaj
                    </Button>
                    <br/>


                    <Button style={{marginBottom: '5%',marginTop:'5%',backgroundColor: "#86C232"}}
                        variant="contained" color="primary" className={classes.button} type="submit" onSubmit={this.onSubmit}
                        size="large"
                      >
                        Dodaj
                    </Button>


                    { fromForm ? <Button style={{marginLeft: '5%',backgroundColor: "#86C232"}}
                                         variant="contained" className={classes.button} color="primary"
                                         component={Link}
                                         size="large"
                                         to={'/units/units/create'}>Powrót</Button> : ""}





                </form>

                    <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                </Paper>

            </div>

        )

    }

}

// QuantitiesForm.propTypes = {
//   createQuantity: PropTypes.func.isRequired
// };
//

// export default connect(null, {createQuantity})(withStyles(styles)(QuantitiesForm));

export default withStyles(styles)(QuantitiesForm);