import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import TableHeadPagin from '../view/Tableheadpagin';


class PaginTable extends React.Component {

    constructor(props) {
        super();
        this.state = {
            items: props.items,
            itemNames: props.itemNames,
            page: 0,
            rowsPerPage: 10
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
         const { page, rowsPerPage } = this.state;

         const itemComponents = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(qnt => (
             <TableRow key={qnt.id}>
                 { Object.keys(qnt).map(key => <TableCell>{qnt[key]}</TableCell>) }
             </TableRow>
         ));

         return (
             <div>
             <Table>
                 <TableHeadPagin items={itemNames}/>
                 <TableBody>
                     {itemComponents}
                 </TableBody>
             </Table>
             <TablePagination
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
