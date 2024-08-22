import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonChart () {
  return (
    <div className="space-y-4 p-5">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-72 w-full rounded-md" />
    </div>
  )
}