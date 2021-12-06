import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Swal from 'sweetalert2'
import Router from 'next/router'
import { useForm } from 'react-hook-form'

export default function Home() {
	const { register, handleSubmit, formState: { errors } } = useForm()
	const submitNewTodo = async(data) => {
		const res = await axios.post(`http://127.0.0.1:8000/api/todo`, {
			...data
		}).then(() => {
			Swal.fire({
				title: 'Success!',
				text: 'Successfully saved.',
				icon: 'success',
				confirmButtonColor: '#059669',
				confirmButtonText: 'New Todo has been successfully saved.',
			})
			Router.push('/')
		}).catch(error => {
			console.log('error', error)
		})
	}

	return (
		<Layout title="Home - CRUD">
			<div>
				<h1 className="text-center font-bold text-3xl mb-4">Add New Todo</h1>
				<form className="max-w-2xl container mx-auto" onSubmit={handleSubmit(submitNewTodo)}>
					<div className="form-item">
						<label htmlFor="title">Title</label>
						<input
							name="title"
							className="form-control"
							{...register('title', { required: true })} />
						{errors.title?.type === "required" && <div class="error">Title field is required</div>}
					</div>
					<div className="form-item">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							rows="4"
							className="form-control"
							{...register('description', { required: true, maxLength: 300 })} />
						{errors.description?.type === "required" && <div class="error">Description field is required</div>}
						{errors.description?.type === "maxLength" && <div class="error">Description field must not exceed 300 characters</div>}
					</div>
					<div className="form-item">
						<button className="btn-primary">Save</button>
						<Link href="/">
							<a className="text-center mt-2 text-sm">Cancel</a>
						</Link>
					</div>
				</form>
			</div>
		</Layout>
	)
}

export const getStaticProps = async () => {
	const res = await axios.get(`http://127.0.0.1:8000/api/todos`)
	const todos = await res.data

	return {
		props: {
			todos
		}
	}
}