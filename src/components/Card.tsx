import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { CardProps } from '@/interfaces/interfaces';

export const CardInfo = ( { title, icon, value }: CardProps ) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          { title }
        </CardTitle>
        { icon }
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}