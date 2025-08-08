import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  ShoppingCart, 
  Refrigerator, 
  ChefHat, 
  Plus, 
  Minus,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Utensils,
  Apple,
  Beef,
  Milk,
  Egg
} from 'lucide-react'
import { motion } from 'framer-motion'

const fridgeItems = [
  { id: 1, name: '계란', quantity: 4, unit: '개', expiryDate: '2024-01-10', category: 'dairy', icon: Egg },
  { id: 2, name: '우유', quantity: 1, unit: '팩', expiryDate: '2024-01-08', category: 'dairy', icon: Milk },
  { id: 3, name: '사과', quantity: 3, unit: '개', expiryDate: '2024-01-12', category: 'fruit', icon: Apple },
  { id: 4, name: '닭가슴살', quantity: 500, unit: 'g', expiryDate: '2024-01-09', category: 'meat', icon: Beef }
]

const recipes = [
  {
    id: 1,
    name: '계란볶음밥',
    ingredients: ['계란', '밥', '파'],
    cookTime: '15분',
    difficulty: '쉬움',
    available: true
  },
  {
    id: 2,
    name: '사과 샐러드',
    ingredients: ['사과', '양상추', '드레싱'],
    cookTime: '10분',
    difficulty: '쉬움',
    available: true
  },
  {
    id: 3,
    name: '닭가슴살 스테이크',
    ingredients: ['닭가슴살', '올리브오일', '소금'],
    cookTime: '20분',
    difficulty: '보통',
    available: true
  },
  {
    id: 4,
    name: '파스타',
    ingredients: ['파스타면', '토마토소스', '치즈'],
    cookTime: '25분',
    difficulty: '보통',
    available: false
  }
]

const shoppingList = [
  { id: 1, name: '파스타면', quantity: 1, unit: '봉', checked: false },
  { id: 2, name: '토마토소스', quantity: 1, unit: '병', checked: false },
  { id: 3, name: '치즈', quantity: 200, unit: 'g', checked: true },
  { id: 4, name: '양상추', quantity: 1, unit: '포기', checked: false }
]

export default function ShoppingPage() {
  const [fridgeData, setFridgeData] = useState(fridgeItems)
  const [recipeData, setRecipeData] = useState(recipes)
  const [shoppingData, setShoppingData] = useState(shoppingList)
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', expiryDate: '' })

  const getExpiryStatus = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { status: 'expired', color: 'red', text: '유통기한 만료' }
    if (diffDays <= 2) return { status: 'warning', color: 'orange', text: `${diffDays}일 남음` }
    return { status: 'good', color: 'green', text: `${diffDays}일 남음` }
  }

  const expiringItems = fridgeData.filter(item => {
    const status = getExpiryStatus(item.expiryDate)
    return status.status === 'warning' || status.status === 'expired'
  })

  const availableRecipes = recipeData.filter(recipe => recipe.available).length
  const totalItems = fridgeData.length
  const completedShopping = shoppingData.filter(item => item.checked).length

  const addFridgeItem = () => {
    if (newItem.name && newItem.quantity && newItem.unit && newItem.expiryDate) {
      const item = {
        id: Date.now(),
        name: newItem.name,
        quantity: parseInt(newItem.quantity),
        unit: newItem.unit,
        expiryDate: newItem.expiryDate,
        category: 'etc',
        icon: Apple
      }
      setFridgeData([...fridgeData, item])
      setNewItem({ name: '', quantity: '', unit: '', expiryDate: '' })
    }
  }

  const toggleShoppingItem = (id) => {
    setShoppingData(shoppingData.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="장보기 & 식사 도우미"
        description="냉장고 재료 관리와 레시피 추천으로 효율적인 식사 계획"
        badge="식사 관리"
        icon={ShoppingCart}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Refrigerator}
          title="냉장고 재료"
          value={`${totalItems}개`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={ChefHat}
          title="만들 수 있는 요리"
          value={`${availableRecipes}개`}
          color="green"
          delay={0.1}
        />
        <StatCard
          icon={AlertTriangle}
          title="유통기한 임박"
          value={`${expiringItems.length}개`}
          color="orange"
          delay={0.2}
        />
        <StatCard
          icon={CheckCircle}
          title="장보기 완료"
          value={`${completedShopping}/${shoppingData.length}`}
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="fridge" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fridge">냉장고 관리</TabsTrigger>
          <TabsTrigger value="recipes">레시피 추천</TabsTrigger>
          <TabsTrigger value="shopping">장보기 목록</TabsTrigger>
          <TabsTrigger value="meal-plan">식단 계획</TabsTrigger>
        </TabsList>

        {/* Fridge Management */}
        <TabsContent value="fridge" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fridge Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Refrigerator className="w-5 h-5" />
                    냉장고 재료
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fridgeData.map((item, index) => {
                      const Icon = item.icon
                      const expiryStatus = getExpiryStatus(item.expiryDate)
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-primary" />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <Badge 
                              variant={expiryStatus.status === 'expired' ? 'destructive' : 'secondary'}
                              className={expiryStatus.status === 'warning' ? 'bg-orange-100 text-orange-800' : ''}
                            >
                              {expiryStatus.text}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            수량: {item.quantity}{item.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            유통기한: {item.expiryDate}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Item */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    재료 추가
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-name">재료명</Label>
                    <Input
                      id="item-name"
                      placeholder="재료명을 입력하세요"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">수량</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="수량"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">단위</Label>
                      <Input
                        id="unit"
                        placeholder="개, g, ml"
                        value={newItem.unit}
                        onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">유통기한</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newItem.expiryDate}
                      onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                    />
                  </div>
                  <Button onClick={addFridgeItem} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    재료 추가
                  </Button>
                </CardContent>
              </Card>

              {/* Expiry Alerts */}
              {expiringItems.length > 0 && (
                <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                      <AlertTriangle className="w-5 h-5" />
                      유통기한 알림
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {expiringItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-orange-800 dark:text-orange-200">{item.name}</span>
                          <Badge variant="outline" className="text-orange-700 border-orange-300">
                            {getExpiryStatus(item.expiryDate).text}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Recipe Recommendations */}
        <TabsContent value="recipes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                추천 레시피
              </CardTitle>
              <CardDescription>
                냉장고 재료로 만들 수 있는 요리를 추천해드립니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipeData.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      recipe.available 
                        ? 'bg-green-50 border-green-200 dark:bg-green-950/20' 
                        : 'bg-gray-50 border-gray-200 dark:bg-gray-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{recipe.name}</h3>
                      <Badge variant={recipe.available ? 'default' : 'secondary'}>
                        {recipe.available ? '만들 수 있음' : '재료 부족'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{recipe.difficulty}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">재료: </span>
                        <span>{recipe.ingredients.join(', ')}</span>
                      </div>
                    </div>
                    <Button 
                      variant={recipe.available ? 'default' : 'outline'} 
                      size="sm" 
                      className="w-full mt-3"
                      disabled={!recipe.available}
                    >
                      <Utensils className="w-4 h-4 mr-2" />
                      {recipe.available ? '요리하기' : '재료 구매'}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shopping List */}
        <TabsContent value="shopping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                장보기 목록
              </CardTitle>
              <CardDescription>
                레시피 기반으로 자동 생성된 장보기 목록입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shoppingData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.checked ? 'bg-green-50 border-green-200 dark:bg-green-950/20' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleShoppingItem(item.id)}
                        className="p-1"
                      >
                        {item.checked ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                        )}
                      </Button>
                      <div className={item.checked ? 'line-through text-muted-foreground' : ''}>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {item.quantity}{item.unit}
                        </span>
                      </div>
                    </div>
                    <Badge variant={item.checked ? 'default' : 'secondary'}>
                      {item.checked ? '완료' : '대기'}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  항목 추가
                </Button>
                <Button variant="outline">
                  자동 생성
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Planning */}
        <TabsContent value="meal-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                주간 식단 계획
              </CardTitle>
              <CardDescription>
                일주일 식단을 미리 계획하고 필요한 재료를 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                  <div key={day} className="space-y-2">
                    <h3 className="font-semibold text-center">{day}</h3>
                    <div className="space-y-2">
                      {['아침', '점심', '저녁'].map(meal => (
                        <div key={meal} className="p-2 border rounded text-center text-sm">
                          <div className="text-xs text-muted-foreground mb-1">{meal}</div>
                          <div className="text-xs">
                            {index === 0 && meal === '저녁' ? '계란볶음밥' : '미정'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button>
                  <ChefHat className="w-4 h-4 mr-2" />
                  AI 식단 추천받기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

