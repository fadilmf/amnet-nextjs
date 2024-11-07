// src/components/UserTable.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  phoneNumber: string;
  institution: string;
  position: string;
  username: string;
  status: "Active" | "Inactive";
}

interface UserTableProps {
  users: User[];
  onAddUser: () => void;
}

export default function UserTable({ users, onAddUser }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Calculate paginated data
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">User Accounts</h1>
        <Button onClick={onAddUser}>Add New User</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.institution}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              // disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "font-bold" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              // disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
