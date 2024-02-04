import MUICard, { type CardProps } from '@mui/material/Card'
import React from 'react'

function Card(props: CardProps): JSX.Element {
  return (
    <MUICard elevation={2} {...props} sx={{ borderRadius: 3, ...props.sx }}>
      {props.children}
    </MUICard>
  )
}

export default Card
