import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trash2, ShoppingBag, CreditCard, MessageCircle } from "lucide-react"

interface CartItem {
  id: string
  productName: string
  price: number
  screenshot: string
  sellerName: string
  timestamp: Date
}

interface ShoppingCartProps {
  onBack: () => void
}

export function ShoppingCart({ onBack }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productName: "Summer Floral Dress",
      price: 89.99,
      screenshot: "screenshot1.jpg",
      sellerName: "Fashion Forward",
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: "2", 
      productName: "Wireless Bluetooth Headphones",
      price: 129.99,
      screenshot: "screenshot2.jpg",
      sellerName: "Tech Gadgets Pro",
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: "3",
      productName: "Organic Face Cream",
      price: 34.99,
      screenshot: "screenshot3.jpg", 
      sellerName: "Beauty Essentials",
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ])

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000)
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} captured from live streams
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            {cartItems.length} items
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-center">
                    Start watching live streams and screenshot products you love!
                  </p>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      {/* Screenshot Preview */}
                      <div className="w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-center text-white text-xs">
                          <div className="w-8 h-8 bg-white/20 rounded mb-1 mx-auto"></div>
                          Screenshot
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {item.productName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              from {item.sellerName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Captured {formatTimeAgo(item.timestamp)}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-lg font-bold text-foreground">
                              ${item.price}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive/90 mt-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    variant="stream"
                    disabled={cartItems.length === 0}
                  >
                    <CreditCard className="h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={cartItems.length === 0}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message Sellers
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Secure checkout powered by our platform
                </div>
              </CardContent>
            </Card>

            {/* Shopping Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">💡 Shopping Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>• Screenshots capture the exact moment you're interested</p>
                <p>• Contact sellers directly for size and availability</p>
                <p>• Watch multiple streams to compare products</p>
                <p>• Follow your favorite sellers for new streams</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}