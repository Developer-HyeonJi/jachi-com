import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ size = "default", text = "로딩 중..." }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8 space-y-4"
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </motion.div>
  )
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = "" 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center space-y-4 ${className}`}
    >
      {Icon && (
        <div className="p-4 rounded-full bg-muted/50">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-md">{description}</p>
        )}
      </div>
      {action}
    </motion.div>
  )
}
