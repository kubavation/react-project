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




class GusForm extends Component {

    constructor(props) {
        super(props);

        if (props.match.params.id !== null && props.match.params.id !== undefined){
            console.log(props);
            this.getForEdit(props);
        }

        else {
            this.state = {
                redirect: false,
                namePl: '',
                nameEn: '',
                baseUnit: '',
                gusId : '',
                baseUnits: [],
                source:'',
                fromForm: props.location.state !== undefined
                    ? props.location.state.fromForm : false,
            };
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


    getForEdit(props) {
        fetch('http://api.gabryelkamil.pl/gus_category/' + props.match.params.id)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                console.log(res)
                this.setState({
                    namePl: res.name_pl,
                    nameEn: res.name_eng,
                    gusId: res.gus_id,
                    source: res.source,
                    unitId: res.unit_id,
                    shortcutUnit: res.shortcut_unit,
                    id: res.id,
                    baseUnit: '',
                    baseUnits: [],
                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: ''
                });
            });
    }

    componentDidMount() {
        this.fetchBaseUnits();
    }

    fetchBaseUnits() {
        fetch('http://api.gabryelkamil.pl/unit')
            .then(response => response.json())
            .then(result => {
                this.setState({baseUnits: result});
            });
    }

    createQuantity(qnt) {

        const qntNew = {
            name_pl: qnt.namePl,
            name_eng: qnt.nameEn,
            unit_id: qnt.baseUnit,
            source: qnt.source,
            gus_id: qnt.gusId
        }

        console.log(qntNew);

        const redirect = qnt.id != null;
        fetch('http://api.gabryelkamil.pl/gus_category',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(qntNew)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({
                    namePl: '',
                    nameEn: '',
                    baseUnit: '',
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: 'success'
                });

                if(redirect)
                    setTimeout(() =>
                        this.props.history.push('/units/quantities/list'), 800);
            }
        });
    }

    updateQuantity(qnt) {
        console.log(qnt);

        const qntNew = {
            name_pl: qnt.namePl,
            name_eng: qnt.nameEn,
            unit_id: qnt.baseUnit,
            source: qnt.source,
            gus_id: qnt.gusId
        }

        console.log(qntNew);

        const redirect = qnt.id != null;
        fetch('http://api.gabryelkamil.pl/gus_category/' + qnt.id,{
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(qntNew)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({
                    namePl: '',
                    nameEn: '',
                    baseUnit: '',
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: 'success'
                });

                if(redirect)
                    setTimeout(() =>
                        this.props.history.push('/units/quantities/list'), 800);
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

        let quantity;

        if(this.state.id !== undefined && this.state.id !== '') {
            quantity = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                id: this.state.id,
                baseUnit: this.state.baseUnit,
                source: this.state.source,
                gusId: this.state.gusId
            };

            this.updateQuantity(quantity)
        } else {

            quantity = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                baseUnit: this.state.baseUnit,
                source: this.state.source,
                gusId: this.state.gusId
            };

            this.createQuantity(quantity);
        }



    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {

        if (this.state != null) {

            const {classes} = this.props;
            const {userId, title, namePl, nameEn, baseUnit,source,gusId } = this.state;
            const {baseUnits} = this.state;
            const {vertical, horizontal, open, messageVariant} = this.state;
            const {fromForm} = this.state;

            let unitsItems;

            if(baseUnits != null) {
                unitsItems = baseUnits.map((unit) => (
                    <MenuItem value={unit.id}>{unit.unit_pl}</MenuItem>
                ));
            }

            return (
                <div>
                    <h1 style={{color: '#CCC', fontSize: 40}}>Wprowadzanie wielkości fiz/chem</h1>
                    <Paper style={{marginLeft: '30%', width: '40%', backgroundColor: '#EEE', borderRadius: '25px'}}>
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

                            <TextField id="source" label="Źródło"
                                       className={classes.textField} margin="normal" value="gus.gov.pl/2019"
                                       onChange={this.onChange} name="source"
                                       variant="outlined"
                                       disabled="true"
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

                            <TextField id="gus_id" label="GUS ID"
                                       className={classes.textField} margin="normal" value={gusId}
                                       onChange={this.onChange} name="gusId"
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
                            <InputLabel style={{marginRight: '2%'}} htmlFor="base-unit">Jednostka bazowa</InputLabel>
                            <Select
                                value={this.state.baseUnit}
                                style={{width: '20%'}}
                                onChange={this.onChange}
                                placeholder="Jednostka"
                                input={<Input name="baseUnit" id="base-unit"/>}
                            >
                                {/*<div id="xd" style={{height:'400px'}} >*/}
                                {unitsItems}
                                {/*</div>*/}
                            </Select>

                            <Button style={{marginLeft: '2%', color: "#86C232"}} color="primary"
                                    className={classes.button} component={Link}
                                    to={{pathname: '/units/units/create', state: {fromForm: true}}}>
                                Dodaj
                            </Button>
                            <br/>


                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: "#86C232"}}
                                    variant="contained" color="primary" className={classes.button} type="submit"
                                    onSubmit={this.onSubmit}
                                    size="large"
                                    disabled={  this.state.namePl === '' ||
                                    this.state.nameEn === '' ||
                                    this.state.baseUnit === '' }
                            >
                                Dodaj
                            </Button>


                            {fromForm ? <Button style={{marginLeft: '5%', backgroundColor: "#86C232"}}
                                                variant="contained" className={classes.button} color="primary"
                                                component={Link}
                                                size="large"
                                                to={'/units/units/create'}>Powrót</Button> : ""}


                        </form>

                        <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                    </Paper>

                </div>

            )

        } else return null;

    }
}

// QuantitiesForm.propTypes = {
//   createQuantity: PropTypes.func.isRequired
// };
//

// export default connect(null, {createQuantity})(withStyles(styles)(QuantitiesForm));

export default withStyles(styles)(GusForm);