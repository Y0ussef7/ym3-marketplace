import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">YM3 Digital Art Marketplace</h1>
          <Link href="/cart">Cart</Link>
        </header>

        <main>
          <p className="text-gray-600 mb-6">A simple marketplace demo (Fake API).</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white shadow rounded p-4">
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover rounded mb-3" />
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-500">{p.artist}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="font-bold">${p.price.toFixed(2)}</div>
                  <Link href={`/product/${p.id}`}>View</Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
