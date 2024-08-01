import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useMeasure } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'

const StyledQuizzesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
}))

const gridItemWidth = 400
function QuizzesGrid(props: BoxProps): JSX.Element {
  const [elementRef, { width: elementWidth }] = useMeasure()

  const [gridColumnsCount, setGridColumnsCount] = useState<number>()

  useEffect(() => {
    setGridColumnsCount(Math.floor((elementWidth ?? gridItemWidth) / gridItemWidth))
  }, [elementWidth])

  return gridColumnsCount === undefined ? (
    <></>
  ) : (
    <StyledQuizzesGrid
      ref={elementRef}
      style={{ gridTemplateColumns: '1fr '.repeat(gridColumnsCount) }}
      {...props}
    >
      {props.children}
    </StyledQuizzesGrid>
  )
}

export default QuizzesGrid
