import { createContext } from 'react'

interface IDrawerContext {
  closeDrawer: () => void
  toggleDrawer: () => void
}
const DrawerContext = createContext<IDrawerContext>({
  closeDrawer() {},
  toggleDrawer() {},
})

export default DrawerContext
