// import React from 'react'

// import GolfDataTable from './components/GolfDataTable'
// import useGetPlayersData from './hooks/useGetPlayersData'
// import StyledHeader from './components/StyledHeader'
// function App() {
//   const playersData = useGetPlayersData()
//   return (
//     <>
//       <StyledHeader text='In Play Golf Score Table' />
//       <GolfDataTable playersData={playersData} holesNumber={18} />
//     </>
//   )
// }

// export default App

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import GolfDataTable from './components/GolfDataTable'
import useGetPlayersData from './hooks/useGetPlayersData'
import StyledHeader from './components/StyledHeader'
import PlayerDetail from './components/PlayerDetail' // Import the player detail component

function App() {
  const playersData = useGetPlayersData()

  return (
    <Router>
      <StyledHeader text='In Play Golf Score Table' />
      <Routes>
        <Route exact path='/' element={<GolfDataTable playersData={playersData} holesNumber={18} />} />
        <Route path='/player/:id' element={<PlayerDetail playersData={playersData} />} />
      </Routes>
    </Router>
  )
}

export default App
