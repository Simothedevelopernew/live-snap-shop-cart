import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingBag, Users, Eye, LogOut, Play } from "lucide-react"

interface ViewerDashboardProps {
  username: string
  onLogout: () => void
  onWatchStream: (sellerId: string) => void
  onViewCart: () => void
}

const mockLiveStreams = [
  {
    id: "1",
    sellerName: "Fashion Forward",
    viewerCount: 245,
    category: "Fashion",
    thumbnail: "",
    isLive: true
  },
  {
    id: "2", 
    sellerName: "Tech Gadgets Pro",
    viewerCount: 189,
    category: "Electronics",
    thumbnail: "",
    isLive: true
  },
  {
    id: "3",
    sellerName: "Home & Decor",
    viewerCount: 156,
    category: "Home",
    thumbnail: "",
    isLive: true
  },
  {
    id: "4",
    sellerName: "Beauty Essentials",
    viewerCount: 298,
    category: "Beauty",
    thumbnail: "",
    isLive: true
  }
]

export function ViewerDashboard({ username, onLogout, onWatchStream, onViewCart }: ViewerDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome, {username}
            </h1>
            <p className="text-muted-foreground">Discover amazing products from live sellers</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="cart" size="sm" className="relative" onClick={onViewCart}>
              <ShoppingBag className="h-4 w-4" />
              My Cart
              <Badge className="absolute -top-2 -right-2 px-1 min-w-5 h-5 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Live Now Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-live animate-live-pulse" />
            <h2 className="text-2xl font-bold">Live Now</h2>
            <Badge variant="secondary">{mockLiveStreams.length} streams</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockLiveStreams.map((stream) => (
              <Card key={stream.id} className="overflow-hidden hover:shadow-stream transition-all duration-300 group">
                <div className="relative">
                  {/* Stream Thumbnail/Preview */}
                  <div className="aspect-video bg-gradient-primary flex items-center justify-center relative">
                    <Play className="h-12 w-12 text-white opacity-70" />
                    
                    {/* Live Badge */}
                    <Badge className="absolute top-2 left-2 bg-live text-white border-0">
                      <div className="w-2 h-2 rounded-full bg-white animate-live-pulse mr-1" />
                      LIVE
                    </Badge>

                    {/* Viewer Count */}
                    <Badge className="absolute top-2 right-2 bg-black/50 text-white border-0">
                      <Eye className="h-3 w-3 mr-1" />
                      {stream.viewerCount}
                    </Badge>
                  </div>

                  {/* Seller Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={stream.thumbnail} />
                        <AvatarFallback className="text-xs bg-primary text-white">
                          {stream.sellerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-white text-sm">
                        <div className="font-semibold">{stream.sellerName}</div>
                        <div className="text-xs opacity-90">{stream.category}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <Button 
                    onClick={() => onWatchStream(stream.id)}
                    className="w-full" 
                    variant="stream"
                  >
                    <Play className="h-4 w-4" />
                    Watch Stream
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-3">
            {["Fashion", "Electronics", "Beauty", "Home", "Sports", "Books"].map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Added 2 items to cart</p>
                    <p className="text-sm text-muted-foreground">From Fashion Forward stream</p>
                  </div>
                </div>
                <Badge variant="secondary">2m ago</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-viewer flex items-center justify-center">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Watched Tech Gadgets Pro</p>
                    <p className="text-sm text-muted-foreground">30 minute session</p>
                  </div>
                </div>
                <Badge variant="secondary">1h ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}