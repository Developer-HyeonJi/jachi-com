import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  Clock, 
  Zap, 
  Droplets, 
  Trash2, 
  MapPin,
  Bell,
  CheckCircle,
  AlertCircle,
  Calendar,
  Home,
  Wrench
} from 'lucide-react'
import { motion } from 'framer-motion'

const schedules = [
  { id: 1, title: '전기 검침', type: 'utilities', dueDate: '2024-01-15', status: 'pending', icon: Zap },
  { id: 2, title: '가스 안전점검', type: 'safety', dueDate: '2024-01-20', status: 'pending', icon: Wrench },
  { id: 3, title: '정수기 필터 교체', type: 'maintenance', dueDate: '2024-01-25', status: 'completed', icon: Droplets },
  { id: 4, title: '분리수거', type: 'cleaning', dueDate: '2024-01-08', status: 'overdue', icon: Trash2 }
]

const facilities = [
  { id: 1, name: '세탁소', type: 'laundry', distance: '50m', address: '서울시 강남구 역삼동 123-45' },
  { id: 2, name: '편의점', type: 'convenience', distance: '30m', address: '서울시 강남구 역삼동 123-46' },
  { id: 3, name: '마트', type: 'mart', distance: '200m', address: '서울시 강남구 역삼동 123-47' },
  { id: 4, name: '택배함', type: 'delivery', distance: '10m', address: '서울시 강남구 역삼동 123-48' }
]

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState(schedules)
  
  const pendingTasks = scheduleData.filter(item => item.status === 'pending').length
  const overdueTasks = scheduleData.filter(item => item.status === 'overdue').length
  const completedTasks = scheduleData.filter(item => item.status === 'completed').length

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green'
      case 'overdue': return 'red'
      case 'pending': return 'yellow'
      default: return 'gray'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '완료'
      case 'overdue': return '지연'
      case 'pending': return '대기'
      default: return '알 수 없음'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="집 관리 알림"
        description="정기 점검과 공과금 납부일을 놓치지 않도록 스마트 알림"
        badge="집 관리"
        icon={Clock}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          title="대기 중인 작업"
          value={`${pendingTasks}개`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={AlertCircle}
          title="지연된 작업"
          value={`${overdueTasks}개`}
          color="red"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle}
          title="완료된 작업"
          value={`${completedTasks}개`}
          color="green"
          delay={0.2}
        />
        <StatCard
          icon={MapPin}
          title="주변 편의시설"
          value={`${facilities.length}곳`}
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">일정 관리</TabsTrigger>
          <TabsTrigger value="facilities">편의시설</TabsTrigger>
          <TabsTrigger value="notifications">알림 설정</TabsTrigger>
        </TabsList>

        {/* Schedule Management */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Schedule List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    관리 일정
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduleData.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                예정일: {item.dueDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={item.status === 'completed' ? 'default' : 'secondary'}
                              className={`bg-${getStatusColor(item.status)}-100 text-${getStatusColor(item.status)}-800`}
                            >
                              {getStatusText(item.status)}
                            </Badge>
                            {item.status === 'pending' && (
                              <Button size="sm" variant="outline">
                                완료 표시
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    빠른 작업
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    전기 검침 알림 설정
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Droplets className="w-4 h-4 mr-2" />
                    수도 점검 예약
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Trash2 className="w-4 h-4 mr-2" />
                    분리수거 알림
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    정기 청소 일정
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Bell className="w-5 h-5" />
                    다가오는 알림
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">전기 검침</span>
                      <span className="text-blue-600 dark:text-blue-400">7일 후</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-200">가스 안전점검</span>
                      <span className="text-blue-600 dark:text-blue-400">12일 후</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Facilities */}
        <TabsContent value="facilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                주변 편의시설
              </CardTitle>
              <CardDescription>
                집 주변의 편의시설 정보를 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{facility.name}</h3>
                      <Badge variant="secondary">{facility.distance}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {facility.address}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        길찾기
                      </Button>
                      <Button size="sm" variant="outline">
                        정보
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                알림 설정
              </CardTitle>
              <CardDescription>
                각종 관리 일정에 대한 알림을 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">공과금 알림</h3>
                  <div className="space-y-3">
                    {['전기세', '가스비', '수도세', '관리비'].map(bill => (
                      <div key={bill} className="flex items-center justify-between p-3 rounded-lg border">
                        <span>{bill} 납부 알림</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">매월 25일</span>
                          <Button size="sm" variant="outline">설정</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">정기 점검 알림</h3>
                  <div className="space-y-3">
                    {['가스 안전점검', '정수기 필터', '에어컨 청소', '보일러 점검'].map(check => (
                      <div key={check} className="flex items-center justify-between p-3 rounded-lg border">
                        <span>{check} 알림</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">3개월마다</span>
                          <Button size="sm" variant="outline">설정</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

