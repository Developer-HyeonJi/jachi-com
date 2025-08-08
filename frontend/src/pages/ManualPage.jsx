import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  FileText, 
  MessageSquare, 
  Search,
  Flame,
  Zap,
  Droplets,
  Wrench,
  Phone,
  AlertTriangle,
  CheckCircle,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'

const emergencyTypes = [
  { 
    id: 'fire', 
    title: '화재 발생', 
    icon: Flame, 
    color: 'red',
    description: '화재 발생 시 대처 방법',
    steps: [
      '119에 즉시 신고',
      '가스밸브 차단',
      '젖은 수건으로 코와 입 막기',
      '낮은 자세로 대피',
      '엘리베이터 사용 금지'
    ]
  },
  { 
    id: 'gas', 
    title: '가스 누출', 
    icon: Zap, 
    color: 'orange',
    description: '가스 냄새가 날 때 대처법',
    steps: [
      '전기 스위치 절대 건드리지 말기',
      '창문 열어 환기',
      '가스밸브 잠그기',
      '가스회사에 신고',
      '건물 밖으로 대피'
    ]
  },
  { 
    id: 'water', 
    title: '수도 고장', 
    icon: Droplets, 
    color: 'blue',
    description: '물이 안 나오거나 누수 시',
    steps: [
      '수도꼭지 확인',
      '다른 집도 같은 상황인지 확인',
      '수도 계량기 확인',
      '관리사무소에 연락',
      '응급 수리업체 연락'
    ]
  },
  { 
    id: 'electric', 
    title: '전기 고장', 
    icon: Zap, 
    color: 'yellow',
    description: '정전이나 전기 문제 발생 시',
    steps: [
      '차단기 확인',
      '다른 집 상황 확인',
      '전력회사에 신고',
      '전기기기 플러그 뽑기',
      '전문업체 연락'
    ]
  }
]

const chatMessages = [
  { id: 1, type: 'user', message: '물이 안 나와요' },
  { id: 2, type: 'bot', message: '수도 문제 해결을 도와드리겠습니다. 먼저 다른 수도꼭지도 확인해보셨나요?' },
  { id: 3, type: 'user', message: '네, 모든 곳에서 안 나와요' },
  { id: 4, type: 'bot', message: '수도 계량기를 확인해보세요. 계량기가 돌아가고 있나요?' }
]

export default function ManualPage() {
  const [selectedEmergency, setSelectedEmergency] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency(emergency)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="긴급 대처 매뉴얼"
        description="사고별 시나리오와 챗봇으로 신속한 문제 해결"
        badge="매뉴얼"
        icon={FileText}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="대처 매뉴얼"
          value={`${emergencyTypes.length}개`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={MessageSquare}
          title="챗봇 상담"
          value="24/7"
          color="green"
          delay={0.1}
        />
        <StatCard
          icon={Phone}
          title="긴급 연락처"
          value="6개"
          color="red"
          delay={0.2}
        />
        <StatCard
          icon={CheckCircle}
          title="해결 성공률"
          value="95%"
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Emergency Types */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                상황별 대처법 검색
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="예: 물이 안 나와요, 정전됐어요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                긴급 상황별 대처법
              </CardTitle>
              <CardDescription>
                상황을 선택하면 단계별 대처 방법을 안내해드립니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyTypes.map((emergency, index) => {
                  const Icon = emergency.icon
                  return (
                    <motion.div
                      key={emergency.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedEmergency?.id === emergency.id 
                          ? `border-${emergency.color}-300 bg-${emergency.color}-50 dark:bg-${emergency.color}-950/20` 
                          : 'bg-card hover:bg-muted/50'
                      }`}
                      onClick={() => handleEmergencySelect(emergency)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-${emergency.color}-100 dark:bg-${emergency.color}-950`}>
                          <Icon className={`w-5 h-5 text-${emergency.color}-600 dark:text-${emergency.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{emergency.title}</h3>
                          <p className="text-sm text-muted-foreground">{emergency.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Selected Emergency Steps */}
              {selectedEmergency && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg border bg-muted/30"
                >
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <selectedEmergency.icon className={`w-5 h-5 text-${selectedEmergency.color}-600`} />
                    {selectedEmergency.title} 대처법
                  </h3>
                  <div className="space-y-3">
                    {selectedEmergency.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-${selectedEmergency.color}-100 dark:bg-${selectedEmergency.color}-950 flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-sm font-medium text-${selectedEmergency.color}-600 dark:text-${selectedEmergency.color}-400`}>
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      긴급 신고
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      챗봇 상담
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chatbot */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI 응급 상담 챗봇
              </CardTitle>
              <CardDescription>
                상황을 설명하면 즉시 대처법을 안내해드립니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg">
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card border'
                      }`}>
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="상황을 설명해주세요..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm">
                    전송
                  </Button>
                </div>

                {/* Quick Buttons */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">빠른 질문:</p>
                  <div className="flex flex-wrap gap-2">
                    {['물이 안 나와요', '정전됐어요', '가스 냄새가 나요', '화재 발생'].map(question => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setChatInput(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <Phone className="w-5 h-5" />
                긴급 연락처
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-800 dark:text-red-200">화재/구급/구조</span>
                  <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                    119
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-800 dark:text-red-200">경찰서</span>
                  <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                    112
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-800 dark:text-red-200">가스안전공사</span>
                  <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                    1544-4500
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                지역 응급 서비스
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">가까운 병원</div>
                  <div className="text-muted-foreground">서울대병원 (2.3km)</div>
                </div>
                <div>
                  <div className="font-medium">24시간 수리업체</div>
                  <div className="text-muted-foreground">강남 응급수리 (1.5km)</div>
                </div>
                <div>
                  <div className="font-medium">가스 검사소</div>
                  <div className="text-muted-foreground">서울가스 강남지사 (3.1km)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

