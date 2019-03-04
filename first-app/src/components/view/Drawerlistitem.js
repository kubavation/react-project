import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import InboxIcon from '@material-ui/icons/MoveToInbox';


class DrawerListItem extends Component{

    constructor(props) {
        super();
        this.state = {
            key: props.key,
            path: props.path,
            type: props.type,
            name: props.name,
            onClick: props.onClick
        }
    }


    render() {

        const { key, path, type, name, onClick} = this.props;

        return (
            <ListItem key={key} button component={Link} to={path} onClick={onClick}>
                <ListItemIcon><InboxIcon/></ListItemIcon>
                <ListItemText style={{fontSize: '16px'}} primary={name} />
            </ListItem>
        );
    }

}

export default DrawerListItem;