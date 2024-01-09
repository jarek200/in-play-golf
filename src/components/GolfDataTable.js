import { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material'
import { getMedal } from '../utils/getPositionMedal'
import HolesList from './HolesList'
import filterScoreboardPlayers from '../utils/filterScoreboardPlayers'
import { Link } from 'react-router-dom'

const GolfDataTable = ({ playersData, holesNumber = 18 }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const filteredPlayersData = filterScoreboardPlayers(playersData, searchTerm)

  return (
    <>
      <TextField label='Search Players' variant='outlined' fullWidth margin='normal' onChange={handleSearchChange} />
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
            {filteredPlayersData.length > 0 ? (
              filteredPlayersData.map(player => (
                <TableRow key={player.MSTID}>
                  <TableCell component='th' scope='row'>
                    {player.position}
                    {getMedal(player.position)}
                  </TableCell>
                  <TableCell>
                    <Link to={`/player/${player.MSTID}`}>
                      {player.First} {player.Last}
                    </Link>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={holesNumber + 3} align='center'>
                  No players found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default GolfDataTable
