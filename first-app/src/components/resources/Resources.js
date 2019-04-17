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

class Resources extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getResources() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(resources => {
                this.setState({items: resources});
            });
    };

    componentDidMount() {
        this.getResources();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#CCC', fontSize: 40}}>Lista surowców</h1>
            <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>
                <PaginTable items={items} itemNames={itemNames} />
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Resources);