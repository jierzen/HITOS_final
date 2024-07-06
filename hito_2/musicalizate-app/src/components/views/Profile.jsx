import React from 'react'
import { Outlet } from 'react-router-dom';

export const Profile = () => {
  return (
    <>
      
			<div>Dashboard Private</div>
			<Outlet />
    </>
  )
}

export default Profile;