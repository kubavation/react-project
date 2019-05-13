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
        fetch('http://api.gabryelkamil.pl/resource')
            .then(response => response.json())
            .then(resources => {
                console.log(resources)
                let list = [];
                resources.forEach( u => {
                    const temp  = {
                        namePl: u.resource_name_pl,
                        nameEn: u.resource_name_eng,
                        descPl : u.resource_description_pl,
                        descEn : u.resource_description_eng,
                        id: u.resource_id
                    }
                    list.push(temp);
                })
                this.setState({items: list});
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
                <PaginTable items={items} itemNames={itemNames} link={"/resources/resources/create"}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Resources);