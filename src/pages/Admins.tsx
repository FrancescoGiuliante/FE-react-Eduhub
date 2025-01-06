import { UserCard } from "@/components/card/UserCard"
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/contexts/StoreContext"
import IUser from "@/interfaces/User";
import { Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Admins = () => {
    const { users } = useStoreContext();
    const [admins, setAdmins] = useState<IUser[]>([]);

    useEffect(() => {
        const filteredAdmins = users.filter(user => user.role === "ADMIN");
        setAdmins(filteredAdmins);
    }, [users]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-blue-800">All Admin Accounts</h1>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {admins.length}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Admin List</h2>
                <Link to="/home/register-admin">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                        <Plus className="mr-2 h-5 w-5" />
                        Add New Admin
                    </Button>
                </Link>
            </div>

            {admins.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No admins found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {admins.map(admin => (
                        <UserCard key={admin.id} user={admin} />
                    ))}
                </div>
            )}
        </div>
    );
};