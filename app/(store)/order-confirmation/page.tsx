import { Suspense } from 'react'
import { OrderConfirmationContent } from './order-confirmation-content'

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationContent />
    </Suspense>
  )
}
