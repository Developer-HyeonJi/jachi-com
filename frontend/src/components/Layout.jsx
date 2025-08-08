import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import {Calendar, Clock, FileText, Home, Phone, ShoppingCart, Star, Users, Wallet} from "lucide-react";
import { Menu } from 'lucide-react';

const navigationItems = [
  { path: '/', label: '홈', icon: Home },
  { path: '/budget', label: '가계부', icon: Wallet },
  { path: '/shopping', label: '장보기', icon: ShoppingCart },
  { path: '/schedule', label: '집관리', icon: Clock },
  { path: '/calendar', label: '일정관리', icon: Calendar },
  { path: '/community', label: '커뮤니티', icon: Users },
  { path: '/items', label: '아이템추천', icon: Star },
  { path: '/emergency', label: '비상연락', icon: Phone },
  { path: '/manual', label: '긴급대처', icon: FileText },
  { path: '/login', label: '로그인', icon: FileText },
]

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavItem = ({ item, mobile = false }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const Icon = item.icon
    const isActive = location.pathname === item.path

    const handleClick = () => {
      navigate(item.path)
      if (mobile)
        setIsMobileMenuOpen(false)
    }
    return (
      <div
        onClick = {handleClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{item.label}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card/50 backdrop-blur-sm hidden lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                자취닷컴
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="border-t p-4">
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              자취닷컴
            </span>
          </Link>

          <div className="flex items-center gap-2">
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-full flex-col">
                  <div className="flex h-16 items-center border-b px-6">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      자취닷컴
                    </span>
                  </div>
                  <nav className="flex-1 space-y-1 p-4">
                    {navigationItems.map((item) => (
                      <NavItem key={item.path} item={item} mobile />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}

