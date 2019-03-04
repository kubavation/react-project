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
        minWidth: 700,
    }
});



class Resourcesform extends Component {

    constructor(props) {
        super();

        this.state = {
            userId: '',
            title: '',
            redirect: false,

            namePl: '',
            nameEn: '',
            descPl: '',
            descEn: '',
            allFactorNames: [], // wszystkie
            factorNames: [], //wybrane
            createdFactor: '', //utworzony
            actualFactorNames: [], //aktualnie dostepne


            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.factorChange = this.factorChange.bind(this);
        this.addFactor = this.addFactor.bind(this);
    }

    componentDidMount() {
        this.fetchFactorNames();
    }

    fetchFactorNames() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(result => {
                result = result.slice(3,7); //pobieranie names
                this.setState({allFactorNames: result.slice(),
                    actualFactorNames: result.slice()});
            });
    }

    createResource(resource) {

        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(resource)
        })
            .then(response => response.json())
            .then(res => {
                    //console.log(res);
                }
            );

        this.fetchFactorNames();
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };


    factorsById(id) {

        const x =  this.state.allFactorNames.find(f => f.id == id);
        //console.log(x);
        return x;
    }

    addFactor(event) {
        const { factorNames, createdFactor, allFactorNames, actualFactorNames } = this.state;
        factorNames.push(createdFactor);


        const index = actualFactorNames.findIndex(f =>
            f.id == createdFactor.factorId);

        actualFactorNames.splice(index,1);

        this.setState({factorNames: factorNames});
        this.setState({
            createdFactor: {
                factorId: "",
                value: "",
                error: ""
            }
        })
    }

    factorChange(event) {

        const target = event.target;

        this.setState(prev => ({
          createdFactor: {
              ...prev.createdFactor,
              [target.name] : target.value
          }
        }));
    };

    isDisabled() {
        return false;
    }

    delete(rowId) {
        //console.log(rowId);
        const { factorNames, actualFactorNames } = this.state;
        const id = this.factorsById(rowId).id;
        const toAdd = this.factorsById(rowId);
        const index = factorNames.findIndex(f =>
            f.factorId == id);

      //  console.log(toAdd);
        factorNames.splice(index,1);
        actualFactorNames.push(toAdd);

        this.setState({factorNames: factorNames, actualFactorNames: actualFactorNames});
    }

    onSubmit(event) {
        event.preventDefault();

        const resource = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            descPl: this.state.descPl,
            descEn: this.state.descEn,
            factorNames: this.state.factorNames
        };

        this.createResource(resource);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            namePl: '', nameEn: '', descPl: '', descEn: '', factorNames: [],
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const { classes } = this.props;
        const {  namePl, nameEn, descPl, descEn, allFactorNames, factorNames,createdFactor, actualFactorNames } = this.state;
        const { vertical, horizontal, open, messageVariant } = this.state;


        const factorNamesItems = actualFactorNames.map(name => (
            <MenuItem value={name.id}>{name.title}</MenuItem>
        ));

        return (
            <div>
                <h1>Wprowadzanie surowca</h1>
                <Paper style={{marginLeft:'20%',width:'60%'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <TextField id="namePl" label="Nazwa PL"
                                   className={classes.textField} margin="normal" value={namePl}
                                   onChange={this.onChange} name="namePl"/>

                        <TextField id="nameEn" label="Nazwa EN"
                                   className={classes.textField} margin="normal" value={nameEn}
                                   onChange={this.onChange} name="nameEn"/>
                        <br/>

                        <TextField id="descPl" label="Opis PL"
                                   className={classes.textField} margin="normal" value={descPl}
                                   onChange={this.onChange} name="descPl"/>

                        <br/>

                        <TextField id="descEn" label="Opis EN"
                                   className={classes.textField} margin="normal" value={descEn}
                                   onChange={this.onChange} name="descEn"/>

                        <br/>

                        <br/>
                        <h3>Współczynniki: </h3>

                        <div style={{width: '100%',overflowX: 'auto'}}>
                            <Table className={classes.table} style={{border:'1px solid black'}}>
                                <TableHead>
                                    <TableRow style={{border:'1px solid black'}}>
                                        <TableCell style={{border:'1px solid black'}}>Nazwa</TableCell>
                                        <TableCell style={{border:'1px solid black'}}>Wartość</TableCell>
                                        <TableCell style={{border:'1px solid black'}}>Niepewność</TableCell>
                                        <TableCell style={{border:'1px solid black'}}>  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {factorNames.map(row => (
                                        <TableRow key={row.factorId} style={{border:'1px solid black'}}>
                                            <TableCell style={{border:'1px solid black'}}> {this.factorsById(row.factorId).title}</TableCell>
                                            <TableCell style={{border:'1px solid black'}}>{row.value}</TableCell>
                                            <TableCell style={{border:'1px solid black'}}>{row.error}</TableCell>
                                            <TableCell style={{border:'1px solid black'}}>
                                                <Button
                                                    variant="contained"
                                                    color="primary" className={classes.button}
                                                    onClick={() => this.delete(row.factorId)}>
                                                    Usuń 
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow style={{border:'1px solid black'}}>
                                        <TableCell style={{border:'1px solid black'}}>

                                            <InputLabel htmlFor="names">Nazwa</InputLabel>
                                            <Select
                                                value={createdFactor.factorId}
                                                onChange={this.factorChange}
                                                style={{width:'100px'}}
                                                placeholder="Nazwa"
                                                input={<Input name="factorId" id="names"/>}
                                            >
                                                {factorNamesItems}
                                            </Select>


                                        </TableCell>
                                        <TableCell style={{border:'1px solid black'}}>
                                            <TextField id="factorvalue" label="Wartość"
                                                       className={classes.textField} margin="normal" value={createdFactor.value}
                                                       onChange={this.factorChange} name="value"/>
                                        </TableCell>
                                        <TableCell style={{border:'1px solid black'}}>
                                            <TextField id="factorerror" label="Niepewność"
                                                       className={classes.textField} margin="normal" value={createdFactor.error}
                                                       onChange={this.factorChange} name="error"/>

                                        </TableCell>

                                        <TableCell style={{border:'1px solid black'}}>
                                            <Button
                                                variant="contained"
                                                color="primary" className={classes.button} onClick={this.addFactor}>
                                                Dodaj
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                            <br/>


                        <Button style={{marginBottom: '5%',marginTop:'5%'}}
                                variant="contained" color="primary" className={classes.button} type="submit"
                                onSubmit={this.onSubmit}>
                            Dodaj
                        </Button>


                    </form>

                    <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                </Paper>

            </div>

        )

    }

}

export default withStyles(styles)(Resourcesform);