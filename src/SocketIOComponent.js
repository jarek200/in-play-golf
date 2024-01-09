import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import GolfDataTable from './GolfDataTable'

const SocketIOComponent = () => {
  const [playersData, setPlayersData] = useState([])

  useEffect(() => {
    const socket = io('https://mst-full-stack-dev-test.herokuapp.com/')
    socket.on('data-update', newPlayerData => {
      // Add new player data to the existing array of players' data
      setPlayersData(currentPlayersData => {
        // Check if the player already exists in the data to prevent duplicates
        const existingPlayerIndex = currentPlayersData.findIndex(player => player.MSTID === newPlayerData.MSTID)

        if (existingPlayerIndex >= 0) {
          // Replace the existing player's data with the new one
          const updatedPlayersData = [...currentPlayersData]
          updatedPlayersData[existingPlayerIndex] = newPlayerData
          return updatedPlayersData
        } else {
          // Add the new player's data to the array
          return [...currentPlayersData, newPlayerData]
        }
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <GolfDataTable playersData={playersData} />
    </div>
  )
}

export default SocketIOComponent
