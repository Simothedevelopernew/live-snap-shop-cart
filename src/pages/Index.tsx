import { useState, useEffect } from "react"
import { AuthForm } from "@/components/AuthForm"
import { SellerDashboard } from "@/components/SellerDashboard"
import { ViewerDashboard } from "@/components/ViewerDashboard"
import { LiveStream } from "@/components/LiveStream"
import { ShoppingCart } from "@/components/ShoppingCart"

type User = {
  email: string
  role: "seller" | "viewer"
}

type AppState = "auth" | "dashboard" | "live" | "cart"

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("auth")
  const [user, setUser] = useState<User | null>(null)
  const [streamId, setStreamId] = useState<string>("")
  const [authMode, setAuthMode] = useState<"login" | "register">("login") // Moved to top level

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("liveShopUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setCurrentState("dashboard")
    }
  }, [])

  const handleAuth = (data: { email: string; password: string; role?: "seller" | "viewer" }) => {
    // In a real app, this would make an API call
    const userData: User = {
      email: data.email,
      role: data.role || "viewer"
    }
    
    setUser(userData)
    localStorage.setItem("liveShopUser", JSON.stringify(userData))
    setCurrentState("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("liveShopUser")
    setCurrentState("auth")
  }

  const handleGoLive = () => {
    if (user?.role === "seller") {
      setStreamId(`stream-${Date.now()}`)
      setCurrentState("live")
    }
  }

  const handleWatchStream = (id: string) => {
    setStreamId(id)
    setCurrentState("live")
  }

  const handleBackToDashboard = () => {
    setCurrentState("dashboard")
  }

  const handleViewCart = () => {
    setCurrentState("cart")
  }

  // Auth state
  if (currentState === "auth" || !user) {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={handleAuth}
        onToggleMode={() => setAuthMode(authMode === "login" ? "register" : "login")}
      />
    )
  }

  // Dashboard states
  if (currentState === "dashboard") {
    if (user.role === "seller") {
      return (
        <SellerDashboard
          username={user.email.split("@")[0]}
          onLogout={handleLogout}
          onGoLive={handleGoLive}
        />
      )
    } else {
      return (
        <ViewerDashboard
          username={user.email.split("@")[0]}
          onLogout={handleLogout}
          onWatchStream={handleWatchStream}
          onViewCart={handleViewCart}
        />
      )
    }
  }

  // Live stream state
  if (currentState === "live") {
    return (
      <LiveStream
        userRole={user.role}
        streamId={streamId}
        onBack={handleBackToDashboard}
        onViewCart={user.role === "viewer" ? handleViewCart : undefined}
      />
    )
  }

  // Shopping cart state
  if (currentState === "cart") {
    return (
      <ShoppingCart
        onBack={handleBackToDashboard}
      />
    )
  }

  return null
};

export default Index;
