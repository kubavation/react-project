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
        super();

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

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.fetchCategories()  ;
    }

    fetchCategories() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(categories => {
                categories = categories.slice(3,8);   //remove
                this.setState({categories: categories});
            });
    }

    createCategory(category) {

        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onSubmit(event) {
        event.preventDefault();

        const category = {
            namePl: this.state.namePl,
            nameEn: this.state.nameEn,
            descPl: this.state.descPl,
            descEn: this.state.descEn,
            parentCategories: this.state.parentCategories
        };

        this.createCategory(category);

        const variant = 'success';  // ? fail?

        this.setState({userId: '', title: '',
            namePl: '', nameEn: '', descPl: '',descEn: '',parentCategories: [],
            redirect: true, open: true, messageVariant: variant});
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    categoryById(id) {
        return this.state.categories.find(c => c.id == id);
    }

    render() {
        const { classes } = this.props;
        const { namePl, nameEn , descPl , descEn , parentCategories, categories } = this.state;
        const { open, messageVariant } = this.state;

            //change to category.namePL / id
        const categoriesList = categories.map((category) => (

            <MenuItem value={category.id} key={category.id}>
                <Checkbox checked={this.state.parentCategories.indexOf(category.id) > -1} />
                <ListItemText primary={category.title} />
            </MenuItem>
        ));


        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Wprowadzanie kategorii</h1>
                <Paper style={{marginLeft:'20%',width:'60%',backgroundColor:'#CCC',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}} >

                        <br/>

                        <TextField id="namePl" label="Nazwa PL" style={{width:'25%'}}
                                   className={classes.textField} margin="normal" value={namePl}
                                   onChange={this.onChange} name="namePl" variant="outlined"/>

                        <TextField id="nameEn" label="Nazwa EN" style={{marginLeft:'9%',width:'25%'}}
                                   className={classes.textField} margin="normal" value={nameEn}
                                   onChange={this.onChange} name="nameEn" variant="outlined"/>
                        <br/>

                        <TextField id="descPl" label="Opis PL" style={{width:'60%'}}
                                   className={classes.textField} margin="normal" value={descPl}
                                   onChange={this.onChange} name="descPl" variant="outlined"/>
                        <br/>

                        <TextField id="descEn" label="Opis En" style={{width:'60%'}}
                                   className={classes.textField} margin="normal" value={descEn}
                                   onChange={this.onChange} name="descEn" variant="outlined"/>
                        <br/>
                        <br/>

                        <InputLabel htmlFor="select-multiple-chip">Parent Categories</InputLabel>
                        <Select className={classes.formControl}
                            multiple
                            value={this.state.parentCategories}
                            onChange={this.onChange}
                            input={<Input name="parentCategories" id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value.id} label={this.categoryById(value).title} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                        >
                            {categoriesList}
                        </Select>

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

export default withStyles(styles)(Categoriesform);