import { Metadata } from 'next'

interface Props {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = decodeURIComponent(params.slug)
    const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Products | Noble Nautica`
    const description = `Explore our range of premium ${slug} products at Noble Nautica.`
    
    return {
        title,
        description,
        alternates: {
            canonical: `https://noblenautica.co.uk/products/categories/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://noblenautica.co.uk/products/categories/${params.slug}`,
        }
    }
}

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
