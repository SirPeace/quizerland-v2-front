import { styled } from '@mui/material'
import Box, { type BoxProps } from '@mui/material/Box'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

const StyledComponent = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
}))

type ResponsiveImageBackgroundProps = BoxProps & {
  resolveImgSrc: (w: number, h: number) => string
  resolveDefaultImgSrc?: (w: number, h: number) => string
  imgResizeStep?: number
}
function ResponsiveImageBackground(
  props: ResponsiveImageBackgroundProps,
): JSX.Element {
  const { resolveImgSrc, imgResizeStep = 300, ...WrapperProps } = props

  const {
    ref: imgWrapperRef,
    width: imgWidth,
    height: imgHeight,
  } = useResizeObserver<HTMLDivElement>()

  const _lastImgWidth = useRef<number>(Infinity)
  const _lastImgHeight = useRef<number>(Infinity)

  const [imgSrc, setImgSrc] = useState<string>()

  const updateImgSize = useCallback(
    (w: number, h: number): void => {
      _lastImgWidth.current = w
      _lastImgHeight.current = h
      setImgSrc(resolveImgSrc(w + imgResizeStep, h + imgResizeStep))
    },
    [imgResizeStep],
  )

  useEffect(() => {
    if (imgWidth !== undefined && imgHeight !== undefined) {
      if (Math.abs(imgHeight - _lastImgHeight.current) > imgResizeStep) {
        updateImgSize(imgWidth, imgHeight)
      } else if (Math.abs(imgWidth - _lastImgWidth.current) > imgResizeStep) {
        updateImgSize(imgWidth, imgHeight)
      }
    }
  }, [imgWidth, imgHeight, imgResizeStep])

  return (
    <StyledComponent
      {...WrapperProps}
      sx={{
        ...WrapperProps.sx,
        ...(undefined !== imgSrc && { backgroundImage: `url(${imgSrc})` }),
      }}
      ref={imgWrapperRef}
    >
      {props.children}
    </StyledComponent>
  )
}

export default ResponsiveImageBackground
