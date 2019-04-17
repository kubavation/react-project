import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuantities } from "../../actions/quantitiesActions";
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
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


const itemNames = ['userId','id','title']

class Quantities extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getQuantities() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(qnts => {
                this.setState({items: qnts});
            });
    };

    componentDidMount() {
        this.getQuantities();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#CCC', fontSize: 40}}>Lista wielkości fiz/chem</h1>
            <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>
                <PaginTable items={items} itemNames={itemNames}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Quantities);