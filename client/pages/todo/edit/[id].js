import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Swal from 'sweetalert2'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function Home({ todo }) {
	const router = useRouter()
	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			title: todo.title,
			description: todo.description,
		}
	})
	const updateTodo = async (data) => {
		const { id } = router.query
		const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${id}`, {
			...data
		}).then(() => {
			Swal.fire({
				title: 'Success!',
				text: 'Todo has been successfully updated.',
				icon: 'success',
				confirmButtonColor: '#059669',
			})
			Router.push('/')
		}).catch(error => {
			console.log('error', error)
		})
	}

	return (
		<Layout title="Home - CRUD">
			<div>
				<h1 className="text-center font-bold text-3xl mb-4">Edit Todo</h1>
				<form className="max-w-2xl container mx-auto" onSubmit={handleSubmit(updateTodo)}>
					<div className="form-item">
						<label htmlFor="title">Title</label>
						<input
							name="title"
							className="form-control"
							{...register('title', { required: true })} />
						{errors.title?.type === "required" && <div className="error">Title field is required</div>}
					</div>
					<div className="form-item">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							rows="4"
							className="form-control"
							{...register('description', { required: true, maxLength: 300 })} />
						{errors.description?.type === "required" && <div className="error">Description field is required</div>}
						{errors.description?.type === "maxLength" && <div className="error">Description field must not exceed 300 characters</div>}
					</div>
					<div className="form-item">
						<button className="btn-primary">Update</button>
						<Link href="/">
							<a className="text-center mt-2 text-sm">Cancel</a>
						</Link>
					</div>
				</form>
			</div>
		</Layout>
	)
}

export const getStaticPaths = async () => {
	const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + `/todos`)
	const todos = await res.data.data

	const paths = todos.map((todo) => ({
		params: { id: todo.id.toString() },
	}))

	return { paths, fallback: false }
}


export const getStaticProps = async (context) => {
	const id = context.params.id
	const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/todo/${id}`)
	const todo = await res.json()
	return { props: { todo } }
}