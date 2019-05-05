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


const itemNames = ['NazwaPL','NazwaEN','Skrót'] //namePl,nameEn,shortcut

class Baseunits extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getBaseUnits() {
        fetch('http://api.gabryelkamil.pl/get_base_unit')
            .then(response => response.json())
            .then(units => {
                let list = [];
                units.forEach( u => {
                    const temp  = {
                        name_pl: u.unit_pl,
                        name_en: u.unit_eng,
                        //ratio: u.ratio,
                        shortcut: u.quantity_name
                    }
                    list.push(temp);
                })
                this.setState({items: list});
                console.log(list);
            });
    };

    componentDidMount() {
        this.getBaseUnits();
    }


    render() {

        const { classes } = this.props;
        const { items } = this.state;

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Lista jednostek bazowych</h1>
                <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>
                    <PaginTable items={items} itemNames={itemNames} link={"/units/baseunits/create"}/>
                </Paper>
            </div>
        )
    }

}
export default withStyles(styles)(Baseunits);