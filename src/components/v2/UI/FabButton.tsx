import Fab, { type FabProps } from '@mui/material/Fab'
import { styled } from '@mui/material/styles'

const StyledFab = styled(Fab)(({ theme }) => ({
  boxShadow: theme.shadows[3],
}))

function FabButton(props: FabProps): JSX.Element {
  return <StyledFab {...props}>{props.children}</StyledFab>
}

export default FabButton
