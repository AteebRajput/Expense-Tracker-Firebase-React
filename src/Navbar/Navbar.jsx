// import React from 'react'
import {useGetUser} from '../Custom_hooks/useGetUserInfo'
import './Navbar.css'

export default function Navbar() {

    const {name} = useGetUser()
  return (
    <>
    <div className='navbar' >
        <h1>{name}'s Expense Tracker</h1>
    </div>
    </>
  )}