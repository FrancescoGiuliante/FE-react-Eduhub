import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SyllabusCardProps {
  syllabus: string
}

export function SyllabusCard({ syllabus }: SyllabusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Syllabus</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <p className="text-sm">{syllabus}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

