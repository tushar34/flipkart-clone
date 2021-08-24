import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Usercartlist } from '../store/actions/action';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const dispatch = useDispatch()
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const user_id = useSelector(state => state.LoginReducer?.id)
    const total_cart_price = useSelector(state => state.UsercartlistReducer?.data?.data?.total_cart_price)


    useEffect(() => {
        dispatch(Usercartlist(user_id));
        // dispatch(City());
        // dispatch(Get_address(user_id))
    }, [0])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            console.log(id)
            const response = await axios.post("http://127.0.0.1:8000/api/payment", {
                amount: total_cart_price,
                id:id,
                user:user_id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="paymentbtn">Pay</button>
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </>
    )
}