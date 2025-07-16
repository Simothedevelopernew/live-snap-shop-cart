import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, Video, ShoppingBag } from "lucide-react"

interface AuthFormProps {
  mode: "login" | "register"
  onSubmit: (data: { email: string; password: string; role?: "seller" | "viewer" }) => void
  onToggleMode: () => void
}

export function AuthForm({ mode, onSubmit, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"seller" | "viewer">("viewer")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "register" && password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    onSubmit({ email, password, role: mode === "register" ? role : undefined })
  }

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card-custom">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LiveSellShop
          </CardTitle>
          <CardDescription>
            {mode === "login" ? "Welcome back!" : "Join the live selling revolution"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {mode === "register" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>I want to:</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as "seller" | "viewer")}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="viewer" id="viewer" />
                      <Label htmlFor="viewer" className="flex items-center gap-2 cursor-pointer flex-1">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Shop & Watch</div>
                          <div className="text-xs text-muted-foreground">Browse live streams and shop products</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Video className="h-4 w-4 text-accent" />
                        <div>
                          <div className="font-medium">Sell & Stream</div>
                          <div className="text-xs text-muted-foreground">Go live and showcase your products</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" variant="stream">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={onToggleMode}
                className="text-sm text-muted-foreground"
              >
                {mode === "login" 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}