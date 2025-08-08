import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  color = "from-blue-500 to-purple-600",
  badge,
  onClick,
  buttonText = "자세히 보기",
  delay = 0,
  className = ""
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
              {Icon && <Icon className="w-6 h-6 text-white" />}
            </div>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm leading-relaxed mb-4">
            {description}
          </CardDescription>
          {onClick && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full group-hover:bg-primary/10 transition-colors"
              onClick={onClick}
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

