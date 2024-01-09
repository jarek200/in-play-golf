import TableCell from '@mui/material/TableCell'

const HolesList = ({ length }) => {
  const holes = Array.from({ length }, (_, i) => i + 1)

  return (
    <>
      {holes.map(hole => (
        <TableCell align='center' key={hole}>
          {hole}
        </TableCell>
      ))}
    </>
  )
}

export default HolesList
