import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/products')
      .then(r=>r.json())
      .then(list => {
        const p = list.find(x => String(x.id) === String(id))
        setProduct(p)
      })
      .catch(console.error)
  }, [id])

  if (!product) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <Link href="/"><a className="text-sm underline">← Back</a></Link>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded" />
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-sm text-gray-600">By {product.artist}</p>
            <p className="mt-4">{product.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={()=>{
                const cart = JSON.parse(localStorage.getItem('ym3_cart')||'[]')
                cart.push(product)
                localStorage.setItem('ym3_cart', JSON.stringify(cart))
                alert('Added to cart')
              }}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
