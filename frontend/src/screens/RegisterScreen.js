import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function RegisterScreen(props) {
    
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [phoneNumber, setPhoneNumber]=useState('')
    const [password, setPassword]=useState('')
    const [confirmpassword, setConfirmPassword]=useState('')
    
    
    const redirect=props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const userRegister=useSelector((state)=>state.userRegister);
    const {userInfo, error, loading}=userRegister

    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== confirmpassword){
            alert('Password and confirm password are not match')
        }else{

            dispatch(register(name, phoneNumber, email, password))
        }
    }

    useEffect(()=>{
        if(userInfo){
           props.history.push(redirect) 
        }
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                   <label  htmlFor="name">Enter Name</label> 
                   <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter Name..." 
                    required onChange={(e)=>setName(e.target.value)} 
                   />
                </div>
                <div>
                   <label  htmlFor="email">Enter Email Address</label> 
                   <input 
                    type="text" 
                    id="email" 
                    placeholder="Enter Email Address" 
                    required onChange={(e)=>setEmail(e.target.value)} 
                   />
                </div>
                <div>
                   <label  htmlFor="phonenumber">Enter Phone Number</label> 
                   <input 
                    type="text" 
                    id="phonenumber" 
                    placeholder="Enter Phone Number" 
                    required onChange={(e)=>setPhoneNumber(e.target.value)} 
                   />
                </div>
                <div>
                   <label  htmlFor="password">Enter Password</label> 
                   <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter Password" 
                    required onChange={e=>setPassword(e.target.value)} 
                   />
                </div>
                <div>
                   <label  htmlFor="confirmpassword">Confirm Password</label> 
                   <input 
                    type="password" 
                    id="confirmpassword" 
                    placeholder="Confirm Password" 
                    required onChange={e=>setConfirmPassword(e.target.value)} 
                   />
                </div>
                <div>
                   <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                         Already have an Account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
