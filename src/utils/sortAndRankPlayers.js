export const sortAndRankPlayers = playersData => {
  if (!playersData || playersData.length === 0) {
    return []
  }

  // Sort players by score in ascending order (negative scores are better)
  const sortedPlayersData = [...playersData].sort((a, b) => Number(a.Score) - Number(b.Score))

  // Assign positions, handling ties
  let position = 0
  let lastScore = null
  let tieCount = 0

  sortedPlayersData.forEach((player, index) => {
    if (player.Score !== lastScore) {
      lastScore = player.Score
      position = index + 1 - tieCount
      tieCount = 0
    } else {
      tieCount++
    }
    player.Position = position
  })

  return sortedPlayersData
}
