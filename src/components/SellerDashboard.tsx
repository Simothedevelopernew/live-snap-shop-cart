import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Users, TrendingUp, LogOut, Play, Square } from "lucide-react"
import { useState } from "react"

interface SellerDashboardProps {
  username: string
  onLogout: () => void
  onGoLive: () => void
}

export function SellerDashboard({ username, onLogout, onGoLive }: SellerDashboardProps) {
  const [isLive, setIsLive] = useState(false)

  const handleGoLive = () => {
    setIsLive(!isLive)
    onGoLive()
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {username}
            </h1>
            <p className="text-muted-foreground">Ready to showcase your products?</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isLive ? "destructive" : "secondary"} className="flex items-center gap-2">
              {isLive ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-live animate-live-pulse" />
                  LIVE
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  OFFLINE
                </>
              )}
            </Badge>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Action Card */}
        <Card className="mb-8 shadow-stream">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Live Stream Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {isLive ? "You're currently live!" : "Start your live stream"}
                </h3>
                <p className="text-muted-foreground">
                  {isLive 
                    ? "Your audience is watching. Show them amazing products!" 
                    : "Connect with your audience and showcase your products in real-time"
                  }
                </p>
              </div>
              <Button 
                onClick={handleGoLive} 
                variant={isLive ? "destructive" : "live"}
                size="lg"
                className="min-w-[120px]"
              >
                {isLive ? (
                  <>
                    <Square className="h-4 w-4" />
                    End Live
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Go Live
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Viewers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-viewer" />
                <span className="text-2xl font-bold">1,234</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last stream</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Products Showcased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">23</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cart Captures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-cart" />
                <span className="text-2xl font-bold">456</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Items added to carts</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Tips for Better Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">💡 Lighting</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure good lighting to showcase your products clearly
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">🎯 Engagement</h4>
                <p className="text-sm text-muted-foreground">
                  Respond to viewer comments to keep them engaged
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">📸 Product Details</h4>
                <p className="text-sm text-muted-foreground">
                  Add clear product names and prices for easy cart capture
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">⏰ Timing</h4>
                <p className="text-sm text-muted-foreground">
                  Stream when your audience is most active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}