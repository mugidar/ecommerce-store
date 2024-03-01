import React from 'react'

const DashboardPage = ({params} : {params : {storeId: string}}) => {
  return (
    <div>YOOOO YOU"RE ON {params.storeId} page</div>
  )
}

export default DashboardPage