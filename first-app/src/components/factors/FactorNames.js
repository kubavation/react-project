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


const itemNames = ['Nazwa Polska','Nazwa Angielska','Opis Polski','Opis Angielski','Skrót'] //namePl,nameEn,descPl,descEn

class FactorNames extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getFactorNames() {
        fetch('http://api.gabryelkamil.pl/factor_name')
            .then(response => response.json())
            .then(names => {
                console.log(names)
                let list = [];
                names.forEach( u => {
                    const temp  = {
                        namePL: u.factor_name_pl,
                        nameEn: u.factor_name_eng,
                        descPl: u.factor_description_pl,
                        descEn: u.factor_description_eng,
                        shortcut: u.shortcut,
                        id: u.factor_id,

                    }
                    list.push(temp);
                })
                this.setState({items: list});
            });
    };

    componentDidMount() {
        this.getFactorNames();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#EEE', fontSize: 40}}>Lista współczynników</h1>
            <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>
                <PaginTable items={items} itemNames={itemNames} link={"/factors/factornames/create"}/>
            </Paper> 
             </div>
        )
    }

}

export default withStyles(styles)(FactorNames);