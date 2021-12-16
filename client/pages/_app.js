import { useState } from 'react'
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
	const [todo, setTodo] = useState({ title: '', description: '' })
	return <Component {...pageProps} />
}

export default MyApp
