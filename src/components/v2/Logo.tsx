import { styled } from '@mui/material/styles'
import { Pacifico } from 'next/font/google'

const pacificoFont = Pacifico({
  subsets: ['latin'],
  weight: '400',
  preload: true,
})

const smallLogoClassName = 'App--Logo-small'

const LogoHeading = styled('strong')(({ theme }) => ({
  ...pacificoFont.style,
  display: 'block',
  paddingRight: 5,
  fontSize: 40,
  background: '-webkit-linear-gradient(#FFB703, #FB8500)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  lineHeight: 1.7,
  top: '-10%',
  margin: 0,
  textAlign: 'center',
  userSelect: 'none',

  [`&.${smallLogoClassName}`]: {
    fontSize: 32,
  },
}))

interface LogoProps {
  small?: boolean
}
export default function Logo({ small }: LogoProps): JSX.Element {
  const classes = []
  if (small === true) {
    classes.push(smallLogoClassName)
  }

  return <LogoHeading className={classes.join(' ')}>Quizerland</LogoHeading>
}
