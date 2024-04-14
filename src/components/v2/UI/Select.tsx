import MUISelect, { type SelectProps as MUISelectProps } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import React from 'react'
import { match } from 'ts-pattern'

const SolidSelect = styled(MUISelect)(({ theme }) => ({
  background: '#fff',
  boxShadow: theme.shadows[2],

  '& > .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },

  '& > .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },
}))

interface SelectProps extends Omit<MUISelectProps, 'variant'> {
  variant?: 'solid' | MUISelectProps['variant']
}
function Select(props: SelectProps): JSX.Element {
  return match(props.variant)
    .with('solid', () => (
      <SolidSelect {...props} variant="outlined">
        {props.children}
      </SolidSelect>
    ))
    .otherwise(variant => (
      <MUISelect {...props} variant={variant}>
        {props.children}
      </MUISelect>
    ))
}

export default Select
