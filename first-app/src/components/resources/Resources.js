import React, { Component } from 'react';
import { getQuantities } from "../../actions/quantitiesActions";
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import PaginTable from "../view/Pagintable";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import TableHeadPagin from '../view/Tableheadpagin';
import {Link} from "react-router-dom";
import {MdFileDownload} from "react-icons/md";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Modal } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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


const itemNames = ['Nazwa Polska','Nazwa Angielska','Opis Polski','Opis Angielski'] //namePl,nameEn,descPl,descEn

class Resources extends Component {

    constructor(props) {
        super();
        this.state = {
            items: [],
            page: 0,
            rowsPerPage: 10,
            link: props.link,
            edit: props.edit
        }

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    getResources() {
        fetch(process.env.REACT_APP_HOST +'/resource')
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
                        id: u.resource_id,
                        //factors: u.factors
                    }
                    list.push(temp);
                })
                this.setState({items: list});
            });
    };

    componentDidMount() {
        this.getResources();
    }



    // render() {
    //
    //     const { classes } = this.props;
    //     const items = this.state.items;
    //
    //     return (
    //         <div>
    //         <h1 style={{color:'#CCC', fontSize: 40}}>Lista surowców</h1>
    //         <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>
    //             <PaginTable items={items} itemNames={itemNames} link={"/resources/resources/create"} />
    //         </Paper>
    //         </div>
    //     )
    // }

    render() {

        const { classes } = this.props;
        const items = this.state.items;

        const { page, rowsPerPage, link, edit } = this.state;

        var show = 'visible'
        if(edit != null)
            show = 'hidden'

//                    <PaginTable items={items} itemNames={itemNames} link={"/resources/resources/create"} />



        const itemComponents = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(qnt => (
            <TableRow key={qnt.id}>
                { Object.keys(qnt).map(key => {
                    if(key !== 'id' && key !== 'file_name') {
                        if(key === 'file_id'){
                            return <TableCell>
                                <Button variant="flat" href={qnt[key]}>
                                    {qnt['file_name']} <MdFileDownload/>
                                </Button>
                            </TableCell>
                        }
                        return <TableCell style={{fontSize: '20px'}}>{qnt[key]}</TableCell>
                    }
                })
                }
                <TableCell><Button variant="contained" style={{visibility:show}}
                                   component={Link} to={'create' + '/' + qnt.id}>Edytuj</Button></TableCell>
                <TableCell>
                    <Button aria-controls="simple-menu" aria-haspopup="true" >
                        Open Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        keepMounted
                        open={true}
                    >
                        <MenuItem >Profile</MenuItem>
                        <MenuItem >My account</MenuItem>
                        <MenuItem >Logout</MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        ));

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Lista surowców</h1>
                <Paper className={classes.root} style={{backgroundColor:'#EEE',borderRadius:'25px'}}>

                    <div>
                        <Table>
                            <TableHeadPagin items={itemNames} />
                            <TableBody >
                                {itemComponents}
                            </TableBody>
                        </Table>
                        <TablePagination
                            labelRowsPerPage='Ilość rekordów'
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={items.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                </Paper>
            </div>
        )
    }

}

export default withStyles(styles)(Resources);