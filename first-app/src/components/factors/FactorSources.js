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


const itemNames = ['userId','id','title'] //date,desc,doi,bibtex,//?file

class FactorSources extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getFactorSources() {
        fetch('http://api.gabryelkamil.pl/source')
            .then(response => response.json())
            .then(sources => {
                this.setState({items: sources});
            });
    };

    componentDidMount() {
        this.getFactorSources();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#EEE', fontSize: 40}}>Lista źródeł</h1>
            <Paper className={classes.root} style={{backgroundColor:'#CCC',borderRadius:'25px'}}>
                <PaginTable items={items} itemNames={itemNames} link={"/factors/factorsources/create"}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(FactorSources);