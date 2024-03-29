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


const itemNames = ['Data','Opis','DOI','Bibtex','Plik'] //date,desc,doi,bibtex,//?file

class FactorSources extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getFactorSources() {
        fetch(process.env.REACT_APP_HOST + '/source')
            .then(response => response.json())
            .then(sources => {
                let list = [];
                sources.forEach( u => {
                    const temp  = {
                        date: u.source_date,
                        desc: u.source_description,
                        doi: u.doi,
                        bibtex: u.bibtex,
                        id: u.source_id,
                        file_id: process.env.REACT_APP_HOST + '/file/' + u.file_id + '/download',
                        file_name: u.file_name
                    }
                    list.push(temp);
                })
                this.setState({items: list});
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
            <h1 style={{color:'#CCC', fontSize: 40}}>Lista źródeł</h1>
            <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>
                <PaginTable items={items} itemNames={itemNames} link={"/factors/factorsources/create"}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(FactorSources);