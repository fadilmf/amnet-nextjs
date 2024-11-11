"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  handphone: number | null;
  institution: string | null;
  position: string | null;
  status: "ACTIVE" | "INACTIVE";
  role: "ADMIN" | "SUPER_ADMIN" | "USER";
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");
      console.log;
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData: Partial<User>) => {
    console.log("ini userdata: ", userData);
    try {
      const response = await axios.post("/api/users", userData);
      setUsers([...users, response.data]);
      setIsAddDialogOpen(false);
      //   toast({
      //     title: "User added successfully",
      //     description: `${userData.username} has been added to the user list.`,
      //   });
    } catch (err) {
      console.error("Error adding user:", err);
      let errorMessage = "Failed to add user. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          errorMessage = `Server error: ${err.response.status}. ${
            err.response.data.error || ""
          }`;
        } else if (err.request) {
          console.error("Request:", err.request);
          errorMessage =
            "No response received from the server. Please check your connection.";
        } else {
          console.error("Error message:", err.message);
          errorMessage = err.message;
        }
      }
      //   toast({
      //     title: "Error",
      //     description: errorMessage,
      //     variant: "destructive",
      //   });
    }
  };

  const handleEditUser = async (userData: Partial<User>) => {
    if (!currentUser) return;
    try {
      const response = await axios.put(
        `/api/users/${currentUser.id}`,
        userData
      );
      setUsers(
        users.map((user) => (user.id === currentUser.id ? response.data : user))
      );
      setIsEditDialogOpen(false);
      //   toast({
      //     title: "User updated successfully",
      //     description: `${userData.username}'s information has been updated.`,
      //   });
    } catch (err) {
      console.error("Error updating user:", err);
      //   toast({
      //     title: "Error",
      //     description: "Failed to update user. Please try again.",
      //     variant: "destructive",
      //   });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        // toast({
        //   title: "User deleted successfully",
        //   description: "The user has been removed from the list.",
        // });
      } catch (err) {
        console.error("Error deleting user:", err);
        // toast({
        //   title: "Error",
        //   description: "Failed to delete user. Please try again.",
        //   variant: "destructive",
        // });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <UserForm onSubmit={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{`${user.firstName || ""} ${
                user.lastName || ""
              }`}</TableCell>
              <TableCell>{user.email || "N/A"}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentUser(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <UserForm
                        onSubmit={handleEditUser}
                        initialData={currentUser}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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

interface UserFormProps {
  onSubmit: (userData: Partial<User>) => void;
  initialData?: User | null;
}

function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(
    initialData || {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      handphone: null,
      institution: "",
      position: "",
      status: "ACTIVE",
      role: "USER",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="handphone"
          className="block text-sm font-medium text-gray-700"
        >
          Handphone
        </label>
        <Input
          id="handphone"
          name="handphone"
          type="number"
          value={formData.handphone || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="institution"
          className="block text-sm font-medium text-gray-700"
        >
          Institution
        </label>
        <Input
          id="institution"
          name="institution"
          value={formData.institution || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="position"
          className="block text-sm font-medium text-gray-700"
        >
          Position
        </label>
        <Input
          id="position"
          name="position"
          value={formData.position || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value) =>
            setFormData({ ...formData, status: value as "ACTIVE" | "INACTIVE" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <Select
          name="role"
          value={formData.role}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              role: value as "ADMIN" | "SUPER_ADMIN" | "USER",
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{initialData ? "Update User" : "Add User"}</Button>
    </form>
  );
}
