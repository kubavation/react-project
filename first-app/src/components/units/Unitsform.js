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

class Unitsform extends Component {

    constructor(props) {
        super();

        this.state = {
            userId: '',
            title: '',
            redirect: false,
            //remove


            namePl: '',
            nameEn: '',
            shortcut: '',
            quantity: {namePl: '', nameEn: '', shortcut: ''},
            quantities: [],
            baseUnit: '',
            ratio: '',

            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleQuantityChange= this.handleQuantityChange.bind(this);
    }

    componentDidMount() {
        this.fetchQuantities();
    }

    fetchQuantities() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(result => {
                result = result.slice(3,8); // remove
                this.setState({quantities: result});
            });
    }

    createUnit(unit) {
        console.log(unit);
        fetch('http://api.gabryelkamil.pl/unit',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(unit)
        })
            /*.then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );*/
    }


    setBaseUnit() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(bunit => {
                 this.setState({baseUnit: 'jakas jednostka'}) //remove
                //this.setState({baseUnit: bunit});
            });
    }

    handleQuantityChange(event) {
        this.setState({quantity: event.target.value});
        this.setBaseUnit();
    }


    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onSubmit(event) {
        event.preventDefault();

        const unit = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            shortcut: this.state.shortcut,
            quantity: this.state.quantity,
            baseUnit: this.state.baseUnit,
            ratio: this.state.ratio
        };

        this.createUnit(unit);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '', // remove
            namePl: '', nameEn: '', shortcut: '',quantity: '', baseUnit: '',
            ratio: '', redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { namePl,nameEn,shortcut,quantities,baseUnit,ratio,quantity } = this.state;
        const { vertical, horizontal, open, messageVariant } = this.state;

        const quantitiesItems = quantities.map((qnt) => (
            <MenuItem value={qnt.id}>{qnt.title}</MenuItem>
        ));

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Wprowadzanie jednostki</h1>
                <Paper style={{marginLeft:'20%',width:'60%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/><br/>
                        <TextField id="namePl" label="Nazwa PL" variant="outlined"
                                   className={classes.textField} margin="normal" value={namePl}
                                   onChange={this.onChange} name="namePl"/>

                        <TextField id="nameEng" label="Nazwa EN" variant="outlined"
                                   className={classes.textField} margin="normal" value={nameEn}
                                   onChange={this.onChange} name="nameEn"/>
                        <br/>

                        <TextField id="shortcut" label="Skrót" variant="outlined"
                                   className={classes.textField} margin="normal" value={shortcut}
                                   onChange={this.onChange} name="shortcut"/>
                        <br/>


                        <br/>
                        <InputLabel htmlFor="quantity">Wielkość fiz/chem</InputLabel>
                        <Select
                            value={this.state.quantity}
                            style={{width:'20%'}}
                            onChange={this.handleQuantityChange}
                            placeholder="Wielkość fiz/chem"
                            input={<Input name="quantity" id="quantity"/>}
                        >
                            {quantitiesItems}
                        </Select>


                        <Button style={{marginLeft: '2%',color:'#86C232'}}  className={classes.button} component={Link}
                                to={{pathname: '/units/quantities/create', state: {fromForm: true}}}>
                            Dodaj
                        </Button>

                        <br/>

                        <TextField id="baseUnit" label="Jednostka bazowa" variant="outlined"
                                   className={classes.textField} margin="normal" disabled value={baseUnit}
                                   onChange={this.onChange} name="baseUnit"/>

                        <TextField id="ratio" label="Przelicznik" variant="outlined"
                                   className={classes.textField} margin="normal" value={ratio}
                                   onChange={this.onChange} name="ratio"/>
                        <br/>

                        <br/>


                        <Button style={{marginBottom: '5%',marginTop:'5%', backgroundColor: "#86C232"}}
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


export default withStyles(styles)(Unitsform);