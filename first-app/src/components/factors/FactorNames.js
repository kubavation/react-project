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


const itemNames = ['userId','id','title'] //namePl,nameEn,descPl,descEn

class FactorNames extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getFactorNames() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(names => {
                this.setState({items: names});
            });
    };

    componentDidMount() {
        this.getFactorNames();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <Paper className={classes.root}>
                <h1>Lista współczynników</h1>
                <PaginTable items={items} itemNames={itemNames}/>
            </Paper>
        )
    }

}

export default withStyles(styles)(FactorNames);