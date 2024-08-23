import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard () {
  return (
    <>
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
    </>
  )
}