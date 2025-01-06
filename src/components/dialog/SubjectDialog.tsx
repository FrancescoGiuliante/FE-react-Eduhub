import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ISubject from "@/interfaces/Subject";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

interface SubjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: ISubject[];
}

export function SubjectDialog({ isOpen, onClose, subjects }: SubjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subjects</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <ul className="list-none p-0">
            {subjects.map((subject) => (
              <li key={subject.id} className="flex items-center space-x-2 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex justify-between items-center cursor-pointer hover:underline">
                      <span>{subject.name}</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{subject.name}</h4>
                      <p className="text-sm">Description: {subject.description}</p>
                      <p className="text-sm">Professors: {subject.professorIDs.length}</p>
                      <p className="text-sm">Quizzes: {subject.quizIDs.length}</p>
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
