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


const itemNames = ['userId','id','title'] //?

class EnergyResources extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getResources() {
        fetch('http://api.gabryelkamil.pl/energy_resource')
            .then(response => response.json())
            .then(resources => {
                console.log(resources)
                let list = [];
                resources.forEach( u => {
                    const temp  = {
                        namePl: u.resource_name_pl,
                       // nameEn: u.resource_name_eng,
                        ncv : u.NCV,
                        equiv: u.EQUIV,
                        //descEn : u.resource_description_eng,
                        //gus_category: u.gus_category_id,
                        id: u.id
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
            <h1  style={{color:'#EEE', fontSize: 40}}>Lista surowców energetycznych</h1>
            <Paper className={classes.root} style={{backgroundColor:'#CCC',borderRadius:'25px'}}> 
                <PaginTable items={items} itemNames={itemNames} link={"/energyresources/energyresources/create"}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(EnergyResources);