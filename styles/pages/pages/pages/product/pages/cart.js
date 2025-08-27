import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('ym3_cart')||'[]'))
  }, [])

  function removeIndex(i) {
    const copy = [...cart]
    copy.splice(i,1)
    setCart(copy)
    localStorage.setItem('ym3_cart', JSON.stringify(copy))
  }

  const total = cart.reduce((s,p)=>s+(p.price||0),0)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <Link href="/"><a className="underline">Continue shopping</a></Link>
        </header>

        <div className="bg-white rounded shadow p-4">
          {cart.length===0 && <p className="text-gray-600">Your cart is empty.</p>}
          {cart.map((p, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b py-3">
              <img src={p.image} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">${p.price.toFixed(2)}</div>
              </div>
              <button className="text-red-500 text-sm" onClick={()=>removeIndex(idx)}>Remove</button>
            </div>
          ))}
          {cart.length>0 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="font-bold">Total: ${total.toFixed(2)}</div>
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={()=>{
                alert('Fake checkout - not connected')
              }}>Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
