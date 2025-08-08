import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { 
  Wallet, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Receipt,
  Camera,
  Brain,
  Calendar,
  DollarSign
} from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  { id: 'rent', name: '월세', color: '#8B5CF6' },
  { id: 'utilities', name: '공과금', color: '#06B6D4' },
  { id: 'food', name: '식비', color: '#10B981' },
  { id: 'transport', name: '교통비', color: '#F59E0B' },
  { id: 'communication', name: '통신비', color: '#EF4444' },
  { id: 'shopping', name: '쇼핑', color: '#8B5CF6' },
  { id: 'entertainment', name: '여가', color: '#EC4899' },
  { id: 'etc', name: '기타', color: '#6B7280' }
]

export default function BudgetPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 500000, category: 'rent', description: '월세', date: '2024-01-01' },
    { id: 2, amount: 80000, category: 'utilities', description: '전기세', date: '2024-01-02' },
    { id: 3, amount: 25000, category: 'food', description: '마트 장보기', date: '2024-01-03' },
    { id: 4, amount: 15000, category: 'transport', description: '지하철', date: '2024-01-04' },
    { id: 5, amount: 45000, category: 'communication', description: '휴대폰 요금', date: '2024-01-05' }
  ])
  
  const [monthlyBudget, setMonthlyBudget] = useState(1000000)
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBudget = monthlyBudget - totalExpenses
  const budgetUsagePercent = (totalExpenses / monthlyBudget) * 100

  const expensesByCategory = categories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category === category.id)
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      name: category.name,
      value: total,
      color: category.color
    }
  }).filter(item => item.value > 0)

  const weeklyData = [
    { name: '1주차', amount: 180000 },
    { name: '2주차', amount: 220000 },
    { name: '3주차', amount: 195000 },
    { name: '4주차', amount: 170000 }
  ]

  const addExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      const expense = {
        id: Date.now(),
        amount: parseInt(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date
      }
      setExpenses([...expenses, expense])
      setNewExpense({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
  }

  const getCategoryName = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="생활비 관리"
        description="OCR 영수증 입력과 AI 예산 조언으로 스마트한 가계부 관리"
        badge="가계부"
        icon={Wallet}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="이번 달 예산"
          value={formatCurrency(monthlyBudget)}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={TrendingDown}
          title="총 지출"
          value={formatCurrency(totalExpenses)}
          color="red"
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          title="남은 예산"
          value={formatCurrency(remainingBudget)}
          color={remainingBudget > 0 ? "green" : "red"}
          delay={0.2}
        />
        <StatCard
          icon={Target}
          title="예산 사용률"
          value={`${budgetUsagePercent.toFixed(1)}%`}
          color={budgetUsagePercent > 80 ? "red" : "green"}
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Budget Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                예산 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>사용: {formatCurrency(totalExpenses)}</span>
                  <span>예산: {formatCurrency(monthlyBudget)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      budgetUsagePercent > 80 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(budgetUsagePercent, 100)}%` }}
                  />
                </div>
                {budgetUsagePercent > 80 && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <Brain className="w-4 h-4" />
                    <span>예산 초과 위험! 이번 주는 지출을 줄여보세요.</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <Tabs defaultValue="category" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="category">카테고리별</TabsTrigger>
              <TabsTrigger value="weekly">주간 추이</TabsTrigger>
              <TabsTrigger value="trend">월간 트렌드</TabsTrigger>
            </TabsList>

            <TabsContent value="category">
              <Card>
                <CardHeader>
                  <CardTitle>카테고리별 지출</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expensesByCategory}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {expensesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>주간 지출 추이</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Bar dataKey="amount" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trend">
              <Card>
                <CardHeader>
                  <CardTitle>월간 지출 트렌드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Line type="monotone" dataKey="amount" stroke="#8B5CF6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Add Expense & Recent */}
        <div className="space-y-6">
          {/* Add Expense */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                지출 추가
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">금액</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="금액을 입력하세요"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Input
                  id="description"
                  placeholder="지출 내용을 입력하세요"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">날짜</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Button onClick={addExpense} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  지출 추가
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    영수증 촬영
                  </Button>
                  <Button variant="outline" size="sm">
                    <Receipt className="w-4 h-4 mr-2" />
                    OCR 입력
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                최근 지출
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.slice(-5).reverse().map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{expense.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryName(expense.category)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{expense.date}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(expense.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Advice */}
          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Brain className="w-5 h-5" />
                AI 예산 조언
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-blue-800 dark:text-blue-200">
                  이번 주 배달비가 평소보다 30% 증가했습니다. 다음 주는 직접 요리해보는 것은 어떨까요?
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  교통비 절약 팁: 가까운 거리는 도보나 자전거를 이용해보세요.
                </p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  더 많은 조언 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

