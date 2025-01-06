import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import IStudent from '@/interfaces/IStudent';

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  students: IStudent[];
}

export function StudentDialog({ isOpen, onClose, students }: StudentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Students</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <ul className="list-none p-0">
            {students.map((student) => (
              <li key={student.id} className="flex items-center space-x-2 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex justify-between items-center cursor-pointer hover:underline">
                      <span>{student.name} {student.lastName}</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{student.name} {student.lastName}</h4>
                      <p className="text-sm">Email: {student.email}</p>
                      <p className="text-sm">Participations: {student.participations.length}</p>
                      <p className="text-sm">Quizzes taken: {student.voteIDs.length}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
