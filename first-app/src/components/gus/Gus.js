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


const itemNames = ['NazwaPL','NazwaEN','Jednostka Bazowa']

class GusList extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getQuantities() {
        fetch('http://api.gabryelkamil.pl/gus_category')
            .then(response => response.json())
            .then(qnts => {
                let list = [];
                console.log(qnts);
                qnts.forEach( q => {
                    const temp = {
                        namePl: q.name_pl,
                        nameEn: q.name_eng,
                        gusId: q.gus_id,
                        source: q.source,
                        id: q.id,
                        shortcutUnit: q.shortcut_unit,
                        unit: q.unit_id
                    }
                    list.push(temp);
                })

                this.setState({items: list});
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
                    <PaginTable items={items} itemNames={itemNames} link={"/gus/create"}/>
                </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(GusList);