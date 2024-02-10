import MUICard, { type CardProps } from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import React from 'react'

const StyledCard = styled(MUICard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
}))

function Card(props: CardProps): JSX.Element {
  return (
    <StyledCard elevation={2} {...props}>
      {props.children}
    </StyledCard>
  )
}

export default Card
