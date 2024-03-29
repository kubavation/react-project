import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import TableHeadPagin from '../view/Tableheadpagin';
import {Link} from "react-router-dom";
import {MdFileDownload} from "react-icons/md";


class PaginTable extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.items)
        this.state = {
            items: props.items,
            itemNames: props.itemNames,
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


    render() {
        const { classes } = this.props;
        const { items, itemNames } = this.props;
        const { page, rowsPerPage, link, edit } = this.state;

        var show = 'visible'
        if(edit != null)
            show = 'hidden'


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
                                   component={Link} to={link + '/' + qnt.id}>Edytuj</Button></TableCell>
            </TableRow>
        ));

        return (
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

        );
    }

}

export default PaginTable;
