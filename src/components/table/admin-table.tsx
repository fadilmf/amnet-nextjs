import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Admin {
  id: string;
  name: string;
  email: string;
  country: string;
  phoneNumber: string;
  institution: string;
  position: string;
  username: string;
  status: "active" | "inactive";
}

interface AdminTableProps {
  admins: Admin[];
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
}

export function AdminTable({ admins, onEdit, onDelete }: AdminTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Institution</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.country}</TableCell>
              <TableCell>{admin.phoneNumber}</TableCell>
              <TableCell>{admin.institution}</TableCell>
              <TableCell>{admin.position}</TableCell>
              <TableCell>{admin.username}</TableCell>
              <TableCell>{admin.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(admin)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(admin)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
