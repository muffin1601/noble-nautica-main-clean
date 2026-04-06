import { Metadata } from 'next'

interface Props {
    params: { slug: string; subslug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = decodeURIComponent(params.slug)
    const subslug = decodeURIComponent(params.subslug)
    const title = `${subslug.charAt(0).toUpperCase() + subslug.slice(1)} - ${slug} Products | Noble Nautica`
    const description = `Explore our range of premium ${subslug} under ${slug} category at Noble Nautica.`
    
    return {
        title,
        description,
        alternates: {
            canonical: `https://noblenautica.co.uk/products/categories/${params.slug}/subcategories/${params.subslug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://noblenautica.co.uk/products/categories/${params.slug}/subcategories/${params.subslug}`,
        }
    }
}

export default function SubcategoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
