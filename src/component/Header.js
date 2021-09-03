import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
// import { useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DehazeIcon from '@material-ui/icons/Dehaze';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
// import ListItem from '@material-ui/core/ListItem';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button, Divider, ListItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useTheme } from '@material-ui/core';
import { Login, Register, Logout, Usercartlist } from '../store/actions/action';
// import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Transition2 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    navbar: {
        backgroundColor: 'black',
        // overflowx:'none',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'red',
        },
    },
    navigation: {
        display: 'inline-flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    menu: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'inline-flex',
        },
    },
    dialogcontent: {
        // height:'auto',
        padding: '0 103px',
        paddingTop: '0px',
        paddingBottom:"10px",
        [theme.breakpoints.down(450)]: {
            padding: '0 25px',
            paddingTop: '0px',
        },
    },
    cartnumbericon: {
        position: 'absolute',
        right: '75px',
        top: '13px',
        textAlign: 'center',
        borderRadius: '7px',
        width: '18px',
        height: '18px',
        backgroundColor: '#ff6161',
        border: '1px solid #fff',
        fontWeight: '400',
        color: '#f0f0f0',
        lineHeight: '16px',
        fontSize: '12px',
    },
    textField: {
        width: '25ch',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
}


export default function Header(props) {
    // console.log(props)

    const total_cart_item = useSelector(state => state.UsercartlistReducer?.data?.data?.cart_data?.length)


    // store variable
    const token = useSelector(state => state.LoginReducer.token)
    const user_id = useSelector(state => state.LoginReducer.id)
    const error = useSelector(state => state.LoginReducer?.error)


    // login variable
    const [phone_number, setphone_number] = useState('');
    const [password, setpassword] = useState('');

    // sign-up variable
    const [phone_number2, setphone_number2] = useState('');
    const [password2, setpassword2] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');


    // redux variable
    const dispatch = useDispatch()

    const history = useHistory();



    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };



    const [opendrawer, setopendrawer] = useState(false)
    const [loginDialog, setloginDialog] = useState(false)
    const [registerDialog, setregisterDialog] = useState(false)
    const [open, setopen] = useState(true)
    const [btnmore, setbtnmore] = useState(null)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    useEffect(() => {
        dispatch(Usercartlist(user_id, token));
    }, [0])

    useEffect(() => {
        if (error) {
            setopenalert(true)
        }
    }, [error])
    useEffect(() => {
        if (token) {
            setopenalertlogin(true)
        }
    }, [token])

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleregister = () => {
        setloginDialog(false)
        setregisterDialog(true)
    }
    const handlelogin = () => {
        setloginDialog(true)
        setregisterDialog(false)
    }
    const handledrawerloginclick = () => {
        setopendrawer(false)
        setloginDialog(true)
    }

    // call login api
    const handleLogin = () => {
        setphone_number('')
        setpassword('')
        setloginDialog(false)
        dispatch(Login(phone_number, password, props))

    }
    // call register api
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(Register(phone_number2, password2, email, username, confirmpassword))
        setphone_number2('')
        setpassword2('')
        setemail('')
        setusername('')
        setconfirmpassword('')
        setregisterDialog(false)
    }
    const handlelogout = () => {
        dispatch(Logout(props))
        setopendrawer(false)
        setopenalertlogout(true)
        history.push("/");
    }
    const [openalertcart, setopenalertcart] = useState(false)
    useEffect(() => {
        if (total_cart_item == 0) {
            setopenalertcart(true)
        }
    }, [total_cart_item])

    const handlecart = () => {
        if (total_cart_item == 0) {
            setopenalertcart(true)
        }
        else {

            setopendrawer(false)
            history.push("/addtocart");
        }
    }
    const [openalert, setopenalert] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setopenalert(false);
        setopenalertlogin(false)
        setopenalertlogout(false)
        setopenalertcart(false)
    };

    const [openalertlogin, setopenalertlogin] = useState(false)
    const [openalertlogout, setopenalertlogout] = useState(false)

    const [showPassword, setshowPassword] = useState(false)
    console.log(showPassword)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showPassword2, setshowPassword2]= useState(false)
    const [showPassword3, setshowPassword3]= useState(false)

    return (
        <div style={{ marginBottom: "20px" }}>
            <AppBar position="static" className={classes.navbar} style={{}}>
                <Toolbar >
                    <div style={{ display: 'inline-flex', flexGrow: '1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link to="/">
                                <img width="75" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="not found" />
                            </Link>
                        </div>
                        <div style={{ display: 'inline-flex' }} className={classes.search}>
                            <div style={{ display: 'inline-flex' }} className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search for product"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>
                    <div className={classes.menu}>
                        <DehazeIcon onClick={() => setopendrawer(true)} />
                        <Drawer style={{}} anchor="right" open={opendrawer} onClose={() => setopendrawer(false)}>
                            <div style={{ width: "200px", display: 'flex' }}>
                                <List style={{ width: "100%", }}>
                                    {token ? <>
                                        <ListItem onClick={handlelogout} style={{ cursor: "pointer" }}>
                                            <ExitToAppIcon style={{ marginRight: '5px' }} /> logout
                                        </ListItem>
                                        <Divider fullWidth style={{ backgroundColor: "black" }} />
                                    </> :
                                        <>
                                            <ListItem style={{ cursor: "pointer" }} onClick={handledrawerloginclick}>
                                                <LockOpenIcon style={{ marginRight: '5px' }} /> login
                                            </ListItem>
                                            <Divider fullWidth style={{ backgroundColor: "black" }} />
                                        </>
                                    }
                                    {token ?
                                        <>
                                            <ListItem style={{ cursor: "pointer" }} onClick={handlecart} >
                                                <ShoppingCartIcon style={{ marginRight: '5px' }} />cart
                                            </ListItem>
                                            <Divider fullWidth style={{ backgroundColor: "black" }} />
                                        </>
                                        : <></>}
                                </List>
                            </div>
                        </Drawer>


                    </div>
                    <div className={classes.navigation} style={{}}>

                        <div style={{ display: 'inline-flex' }}>
                            {token ?
                                <Button onClick={handlelogout} variant="contained" style={{
                                    color: 'black', backgroundColor: 'white'
                                }} >Logout</Button>
                                :
                                <Button onClick={() => setloginDialog(true)} variant="contained" style={{
                                    color: 'black', backgroundColor: 'white'
                                }} >Login</Button>
                            }
                        </div>
                        {/* 

                        <div style={{ display: 'inline-flex', marginLeft: '40px', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography onClick={(e) => setbtnmore(e.currentTarget)} >More</Typography>
                        </div>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={btnmore}
                            keepMounted
                            open={Boolean(btnmore)}
                            onClose={() => setbtnmore(null)}
                        >
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <SendIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Sent mail" />
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <DraftsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <InboxIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </StyledMenuItem>
                        </StyledMenu> */}

                        {token &&
                            <div style={{ display: 'inline-flex', marginLeft: '40px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShoppingCartIcon onClick={handlecart} />
                                </div>
                                {token ?
                                    <div className={classes.cartnumbericon}>
                                        {total_cart_item}
                                    </div>
                                    : <></>}
                                <div style={{ display: 'inline-flex', marginLeft: '5px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography>Cart</Typography>
                                </div>
                            </div>

                        }
                    </div>



                    {/* <div className={classes.grow} /> */}
                    {/* <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"23px
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div> */}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <Snackbar open={openalert} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" >
                    given information is not valid
                </Alert>
            </Snackbar>

            <Snackbar open={openalertlogin} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    login successfully
                </Alert>
            </Snackbar>


            <Snackbar open={openalertlogout} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="info">
                    Logout successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openalertcart} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="info">
                    Your cart empty
                </Alert>
            </Snackbar>



            <Dialog open={loginDialog} onClose={() => setloginDialog(false)} TransitionComponent={Transition} keepMounted maxWidth='xs' fullWidth='true' >
                <div style={{ height: "400px", display: "flex", flexFlow: "column" }}>
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                            <DialogTitle id="form-dialog-title">Sign-in</DialogTitle>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: "absolute", right: "25px" }}>
                            <CloseIcon onClick={() => setloginDialog(false)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                        <DialogContent style={{ padding: "auto" }}>
                            <TextField
                                autoFocus
                                // margin="dense"
                                id="name"
                                label="Enter Phone Number"
                                type="text"
                                fullWidth
                                value={phone_number}
                                onChange={(e) => setphone_number(e.target.value)}
                            />
                            <FormControl style={{ width: '100%' }} >
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    // margin="dense"
                                    id="standard-adornment-password"
                                    label="Enter Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onClick={handleClickShowPassword}
                                                onClick={() => setshowPassword(showPassword => !showPassword)}
                                                // onClick={()=>alert("6545")}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>
                        </DialogContent>
                        {/* <VisibilityOffIcon style={{ position: "absolute", right: '30px', top: '160px' }} /> */}
                    </div>
                    <div style={{ padding: "0px 100px 0px 100px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                        <Button onClick={handleLogin} fullWidth variant="contained" color="primary" >Login</Button>
                    </div>
                    <div style={{ padding: "0px 100px 0px 100px", textAlign: "center", marginTop: "25px", display: "flex", alignItems: "center", justifyContent: 'center' }}>

                        <Typography onClick={handleregister} component={Link} >New to Flipkart? Create an account</Typography>

                    </div>
                </div>

            </Dialog>


            <Dialog open={registerDialog} TransitionComponent={Transition2} onClose={() => setregisterDialog(false)} keepMounted maxWidth='sm' fullWidth='true'>
                <div style={{ height: "500px", display: "flex", flexFlow: "column" }}>
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                            <DialogTitle id="form-dialog-title">Sign-up</DialogTitle>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', position: "absolute", right: "25px" }}>
                            <CloseIcon onClick={() => setregisterDialog(false)} />
                        </div>
                    </div>
                    <form>
                        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            <DialogContent className={classes.dialogcontent} style={{}}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Email Address"
                                    type="text"
                                    required
                                    value={email}
                                    fullWidth
                                    onChange={e => setemail(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter User Name"
                                    type="text"
                                    fullWidth
                                    required
                                    value={username}
                                    onChange={e => setusername(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Phone Number"
                                    type="text"
                                    required
                                    value={phone_number2}
                                    fullWidth
                                    pattern="[1-9]{1}[0-9]{9}"
                                    maxlength="10"
                                    onChange={e => setphone_number2(e.target.value)}
                                />
                                <FormControl style={{ width: '100%' }} >
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        // margin="dense"
                                        id="standard-adornment-password"
                                        label="Enter Password"
                                        type={showPassword2 ? 'text' : 'password'}
                                        fullWidth
                                        value={password2}
                                        onChange={(e) => setpassword2(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    onClick={() => setshowPassword2(showPassword2 => !showPassword2)}
                                                    // onClick={()=>alert("6545")}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                    />
                                </FormControl>
                                <FormControl style={{ width: '100%' }} >
                                    <InputLabel htmlFor="standard-adornment-password">Confirm-Password</InputLabel>
                                    <Input
                                        // margin="dense"
                                        id="standard-adornment-password"
                                        label="Enter Password"
                                        type={showPassword3 ? 'text' : 'password'}
                                        fullWidth
                                        value={confirmpassword}
                                        onChange={(e) => setconfirmpassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    onClick={() => setshowPassword3(showPassword3 => !showPassword3)}
                                                    // onClick={()=>alert("6545")}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword3 ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                    />
                                </FormControl>
                                {/* <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Password"
                                    type="text"
                                    required
                                    fullWidth
                                    value={password2}
                                    onChange={e => setpassword2(e.target.value)}
                                /> */}
                                {/* <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Confirm Password"
                                    type="text"
                                    fullWidth
                                    required
                                    value={confirmpassword}
                                    onChange={e => setconfirmpassword(e.target.value)}
                                /> */}
                                {/* <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Enter Password"
                                type="text"
                                fullWidth
                            /> */}
                            </DialogContent>
                        </div>
                        <div style={{ padding: "0px 100px 0px 100px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                            <Button onClick={(e) => handleRegister(e)} fullWidth variant="contained" color="primary" >continue</Button>
                        </div>
                        <div style={{ padding: "0px 100px 0px 100px", textAlign: "center", marginTop: "25px", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                            <Typography onClick={handlelogin} component={Link} >Existing User? Log in</Typography>
                        </div>
                    </form>

                </div>
            </Dialog>






        </div>
    )
}
