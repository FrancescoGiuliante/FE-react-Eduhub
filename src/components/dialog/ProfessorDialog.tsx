import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import IProfessor from "@/interfaces/IProfessor";

interface ProfessorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  professors: IProfessor[];
}

export function ProfessorDialog({ isOpen, onClose, professors }: ProfessorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Professors</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <ul className="list-none p-0">
            {professors.map((professor) => (
              <li key={professor.id} className="flex items-center space-x-2 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex justify-between items-center cursor-pointer hover:underline">
                      <span>{professor.name} {professor.lastName}</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{professor.name} {professor.lastName}</h4>
                      <p className="text-sm">Email: {professor.email}</p>
                      <p className="text-sm">Participations: {professor.participations.length}</p>
                      <p className="text-sm">Questions created: {professor.questionIDs.length}</p>
                      <p className="text-sm">Quizzes created: {professor.quizIDs.length}</p>
                      <p className="text-sm">Rules created: {professor.ruleIDs.length}</p>
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


