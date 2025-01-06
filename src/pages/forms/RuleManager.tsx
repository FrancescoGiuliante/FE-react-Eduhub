import React, { useEffect, useState } from 'react';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import IRule from '@/interfaces/Rule';
import { useStoreContext } from '@/contexts/StoreContext';
import { useAuth } from '@/contexts/AuthContext';
import IProfessor from '@/interfaces/IProfessor';

interface RuleManagerProps {
    onSelectRule: (rule: IRule) => void;
    selectedRule: IRule | null;
}

const RuleManager: React.FC<RuleManagerProps> = ({ onSelectRule, selectedRule }) => {
    const { rules, handleRuleCreate } = useInfoClassContext();
    const { user } = useAuth();
    const { professors } = useStoreContext();
    const [professor, setProfessor] = useState<IProfessor | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newRule, setNewRule] = useState<Omit<IRule, 'id' | 'professorID'>>({
        valueRightAnswer: 1,
        valueWrongAnswer: 0,
        duration: 60,
    });

    useEffect(() => {
        const professor = professors.find((professor) => professor.userId === user?.id);
        setProfessor(professor?.id ? professor : null);
    }, [user]);

    const handleCreateRule = () => {
        if (professor?.id !== undefined) {
            handleRuleCreate({
                ...newRule,
                professorID: professor.id,
            });
            setIsCreateDialogOpen(false);
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Quiz Rules</h2>
            {selectedRule ? (
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">Selected Rule:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Correct answer value: {selectedRule.valueRightAnswer} point(s)</li>
                            <li>Incorrect answer value: {selectedRule.valueWrongAnswer} point(s)</li>
                            <li>Quiz duration: {selectedRule.duration} minutes</li>
                        </ul>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {rules.map((rule) => (
                        <Card key={rule.id} className="w-full">
                            <CardContent className="p-4">
                                <p>Right Answer: {rule.valueRightAnswer}</p>
                                <p>Wrong Answer: {rule.valueWrongAnswer}</p>
                                <p>Duration: {rule.duration} minutes</p>
                                <Button className="mt-2 w-full" onClick={() => onSelectRule(rule)}>Select</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            <Button onClick={() => setIsCreateDialogOpen(true)}>Create New Rule</Button>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Rule</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="valueRightAnswer">Value for Right Answer</Label>
                            <Input
                                id="valueRightAnswer"
                                type="number"
                                value={newRule.valueRightAnswer}
                                onChange={(e) => setNewRule({ ...newRule, valueRightAnswer: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="valueWrongAnswer">Value for Wrong Answer</Label>
                            <Input
                                id="valueWrongAnswer"
                                type="number"
                                value={newRule.valueWrongAnswer}
                                onChange={(e) => setNewRule({ ...newRule, valueWrongAnswer: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                                id="duration"
                                type="number"
                                value={newRule.duration}
                                onChange={(e) => setNewRule({ ...newRule, duration: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreateRule}>Create Rule</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RuleManager;

