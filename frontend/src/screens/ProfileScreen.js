
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
// import USER_UPDATE_PROFILE_RESET from '../constants/userConstants'

export default function ProfileScreen(props) {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')

    const [sellerName, setSellerName]=useState('')
    const [sellerLogo, setSellerLogo]=useState('')
    const [sellerDescription, setSellerDescription]=useState('')
 


    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo}=userSignin
    

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user}=userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {loading:loadingUpdate,error:errorUpdate, success:successUpdate}=userUpdateProfile
   

 useEffect(() => {            

                if (!user) {
                  dispatch({ type: USER_UPDATE_PROFILE_RESET });
                  dispatch(detailsUser(userInfo._id));
                } else {
                  setName(user.name);
                  setEmail(user.email);
                  if(user.seller){
                    setSellerName(user.seller.name);
                    setSellerLogo(user.seller.logo);
                    setSellerDescription(user.seller.description);
                  }
                 
                }
           
      
  }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
         sellerName,
         sellerLogo,
         sellerDescription
        })
      );
    }
  };

    return (
        <div>
            

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>:
                    error? <MessageBox variant="danger">{error}</MessageBox>:
                   <>
                   {loadingUpdate && <LoadingBox></LoadingBox>}
                   {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant="success">Profile Update Successfully</MessageBox>}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            placeholder="Enter Name" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="text" 
                            placeholder="Enter Email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor="name">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Enter Password" 
                            onChange={(e)=>setPassword(e.target.value)}
                            ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input 
                            id="confirmpassword" 
                            type="text" 
                            placeholder="Enter Confirm Password"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            ></input>
                    </div>

                    {user.isSeller && (
                      <>
                        <h2>Seller</h2>
                        <div>
                            <label htmlFor="sellerName">Seller Name</label>
                            <input 
                            id="sellerName" 
                            type="text" 
                            placeholder="Enter Seller Name" 
                            value={sellerName} 
                            onChange={(e)=>setSellerName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="sellerLogo">Seller Logo</label>                            
                            <input 
                            id="sellerLogo" 
                            type="text" 
                            label="Enter Seller Name" 
                            value={sellerLogo} 
                            onChange={(e)=>setSellerLogo(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="sellerDescription">Seller Description</label>
                            <textarea
                            id="sellerDescription"
                            rows="3"
                            type="text"
                            placeholder="Enter description"
                            value={sellerDescription}
                            onChange={(e) => setSellerDescription(e.target.value)}
                          ></textarea>
                           
                        </div>
                      </>
                    )}
                    <div>
                        <label />
                        <button className="primary" type="submit">Update</button>
                    </div>
                   </> 
                }
            </form>
        </div>
    )
}
