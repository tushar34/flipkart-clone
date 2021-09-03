import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Button, Divider } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Getllproduct, Getspecificproduct,Get_product_by_sub_cat_id } from '../store/actions/action';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'bootstrap';
// import { AutoRotatingCarousel} from 'material-auto-rotating-carousel'
// import Carousel from 'react-material-ui-carousel'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Transition2 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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

    viewbtn: {
        display: "flex",

        [theme.breakpoints.down('380')]: {
            // justifyContent:"flex-"
            // display: 'block',
            // position: 'relative',
            // left: '180px',
        },
    },
    category_name: {
        display: "flex",
        [theme.breakpoints.down('380')]: {
            // display: 'block',

        },
    },
    productbar: {
        display: "flex",
        flexFlow: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.up(340)]: {
            justifyContent: "flex-start"
        },
        [theme.breakpoints.down(340)]: {
            alignItems: "center",
            justifyContent: "center"
        },
    },
    productdiv: {
        display: "inline-block",
        padding: "10px 20px",
        width: "12.5%",
        // [theme.breakpoints.down('sm')]: {
        //     display: 'flex',
        //     flexFlow:"column"
        // },
        [theme.breakpoints.down('sm')]: {
            width: "25%"
        },
        [theme.breakpoints.down(600)]: {
            width: "50%"
        },
        [theme.breakpoints.down(250)]: {
            width: "100%"
        },
        // [theme.breakpoints.down('340')]: {
        //     display: 'flex',
        //     flexFlow:"column"
        // },

    },
    imagecarousel: {
        [theme.breakpoints.down(600)]: {
            objectFit: 'contain'
        },
    },
    pruductcategory: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        boxShadow: "0 1px 1px 0px rgb(195 195 195)",
        height: "auto",
        width: "auto",
        // border: "1px solid red",
        // [theme.breakpoints.down('sm')]: {
        //     // display: 'block',
        //     width: '500px',
        //     height: 'auto'
        // },
    },

    innerproduct: {
        // border: "1px solid red",
        display: "flex",
        flexWrap: 'wrap',
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        // justifyContent:"space-between",
        [theme.breakpoints.down('sm')]: {
            // display: 'block',
            // height: "auto",
            // width: "50%"
            // height:"auto"
        },
    },
    innerproductdetail: {
        display: "flex",
        flexFlow: 'column',
        justifyContent: "center",
        alignItems: "center",
        // height: "75px",
        // width: "11.11%"
        // width:"100%"
        width: "100px",

    }
}));

export default function Home(props) {
    console.log(props)

    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Getllproduct())
        fetchphonedata()
    }, [0])

    const [phone_data, setphone_data] = useState()

    const fetchphonedata = () => {
        axios.get("http://127.0.0.1:8000/api/mobile-data/", {
        })
            .then(res => {
                setphone_data(res)
            })
            .catch(err => {
            })

    }
    console.log(phone_data);
    // console.log(phone_data && phone_data.data && phone_data.data.data && phone_data.data.sub_category_id);
    // const p_data=phone_data
    // console.log(phone_data)
    // redux data
    const product_data = useSelector(state => state.GetallproductReducer.product_data)
    console.log(product_data)

    const handleclickonproduct = (id) => {
        // alert(id)
        dispatch(Getspecificproduct(id, props))
    }

    const handleviewall = (id) => {
        dispatch(Get_product_by_sub_cat_id(id,props))
    }
    return (
        <div className={classes.grow}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className={classes.pruductcategory} >
                    <div className={classes.innerproduct} style={{}}>

                        <div className={classes.innerproductdetail}   >
                            {/* <div style={{ display: "flex" }}> */}
                            <div>
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100" />
                            </div>

                            <div>
                                <Typography>Top Offers</Typography>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className={classes.innerproductdetail} >

                            <div >
                                <img height="50px" src="	https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100" />
                            </div>
                            <div >
                                <Typography>Grocery</Typography>
                            </div>


                        </div>
                        <div className={classes.innerproductdetail}>

                            <div >
                                <img height="50px" src="	https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" />
                            </div>
                            <div >
                                <Typography>Mobiles</Typography>
                            </div>


                        </div>
                        <div className={classes.innerproductdetail}>


                            <div >
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100" />
                            </div>
                            <div >
                                <Typography>Fashion</Typography>
                            </div>


                        </div>
                        <div className={classes.innerproductdetail}>

                            <div>
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" />
                            </div>
                            <div >
                                <Typography>Electronics</Typography>
                            </div>

                        </div>
                        <div className={classes.innerproductdetail}>
                            <div >
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100" />
                            </div>
                            <div >
                                <Typography>Home</Typography>
                            </div>
                        </div>
                        <div className={classes.innerproductdetail}>

                            <div>
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100" />
                            </div>
                            <div>
                                <Typography>Appliances</Typography>
                            </div>


                        </div>
                        <div className={classes.innerproductdetail}>


                            <div>
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100" />
                            </div>
                            <div>
                                <Typography>Travel</Typography>
                            </div>


                        </div>
                        <div className={classes.innerproductdetail}>
                            <div>
                                <img height="50px" src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100" />
                            </div>
                            <div>
                                <Typography>Toys</Typography>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <Carousel infiniteLoop="true" showStatus={false} showIndicators={false} showThumbs={false} axis="horizontal" autoPlay="true"   >
                    <div >
                        <img className={classes.imagecarousel} height="200px" src="https://rukminim1.flixcart.com/flap/3376/560/image/1513fc32a7162528.jpg?q=50" />

                    </div>
                    <div>
                        <img className={classes.imagecarousel} height="200px" src="https://rukminim1.flixcart.com/flap/1688/280/image/62c50931b6126fbd.jpg?q=50" />

                    </div>
                    <div>
                        <img className={classes.imagecarousel} height="200px" src="https://rukminim1.flixcart.com/flap/3376/560/image/f5e814ee6e1aa1ba.jpg?q=50" />

                    </div>
                </Carousel>
            </div>



            <div style={{ margin: '20px 20px 0 20px', height: "auto", boxShadow: "rgb(165 160 160) 0px 2px 4px 0px" }}>
                <div>
                    <div style={{ display: "inline-block", marginLeft: "10px" }}>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>Mobiles</Typography>
                    </div>
                    <div style={{ display: "inline-block", float: "right" }}>
                        <Button style={{ backgroundColor: "#2874f0", color: "white" }} variant="contained">View all</Button>
                    </div>
                </div>
                <Divider style={{ backgroundColor: "black" }} />
                <div className={classes.productbar}   >
                    {/* style={{ display: "flex" }} */}
                    <div style={{ display: "inline-block", marginLeft: "10px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k51cpe80pkrrdj/headphone-refurbished/y/b/c/c-rockerz-on-ear-510-boat-original-imafn6u7ec8cmk8y.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Headphones</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/kbtp0280/headphone/8/v/b/tedpm20-bk-mivi-original-imaft33hphgycrwz.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Bluetooth Headset</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/ko0d6kw0/speaker/mobile-tablet-speaker/x/0/l/in-bt40bk-94-bt40bk-94-philips-original-imag2k3utgssqrwz.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Bluetooth Headset</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/kfoapow0-0/headphone/7/u/n/rockerz-255f-rockerz-255-boat-original-imafrhehhzrkd6hv.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Bluetooth Eearphone</Typography>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k5lcvbk0pkrrdj/headphone/dynamic/z/j/h/jbl-c150siublk-original-imafeyby52kxehz2.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k2f1n680/headphone/9/g/s/boat-rockerz-400-super-extra-bass-original-imafg95ztgz7z8yz.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k5lcvbk0pkrrdj/headphone/dynamic/z/j/h/jbl-c150siublk-original-imafeyby52kxehz2.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k6fd47k0pkrrdj/headphone/z/f/j/jbl-c100tws-original-imafmtrsguv29yz6.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>
                </div>
            </div>




            <div style={{ margin: '20px 20px 0 20px', height: "auto", boxShadow: "rgb(165 160 160) 0px 2px 4px 0px" }}>
                <div>
                    <div style={{ display: "inline-block", marginLeft: "10px" }}>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>Headphones & Speakers</Typography>
                    </div>
                    <div style={{ display: "inline-block", float: "right" }}>
                        <Button style={{ backgroundColor: "#2874f0", color: "white" }} variant="contained">View all</Button>
                    </div>
                </div>
                <Divider style={{ backgroundColor: "black" }} />
                <div className={classes.productbar}   >
                    {/* style={{ display: "flex" }} */}
                    <Link to="/productdetail">
                        <div style={{ display: "inline-block", marginLeft: "10px", marginTop: "20px" }}>
                            <div style={{ display: "block", height: "185px" }}>
                                <img src="https://rukminim1.flixcart.com/image/150/150/k51cpe80pkrrdj/headphone-refurbished/y/b/c/c-rockerz-on-ear-510-boat-original-imafn6u7ec8cmk8y.jpeg?q=70" />
                            </div>
                            <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                                <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Headphones</Typography>
                            </div>
                        </div>
                    </Link>
                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/kbtp0280/headphone/8/v/b/tedpm20-bk-mivi-original-imaft33hphgycrwz.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Bluetooth Headset</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/ko0d6kw0/speaker/mobile-tablet-speaker/x/0/l/in-bt40bk-94-bt40bk-94-philips-original-imag2k3utgssqrwz.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Bluetooth Headset</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/kfoapow0-0/headphone/7/u/n/rockerz-255f-rockerz-255-boat-original-imafrhehhzrkd6hv.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Bluetooth Eearphone</Typography>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k5lcvbk0pkrrdj/headphone/dynamic/z/j/h/jbl-c150siublk-original-imafeyby52kxehz2.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k2f1n680/headphone/9/g/s/boat-rockerz-400-super-extra-bass-original-imafg95ztgz7z8yz.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k5lcvbk0pkrrdj/headphone/dynamic/z/j/h/jbl-c150siublk-original-imafeyby52kxehz2.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>

                    <div style={{ display: "inline-block", marginLeft: "50px", marginTop: "20px" }}>
                        <div style={{ display: "block", height: "185px" }}>
                            <img src="https://rukminim1.flixcart.com/image/150/150/k6fd47k0pkrrdj/headphone/z/f/j/jbl-c100tws-original-imafmtrsguv29yz6.jpeg?q=70" />
                        </div>
                        <div style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>wired Eearphone</Typography>
                        </div>
                    </div>
                </div>
            </div>



            {phone_data &&
                <div style={{ margin: '20px 20px 0 20px', height: "auto", boxShadow: "rgb(165 160 160) 0px 2px 4px 0px" }}>


                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between" }}>
                        <div className={classes.category_name}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>Best Selling Phone</Typography>
                        </div>
                        <div className={classes.viewbtn} style={{}}>

                        {/* component={Link} to='/productlist' */}
                        {/* {phone_data && phone_data.data && phone_data.data.data  && phone_data.data.data.sub_category_id && */}
                            <Button   onClick={()=>handleviewall(phone_data && phone_data.data && phone_data.data.data && phone_data.data.sub_category_id)}   style={{ backgroundColor: "#2874f0", color: "white" }} variant="contained">View all</Button>
                            {/* } */}
                        </div>
                    </div>


                    <Divider style={{ backgroundColor: "black" }} />

                    <div className={classes.productbar}   >

                        {/* style={{ display: "flex" }} */}
                        {/* <Link to="/productdetail"> */}
                        {phone_data && phone_data.data && phone_data.data.data && phone_data.data.data.length > 0 && phone_data.data.data.slice(0, 8).map((data, i) => (
                            // <div style={{display:"flex" , flexWrap:'wrap',flexFlow:"row",justifyContent:"space-around"}}>
                            <div className={classes.productdiv} key={i} style={{}}>
                                <div onClick={() => handleclickonproduct(data.id)} style={{ cursor: "pointer", display: "flex", alignItems: 'center', justifyContent: 'center', height: "185px" }}>
                                    <img src={data.product_image} height="auto" width="auto" />
                                </div>
                                <div style={{ display: "block", textAlign: "center", fontSize: '14px', fontWeight: '500', marginTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {/* <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>Headphones</Typography> */}
                                    {data.product_name}
                                </div>
                            </div>
                            // </div>
                        ))}
                        {/* </Link> */}
                    </div>

                </div>
            }




        </div >
    );
}
