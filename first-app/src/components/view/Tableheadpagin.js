import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TableHeadPagin extends Component {


    constructor(props) {
        super();
        this.state = {
            rowNum: 0,
            items: props.items
        }
    }

    render() {

        const { items }  = this.state;

        const tableCells = items.map(row => (
            <TableCell style={{fontSize:'24px'}} key={row}>{row}</TableCell>
        ));

        return (
            <TableHead>
                <TableRow>
                    {tableCells}
                </TableRow>
            </TableHead>

        );

    }
}

export default TableHeadPagin;