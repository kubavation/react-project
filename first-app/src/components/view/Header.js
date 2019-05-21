import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import TableHeadPagin from '../view/Tableheadpagin';
import '../../App.css';

class Header extends React.Component {

    constructor(props) {
        super();
        this.state = {
            items: props.items,
            itemNames: props.itemNames,
            page: 0,
            rowsPerPage: 10
        }

    }



    render() {
        const { classes } = this.props;
        const { items, itemNames } = this.props;
        const { page, rowsPerPage } = this.state;

        return (
           <div>
               <h1 className="header" >Bank wiedzy</h1>
               <div className="content">
                   <p>Ta strona internetowa została stworzona w celu przechowywania informacji o śladzie węglowym.</p>

                   <p>Pomóż nam rozwinąć naszą bazę i wstaw nowe dane.</p>
               </div>
           </div>

        );
    }

}

export default Header;
