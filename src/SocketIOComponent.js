import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import GolfDataDisplay from './GolfDataDisplay'

const SocketIOComponent = () => {
  const [golfData, setGolfData] = useState(null)

  useEffect(() => {
    const socket = io('https://mst-full-stack-dev-test.herokuapp.com/')
    socket.on('data-update', data => {
      setGolfData(data)
    })

    return () => socket.disconnect()
  }, [])

  return <div>{golfData && <GolfDataDisplay data={golfData} />}</div>
}

export default SocketIOComponent
