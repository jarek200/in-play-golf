import React from 'react'

import GolfDataTable from './components/GolfDataTable'
import useGetPlayersData from './hooks/useGetPlayersData'
import StyledHeader from './components/StyledHeader'
function App() {
  const playersData = useGetPlayersData()
  return (
    <>
      <StyledHeader text='In Play Golf Score Table' />
      <GolfDataTable playersData={playersData} holesNumber={18} />
    </>
  )
}

export default App
