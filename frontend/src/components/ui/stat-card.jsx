import { Card, CardContent } from '../../components/ui/card'
import { motion } from 'framer-motion'

function StatCard({ icon: Icon, title, value, description, color = "primary", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
            {Icon && (
              <div className={`p-3 rounded-xl bg-${color}/10`}>
                <Icon className={`w-6 h-6 text-${color}`} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { StatCard }
