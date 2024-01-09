import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const getMedal = position => {
  switch (position) {
    case 1:
      return '🥇' // Gold Medal emoji
    case 2:
      return '🥈' // Silver Medal emoji
    case 3:
      return '🥉' // Bronze Medal emoji
    default:
      return '' // No medal
  }
}

const GolfDataTable = ({ playersData }) => {
  const holes = Array.from({ length: 18 }, (_, i) => i + 1)

  if (!playersData || playersData.length === 0) {
    return <div>Loading data...</div>
  }

  // Sort players by score in ascending order (negative scores are better)
  const sortedPlayersData = [...playersData].sort((a, b) => Number(a.Score) - Number(b.Score))

  // Assign positions, handling ties
  let position = 0 // Position counter
  let lastScore = null // Last unique score we encountered
  let tieCount = 0 // Number of players that tied at the last unique score

  sortedPlayersData.forEach((player, index) => {
    if (player.Score !== lastScore) {
      // If the score is different than the last score
      lastScore = player.Score // Update the last score
      position = index + 1 - tieCount // Increment the position skipping the tied players
      tieCount = 0 // Reset the tie count
    } else {
      tieCount++ // Increment the tie count
    }
    player.Position = position // Assign the calculated position
  })

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label='golf data table'>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Player</TableCell>
            {holes.map(hole => (
              <TableCell align='center' key={hole}>
                {hole}
              </TableCell>
            ))}
            <TableCell align='right'>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayersData.map((player, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {player.Position}
                {getMedal(player.Position)}
              </TableCell>
              <TableCell>
                {player.First} {player.Last}
              </TableCell>
              {holes.map(hole => {
                const strokeKey = `Hole${hole}Strokes`
                const stpKey = `Hole${hole}STP`
                const strokes = player[strokeKey]
                const stp = player[stpKey]
                return (
                  <TableCell align='center' key={hole}>
                    {strokes !== undefined ? strokes : 'N/A'}
                    {stp !== 0 && `(${stp > 0 ? '+' : ''}${stp})`}
                  </TableCell>
                )
              })}
              <TableCell align='right'>
                {player.Score !== undefined ? (player.Score >= 0 ? `+${player.Score}` : player.Score) : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GolfDataTable
