import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Camera, 
  Mic, 
  Users, 
  MessageCircle, 
  ShoppingBag, 
  ArrowLeft, 
  Send,
  Plus,
  CameraIcon,
  Eye
} from "lucide-react"

interface LiveStreamProps {
  userRole: "seller" | "viewer"
  streamId: string
  onBack: () => void
  onViewCart?: () => void
}

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
}

interface Product {
  id: string
  name: string
  price: number
  isActive: boolean
}

export function LiveStream({ userRole, streamId, onBack, onViewCart }: LiveStreamProps) {
  const [isStreaming, setIsStreaming] = useState(userRole === "seller")
  const [chatMessage, setChatMessage] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [newProductName, setNewProductName] = useState("")
  const [newProductPrice, setNewProductPrice] = useState("")
  const [cartItems, setCartItems] = useState<Array<{id: string, product: Product, screenshot: string}>>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [chatMessages] = useState<ChatMessage[]>([
    { id: "1", username: "shopper123", message: "Love that dress! What sizes do you have?", timestamp: new Date() },
    { id: "2", username: "fashionlover", message: "The quality looks amazing!", timestamp: new Date() },
    { id: "3", username: "buyer456", message: "Can you show the back of the jacket?", timestamp: new Date() },
  ])

  const viewerCount = 187

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send to the backend
      setChatMessage("")
    }
  }

  const handleAddProduct = () => {
    if (newProductName && newProductPrice) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProductName,
        price: parseFloat(newProductPrice),
        isActive: true
      }
      setProducts([...products, product])
      setNewProductName("")
      setNewProductPrice("")
    }
  }

  const handleScreenshot = () => {
    if (products.length > 0) {
      const activeProduct = products.find(p => p.isActive) || products[0]
      const screenshot = `screenshot-${Date.now()}.jpg` // Mock screenshot
      
      const cartItem = {
        id: Date.now().toString(),
        product: activeProduct,
        screenshot
      }
      
      setCartItems([...cartItems, cartItem])
      
      // Visual feedback
      const button = document.getElementById('screenshot-btn')
      if (button) {
        button.classList.add('animate-cart-bounce')
        setTimeout(() => button.classList.remove('animate-cart-bounce'), 600)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant={isStreaming ? "destructive" : "secondary"} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-live animate-live-pulse' : 'bg-muted-foreground'}`} />
              {isStreaming ? "LIVE" : "OFFLINE"}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              {viewerCount} watching
            </div>
          </div>
        </div>

        {userRole === "viewer" && (
          <Button variant="cart" className="relative" onClick={onViewCart}>
            <ShoppingBag className="h-4 w-4" />
            Cart
            {cartItems.length > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1 min-w-5 h-5 text-xs">
                {cartItems.length}
              </Badge>
            )}
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Main Stream Area with Overlay Comments */}
        <div className="flex-1 p-4">
          <Card className="h-full shadow-stream">
            <CardContent className="p-0 h-full">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {/* Video Stream Placeholder */}
                <div className="absolute inset-0 bg-gradient-primary flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      {userRole === "seller" ? "Your Live Stream" : "Watching Live Stream"}
                    </p>
                    <p className="text-sm opacity-75">
                      {userRole === "seller" ? "Camera feed will appear here" : "Live video from seller"}
                    </p>
                  </div>
                </div>

                {/* TikTok-style Floating Comments Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute right-4 top-20 bottom-20 w-80 overflow-hidden">
                    {chatMessages.slice(-5).map((msg, index) => (
                      <div 
                        key={msg.id}
                        className="animate-fade-slide-up mb-3 pointer-events-auto"
                        style={{
                          animationDelay: `${index * 0.5}s`,
                          animationDuration: '0.6s'
                        }}
                      >
                        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3 max-w-xs ml-auto">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-6 w-6 flex-shrink-0">
                              <AvatarFallback className="text-xs bg-primary text-white">
                                {msg.username[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-white/90">{msg.username}</p>
                              <p className="text-sm text-white break-words leading-snug">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stream Controls for Seller */}
                {userRole === "seller" && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-black/50 border-white/20 text-white hover:bg-black/70">
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-black/50 border-white/20 text-white hover:bg-black/70">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Screenshot Button for Viewer */}
                {userRole === "viewer" && (
                  <Button 
                    id="screenshot-btn"
                    onClick={handleScreenshot}
                    className="absolute bottom-4 right-4"
                    variant="cart"
                    disabled={products.length === 0}
                  >
                    <CameraIcon className="h-4 w-4" />
                    Screenshot
                  </Button>
                )}

                {/* Active Product Display */}
                {products.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <Card className="bg-black/50 border-0 text-white backdrop-blur-sm">
                      <CardContent className="p-3">
                        <h4 className="font-semibold">{products.find(p => p.isActive)?.name || products[0].name}</h4>
                        <p className="text-sm">${products.find(p => p.isActive)?.price || products[0].price}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Live Viewer Count Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
                    <Eye className="h-3 w-3 mr-1" />
                    {viewerCount} watching
                  </Badge>
                </div>
              </div>

              {/* Product Management for Seller */}
              {userRole === "seller" && (
                <div className="p-4 border-t">
                  <h3 className="font-semibold mb-3">Product Showcase</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Product name"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                      />
                      <Button onClick={handleAddProduct} className="w-full" variant="stream">
                        <Plus className="h-4 w-4" />
                        Add Product
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">${product.price}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant={product.isActive ? "default" : "outline"}
                            onClick={() => {
                              setProducts(products.map(p => ({
                                ...p,
                                isActive: p.id === product.id
                              })))
                            }}
                          >
                            {product.isActive ? "Active" : "Show"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Compact Chat Input Panel */}
        <div className="w-full lg:w-80 p-4 lg:pl-0">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Live Chat
                <Badge variant="secondary" className="ml-auto">
                  <Users className="h-3 w-3 mr-1" />
                  {viewerCount}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Chat Instructions */}
              <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                💬 Comments appear on the video like TikTok!
              </div>

              {/* Recent Messages List */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Recent messages:</h4>
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary text-white">
                        {msg.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-primary">{msg.username}</p>
                      <p className="text-sm text-foreground break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Comment on the live stream..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm" variant="stream">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Your message will float over the video ✨
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}