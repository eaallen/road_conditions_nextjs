import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ResponsiveDrawer from '../comps/layout/ResponsiveDrawer'

export default function App({ Component, pageProps }: AppProps) {
  return <ResponsiveDrawer>
    <Component {...pageProps} />
  </ResponsiveDrawer> 
}
