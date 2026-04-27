import React from 'react'
import BookingTabs from './BookingTabs/BookingTabs'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import NavigationButtons from '../../Template/NavigationButtons/NavigationButtons'

const MyProfile = () => {
  return (
    <div style={{ position: 'relative', paddingTop: '80px' }}>
        <NavigationButtons />
        <ProfileDetails/>
        <BookingTabs/>
    </div>
  )
}

export default MyProfile