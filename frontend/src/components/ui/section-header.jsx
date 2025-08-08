import { motion } from 'framer-motion'
import { Badge } from '../../components/ui/badge'

function SectionHeader({
  title, 
  description, 
  badge, 
  icon: Icon,
  className = "",
  center = false 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`space-y-4 ${center ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <Badge variant="secondary" className="mb-2">
          {Icon && <Icon className="w-4 h-4 mr-1" />}
          {badge}
        </Badge>
      )}
      
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export {SectionHeader}