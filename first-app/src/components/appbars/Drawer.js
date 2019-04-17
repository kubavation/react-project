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
import EnergyResources from '../energyresources/EnergyResources';
import EnergyResourcesForm from '../energyresources/EnergyResourcesform';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DrawerListItem from '../view/Drawerlistitem';
import MenuBG from '../../menu_background5.jpg';
import Header from '../view/Header';
import LoginForm from '../login/LoginForm';
import RegisterForm from '../login/RegisterForm';
import { MdAddCircleOutline } from "react-icons/md";
import { MdEventNote } from "react-icons/md";


const drawerWidth = 260;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#222629',
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
        color: '#61892F',
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
        backgroundImage: 'url("' + MenuBG +'")',
    },
    panel:{
        background: '0,0,0,0',
        color: '#61892F',
        textAlign: 'left',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        position: 'static',
        justifyContent: 'flex-end',
        backgroundColor: '0,0,0,0',
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
    whiteText:{
      color:'#CCC',
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    expandIcon:{
        color:'#86C232',
    },
});

class MyDrawer extends Component {

    //backgroundColor:'#474B4F'

    state = {
        open: false,
    };

    logout() {
        localStorage.setItem('token','');
    }

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

        const auth = localStorage.getItem('token');
        const isLoggedIn = !(auth === '' || auth === null);

        const { classes, theme } = this.props;
        const { open } = this.state;

        let authButton;
        console.log("IS LOGGED IN " + isLoggedIn);
        if(!isLoggedIn) {
            authButton =
                <Button style={{fontSize: '22px', color: '#fff'}} component={Link}
                        to={'/login'} onClick={this.handleOnClickDrawer}>Log in</Button>;
        } else {
            authButton =
                <Button style={{fontSize: '22px', color: '#fff'}} component={Link}
                        to={'/header'} onClick={() => this.logout()}>Log out</Button>;
        }

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

                        <Button component={Link} to={'/header'} onClick={this.handleOnClickDrawer}
                        style={{fontSize:'22px',color:'#fff'}}>Knowledge Bank</Button>

                    <Typography style={{marginLeft:'75%'}}>
                        {authButton}
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
                    <h2 style={{marginRight:'20%', color:'#86C232'}}>MENU</h2>
                    <IconButton onClick={this.handleDrawerClose} style={{color:'#86C232'}}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon  /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <List>
                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Współczynniki</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/units/quantities/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote  /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/units/quantities/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} style={{textAlign:'center'}} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}> Jednostki </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/units/units/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/units/units/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Jednostki bazowe</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/units/baseunits/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/units/baseunits/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel}  >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Pliki</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/files/files/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/files/files/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Foldery</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/files/folders/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/files/folders/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Kategorie</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list8" button component={Link} to={'/categories/categories/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list9" button component={Link} to={'/categories/categories/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon} />} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Atrybuty</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list8" button component={Link} to={'/categories/categories/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list9" button component={Link} to={'/categories/categories/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Źródła</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/resources/resources/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/resources/resources/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Czynniki</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/factors/factornames/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/factors/factornames/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon} />} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Żródła</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/resources/resources/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/resources/resources/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    <ExpansionPanel className={classes.panel} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon} />} >
                            <Typography style={{fontSize: '25px',color:'#86C232'}}>Energy Resources</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                            <ListItem key="list1" button component={Link} to={'/energyresources/energyresources/list'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC',fontSize:'30px'}}><MdEventNote /></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Lista" />
                            </ListItem>

                            {isLoggedIn &&
                            <ListItem key="list2" button component={Link} to={'/energyresources/energyresources/create'} onClick={this.handleOnClickDrawer}>
                                <ListItemIcon style={{color:'#CCC', fontSize:'30px'}}><MdAddCircleOutline/></ListItemIcon>
                                <ListItemText classes={{ primary: this.props.classes.whiteText }} style={{fontSize: '16px'}} primary="Dodaj" />
                            </ListItem>}
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
                    <Route path='/energyresources/energyresources/list' component={EnergyResources} />
                    <Route path='/energyresources/energyresources/create' component={EnergyResourcesForm} />
                    <Route path='/header' component={Header} />
                    <Route path='/login' component={LoginForm} />
                    <Route path='/register' component={RegisterForm} />
                    <Route path='/' component={Header} />
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