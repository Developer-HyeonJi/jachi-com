import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { SectionHeader } from '../components/ui/section-header'
import { StatCard } from '../components/ui/stat-card'
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  MapPin,
  ShoppingBag,
  Plus,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'
import { motion } from 'framer-motion'

const posts = [
  {
    id: 1,
    title: '자취방 곰팡이 제거 꿀팁 공유합니다!',
    author: '자취고수',
    category: '청소',
    likes: 24,
    comments: 8,
    time: '2시간 전',
    content: '베이킹소다와 식초를 이용한 천연 곰팡이 제거법...'
  },
  {
    id: 2,
    title: '혼자 먹기 좋은 간단 요리 레시피',
    author: '요리초보',
    category: '요리',
    likes: 18,
    comments: 12,
    time: '4시간 전',
    content: '계란볶음밥 맛있게 만드는 법을 알려드릴게요...'
  },
  {
    id: 3,
    title: '강남역 근처 공동구매 하실 분?',
    author: '절약왕',
    category: '공동구매',
    likes: 15,
    comments: 6,
    time: '6시간 전',
    content: '생필품 대량 구매로 배송비 절약해요!'
  }
]

const groups = [
  { id: 1, name: '강남구 자취생 모임', members: 156, category: '지역' },
  { id: 2, name: '요리 초보 탈출', members: 89, category: '요리' },
  { id: 3, name: '절약 생활 꿀팁', members: 234, category: '절약' },
  { id: 4, name: '청소 마스터', members: 67, category: '청소' }
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = ['all', '요리', '청소', '절약', '공동구매', '기타']
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        title="커뮤니티"
        description="자취 팁 공유와 지역별 모임으로 함께하는 자취 생활"
        badge="소통"
        icon={Users}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="활성 사용자"
          value="1,234명"
          color="blue"
          delay={0}
        />
        <StatCard
          icon={MessageSquare}
          title="오늘 게시글"
          value="45개"
          color="green"
          delay={0.1}
        />
        <StatCard
          icon={ShoppingBag}
          title="진행 중인 공구"
          value="12건"
          color="purple"
          delay={0.2}
        />
        <StatCard
          icon={TrendingUp}
          title="인기 태그"
          value="#요리팁"
          color="orange"
          delay={0.3}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">게시판</TabsTrigger>
          <TabsTrigger value="groups">모임</TabsTrigger>
          <TabsTrigger value="purchase">공동구매</TabsTrigger>
        </TabsList>

        {/* Posts */}
        <TabsContent value="posts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Posts List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      자취 팁 & 고민 게시판
                    </CardTitle>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      글쓰기
                    </Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category === 'all' ? '전체' : category}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary">{post.category}</Badge>
                              <span className="text-sm text-muted-foreground">{post.time}</span>
                            </div>
                            <h3 className="font-medium mb-1">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{post.content}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>by {post.author}</span>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    인기 태그
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['#요리팁', '#청소법', '#절약', '#공구', '#인테리어'].map(tag => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    이주의 베스트
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium">전자레인지 청소법</div>
                      <div className="text-muted-foreground">❤️ 156</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">원룸 수납 아이디어</div>
                      <div className="text-muted-foreground">❤️ 142</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">혼밥 레시피 모음</div>
                      <div className="text-muted-foreground">❤️ 128</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Groups */}
        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                지역별 모임
              </CardTitle>
              <CardDescription>
                같은 지역 자취생들과 함께 모임을 만들어보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{group.category}</Badge>
                      <span className="text-sm text-muted-foreground">{group.members}명</span>
                    </div>
                    <h3 className="font-medium mb-3">{group.name}</h3>
                    <Button size="sm" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      참여하기
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Group Purchase */}
        <TabsContent value="purchase" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                공동구매
              </CardTitle>
              <CardDescription>
                함께 구매해서 배송비를 절약하고 더 저렴하게 쇼핑하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: '생필품 대량 구매', participants: '8/10명', deadline: '2일 남음', location: '강남구' },
                  { title: '과일 박스 공구', participants: '12/15명', deadline: '1일 남음', location: '서초구' },
                  { title: '세제 공동구매', participants: '5/8명', deadline: '3일 남음', location: '송파구' }
                ].map((purchase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{purchase.title}</h3>
                      <Badge variant="outline">
                        <MapPin className="w-3 h-3 mr-1" />
                        {purchase.location}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>참여: {purchase.participants}</span>
                      <span>
                        <Clock className="w-4 h-4 inline mr-1" />
                        {purchase.deadline}
                      </span>
                    </div>
                    <Button size="sm" className="w-full">
                      참여하기
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

