import Link from 'next/link'

export default function LayoutHeader() {
	return (
		<div className="bg-white shadow-lg">
			<div className="h-14 max-w-6xl mx-auto flex items-center mb-6">
				<div className="flex-grow">
					<Link href='/'>
						<h1 className="cursor-pointer font-bold">CRUD with Next.js!</h1>
					</Link>
				</div>
				{/* <div className="flex-grow flex items-center justify-end gap-x-4">
					<Link href="/login">Login</Link>
				</div> */}
			</div>
		</div>
	)
}
