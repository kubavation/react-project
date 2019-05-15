import React, { Component } from 'react';
import { getQuantities } from "../../actions/quantitiesActions";
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TableHeadPagin from '../view/Tableheadpagin';
import PaginTable from "../view/Pagintable";

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft: '10%',
    },
    table: {
        minWidth: 700
    },
});


const itemNames = ['Nazwa Polska','Nazwa Angielska','Opis Polski','Opis Angielski'] //namePl,nameEn,descPl,descEn

class Categories extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getCategories() {
        fetch('http://api.gabryelkamil.pl/category')
            .then(response => response.json())
            .then(categories => {
                let list = [];
                categories.forEach( u => {
                    const temp  = {
                        cat_name_pl: u.cat_name_pl,
                        cat_name_eng: u.cat_name_eng,
                        desc_pl: u.cat_description_pl,
                        desc_en: u.cat_description_eng,
                        id: u.cat_id
                    }
                    list.push(temp);
                })
                this.setState({items: list});
                console.log(categories);
            });
    };

    componentDidMount() {
        this.getCategories();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#EEE', fontSize: 40}}>Lista kategorii</h1>
            <Paper style={{backgroundColor:'#EEE',borderRadius:'25px'}} className={classes.root}>
                <PaginTable items={items} itemNames={itemNames} link={"/categories/categories/create"}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Categories);