import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createQuantity } from "../../actions/quantitiesActions";
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {Link, Redirect} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        maxWidth: '90%',
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



class Resourcesform extends Component {

    constructor(props) {
        super(props);


        if (props.match.params.id !== null && props.match.params.id !== undefined) {
            this.getForEdit(props);
        }
        else {
            this.state = {
                redirect: false,

                namePl: '',
                nameEn: '',
                descPl: '',
                descEn: '',
                allFactorNames: [], // wszystkie
                factorNames: [], //wybrane
                createdFactor: '', //utworzony
                actualFactorNames: [], //aktualnie dostepne
                units: [],
                unit: '',
                unit2: '',

                open: false,
                vertical: 'top',
                horizontal: 'center',

                messageVariant: ''
            };
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.factorChange = this.factorChange.bind(this);
        this.addFactor = this.addFactor.bind(this);
        this.unitChange = this.unitChange.bind(this);
    }

    getForEdit(props) {
        console.log(props)
        fetch('http://api.gabryelkamil.pl/resource/' + props.match.params.id)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                this.setState({
                    namePl: res.resource_name_pl,
                    nameEn: res.resource_name_eng,
                    descPl: res.resource_description_pl,
                    descEn: res.resource_description_eng,
                    id: res.resource_id,
                    //factorNames: res.factorNames,

                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: ''
                });
            });
    }

    componentDidMount() {
        this.fetchFactorNames();
        this.fetchUnits();
    }

    fetchFactorNames() {
        fetch('http://api.gabryelkamil.pl/factor_name')
       // fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(result => {
                console.log("here")
                console.log(result)
                //result = result.slice(3,7); //pobieranie names //todo remove
                this.setState({allFactorNames: result.slice(),
                    actualFactorNames: result.slice()}, () => console.log(result.slice()));
            });
    }


    fetchUnits() {
        fetch('http://api.gabryelkamil.pl/unit')
        // fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(result => {
                console.log("here2")
                console.log(result)
                //result = result.slice(3,7); //pobieranie names //todo remove
                this.setState({units: result.slice()});
            });
    }

    fetchUnitsById(id) {
        fetch('http://api.gabryelkamil.pl/unit/' + id)
        // fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(result => {
                console.log("here2")
                console.log(result)
                //result = result.slice(3,7); //pobieranie names //todo remove
                this.setState({units: result.slice()});
            });
    }



    createResource(resource) {

        const redirect = resource.id != null;

        console.log(resource);
        let factors = [];
        resource.factorNames.forEach(el => {
           let temp = {
               resourceUnit1: el.unit,
               resourceUnit2: el.unit2,
               uncertainty: el.error,
               factorId: el.factor_id,
               sourceId : 1,
               factor: 10,
               factorUnit: 3
           };
           factors.push(temp);
        });

        let res = {
            resourceNamePl: resource.namePl,
            resourceNameEng: resource.nameEn,
            descriptionPl: resource.descPl,
            descriptionEng: resource.descEn,
            factors: factors
        };

        console.log(res);

        fetch('http://api.gabryelkamil.pl/resource',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(res)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({
                    namePl: '',
                    nameEn: '',
                    descPl: '',
                    descEn: '',
                    factorNames: [],

                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: 'success'
                });

                //if(redirect)
                    setTimeout(() =>
                        this.props.history.push('/resources/resources/list'), 800);
            }
        });

        this.fetchFactorNames();
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };


    factorsById(id) {

        const x =  this.state.allFactorNames.find(f => f.factor_id == id);
        //console.log(x);
        return x;
    }
    unitsById(id) {

        console.log("id " + id)
        console.log(this.state.units);
        const x =  this.state.units.find(f => f.id == id);
        //console.log(x);
        return x;
    }

    addFactor(event) {
        const { factorNames, allFactorNames, actualFactorNames, unit, unit2 } = this.state;

        let createdFactor = this.state.createdFactor;
        console.log(createdFactor)

        // createdFactor = {
        //     factor_id: createdFactor.factor_id,
        //     value: createdFactor.value,
        //     error: createdFactor.error,
        //     unit1: unit,
        //     unit2: unit2
        // }

        console.log(createdFactor)

        factorNames.push(createdFactor);




        const index = actualFactorNames.findIndex(f =>
            f.factor_id == createdFactor.factor_id);

        actualFactorNames.splice(index,1);

        this.setState({factorNames: factorNames, unit2: "", unit: ""});
        this.setState({
            createdFactor: {
                factor_id: "",
                value: "",
                error: "",
                unit: "",
                unit2: "",
            }
        })
    }

    factorChange(event) {

        const target = event.target;
        console.log("XDDDD")

        console.log(target.name + "  " + target.value)

        this.setState(prev => ({
          createdFactor: {
              ...prev.createdFactor,
              [target.name] : target.value
          }
        }));
    };
    unitChange(event) {

        const target = event.target;
        console.log("XDDDD")

        console.log(target.name + "  " + target.value)

        this.setState(prev => ({
            createdFactor: {
                ...prev.createdFactor,
                [target.name] : target.value,

            }
        }));
        this.setState({[event.target.name] : event.target.value});
    };

    isDisabled() {
        return false;
    }

    delete(rowId) {
        //console.log(rowId);
        const { factorNames, actualFactorNames } = this.state;
        const id = this.factorsById(rowId).factor_id;
        const toAdd = this.factorsById(rowId);
        const index = factorNames.findIndex(f =>
            f.factor_id == id);

      //  console.log(toAdd);
        factorNames.splice(index,1);
        actualFactorNames.push(toAdd);

        this.setState({factorNames: factorNames, actualFactorNames: actualFactorNames});
    }

    onSubmit(event) {
        event.preventDefault();

        let resource;
        if(this.state.id !== undefined && this.state.id !== '') {
            resource = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                descPl: this.state.descPl,
                descEn: this.state.descEn,
                factorNames: this.state.factorNames,
                id: this.state.id
            };
        } else {
            resource = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                descPl: this.state.descPl,
                descEn: this.state.descEn,
                factorNames: this.state.factorNames
            };
        }

        this.createResource(resource);
    };

    onChange(event) {
        console.log(event.target.name + "  " + event.target.value)
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const {  namePl, nameEn, descPl, descEn, allFactorNames, factorNames,createdFactor, actualFactorNames, units, unit, unit2 } = this.state;
        const { vertical, horizontal, open, messageVariant } = this.state;


        const factorNamesItems = actualFactorNames.map(name => (
            <MenuItem  value={name.factor_id}>{name.factor_name_pl}</MenuItem>
        ));

        const unitsItems = units.map(u => (
            <MenuItem  value={u.id}>{u.shortcut}</MenuItem>
        ));


        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Wprowadzanie surowca</h1>
                <Paper style={{marginLeft:'10%',width:'80%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/>
                        <TextField id="namePl" label="Nazwa PL" variant="outlined" style={{width:'20%'}}
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

                        <TextField id="nameEn" label="Nazwa EN" variant="outlined" style={{width:'20%',marginLeft:'9%'}}
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

                        <TextField id="descPl" label="Opis PL" variant="outlined" style={{width:'50%'}}
                                   className={classes.textField} margin="normal" value={descPl}
                                   onChange={this.onChange} name="descPl"
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

                        <TextField id="descEn" label="Opis EN" variant="outlined"  style={{width:'50%'}}
                                   className={classes.textField} margin="normal" value={descEn}
                                   onChange={this.onChange} name="descEn"
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

                        <br/>
                        <h2>Współczynniki: </h2>

                        <div style={{width: '100%',overflowX: 'auto'}}>
                            <Table className={classes.table} style={{border:'1px solid black', marginLeft:'5%', marginRight:'5%'}}>
                                <TableHead>
                                    <TableRow style={{border:'1px solid black'}}>
                                        <TableCell align="center" style={{border:'1px solid black',fontSize:'20px'}}>Nazwa</TableCell>
                                        <TableCell align="center" style={{border:'1px solid black',fontSize:'20px'}}>Wartość</TableCell>
                                        <TableCell align="center" style={{border:'1px solid black',fontSize:'20px'}}>Niepewność</TableCell>
                                        <TableCell align="center"style={{border:'1px solid black'}}>  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {factorNames.map(row => (
                                        <TableRow key={row.factor_id} style={{border:'1px solid black'}}>
                                            <TableCell align="center" style={{border:'1px solid black'}}> {this.factorsById(row.factor_id).factor_name_pl}
                                            </TableCell>
                                            <TableCell style={{border:'1px solid black'}}>{row.value}

                                                { row.unit != '' ? this.unitsById(row.unit).shortcut : ''}  /

                                                { row.unit != '' ? this.unitsById(row.unit2).shortcut : ''}


                                            </TableCell>
                                            <TableCell style={{border:'1px solid black'}}>{row.error}</TableCell>
                                            <TableCell style={{border:'1px solid black'}}>
                                                <Button
                                                    variant="contained" style={{backgroundColor: "#86C232"}} 
                                                    size="small"
                                                    color="primary" className={classes.button}
                                                    onClick={() => this.delete(row.factor_id)}>
                                                    Usuń
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow style={{border:'1px solid black'}}>
                                        <TableCell style={{border:'1px solid black'}}>

                                            <InputLabel htmlFor="names">Nazwa</InputLabel>
                                            <Select
                                                value={createdFactor.factor_id}
                                                onChange={this.factorChange}
                                                style={{width:'100px'}}
                                                placeholder="Nazwa"
                                                input={<Input name="factor_id" id="names"/>}
                                            >
                                                {factorNamesItems}
                                            </Select>


                                        </TableCell>
                                        <TableCell style={{border:'1px solid black'}}>

                                            <TextField id="factorvalue" label="Wartość"
                                                       className={classes.textField} style={{width:'200px'}}
                                                       value={createdFactor.value}
                                                       onChange={this.factorChange} name="value"/>

                                        <Select
                                                value={unit}
                                                onChange={this.unitChange}
                                                style={{width:'100px'}}
                                                input={<Input name="unit" id="unit"/>}
                                            >
                                                {unitsItems}
                                            </Select>
                                            /
                                            <Select
                                                value={unit2}
                                                onChange={this.unitChange}
                                                style={{width:'100px'}}
                                                input={<Input name="unit2" id="unit2"/>}
                                            >
                                                {unitsItems}
                                            </Select>


                                        </TableCell>
                                        <TableCell style={{border:'1px solid black'}}>
                                            <TextField id="factorerror" label="Niepewność"
                                                       className={classes.textField} margin="normal" value={createdFactor.error}
                                                       onChange={this.factorChange} name="error"/>

                                        </TableCell>

                                        <TableCell style={{border:'1px solid black'}}>
                                            <Button
                                                variant="contained" style={{backgroundColor: "#86C232"}}
                                                color="primary" className={classes.button} onClick={this.addFactor} size="small">
                                                Dodaj
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                            <br/>


                        <Button style={{marginBottom: '5%',marginTop:'5%',backgroundColor: "#86C232"}}
                                variant="contained" color="primary" className={classes.button} type="submit"
                                size="large"
                                onSubmit={this.onSubmit}>
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

    }

}

export default withStyles(styles)(Resourcesform);