import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { getMedal } from './utils/getPositionMedal'
import HolesList from './HolesList'

const GolfDataTable = ({ playersData, holesNumber }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label='golf data table'>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Player</TableCell>
            <HolesList length={holesNumber} />
            <TableCell align='right'>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playersData.map(player => (
            <TableRow key={player.MSTID}>
              <TableCell component='th' scope='row'>
                {player.Position}
                {getMedal(player.Position)}
              </TableCell>
              <TableCell>
                {player.First} {player.Last}
              </TableCell>
              {Array.from({ length: holesNumber }, (_, i) => i + 1).map(hole => {
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
