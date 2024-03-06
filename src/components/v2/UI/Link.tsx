import MUILink, { type LinkProps as MUILinkProps } from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

const StyledLink = styled(MUILink)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.info.main,
}))

interface LinkProps extends MUILinkProps {
  to?: string
}
function Link(props: LinkProps): JSX.Element {
  const { push } = useRouter()

  return (
    <StyledLink
      underline="hover"
      onClick={() => {
        if (props.to !== undefined) push(props.to)
      }}
      {...props}
    >
      {props.children}
    </StyledLink>
  )
}

export default Link
