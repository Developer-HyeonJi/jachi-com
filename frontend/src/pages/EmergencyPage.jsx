import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  Phone, 
  Heart, 
  Brain, 
  MapPin,
  AlertTriangle,
  Shield,
  Zap,
  Droplets,
  Flame,
  Users
} from 'lucide-react'
import { motion } from 'framer-motion'

const emergencyContacts = [
  { id: 1, name: '종합상황실 (화재/구급/구조)', number: '119', icon: Flame, color: 'red' },
  { id: 2, name: '경찰서 (신고)', number: '112', icon: Shield, color: 'blue' },
  { id: 3, name: '가스안전공사', number: '1544-4500', icon: Zap, color: 'orange' },
  { id: 4, name: '수도사업소', number: '120', icon: Droplets, color: 'cyan' },
  { id: 5, name: '전력공사', number: '123', icon: Zap, color: 'yellow' },
  { id: 6, name: '자살예방상담전화', number: '1393', icon: Heart, color: 'pink' }
]

const mentalHealthServices = [
  { name: '청년 마음건강센터', phone: '02-1234-5678', address: '서울시 강남구', type: '상담소' },
  { name: '서울시 정신건강센터', phone: '02-2345-6789', address: '서울시 중구', type: '센터' },
  { name: '대학생 상담센터', phone: '02-3456-7890', address: '서울시 서초구', type: '상담소' }
]

export default function EmergencyPage() {
  const stressLevel = 65 // 예시 스트레스 수치

  const getStressColor = (level) => {
    if (level < 30) return 'green'
    if (level < 70) return 'yellow'
    return 'red'
  }

  const getStressText = (level) => {
    if (level < 30) return '양호'
    if (level < 70) return '주의'
    return '위험'
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="비상 연락 & 멘탈 관리"
        description="긴급번호와 스트레스 진단으로 안전한 자취 생활"
        badge="안전"
        icon={Phone}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Phone}
          title="등록된 긴급번호"
          value={`${emergencyContacts.length}개`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={Brain}
          title="스트레스 수치"
          value={`${stressLevel}%`}
          color={getStressColor(stressLevel)}
          delay={0.1}
        />
        <StatCard
          icon={Heart}
          title="상담소 정보"
          value={`${mentalHealthServices.length}곳`}
          color="pink"
          delay={0.2}
        />
        <StatCard
          icon={Users}
          title="24시간 지원"
          value="가능"
          color="green"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Emergency Contacts */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                긴급 연락처
              </CardTitle>
              <CardDescription>
                자취생이 알아야 할 필수 긴급번호들입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${contact.color}-100 dark:bg-${contact.color}-950`}>
                          <Icon className={`w-5 h-5 text-${contact.color}-600 dark:text-${contact.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{contact.name}</h3>
                          <p className="text-2xl font-bold text-primary">{contact.number}</p>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        전화걸기
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Mental Health Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                상담소 & 병원 정보
              </CardTitle>
              <CardDescription>
                스트레스나 우울감이 있을 때 도움받을 수 있는 곳들입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentalHealthServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <Badge variant="secondary">{service.type}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{service.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{service.address}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-4 h-4 mr-1" />
                        전화
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="w-4 h-4 mr-1" />
                        위치
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stress Assessment */}
        <div className="space-y-6">
          <Card className={`border-${getStressColor(stressLevel)}-200 bg-${getStressColor(stressLevel)}-50/50 dark:bg-${getStressColor(stressLevel)}-950/20`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 text-${getStressColor(stressLevel)}-700 dark:text-${getStressColor(stressLevel)}-300`}>
                <Brain className="w-5 h-5" />
                스트레스 진단
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stressLevel}%</div>
                  <Badge 
                    variant={stressLevel > 70 ? 'destructive' : 'secondary'}
                    className={stressLevel < 70 && stressLevel > 30 ? 'bg-yellow-100 text-yellow-800' : ''}
                  >
                    {getStressText(stressLevel)}
                  </Badge>
                </div>
                
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 bg-${getStressColor(stressLevel)}-500`}
                    style={{ width: `${stressLevel}%` }}
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <p className={`text-${getStressColor(stressLevel)}-800 dark:text-${getStressColor(stressLevel)}-200`}>
                    {stressLevel > 70 
                      ? '스트레스 수치가 높습니다. 전문가 상담을 권합니다.'
                      : stressLevel > 30 
                      ? '적당한 스트레스 수준입니다. 휴식을 취해보세요.'
                      : '스트레스 관리가 잘 되고 있습니다!'
                    }
                  </p>
                </div>

                <Button className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  스트레스 진단 다시하기
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                응급 상황 대처
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Flame className="w-4 h-4 mr-2" />
                화재 발생 시
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                가스 누출 시
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Droplets className="w-4 h-4 mr-2" />
                수도 고장 시
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                응급 의료 상황
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Heart className="w-5 h-5" />
                마음 건강 팁
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <p>• 규칙적인 수면 패턴 유지하기</p>
                <p>• 적당한 운동으로 스트레스 해소</p>
                <p>• 가족, 친구와 소통하기</p>
                <p>• 취미 활동으로 기분 전환</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

