import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function UserListScreen(props) {
        const dispatch = useDispatch()
    
        const userList = useSelector(state => state.userList)
        const {loading, error, users}=userList

        const userDelete = useSelector(state => state.userDelete)
        const {loading:loadingDelete, error:errorDelete, success:successDelete}=userDelete

        useEffect(() => {
            dispatch(listUsers())
            dispatch({
                type: USER_DETAILS_RESET
            })
           
        }, [dispatch, successDelete])

        const deleteHandler=(user)=>{
            if(window.confirm('Are you sure?')){
                dispatch(deleteUser(user._id))
            }
        }

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Success</MessageBox>}

            {
                loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                    <table className="table">
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>IS SELLER</th>                          
                            <th>IS ADMIN</th>
                            <th>ACTION</th>
                        </tr>
                        <tbody>
                            {
                                users.map((user)=>(
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                        <td>{user.isAdmin ? 'YES': 'NO'}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="small"
                                                onClick={()=>props.history.push(`/user/${user._id}/edit`)}
                                                >Edit</button>
                                            <button type="button" className="small" onClick={()=>deleteHandler(user)}>Delete</button>
                                        </td>
                                    </tr>
                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
