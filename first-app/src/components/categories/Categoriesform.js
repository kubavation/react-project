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
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

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
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Categoriesform extends Component {

    constructor(props) {
        super(props);

        console.log(props.match.params);

        if (props.match.params.id !== null && props.match.params.id !== undefined)
            this.getForEdit(props);
        else {
            this.state = {
                namePl: '',
                nameEn: '',
                descPl: '',
                descEn: '',
                parentCategories: [],

                categories: [],

                open: false,
                vertical: 'top',
                horizontal: 'center',

                messageVariant: ''
            };
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    getForEdit(props) {
        console.log(props.match.params.id)
        fetch('http://api.gabryelkamil.pl/category/' + props.match.params.id)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                console.log(res)
                this.setState({
                    namePl: res.cat_name_pl, //todo zmiany jsonow
                    nameEn: res.cat_name_eng,
                    descPl: res.cat_description_pl,
                    descEn: res.cat_description_eng,
                    id: res.cat_id,
                    //todo change parentCategories: res.parentCategories,
                    parentCategories: [],
                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: ''
                });
            });


        console.log(this.state)
    }


    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        fetch('http://api.gabryelkamil.pl/category')
            .then(response => response.json())
            .then(categories => {
                //categories = categories.slice(3,8);   //remove
                this.setState({categories: categories});
            });
    }

    createCategory(category) {
        console.log(category);
        const redirect = category.id != null;

        fetch('http://api.gabryelkamil.pl/category',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(category)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({
                    namePl: '',
                    nameEn: '',
                    descPl: '',
                    descEn: '',
                    parentCategories: [],
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: 'success'
                });


              //  if (redirect)
                    setTimeout(() =>
                        this.props.history.push('/categories/categories/list'), 800);
            }
        });
    }

    updateCategory(category) {
        console.log(category);
        const redirect = category.id != null;

        fetch('http://api.gabryelkamil.pl/category/' + this.state.id,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(category)
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({
                    namePl: '',
                    nameEn: '',
                    descPl: '',
                    descEn: '',
                    parentCategories: [],
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: 'success'
                });


              //  if (redirect)
                    setTimeout(() =>
                        this.props.history.push('/categories/categories/list'), 800);
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

        let category;

        if(this.state.id !== undefined && this.state.id !== '') {
            category = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                descPl: this.state.descPl,
                descEn: this.state.descEn,
                parentCategories: this.state.parentCategories,
              //  id: this.state.id
            };

            this.updateCategory(category);

        } else {
            category = {
                namePl: this.state.namePl,
                nameEn: this.state.nameEn,
                descPl: this.state.descPl,
                descEn: this.state.descEn,
                parentCategories: this.state.parentCategories
            };


            this.createCategory(category);
        }


        // const variant = 'success';  // ? fail?
        //
        // this.setState({userId: '', title: '',
        //     namePl: '', nameEn: '', descPl: '',descEn: '',parentCategories: [],
        //     redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    categoryById(id) {
        return this.state.categories.find(c => c.cat_id == id)
    }

    render() {

        if(this.state != null) {

            const {classes} = this.props;
            const {namePl, nameEn, descPl, descEn, parentCategories, categories} = this.state;
            const {open, messageVariant} = this.state;

            let categoriesList;
            if(categories != null) {

            console.log(parentCategories)
             categoriesList = categories.map((category) => (

                    <MenuItem value={category.cat_id} key={category.cat_id}>
                        <Checkbox checked={parentCategories.indexOf(category.cat_id) > -1}
                                  style={{color: '#86C232'}}/>
                        <ListItemText primary={category.cat_name_pl}/>
                    </MenuItem>
                ));
            }


            return (
                <div>
                    <h1 style={{color: '#CCC', fontSize: 40}}>Wprowadzanie kategorii</h1>
                    <Paper style={{marginLeft: '20%', width: '60%', backgroundColor: '#EEE', borderRadius: '25px'}}>
                        <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                            <br/>

                            <TextField id="namePl" label="Nazwa PL" style={{width: '25%'}}
                                       className={classes.textField} margin="normal" value={namePl}
                                       onChange={this.onChange} name="namePl" variant="outlined"
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

                            <TextField id="nameEn" label="Nazwa EN" style={{marginLeft: '9%', width: '25%'}}
                                       className={classes.textField} margin="normal" value={nameEn}
                                       onChange={this.onChange} name="nameEn" variant="outlined"
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

                            <TextField id="descPl" label="Opis PL" style={{width: '60%'}}
                                       className={classes.textField} margin="normal" value={descPl}
                                       onChange={this.onChange} name="descPl" variant="outlined"
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

                            <TextField id="descEn" label="Opis En" style={{width: '60%'}}
                                       className={classes.textField} margin="normal" value={descEn}
                                       onChange={this.onChange} name="descEn" variant="outlined"
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

                            <InputLabel htmlFor="select-multiple-chip">Parent Categories</InputLabel>
                            <Select className={classes.formControl}
                                    multiple
                                    value={this.state.parentCategories}
                                    onChange={this.onChange}
                                    input={<Input name="parentCategories" id="select-multiple-chip"/>}
                                    renderValue={selected => (
                                        <div className={classes.chips}>
                                            {selected.map(value => (
                                                <Chip style={{backgroundColor: '#86C232'}} key={value.id}
                                                      label={this.categoryById(value).cat_name_pl}
                                                      className={classes.chip}/>
                                            ))}
                                        </div>
                                    )}
                            >
                                {categoriesList}
                            </Select>

                            <br/>


                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: "#86C232"}}
                                    variant="contained" color="primary" className={classes.button} type="submit"
                                    onSubmit={this.onSubmit}
                                    size="large">
                                Dodaj
                            </Button>

                        </form>

                        <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                    </Paper>

                </div>

            )
        } else return null;

    }

}

export default withStyles(styles)(Categoriesform);