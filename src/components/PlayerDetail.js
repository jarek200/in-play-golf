import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, Typography, Grid, Button } from '@mui/material'
import StyledHeader from './StyledHeader'
import { Link } from 'react-router-dom'

const PlayerDetail = ({ playersData, headerText }) => {
  const { id } = useParams()
  const player = playersData.find(p => p.MSTID === Number(id))

  const gender = player.Sex === 'M' ? 'Male' : player.Sex === 'F' ? 'Female' : 'Not specified'

  return (
    <>
      <StyledHeader text={headerText} />
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Button variant='outlined' color='primary'>
          Back
        </Button>
      </Link>
      <Card>
        <CardContent>
          <Typography variant='h5' component='div'>
            {player.First} {player.Last} ({gender})
          </Typography>
          <Typography color='text.secondary'>Nationality: {player.Nationality}</Typography>
          <Typography variant='body2'>
            Match: {player.Match}, Position: {player.Position}
          </Typography>
          <Typography variant='body2'>
            Score: {player.Score}, Today: {player.Today}
          </Typography>
          <Typography variant='body2'>Handicap: {player.Handicap}</Typography>
          <Typography variant='body2'>
            Holes Played: {player.holesPlayed}, Course: {player.course}
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: player.holesPlayed }, (_, i) => i + 1).map(hole => {
              const strokeKey = `Hole${hole}Strokes`
              const stpKey = `Hole${hole}STP`
              return (
                <Grid item xs={4} sm={2} md={1} key={hole}>
                  <Typography variant='body2'>
                    Hole {hole}: {player[strokeKey]} ({player[stpKey] >= 0 ? '+' : ''}
                    {player[stpKey]})
                  </Typography>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default PlayerDetail
