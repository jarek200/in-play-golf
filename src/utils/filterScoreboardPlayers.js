const filterScoreboardPlayers = (playersData, searchTerm) => {
  if (!searchTerm) return playersData

  return playersData.filter(
    player => player.First.toLowerCase().includes(searchTerm.toLowerCase()) || player.Last.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export default filterScoreboardPlayers
