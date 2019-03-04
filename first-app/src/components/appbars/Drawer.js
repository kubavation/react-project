import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Quantities from "../units/Quantities";
import Quantitiesform from "../units/Quantitiesform";
import BaseunitsForm from "../units/Baseunitsform";
import Baseunits from "../units/Baseunits";
import Unitsform from "../units/Unitsform";
import Units from "../units/Units";
import Files from "../files/Files";
import Filesform from "../files/Filesform";
import Folders from "../files/Folders";
import Foldersform from "../files/Foldersform";
import Categories from "../categories/Categories";
import Categoriesform from "../categories/Categoriesform";
import FactorNames from "../factors/FactorNames";
import FactorNamesForm from "../factors/FactorNamesForm";
import FactorSources from "../factors/FactorSources";
import FactorSourcesform from "../factors/FactorSourcesform";
import Resources from '../resources/Resources';
import Resourcesform from '../resources/Resourcesform';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DrawerListItem from '../view/Drawerlistitem';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class MyDrawer extends Component {

    state = {
        open: false,
    };


    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleOnClickDrawer = () => {
        setTimeout(() =>
            this.setState({open: false}), 50);
    };


    render() {

        const { classes, theme } = this.props;
        const { open } = this.state;


        return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Aplikacja
                    </Typography>
                    <Typography variant="h6" color="inherit"  style={{marginLeft:'80%'}}>
                        Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <h2 style={{marginRight:'20%'}}>MENU</h2>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <List>
                    <ExpansionPanel >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography style={{fontSize: '25px',color:'#1565c0'}} >Units</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column',padding: '0px'}} >

                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                    <Typography style={{fontSize: '16px',color: '#fff'}}>Quantities</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{flexDirection: 'column'}}>

                                    <DrawerListItem key="list1" path="/units/quantities/list"
                                    type="LIST" name="Lista" onClick={this.handleOnClickDrawer}/>

                                    <DrawerListItem key="list2" path="/units/quantities/create"
                                        type="ADD" name="Dodaj" onClick={this.handleOnClickDrawer}/>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                    <Typography style={{fontSize: '16px',color: '#fff'}}>Units</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                                    <ListItem key="list1" button component={Link} to={'/units/units/list'} onClick={this.handleOnClickDrawer}>
                                        <ListItemIcon><InboxIcon /></ListItemIcon>
                                        <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                                    </ListItem>

                                    <ListItem key="list2" button component={Link} to={'/units/units/create'} onClick={this.handleOnClickDrawer}>
                                        <ListItemIcon><InboxIcon/></ListItemIcon>
                                        <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                                    </ListItem>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                    <Typography style={{fontSize: '16px',color: '#fff'}}>Base units</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                                    <ListItem key="list1" button component={Link} to={'/units/baseunits/list'} onClick={this.handleOnClickDrawer}>
                                        <ListItemIcon><InboxIcon /></ListItemIcon>
                                        <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                                    </ListItem>

                                    <ListItem key="list2" button component={Link} to={'/units/baseunits/create'} onClick={this.handleOnClickDrawer}>
                                        <ListItemIcon><InboxIcon/></ListItemIcon>
                                        <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                                    </ListItem>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </ExpansionPanelDetails>

                    </ExpansionPanel>



                    <ExpansionPanel >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{fontSize: '25px',color:'#1565c0'}} >Files</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column',padding: '0px'}} >

                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                    <Typography style={{fontSize: '16px',color: '#fff'}}>Files</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{flexDirection: 'column'}}>

                                    <DrawerListItem key="list5" path="/files/files/list"
                                                    type="LIST" name="Lista" onClick={this.handleOnClickDrawer}/>

                                    <DrawerListItem key="list2" path="/files/files/create"
                                                    type="ADD" name="Dodaj" onClick={this.handleOnClickDrawer}/>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                    <Typography style={{fontSize: '16px',color: '#fff'}}>Folders</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                                    <ListItem key="list1" button component={Link} to={'/files/folders/list'} onClick={this.handleOnClickDrawer}>
                                        <ListItemIcon><InboxIcon /></ListItemIcon>
                                        <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                                    </ListItem>

                                    <ListItem key="list2" button component={Link} to={'/files/folders/create'} onClick={this.handleOnClickDrawer}>
                                        <ListItemIcon><InboxIcon/></ListItemIcon>
                                        <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                                    </ListItem>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                        </ExpansionPanelDetails>

                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography style={{fontSize: '25px',color:'#1565c0'}}>Categories</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list8" button component={Link} to={'/categories/categories/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            <ListItem key="list9" button component={Link} to={'/categories/categories/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon><InboxIcon/></ListItemIcon>
                                <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography style={{fontSize: '25px',color:'#1565c0'}}>Atrybuty</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list8" button component={Link} to={'/categories/categories/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            <ListItem key="list9" button component={Link} to={'/categories/categories/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon><InboxIcon/></ListItemIcon>
                                <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography style={{fontSize: '25px',color:'#1565c0'}}>Factors</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                <Typography style={{fontSize: '16px',color: '#fff'}}>Współczynniki</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                                <ListItem key="list1" button component={Link} to={'/factors/factornames/list'} onClick={this.handleOnClickDrawer}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                                </ListItem>

                                <ListItem key="list2" button component={Link} to={'/factors/factornames/create'} onClick={this.handleOnClickDrawer}>
                                    <ListItemIcon><InboxIcon/></ListItemIcon>
                                    <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                                </ListItem>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>


                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: '#3f51b5'}}>
                                <Typography style={{fontSize: '16px',color: '#fff'}}>Źródła</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                                <ListItem key="list1" button component={Link} to={'/factors/factorsources/list'} onClick={this.handleOnClickDrawer}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                                </ListItem>

                                <ListItem key="list2" button component={Link} to={'/factors/factorsources/create'} onClick={this.handleOnClickDrawer}>
                                    <ListItemIcon><InboxIcon/></ListItemIcon>
                                    <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                                </ListItem>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>


                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography style={{fontSize: '25px',color:'#1565c0'}}>Resources</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/resources/resources/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            <ListItem key="list2" button component={Link} to={'/resources/resources/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon><InboxIcon/></ListItemIcon>
                                <ListItemText style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>



                </List>

            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Switch>
                    <Route path='/units/quantities/list' component={Quantities} />
                    <Route path='/units/quantities/create' component={Quantitiesform} />
                    <Route path='/units/baseunits/list' component={Baseunits} />
                    <Route path='/units/baseunits/create' component={BaseunitsForm} />
                    <Route path='/units/units/create' component={Unitsform} />
                    <Route path='/units/units/list' component={Units} />
                    <Route path='/files/files/list' component={Files} />
                    <Route path='/files/files/create' component={Filesform} />
                    <Route path='/files/folders/list' component={Folders} />
                    <Route path='/files/folders/create' component={Foldersform} />
                    <Route path='/categories/categories/list' component={Categories} />
                    <Route path='/categories/categories/create' component={Categoriesform} />
                    <Route path='/factors/factornames/list' component={FactorNames} />
                    <Route path='/factors/factornames/create' component={FactorNamesForm} />
                    <Route path='/factors/factorsources/list' component={FactorSources} />
                    <Route path='/factors/factorsources/create' component={FactorSourcesform} />
                    <Route path='/resources/resources/list' component={Resources} />
                    <Route path='/resources/resources/create' component={Resourcesform} />
                </Switch>
            </main>
        </div>
         );
    }

}

MyDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MyDrawer);




{/*<ListItem key="list2" button component={Link} to={'/units/quantities/create'} onClick={this.handleOnClickDrawer}>*/}
{/*<ListItemIcon><InboxIcon/></ListItemIcon>*/}
{/*<ListItemText style={{fontSize: '16px'}} primary="Dodaj" />*/}
{/*</ListItem>*/}