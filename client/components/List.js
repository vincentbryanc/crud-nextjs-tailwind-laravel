import axios from 'axios'
import Router from 'next/router'
import Swal from 'sweetalert2'

export default function Lists({ todos }) {
	const deleteTodoConfirmation = (todoId) => {
		Swal.fire({
			title: 'Delete confirmation',
			text: 'Are you sure you want to delete this task?',
			showCancelButton: true,
			confirmButtonColor: '#f87171',
			confirmButtonText: 'Yes, delete it.',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteTodo(todoId)
			}
		})
	}

	const deleteTodo = async (todoId) => {
		await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${todoId}`)
		Swal.fire({
			title: 'Success!',
			text: 'Successfully saved.',
			icon: 'success',
			confirmButtonColor: '#059669',
		})
		Router.push('/')
	}

	const updateStatusConfirmation = (todoId, status) => {
		Swal.fire({
			title: 'Update confirmation',
			text: 'Are you sure you want to update the status of this task?',
			showCancelButton: true,
			confirmButtonColor: '#059669',
			confirmButtonText: 'Yes, update it.',
		}).then((result) => {
			if (result.isConfirmed) {
				updateStatus(todoId, status)
			}
		})
	}

	const updateStatus = async (todoId, status) => {
		await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/update-status/${todoId}`, {
			'is_completed': status,
		})
		Swal.fire({
			title: 'Success!',
			text: 'Successfully updated.',
			icon: 'success',
			confirmButtonColor: '#059669',
		})
		Router.push('/')
	}

	const editTodo = (todo) => {
		Router.push(`/todo/edit/${todo.id}`)
	}

	return (
		<div className="overflow-x-auto overflow-y-hidden">
			<table className="w-full">
				<thead>
					<tr>
						<th>Task</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.id}>
							<td width="50%">
								<p>{todo.title}</p>
								<p>{todo.description}</p>
							</td>
							<td width="5%">{todo.is_completed ? 'Completed' : 'Ongoing'}</td>
							<td>
								<div className="flex items-center gap-x-2">
									<button className={`text-white px-6 py-2 text-xs ${todo.is_completed ? "bg-yellow-400 hover:bg-yellow-500" : "bg-green-600 hover:bg-green-700"}`} onClick={() => updateStatusConfirmation(todo.id, !todo.is_completed)}>
										{todo.is_completed ? 'Mark as Ongoing' : 'Mark as Completed'}
									</button>
									<button className="bg-blue-500 text-white px-6 py-2 text-xs hover:bg-blue-700" onClick={() => editTodo(todo)}>
										Edit
									</button>
									<button className="bg-red-400 text-white px-6 py-2 text-xs hover:bg-red-600" onClick={() => deleteTodoConfirmation(todo.id)}>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-end gap-x-2 mt-4">
				<button className="bg-blue-500 text-white px-6 py-2 text-xs hover:bg-blue-700">
					Prev
				</button>
				<button className="bg-blue-500 text-white px-6 py-2 text-xs hover:bg-blue-700">
					Next
				</button>
			</div>
		</div>
	)
}