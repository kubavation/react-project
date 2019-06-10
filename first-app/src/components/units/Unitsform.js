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

class Unitsform extends Component {

    constructor(props) {
        super(props);

        if (props.match.params.id != null && props.match.params.id != undefined) {
            console.log(props.match.params)
            this.getForEdit(props.match.params.id);
        }
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

    getForEdit(xd) {
        console.log(xd)
        fetch(process.env.REACT_APP_HOST + '/unit/' + xd)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                res = res[0];
                console.log(res);
                this.setState({
                    namePl: res.unit_pl,
                    nameEn: res.unit_eng,
                    shortcut: res.shortcut,
                    //quantity: res.quantity.id,
                    quantity: res.id_quantity,//res.quantity_name,
                    quantities: [],
                    //baseUnit: res.baseUnit.id,
                    ratio: res.ratio,
                    id: res.id,

                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: ''

                }, () => this.setBaseUnit(res.id_quantity));
            });
    }


    componentDidMount() {
        this.fetchQuantities();
    }

    fetchQuantities() {
        fetch(process.env.REACT_APP_HOST + '/quantity')
            .then(response => response.json())
            .then(result => {
                this.setState({quantities: result});
            });
    }

    createUnit(unit) {
        console.log(unit);
        const redirect = unit.id != null;
        fetch(process.env.REACT_APP_HOST + '/unit', {
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

                    setTimeout(() =>
                        this.props.history.push('/units/units/list'), 800);
            }
        });
    }

    updateUnit(unit) {
        console.log(unit);
        const redirect = unit.id != null;
        fetch(process.env.REACT_APP_HOST + '/unit/' + this.state.id, {
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

             //   if (redirect)
                    setTimeout(() =>
                        this.props.history.push('/units/units/list'), 800);
            }
        });
    }


    setBaseUnit(qid) {
        fetch(process.env.REACT_APP_HOST + '/quantity/' + qid)
            .then(response => response.json())
            .then(bunit => {
                console.log(bunit)
                 this.setState({baseUnit: bunit.base_unit})
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
               // id: this.state.id
            };

            this.updateUnit(unit);


        } else {

            unit = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                shortcut: this.state.shortcut,
                quantity: this.state.quantity,
                //baseUnit: this.state.baseUnit,
                ratio: this.state.ratio
            }

            this.createUnit(unit);

        }

        // const unit = {
        //     namePl: this.state.namePl,
        //     nameEn: this.state.nameEn,
        //     shortcut: this.state.shortcut,
        //     quantity: this.state.quantity,
        //     baseUnit: this.state.baseUnit,
        //     ratio: this.state.ratio
        // };


    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        const {classes} = this.props;

        if (this.state != null) {
            const {namePl, nameEn, shortcut, quantities, baseUnit, ratio, quantity} = this.state;
            const {vertical, horizontal, open, messageVariant} = this.state;

            const quantitiesItems = quantities.map((qnt) => (
                <MenuItem value={qnt.quantity_id}>{qnt.quantity_name_pl}</MenuItem>
            ));

            return (
                <div>
                    <h1 style={{color: '#CCC', fontSize: 40}}>Wprowadzanie jednostki</h1>
                    <Paper style={{marginLeft: '20%', width: '60%', backgroundColor: '#EEE', borderRadius: '25px'}}>
                        <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                            <br/><br/>
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


                            <br/>
                            <InputLabel htmlFor="quantity">Wielkość fiz/chem</InputLabel>
                            <Select
                                value={this.state.quantity}
                                style={{width: '20%'}}
                                onChange={this.handleQuantityChange}
                                placeholder="Wielkość fiz/chem"
                                input={<Input name="quantity" id="quantity"/>}
                            >
                                {quantitiesItems}
                            </Select>


                            <Button style={{marginLeft: '2%', color: '#86C232'}} className={classes.button}
                                    component={Link}
                                    to={{pathname: '/units/quantities/create', state: {fromForm: true}}}>
                                Dodaj
                            </Button>

                            <br/>
                            <br/>

                            <TextField id="baseUnit" label="Jednostka bazowa" variant="outlined"
                                       className={classes.textField} margin="normal" disabled value={baseUnit}
                                       onChange={this.onChange} name="baseUnit"
                                       InputLabelProps={{
                                           style: {fontSize: 22},
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

                            <TextField id="ratio" label="Przelicznik" variant="outlined"
                                       className={classes.textField} margin="normal" value={ratio}
                                       onChange={this.onChange} name="ratio"
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


                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: "#86C232"}}
                                    variant="contained" color="primary" className={classes.button} type="submit"
                                    onSubmit={this.onSubmit}
                                    size="large"
                                    disabled={this.state.namePl === '' ||
                                    this.state.nameEn === '' ||
                                    this.state.shortcut === '' ||
                                    this.state.quantity === '' ||
                                    this.state.ratio === ''}>
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
        return null;
    }

}


export default withStyles(styles)(Unitsform);