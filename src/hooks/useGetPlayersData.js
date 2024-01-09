import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { sortAndRankPlayers } from '../utils/sortAndRankPlayers'

const useGetPlayersData = () => {
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

  return playersData
}

export default useGetPlayersData
