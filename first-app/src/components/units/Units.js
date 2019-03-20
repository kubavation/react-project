import React, { Component } from 'react';
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


const itemNames = ['userId','id','title']; //namePl,nameEn,ratio,quantity_id,unit

class Units extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getUnits() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(units => {
                this.setState({items: units});
            });
    };

    componentDidMount() {
        this.getUnits();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#CCC', fontSize: 40}}>Lista jednostek</h1>
            <Paper className={classes.root} style={{backgroundColor:'#CCC',borderRadius:'25px'}}>
                <PaginTable items={items} itemNames={itemNames}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Units);