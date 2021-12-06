import Head from 'next/head'
import LayoutHeader from '@/components/LayoutHeader'

export default function Layout({title, keywords, description, children}) {
	return (
		<div className="min-h-screen">
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<LayoutHeader />
			<div className="container mx-auto max-w-6xl">
				{children}
			</div>
		</div>
	)
}

Layout.defaultProps = {
	title: 'CRUD',
	description: 'CRUD using NextJS and Tailwind',
	keywords: 'CRUD, NextJS, Tailwind',
}