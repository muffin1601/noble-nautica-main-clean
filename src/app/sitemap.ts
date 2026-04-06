import { MetadataRoute } from 'next'
import { getCategories, getProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://noblenautica.co.uk'
    
    // Core pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/products/categories',
        '/faq',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' || route === '/products/categories' ? 'weekly' : 'monthly') as any,
        priority: route === '' ? 1 : 0.8,
    }))

    try {
        // Fetch all categories
        const categories = await getCategories()
        const categoryRoutes = categories.map((category) => ({
            url: `${baseUrl}/products/categories/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as any,
            priority: 0.7,
        }))

        // Fetch all products
        const products = await getProducts()
        const productRoutes = products.map((product) => ({
            url: `${baseUrl}/products/categories/${product.category}/${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as any,
            priority: 0.6,
        }))

        return [...routes, ...categoryRoutes, ...productRoutes]
    } catch (error) {
        console.error('Sitemap generation error:', error)
        return routes // Fallback to core routes if DB fetch fails
    }
}
