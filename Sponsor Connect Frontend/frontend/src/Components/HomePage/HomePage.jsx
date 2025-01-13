import {  Grid, Grid2 } from '@mui/material'
import React from 'react'
import Navigation from '../Navigation/Navigation'
import HomeSection from '../HomeSection/HomeSection'
import Rightpart from '../RightPart/Rightpart'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import PostDetails from '../PostDetails/PostDetails'

const HomePage = () => {
  return (
    <Grid container  xs={12} className='px-5 lg:px-36 justify-between'>
      
      <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative'>
            <Navigation/>
      </Grid>
      <Grid item xs={12} lg={6} className='px-5 lg:px-9 hidden lg:block w-full relative'>
        <Routes>
          <Route path="/" element={<HomeSection/>}></Route>
          <Route path="/home" element={<HomeSection/>}></Route>
          <Route path="/profile/:id" element={<Profile/>}></Route>
          <Route path="/post/:id" element={<PostDetails/>}></Route>

        </Routes>
        
      </Grid>
      <Grid item xs={0} lg={3} className='hidden lg:block w-full relative'>
        <p className='text-center'><Rightpart></Rightpart></p>
      </Grid>
    </Grid>
  )
}

export default HomePage