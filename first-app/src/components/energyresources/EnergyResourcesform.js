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


class EnergyResourcesForm extends Component {

    constructor(props) {
        super(props);

        if (props.match.params.id !== null && props.match.params.id !== undefined) {
            this.getForEdit(props);
        }
        else {
            this.state = {
                redirect: false,
                gus: '',
                gus_all: [],
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
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
    }

    getForEdit(props) {
        console.log(props);
            fetch(process.env.REACT_APP_HOST + '/energy_resource/' + props.match.params.id)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    name: res.resource_name_pl,
                    ncv: res.NCV,
                    co2: res.EQUIV,
                    id: res.id,
                    gus_all: [],
                    gus: res.id_gus,
                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: '',
                    baseUnits:[]
                },()=> this.fetchGus2(res.id_gus));
            });
    }

    componentDidMount() {
        this.fetchGus();
        this.fetchMedium();
        this.fetchUnits();
    }

    fetchGus() {
        fetch(process.env.REACT_APP_HOST + '/gus_category',{
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                    console.log(res);
                    this.setState({gus_all:res})
                }
            );
    }

    fetchGus2(id) {
        fetch(process.env.REACT_APP_HOST + '/gus_category/' + id,{
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                    console.log(res);
                    this.setState({codeGUS:res.gus_id})
                }
            );
    }



    createEnergyResource(esource) {

        const src = {
          resource_name_pl : esource.name,
          gus_id : esource.gus,
          EQUIV : esource.co2,
            NCV: esource.ncv
        };

        console.log(src)

        fetch(process.env.REACT_APP_HOST + '/energy_resource',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(src)
        })
            .then(response => {
                if (response.status != "204")
                    this.setState({open: true, messageVariant: 'error'})
                else {
                    this.setState({open: true, messageVariant: 'success'})
                    setTimeout(() =>
                        this.props.history.push('/energyresources/energyresources/list'), 800);
                }
            });
    }



    updateEnergyResource(esource) {

        const src = {
            resource_name_pl : esource.name,
            gus_id : esource.gus,
            EQUIV : esource.co2,
            NCV: esource.ncv
        };

        console.log(src)

        fetch(process.env.REACT_APP_HOST + '/energy_resource/' + this.state.id,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(src)
        })
            .then(response => {
                if (response.status != "204")
                    this.setState({open: true, messageVariant: 'error'})
                else {
                    this.setState({open: true, messageVariant: 'success'})
                    setTimeout(() =>
                        this.props.history.push('/energyresources/energyresources/list'), 800);
                }
            });
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
          //  mediumGUS: this.state.mediumGUS,
            codeGUS: this.state.codeGUS,
            name: this.state.name,
            co2: this.state.co2,
            unit: this.state.unit,
            ncv: this.state.ncv,
            we: this.state.we,
            gus: this.state.gus
        };

        console.log(energyResource);

        if(this.state.id != null)
            this.updateEnergyResource(energyResource)
        else
            this.createEnergyResource(energyResource);

        // const variant = 'success';  // ? fail?
        //
        // this.setState({mediumGUSergy: '', codeGUS: '',
        // name: '', co2: '', unit: '',ncv: '',we: '',
        //     redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});

    };
    onChange2(event) {
        this.setState({[event.target.name] : event.target.value},() => {
            if(this.state.ncv != null && this.state.co2 != null && this.state.ncv != '' && this.state.co2 != ''
            ){
                this.setState({"we": parseFloat(this.state.co2 / this.state.ncv).toFixed(2)})
            }
            else {
                this.setState({"we": ''})
            }
        });

    };
    onChange3(event) {
        this.setState({[event.target.name] : event.target.value}, ()=>{
            fetch(process.env.REACT_APP_HOST + '/gus_category/' + this.state.gus,{
                method: 'GET',
                headers: {
                    'content-type' : 'application/json'
                }
            })
                .then(response => response.json())
                .then(res => {
                        this.setState({codeGUS:res.gus_id})
                    }
                );
        });
    };

    render() {

        if(this.state != null) {

        const { classes } = this.props;
        const { mediumGUS, gus_all, codeGUS, name, co2, unit,units, ncv, we, gus } = this.state;
        const { open, messageVariant } = this.state;


            let gusItems;
            if(gus_all != null) {
                 gusItems = gus_all.map(g => (
                    <MenuItem value={g.id}>{g.name_pl}</MenuItem>
                ));
            }

            return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Dodawanie nowego współczynnika</h1>
                <Paper style={{marginLeft:'20%',width:'60%',backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/>

                        <InputLabel htmlFor="gus">Nośnik wg GUS</InputLabel>
                        <Select
                            value={gus}
                            style={{width:'20%',marginRight:'8%'}}
                            onChange={this.onChange3}
                            placeholder=""
                            input={<Input name="gus" id="gus"/>}
                        >
                            {gusItems}
                        </Select>

                        <br/>
                        <br/>


                        <TextField id="codeGUS" label="Kod GUS" style={{width:'20%',marginRight:'21%'}}
                                   className={classes.textField} margin="normal" value={codeGUS}
                                   disabled variant="outlined"
                                   onChange={this.onChange} name="codeGUS"
                                   InputLabelProps={{
                                       style: {fontSize: 25},
                                       shrink: true,
                                       classes: {
                                           root: classes.cssLabel,
                                           focused: classes.cssFocused,
                                       },
                                   }}                                   InputProps={{
                                       classes: {
                                           root: classes.cssOutlinedInput,
                                           focused: classes.cssFocused,
                                           notchedOutline: classes.notchedOutline,
                                       }
                                   }}/>

                        <br/>

                        <TextField id="name" label="Nazwa" style={{width:'40%'}}
                                   className={classes.textField} margin="normal" value={name}
                                   variant="outlined"
                                   onChange={this.onChange} name="name"
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

                        <InputLabel htmlFor="co2">Equiv kg CO2/unit</InputLabel>
                        <TextField id="co2" label="Wartość" style={{width:'20%',marginLeft:'2%'}}
                                   className={classes.textField} value={co2}
                                   variant="outlined"
                                   onChange={this.onChange2} name="co2"
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


                        <br/><br/>

                        <InputLabel htmlFor="ncv">NCV [MJ/unit]</InputLabel>
                        <TextField id="ncv" label="Wartość" style={{width:'20%',marginLeft:'2%'}}
                                   className={classes.textField} value={ncv}
                                   variant="outlined"
                                   onChange={this.onChange2} name="ncv"
                                   defaultValue={ncv}
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
                                   }}
                        />

                        <br/><br/>

                        <InputLabel htmlFor="we">WE [kg/unit]</InputLabel>
                        <TextField id="we" label="Wartość" style={{width:'20%',marginLeft:'2%'}}
                                   className={classes.textField} value={we}
                                   disabled="true"
                                   variant="outlined"
                                   onChange={this.onChange} name="we"
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
                        <Button style={{marginBottom: '5%',marginTop:'5%',backgroundColor: "#86C232"}}
                                variant="contained" color="primary" className={classes.button} type="submit" onSubmit={this.onSubmit}
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
        }
        else return null;


    }

}

export default withStyles(styles)(EnergyResourcesForm);