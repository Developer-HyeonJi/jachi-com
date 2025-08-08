import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Alert, AlertDescription } from '../components/ui/alert'
import { 
  Mail, 
  Home,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email) {
      setError('이메일을 입력해주세요.')
      setLoading(false)
      return
    }

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 1000)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">이메일을 확인하세요</CardTitle>
              <CardDescription>
                비밀번호 재설정 링크를 보내드렸습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>{email}</strong>로 비밀번호 재설정 링크를 보내드렸습니다.
                </p>
                <p className="text-sm text-muted-foreground">
                  이메일을 확인하고 링크를 클릭하여 새 비밀번호를 설정하세요.
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    로그인으로 돌아가기
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                  다른 이메일로 재전송
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                이메일이 오지 않았나요? 스팸 폴더를 확인해보세요.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              자취라이프
            </span>
          </Link>
          <p className="text-muted-foreground mt-2">비밀번호를 잊으셨나요?</p>
        </div>

        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">비밀번호 찾기</CardTitle>
            <CardDescription>
              가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="가입하신 이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                disabled={loading}
              >
                {loading ? '전송 중...' : '재설정 링크 보내기'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">비밀번호가 기억나셨나요? </span>
              <Link
                to="/auth/login" 
                className="text-primary hover:underline font-medium"
              >
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link
            to="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

