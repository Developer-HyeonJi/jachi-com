import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  Calendar, 
  Clock, 
  Plus, 
  BookOpen,
  Briefcase,
  Home,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

const events = [
  { id: 1, title: '중간고사', type: 'study', date: '2024-01-15', time: '09:00', priority: 'high' },
  { id: 2, title: '알바 (카페)', type: 'work', date: '2024-01-08', time: '14:00', priority: 'medium' },
  { id: 3, title: '전기세 납부', type: 'life', date: '2024-01-10', time: '18:00', priority: 'high' },
  { id: 4, title: '친구 만나기', type: 'personal', date: '2024-01-12', time: '19:00', priority: 'low' },
  { id: 5, title: '과제 제출', type: 'study', date: '2024-01-09', time: '23:59', priority: 'high' }
]

const todayEvents = events.filter(event => event.date === '2024-01-08')
const upcomingEvents = events.filter(event => new Date(event.date) > new Date('2024-01-08')).slice(0, 5)

const getTypeIcon = (type) => {
  switch (type) {
    case 'study': return BookOpen
    case 'work': return Briefcase
    case 'life': return Home
    default: return Calendar
  }
}

const getTypeColor = (type) => {
  switch (type) {
    case 'study': return 'blue'
    case 'work': return 'green'
    case 'life': return 'orange'
    default: return 'gray'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'red'
    case 'medium': return 'yellow'
    case 'low': return 'green'
    default: return 'gray'
  }
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState('2024-01-08')
  
  const highPriorityCount = events.filter(event => event.priority === 'high').length
  const todayCount = todayEvents.length
  const completedCount = 3 // 예시

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="스마트 일정 관리"
        description="생활, 학업, 알바 일정을 통합하여 우선순위 자동 정렬"
        badge="일정"
        icon={Calendar}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          title="오늘 일정"
          value={`${todayCount}개`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={AlertCircle}
          title="높은 우선순위"
          value={`${highPriorityCount}개`}
          color="red"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle}
          title="완료된 일정"
          value={`${completedCount}개`}
          color="green"
          delay={0.2}
        />
        <StatCard
          icon={TrendingUp}
          title="이번 주 효율성"
          value="85%"
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                통합 캘린더
              </CardTitle>
              <CardDescription>
                생활, 학업, 알바 일정을 한눈에 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simple Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-center font-medium p-2 text-sm">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = i - 6 + 1
                  const isToday = date === 8
                  const hasEvent = events.some(event => 
                    parseInt(event.date.split('-')[2]) === date
                  )
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${
                        date < 1 || date > 31
                          ? 'text-muted-foreground'
                          : isToday
                          ? 'bg-primary text-primary-foreground font-bold'
                          : hasEvent
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => date > 0 && date <= 31 && setSelectedDate(`2024-01-${date.toString().padStart(2, '0')}`)}
                    >
                      {date > 0 && date <= 31 ? date : ''}
                      {hasEvent && date > 0 && date <= 31 && (
                        <div className="absolute w-1 h-1 bg-primary rounded-full mt-4"></div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Today's Events */}
              <div className="space-y-3">
                <h3 className="font-medium">오늘의 일정 (1월 8일)</h3>
                {todayEvents.length > 0 ? (
                  todayEvents.map((event, index) => {
                    const Icon = getTypeIcon(event.type)
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${getTypeColor(event.type)}-100 dark:bg-${getTypeColor(event.type)}-950`}>
                            <Icon className={`w-4 h-4 text-${getTypeColor(event.type)}-600 dark:text-${getTypeColor(event.type)}-400`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            className={`bg-${getPriorityColor(event.priority)}-100 text-${getPriorityColor(event.priority)}-800 border-${getPriorityColor(event.priority)}-300`}
                          >
                            {event.priority === 'high' ? '높음' : event.priority === 'medium' ? '보통' : '낮음'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            완료
                          </Button>
                        </div>
                      </motion.div>
                    )
                  })
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    오늘 예정된 일정이 없습니다.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Add */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                빠른 일정 추가
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                학업 일정
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Briefcase className="w-4 h-4 mr-2" />
                알바 일정
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Home className="w-4 h-4 mr-2" />
                생활 일정
              </Button>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                새 일정 추가
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                다가오는 일정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => {
                  const Icon = getTypeIcon(event.type)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-1 rounded bg-${getTypeColor(event.type)}-100 dark:bg-${getTypeColor(event.type)}-950`}>
                        <Icon className={`w-3 h-3 text-${getTypeColor(event.type)}-600 dark:text-${getTypeColor(event.type)}-400`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.date} {event.time}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <TrendingUp className="w-5 h-5" />
                AI 일정 최적화
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <p>• 과제 제출 전날 알림 설정을 권장합니다</p>
                <p>• 알바와 공부 시간 사이에 휴식 시간을 추가해보세요</p>
                <p>• 이번 주 생산성이 85%로 높습니다!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

