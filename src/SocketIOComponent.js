import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import GolfDataTable from './GolfDataTable'
import { sortAndRankPlayers } from './utils/sortAndRankPlayers' // Make sure this utility is properly implemented

const SocketIOComponent = () => {
  const [playersData, setPlayersData] = useState([])

  useEffect(() => {
    const socket = io('https://mst-full-stack-dev-test.herokuapp.com/')
    socket.on('data-update', newPlayerData => {
      setPlayersData(currentPlayersData => {
        const existingPlayerIndex = currentPlayersData.findIndex(player => player.MSTID === newPlayerData.MSTID)

        if (existingPlayerIndex >= 0) {
          const updatedPlayersData = [...currentPlayersData]
          updatedPlayersData[existingPlayerIndex] = newPlayerData
          return sortAndRankPlayers(updatedPlayersData) // Sort and rank after updating
        } else {
          return sortAndRankPlayers([...currentPlayersData, newPlayerData]) // Sort and rank after adding new data
        }
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <GolfDataTable playersData={playersData} holesNumber={18} />
    </div>
  )
}

export default SocketIOComponent
