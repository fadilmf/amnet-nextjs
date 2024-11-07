import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddAdminModalProps {
  onAddAdmin: (admin: Omit<Admin, "id">) => void;
}

export function AddAdminModal({ onAddAdmin }: AddAdminModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phoneNumber: "",
    institution: "",
    position: "",
    username: "",
    status: "active" as "active" | "inactive",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAdmin(formData);
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      country: "",
      phoneNumber: "",
      institution: "",
      position: "",
      username: "",
      status: "active",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as "active" | "inactive",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Admin</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
