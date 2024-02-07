import { styled } from '@mui/material'
import MUIButton, { type ButtonProps } from '@mui/material/Button'
import React from 'react'

const StyledButton = styled(MUIButton)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
}))

function Button(props: ButtonProps): JSX.Element {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default Button
