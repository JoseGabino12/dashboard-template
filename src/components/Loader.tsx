import '@/styles/loader.css'
import { Card, CardContent } from '@/components/ui/card'

export default function Loader () {
  return (
    <main className='h-[100dvh] flex justify-center items-center'>
      <Card className="w-[350px] min-h-[377px] flex items-center justify-center">
        <CardContent className="flex items-center justify-center">
          <div className="loader">
            <p className="heading">Loading</p>
            <div className="loading">
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
