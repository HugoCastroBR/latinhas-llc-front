'use client'
import Image from 'next/image'
import Header from './components/header'
import Footer from './components/footer'
import Body from './components/body'
import { Provider } from 'react-redux'
import store from './store'

export default function Home() {
  return (
    <Provider store={store}>
      <Header />
      <Body />
      <Footer />
    </Provider>
  )
}
