export const getMedal = position => {
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
