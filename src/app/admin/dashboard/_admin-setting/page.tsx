// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { AdminTable } from "@/components/table/admin-table";
// import { AddAdminModal } from "@/components/table/add-admin-modal";
// import { Pagination } from "@/components/table/pagination";

// interface Admin {
//   id: string;
//   name: string;
//   email: string;
//   country: string;
//   phoneNumber: string;
//   institution: string;
//   position: string;
//   username: string;
//   status: "active" | "inactive";
// }

// export default function SuperAdminsPage() {
//   const [superAdmins, setSuperAdmins] = useState<Admin[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const adminsPerPage = 10;

//   useEffect(() => {
//     const fetchSuperAdmins = async () => {
//       try {
//         const response = await axios.get(
//           `/api/users?page=${currentPage}&limit=${adminsPerPage}`
//         );
//         setSuperAdmins(response.data.users);
//         setTotalPages(Math.ceil(response.data.totalUsers / adminsPerPage));

//         console.log("user repon: ", response.data);
//       } catch (error) {
//         console.error("Failed to fetch super admins:", error);
//       }
//     };

//     fetchSuperAdmins();
//   }, [currentPage]);

//   const handleAddSuperAdmin = async (newAdmin: Omit<Admin, "id">) => {
//     try {
//       // Pastikan `password` diatur dengan benar saat dikirim ke server
//       const response = await axios.post("/api/users", {
//         ...newAdmin,
//         password: "defaultPassword", // atau cara yang sesuai untuk menangani password
//         status: "ACTIVE",
//       });

//       setSuperAdmins((prevAdmins) => [...prevAdmins, response.data]);
//       console.log("New admin added:", response.data);
//     } catch (error) {
//       console.error("Failed to add new admin:", error);
//       alert(
//         "Error adding admin: " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const handleEditSuperAdmin = (admin: Admin) => {
//     // Implementasi edit admin
//   };

//   const handleDeleteSuperAdmin = (admin: Admin) => {
//     setSuperAdmins(superAdmins.filter((a) => a.id !== admin.id));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Super Admins</h1>
//         <AddAdminModal onAddAdmin={handleAddSuperAdmin} />
//       </div>
//       <AdminTable
//         admins={superAdmins}
//         onEdit={handleEditSuperAdmin}
//         onDelete={handleDeleteSuperAdmin}
//       />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// }
