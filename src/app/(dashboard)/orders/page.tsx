"use client"
import OrdersTabs from '@/src/components/OrdersTabs'
import React from 'react'

export default function Orders() {
  return (
<div className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <OrdersTabs />
    </div>
  )
}
