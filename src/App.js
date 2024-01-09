import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import GolfDataTable from './components/GolfDataTable'
import useGetPlayersData from './hooks/useGetPlayersData'
import PlayerDetail from './components/PlayerDetail'

function App() {
  const playersData = useGetPlayersData()

  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={<GolfDataTable playersData={playersData} holesNumber={18} headerText={'In Play Golf Score Table'} />}
        />
        <Route path='/player/:id' element={<PlayerDetail playersData={playersData} headerText={"Player's Details"} />} />
      </Routes>
    </Router>
  )
}

export default App
