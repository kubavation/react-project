import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuantities } from "../../actions/quantitiesActions";
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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


const itemNames = ['userId','id','title'] //namePl,nameEn,shortcut

class Baseunits extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getBaseUnits() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(units => {
                this.setState({items: units});
            });
    };

    componentDidMount() {
        this.getBaseUnits();
    }


    render() {

        const { classes } = this.props;
        const { items } = this.state;

        return (
            <Paper className={classes.root}>
                <h1>Lista jednostek bazowych</h1>
                <PaginTable items={items} itemNames={itemNames}/>
            </Paper>
        )
    }

}
export default withStyles(styles)(Baseunits);