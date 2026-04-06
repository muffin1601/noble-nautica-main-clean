import { Metadata } from 'next'

interface Props {
    params: { slug: string; id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {    
    return {
        alternates: {
            canonical: `https://noblenautica.co.uk/products/categories/${params.slug}/${params.id}`,
        },
        openGraph: {
            url: `https://noblenautica.co.uk/products/categories/${params.slug}/${params.id}`,
        }
    }
}

export default function ProductDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
