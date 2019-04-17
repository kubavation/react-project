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


class EnergyResourcesForm extends Component {

    constructor(props) {
        super();

        this.state = {
            mediumGUS: '',
            allMediumGUS: [],
            codeGUS: '',
            name: '',
            co2: '',
            units: [],
            unit: '',
            ncv: '',
            we: '',

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
        this.fetchMedium();
        this.fetchUnits();
    }

    createFactorSource(factorSource) {

        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(factorSource)
        })
            /*.then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );*/
    }

    fetchMedium() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(res => {
                res = res.slice(3,8);   //remove
                this.setState({allMediumGUS: res});
            });
    }

    fetchUnits() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(res => {
                res = res.slice(3,8);   //remove
                this.setState({units: res});
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

        const energyResource = {
            mediumGUS: this.state.mediumGUS,
            codeGUS: this.state.codeGUS,
            name: this.state.name,
            co2: this.state.co2,
            unit: this.state.unit,
            ncv: this.state.ncv,
            we: this.state.we
        };

        this.createEnergyResource(energyResource);

        const variant = 'success';  // ? fail?

        this.setState({enmediumGUSergy: '', codeGUS: '',
        name: '', co2: '', unit: '',ncv: '',we: '',
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const { mediumGUS, allMediumGUS, codeGUS, name, co2, unit,units, ncv, we } = this.state;
        const { open, messageVariant } = this.state;

        const mediumItems = allMediumGUS.map(med => (
            <MenuItem value={med.id}>{med.title}</MenuItem>
        ));

        const unitItems = units.map(unit => (
            <MenuItem value={unit.id}>{unit.title}</MenuItem>
        ));

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Dodawanie nowego współczynnika</h1>
                <Paper style={{marginLeft:'20%',width:'60%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/>

                        <InputLabel htmlFor="medium">Nośnik wg GUS</InputLabel>
                        <Select
                            value={mediumGUS}
                            style={{width:'20%',marginRight:'8%'}}
                            onChange={this.onChange}
                            placeholder=""
                            input={<Input name="medium" id="medium"/>}
                        >
                            {mediumItems}
                        </Select> 

                        <br/>
                        <br/>


                        <TextField id="codeGUS" label="Kod GUS" style={{width:'20%',marginRight:'21%'}}
                                   className={classes.textField} margin="normal" value={codeGUS}
                                   disabled variant="outlined"
                                   onChange={this.onChange} name="codeGUS"/>

                        <br/>

                        <TextField id="name" label="Nazwa" style={{width:'40%'}}
                                   className={classes.textField} margin="normal" value={name}
                                   variant="outlined"
                                   onChange={this.onChange} name="name"/>

                        <br/>
                        <br/>

                        <InputLabel htmlFor="co2">Equiv kg CO2/unit</InputLabel>
                        <TextField id="co2" label="Wartość" style={{width:'20%',marginLeft:'2%'}}
                                   className={classes.textField} value={co2}
                                   variant="outlined"
                                   onChange={this.onChange} name="co2"/>

                        <Select
                            value={mediumGUS}
                            style={{width:'20%',marginLeft:'2%'}}
                            onChange={this.onChange}
                            placeholder=""
                            input={<Input name="unit" id="unit"/>}
                        >
                            {unitItems}
                        </Select> 

                        <br/><br/>

                        <InputLabel htmlFor="ncv">NCV [MJ/kg]</InputLabel>
                        <TextField id="ncv" label="Wartość" style={{width:'20%',marginLeft:'2%'}}
                                   className={classes.textField} value={ncv}
                                   variant="outlined"
                                   onChange={this.onChange} name="ncv"/>

                        <br/><br/>

                        <InputLabel htmlFor="we">WE [kg/GJ]</InputLabel>
                        <TextField id="we" label="Wartość" style={{width:'20%',marginLeft:'2%'}}
                                   className={classes.textField} value={we}
                                   variant="outlined"
                                   onChange={this.onChange} name="we"/>
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

export default withStyles(styles)(EnergyResourcesForm);