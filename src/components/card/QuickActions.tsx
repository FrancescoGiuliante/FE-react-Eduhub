import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";


export function QuickActions() {
  const { user } = useAuth();
  const [actions, setActions] = useState<{ title: string, to: string }[]>([]);

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      setActions([
        { title: 'Scan QR Code', to: '/home/scan-qr' },
        { title: 'My Classes', to: '/home/my-classes' },
        { title: 'Quizzes', to: '/home/quizzes' },
      ]);
    } else if (user?.role === 'PROFESSOR') {
      setActions([
        { title: 'My Classes', to: '/home/my-classes' },
        { title: 'My Subjects and Quizzes', to: '/home/tables-sub&quiz' },
        { title: 'My Questions', to: '/home/my-questions' },
      ]);
    } else {
      setActions([]);
    }
  }, [user]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-blue-100 rounded-lg p-4 text-center text-blue-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 ">
        {actions.map((action, index) => (
          <Button key={index} asChild variant="outline" className="justify-start">
            <Link to={action.to}>{action.title}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
