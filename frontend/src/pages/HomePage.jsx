import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Wallet, 
  ShoppingCart, 
  Calendar, 
  Users, 
  Phone, 
  Star, 
  Clock,
  FileText,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Heart
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    path: '/budget',
    title: '생활비 관리',
    description: 'OCR 영수증 입력과 AI 예산 조언으로 스마트한 가계부 관리',
    icon: Wallet,
    color: 'from-green-500 to-emerald-600',
    badge: '인기'
  },
  {
    path: '/shopping',
    title: '장보기 도우미',
    description: '냉장고 재료 관리와 레시피 추천으로 효율적인 식사 계획',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-600',
    badge: '신규'
  },
  {
    path: '/schedule',
    title: '집 관리 알림',
    description: '정기 점검과 공과금 납부일을 놓치지 않도록 스마트 알림',
    icon: Clock,
    color: 'from-blue-500 to-cyan-600',
    badge: null
  },
  {
    path: '/calendar',
    title: '일정 관리',
    description: '생활, 학업, 알바 일정을 통합하여 우선순위 자동 정렬',
    icon: Calendar,
    color: 'from-purple-500 to-pink-600',
    badge: null
  },
  {
    path: '/community',
    title: '커뮤니티',
    description: '자취 팁 공유와 지역별 모임으로 함께하는 자취 생활',
    icon: Users,
    color: 'from-indigo-500 to-purple-600',
    badge: null
  },
  {
    path: '/items',
    title: '아이템 추천',
    description: '자취 꿀템 추천과 AI 리뷰 요약으로 현명한 쇼핑',
    icon: Star,
    color: 'from-yellow-500 to-orange-600',
    badge: null
  },
  {
    path: '/emergency',
    title: '비상 연락',
    description: '긴급번호와 스트레스 진단으로 안전한 자취 생활',
    icon: Phone,
    color: 'from-red-500 to-pink-600',
    badge: null
  },
  {
    path: '/manual',
    title: '긴급 대처',
    description: '사고별 시나리오와 챗봇으로 신속한 문제 해결',
    icon: FileText,
    color: 'from-gray-500 to-slate-600',
    badge: null
  }
]

const stats = [
  { label: '월평균 절약', value: '15만원', icon: TrendingUp },
  { label: '사용자 만족도', value: '98%', icon: Heart },
  { label: '긴급상황 대응', value: '24/7', icon: Shield },
  { label: 'AI 추천 정확도', value: '95%', icon: Sparkles }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-1" />
              스마트한 자취생활의 시작
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              자취라이프
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              AI와 함께하는 똑똑한 자취생활<br />
              가계부부터 긴급상황까지, 모든 것을 한 곳에서
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                지금 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                기능 둘러보기
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              자취생활의 모든 것을 한 번에
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              8가지 핵심 기능으로 더 스마트하고 편리한 자취생활을 경험해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {feature.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed mb-4">
                        {feature.description}
                      </CardDescription>
                      <Link to={feature.path}>
                        <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10 transition-colors">
                          자세히 보기
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              더 스마트한 자취생활을 시작해보세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              AI가 도와주는 똑똑한 자취생활로 시간과 돈을 절약하고, 더 여유로운 일상을 만들어보세요
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              무료로 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

