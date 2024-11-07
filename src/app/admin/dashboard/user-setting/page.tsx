"use client";

import { useState } from "react";
import { AdminTable } from "@/components/table/admin-table";
import { AddAdminModal } from "@/components/table/add-admin-modal";
import { Pagination } from "@/components/table/pagination";
import { AddUserModal } from "@/components/table/add-user-modal";

// Mock data - replace with actual data fetching in a real application
const mockAdmins = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    country: "USA",
    phoneNumber: "+1234567890",
    institution: "AMNET USA",
    position: "Admin",
    username: "johndoe",
    status: "active" as const,
  },
  // Add more mock data as needed
];

export default function RegularAdminsPage() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 10;
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  const handleAddAdmin = (newAdmin: Omit<Admin, "id">) => {
    setAdmins([...admins, { ...newAdmin, id: (admins.length + 1).toString() }]);
  };

  const handleEditAdmin = (admin: Admin) => {
    // Implement edit functionality
    console.log("Edit admin:", admin);
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setAdmins(admins.filter((a) => a.id !== admin.id));
  };

  const paginatedAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">List of Registered User</h1>
        {/* <AddAdminModal onAddAdmin={handleAddAdmin} /> */}
        <AddUserModal onAddUser={handleAddAdmin} />
      </div>
      <AdminTable
        admins={paginatedAdmins}
        onEdit={handleEditAdmin}
        onDelete={handleDeleteAdmin}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
