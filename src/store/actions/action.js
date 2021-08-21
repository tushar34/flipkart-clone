import axios from "axios";
import {DELETECARTITEMSUCCESS, DELETECARTITEMFAILL, CARTLISTSUCCESS, CARTLISTFAILL, REMOVETOCARTSUCCESS, REMOVETOCARTFAILL, ADDTOCARTFAILL, ADDTOCARTSUCCESS, LOGINSUCCESS, LOGINFAILL, GETSPECIFICPRODUCTSUCCESS, GETSPECIFICPRODUCTFAILL, REGISTERFAILL, REGISTERSUCCESS, LOGOUTFAILL, LOGOUTSUCCESS, GETPRODUCTSUCCESS, GETPRODUCTFAILL } from "../actiontype"




const loginsuccess = (token, id, phone_number, user_name,user_address) => {
    return {
        type: LOGINSUCCESS,
        token: token,
        user_id: id,
        phone_number: phone_number,
        user_name: user_name,
        user_address:user_address,
    }
}
const loginfaill = (err) => {
    return {
        type: LOGINFAILL,
        error: err
    }
}
export const Login = (phone, password, props) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/login/",
            {
                phone_number: phone,
                password: password
            })
            .then(res => {
                console.log(res);
                const token = res.data.token;
                const user_id = res.data.id;
                const phone_number = res.data.phone_number;
                const user_name = res.data.user_name;
                const user_address = res.data.user_address;
                localStorage.setItem("token", token);
                dispatch(loginsuccess(token, user_id, phone_number, user_name,user_address));
                dispatch(Usercartlist(user_id))
                // props.history.push('/');
            })
            .catch(err => {
                // console.log(err);
                dispatch(loginfaill(err));
            })
    }
}

export const Register = (phone_number2, password2, email, username, confirmpassword) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/register/", {
            email: email,
            user_name: username,
            phone_number: phone_number2,
            password: password2,
            confirm_password: confirmpassword,
        })
            .then(res => {
                console.log(res);
                const token = res.data.token;
                const user_id = res.data.id;
                localStorage.setItem("token", token);
                dispatch(loginsuccess(token, user_id));
                // dispatch(registersuccess)
            })
            .catch(err => {
                dispatch(loginfaill(err));
            })
    }
}

export const Logout = (props) => {
    console.log(props)
    return dispatch => {
        axios.post("http://127.0.0.1:8000/rest-auth/logout/", {
        })
            .then(res => {
                localStorage.removeItem("token");
                dispatch({
                    type: LOGOUTSUCCESS,
                })
                // props.history.push('/')

            })
            .catch(err => {
                dispatch({
                    type: LOGOUTFAILL,
                    error: err
                })

            })
    }
}

export const Getllproduct = () => {
    return dispatch => {
        axios.get("http://127.0.0.1:8000/api/getallproduct/", {
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: GETPRODUCTSUCCESS,
                    data: res
                })
            })
            .catch(err => {
                dispatch({
                    type: GETPRODUCTSUCCESS,
                    error: err
                })
            })
    }
}


export const Getspecificproduct = (id, props) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/getproduct/", {
            id: id
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: GETSPECIFICPRODUCTSUCCESS,
                    data: res
                })
                props.history.push('/productdetail')
            })
            .catch(err => {
                dispatch({
                    type: GETSPECIFICPRODUCTFAILL,
                    error: err
                })
            })
    }
}



export const AddtoCart = (id, user_id, props) => {
    return dispatch => {

        axios.post("http://127.0.0.1:8000/api/addtocart/", {
            user_id: user_id,
            product_id: id
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: ADDTOCARTSUCCESS,
                    data: res
                })
                dispatch(Usercartlist(user_id))
                // props.history.push('/productdetail')
            })
            .catch(err => {
                dispatch({
                    type: ADDTOCARTFAILL,
                    error: err
                })
            })
    }
}


export const RemovetoCart = (id, user_id, props) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/removetocart/", {
            user_id: user_id,
            product_id: id
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: REMOVETOCARTSUCCESS,
                    data: res
                })
                dispatch(Usercartlist(user_id))
                // props.history.push('/addtocart')
            })
            .catch(err => {
                dispatch({
                    type: REMOVETOCARTFAILL,
                    error: err
                })
            })
    }
}


export const Usercartlist = (user_id,props) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/usercartlist/", {
            user_id: user_id
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: CARTLISTSUCCESS,
                    data: res
                })
                // props.history.push('/addtocart')
            })
            .catch(err => {
                dispatch({
                    type: CARTLISTFAILL,
                    error: err
                })
            })
    }
}




export const Deletecartitem = (user_id,c_id,props) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/deletecartitem/", {
            user_id: user_id,
            cart_product_id:c_id
        })
            .then(res => {
                console.log(res)
                dispatch({
                    type: DELETECARTITEMSUCCESS,
                    data: res
                })
                dispatch(Usercartlist(user_id,props))
                // props.history.push('/addtocart')
            })
            .catch(err => {
                dispatch({
                    type: DELETECARTITEMFAILL,
                    error: err
                })
            })
    }
}
