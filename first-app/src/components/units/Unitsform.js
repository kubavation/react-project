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
        super(props);

        if (props.match.params.id !== null && props.match.params.id !== undefined)
            this.getForEdit(props);
        else {
            this.state = {
                redirect: false,

                namePl: '',
                nameEn: '',
                shortcut: '',
                //quantity: {namePl: '', nameEn: '', shortcut: ''},
                quantity: '',
                quantities: [],
                baseUnit: '',
                ratio: '',

                open: false,
                vertical: 'top',
                horizontal: 'center',

                messageVariant: ''
            };
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleQuantityChange= this.handleQuantityChange.bind(this);
    }

    getForEdit(props) {
        //fetch('http://api.gabryelkamil.pl/get_quantity/' + props.match.params.id)
        fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                this.setState({
                    namePl: res.namePl,
                    nameEn: res.nameEn,
                    shortcut: res.shortcut,
                    quantity: res.quantity.id,
                    quantities: [],
                    baseUnit: res.baseUnit.id,
                    ratio: res.ratio,
                    id: res.id,

                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: ''

                });
            });
    }


    componentDidMount() {
        this.fetchQuantities();
    }

    fetchQuantities() {
        fetch('http://api.gabryelkamil.pl/quantity')
            .then(response => response.json())
            .then(result => {
                this.setState({quantities: result});
            });
    }

    createUnit(unit) {
        console.log(unit);
        const redirect = unit.id != null;
        fetch('http://api.gabryelkamil.pl/unit', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(unit)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({
                    namePl: '',
                    nameEn: '',
                    shortcut: '',
                    quantity: '',
                    baseUnit: '',
                    ratio: '',
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: 'success'
                });

                if (redirect)
                    setTimeout(() =>
                        this.props.history.push('/units/units/list'), 800);
            }
        });
    }


    setBaseUnit(qid) {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(bunit => {
                 this.setState({baseUnit: 'jakas jednostka'}) //remove
                //this.setState({baseUnit: bunit});
            });

        //git

        // fetch('http://api.gabryelkamil.pl/get_quantity/' + qid)
        //     .then(response => response.json())
        //     .then(r => {
        //         fetch('http://api.gabryelkamil.pl/get_base_unit/' + r.baseUnit) //jakie id??
        //             .then(resp => resp.json())
        //             .then(res => {
        //                 this.setState({baseUnit: res.namePl})
        //             })
        //     });
    }

    handleQuantityChange(event) {
        this.setState({quantity: event.target.value});
        this.setBaseUnit(event.target.value); //?
    }


    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onSubmit(event) {
        event.preventDefault();

        let unit;

        if(this.state.id !== undefined && this.state.id !== '') {

            unit = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                shortcut: this.state.shortcut,
                quantity: this.state.quantity,
                //baseUnit: this.state.baseUnit,
                ratio: this.state.ratio,
                id: this.state.id
            };

        } else {

            unit = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                shortcut: this.state.shortcut,
                quantity: this.state.quantity,
                //baseUnit: this.state.baseUnit,
                ratio: this.state.ratio
            }
        }

        // const unit = {
        //     namePl: this.state.namePl,
        //     nameEn: this.state.nameEn,
        //     shortcut: this.state.shortcut,
        //     quantity: this.state.quantity,
        //     baseUnit: this.state.baseUnit,
        //     ratio: this.state.ratio
        // };

        this.createUnit(unit);

    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { namePl,nameEn,shortcut,quantities,baseUnit,ratio,quantity } = this.state;
        const { vertical, horizontal, open, messageVariant } = this.state;

        const quantitiesItems = quantities.map((qnt) => (
            <MenuItem value={qnt.quantity_id}>{qnt.quantity_name_pl}</MenuItem>
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
                                size="large"
                                disabled={this.state.namePl === '' ||
                                this.state.nameEn === '' ||
                                this.state.shortcut === '' ||
                                this.state.quantity === '' ||
                                this.state.ratio === ''}>
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