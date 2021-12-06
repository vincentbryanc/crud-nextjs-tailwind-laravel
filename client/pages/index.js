import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/Layout'
import List from '@/components/List'

export default function Home({ todos }) {
	return (
		<Layout title="Home - CRUD">
			<div>
				<h1 className="font-bold text-3xl">To-dos</h1>
				<div className="flex justify-end py-2">
					<Link href='/todo/new'>
						<button className="bg-blue-500 text-white px-6 py-2 text-xs hover:bg-blue-700">Add New Todo</button>
					</Link>
				</div>
				<List todos={todos} />
			</div>
		</Layout>
	)
}

export const getStaticProps = async () => {
	const res = await axios.get(`http://127.0.0.1:8000/api/todos`)
	const todos = await res.data.data

	return {
		props: {
			todos
		}
	}
}
