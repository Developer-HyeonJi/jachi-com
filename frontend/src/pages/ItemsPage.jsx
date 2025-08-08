import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  Star, 
  ShoppingCart, 
  TrendingUp, 
  Heart,
  ExternalLink,
  Filter,
  Search,
  Zap,
  Home,
  Utensils,
  Shirt
} from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', name: '전체', icon: Star },
  { id: 'kitchen', name: '주방용품', icon: Utensils },
  { id: 'living', name: '생활용품', icon: Home },
  { id: 'electronics', name: '전자제품', icon: Zap },
  { id: 'clothing', name: '의류', icon: Shirt }
]

const items = [
  {
    id: 1,
    name: '미니 전기밥솥',
    category: 'kitchen',
    price: 89000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 1234,
    discount: 26,
    image: '/api/placeholder/200/200',
    features: ['1-2인용', '전기세 절약', '간편 조리'],
    aiSummary: '10명이 이 제품은 전기세 아낀다고 함'
  },
  {
    id: 2,
    name: '접이식 건조대',
    category: 'living',
    price: 35000,
    originalPrice: 45000,
    rating: 4.6,
    reviews: 856,
    discount: 22,
    image: '/api/placeholder/200/200',
    features: ['공간 절약', '튼튼함', '이동 편리'],
    aiSummary: '원룸에서 사용하기 최적이라는 후기 다수'
  },
  {
    id: 3,
    name: 'LED 스탠드',
    category: 'electronics',
    price: 25000,
    originalPrice: 35000,
    rating: 4.7,
    reviews: 642,
    discount: 29,
    image: '/api/placeholder/200/200',
    features: ['눈 보호', '밝기 조절', 'USB 충전'],
    aiSummary: '야간 학습용으로 인기가 높음'
  },
  {
    id: 4,
    name: '원룸 수납함 세트',
    category: 'living',
    price: 45000,
    originalPrice: 60000,
    rating: 4.5,
    reviews: 423,
    discount: 25,
    image: '/api/placeholder/200/200',
    features: ['다용도', '조립 간편', '내구성'],
    aiSummary: '좁은 공간 활용도가 뛰어나다는 평가'
  }
]

export default function ItemsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원'
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="생활 아이템 추천"
        description="자취 꿀템 추천과 AI 리뷰 요약으로 현명한 쇼핑"
        badge="쇼핑"
        icon={Star}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Star}
          title="추천 상품"
          value="1,234개"
          color="yellow"
          delay={0}
        />
        <StatCard
          icon={TrendingUp}
          title="이번 주 인기"
          value="전기밥솥"
          color="green"
          delay={0.1}
        />
        <StatCard
          icon={ShoppingCart}
          title="평균 할인율"
          value="25%"
          color="blue"
          delay={0.2}
        />
        <StatCard
          icon={Heart}
          title="만족도"
          value="4.7/5"
          color="red"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                카테고리 & 필터
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  검색
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">정렬:</span>
              {['popular', 'price-low', 'price-high', 'rating'].map(sort => (
                <Button
                  key={sort}
                  variant={sortBy === sort ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy(sort)}
                >
                  {sort === 'popular' && '인기순'}
                  {sort === 'price-low' && '낮은 가격순'}
                  {sort === 'price-high' && '높은 가격순'}
                  {sort === 'rating' && '평점순'}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                      <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                    </div>
                    {item.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        -{item.discount}%
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium line-clamp-2">{item.name}</h3>
                    
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.features.map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        🤖 AI 요약: {item.aiSummary}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        구매하기
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Recommendations */}
        <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Star className="w-5 h-5" />
              AI 맞춤 추천
            </CardTitle>
            <CardDescription className="text-purple-600 dark:text-purple-400">
              당신의 구매 패턴과 리뷰를 분석한 개인화 추천
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">겨울철 필수템</span>
                  <Badge variant="outline">90% 일치</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  전기장판, 가습기, 온풍기 등 겨울 자취생활에 필요한 아이템들
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">공간 활용 아이템</span>
                  <Badge variant="outline">85% 일치</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  원룸 공간을 효율적으로 사용할 수 있는 수납용품과 가구
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

