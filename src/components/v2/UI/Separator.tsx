import { styled } from '@mui/material/styles'

const backRectHeight = 9
const frontRectHeight = 7

const StyledHr = styled('hr')(({ theme }) => ({
  position: 'relative',
  border: 'none',
  height: backRectHeight + frontRectHeight,
  margin: theme.spacing(1, 0),

  '&::before': {
    content: "''",
    position: 'absolute',
    top: 3,
    left: 14,
    height: backRectHeight,
    width: 100,
    backgroundColor: theme.palette.primary.main,
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: frontRectHeight,
    width: 100,
    backgroundColor: theme.palette.primary.contrastText,
  },
}))

function Separator(): JSX.Element {
  return <StyledHr />
}

export default Separator
