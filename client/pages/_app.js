// import 'tailwindcss/tailwind.css'
import { TodoContext } from '@/context/TodoContext'
import { useState } from 'react'
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
	const [todo, setTodo] = useState({ title: '', description: '' })
	return <TodoContext.Provider value={{ todo, setTodo }}>
		<Component {...pageProps} />
	</TodoContext.Provider>
}

export default MyApp
