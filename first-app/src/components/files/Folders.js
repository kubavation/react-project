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


const itemNames = ['userId','id','title'] //fileName,fileType,hddFilePath,folderId?

class Folders extends Component {

    constructor(props) {
        super();
        this.state = {
            items: []
        }
    }

    getFiles() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(files => {
                this.setState({items: files});
            });
    };

    componentDidMount() {
        this.getFiles();
    }


    render() {

        const { classes } = this.props;
        const items = this.state.items;

        return (
            <div>
            <h1 style={{color:'#CCC', fontSize: 40}}>Lista folderów</h1>
            <Paper style={{backgroundColor:'#EEE',borderRadius:'25px'}} className={classes.root}>
                <PaginTable items={items} itemNames={itemNames} link={"/files/folders/create"}/>
            </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Folders);