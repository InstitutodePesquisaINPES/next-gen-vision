import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-12 h-12">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-sm text-muted-foreground">Carregando...</span>
      </motion.div>
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-muted/50 rounded-lg w-3/4" />
      <div className="space-y-3">
        <div className="h-4 bg-muted/40 rounded w-full" />
        <div className="h-4 bg-muted/40 rounded w-5/6" />
        <div className="h-4 bg-muted/40 rounded w-4/6" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-muted/50 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted/50 rounded w-2/3" />
          <div className="h-3 bg-muted/40 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted/40 rounded w-full" />
        <div className="h-3 bg-muted/40 rounded w-5/6" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
