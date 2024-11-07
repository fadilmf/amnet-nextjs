"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/admin/file-upload"; // Custom component for file upload
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  title: string;
  author: string;
  date: string;
  institution: string;
  email: string;
  summary: string;
  keyword: string;
  existingCondition1: string;
  existingCondition2: string;
  existingCondition3: string;
  existingCondition4: string;
  existingCondition5: string;
  existingCondition6: string;
  existingCondition7: string;
  existingCondition8: string;
  existingCondition9: string;
  existingCondition10: string;
  ecologyDim: string;
  socialDim: string;
  economyDim: string;
  institutionalDim: string;
  technologyDim: string;
  sustainability: string;
  video: string;
};

type FileData = {
  galeri: string | null;
  map: string | null;
  supportingDocument: string | null;
};

export default function AddContentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    date: "",
    institution: "",
    email: "",
    summary: "",
    keyword: "",
    existingCondition1: "",
    existingCondition2: "",
    existingCondition3: "",
    existingCondition4: "",
    existingCondition5: "",
    existingCondition6: "",
    existingCondition7: "",
    existingCondition8: "",
    existingCondition9: "",
    existingCondition10: "",
    ecologyDim: "",
    socialDim: "",
    economyDim: "",
    institutionalDim: "",
    technologyDim: "",
    sustainability: "",
    video: "",
  });

  const [fileData, setFileData] = useState<FileData>({
    galeri: null,
    map: null,
    supportingDocument: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: keyof FileData
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData((prevFileData) => ({
          ...prevFileData,
          [label]: reader.result ? reader.result.split(",")[1] : null, // Ensure result is not null
        }));
      };
      reader.readAsDataURL(file); // Read file as a Data URL
    }
  };

  // Update handleSubmit to include binary data for file uploads
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const contentData = {
      ...formData,
      cover: fileData.galeri, // base64 for the cover image
      attachmentDoc: fileData.map, // base64 for the map document
      supportingDoc: fileData.supportingDocument, // base64 for the supporting document
    };

    console.log("ini content data: ", contentData);

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      });

      if (!response.ok) throw new Error("Failed to create content");

      const result = await response.json();
      console.log("Content created:", result);

      // Reset form and file data after successful submission
      setFormData({
        title: "",
        author: "",
        date: "",
        institution: "",
        email: "",
        summary: "",
        keyword: "",
        existingCondition1: "",
        existingCondition2: "",
        existingCondition3: "",
        existingCondition4: "",
        existingCondition5: "",
        existingCondition6: "",
        existingCondition7: "",
        existingCondition8: "",
        existingCondition9: "",
        existingCondition10: "",
        ecologyDim: "",
        socialDim: "",
        economyDim: "",
        institutionalDim: "",
        technologyDim: "",
        sustainability: "",
        video: "",
      });

      setFileData({
        galeri: null,
        map: null,
        supportingDocument: null,
      });

      router.push("/admin/dashboard/content");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to create content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // This function is a placeholder for file upload logic
  const uploadFiles = async (files: any) => {
    // Implement your file upload logic here
    // This should return an object with URLs for each uploaded file
    return {
      galeri: "url_to_galeri_file",
      map: "url_to_map_file",
      supportingDocument: "url_to_supporting_document",
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8 items-center mb-6">
        <h1 className="text-3xl font-semibold">Add Content</h1>
        <a
          href="https://docs.google.com/document/d/1rZy86-zbDkl3SnHWh7qiTGftC5w1QQGH/edit?usp=sharing&ouid=111865860740807580291&rtpof=true&sd=true"
          className="text-blue-600 underline flex items-center justify-center gap-2"
        >
          <Download />
          Download Template
        </a>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Main Form Fields */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            placeholder="Enter author name"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Date Content Created</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            placeholder="Enter institution"
            value={formData.institution}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            placeholder="Enter summary"
            value={formData.summary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            placeholder="Enter keywords"
            value={formData.keyword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Existing Condition</h2>

          {/* Institutional Arrangement */}
          <div>
            <Label htmlFor="existingCondition1">
              Institutional Arrangement
            </Label>
            <Textarea
              id="existingCondition1"
              placeholder="Enter summary"
              value={formData.existingCondition1}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Pond Conditions */}
          <div>
            <Label htmlFor="existingCondition2">Pond Conditions</Label>
            <Textarea
              id="existingCondition2"
              placeholder="Enter summary"
              value={formData.existingCondition2}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Pond Design & Constractions */}
          <div>
            <Label htmlFor="existingCondition3">
              Pond Design & Constractions
            </Label>
            <Textarea
              id="existingCondition3"
              placeholder="Enter summary"
              value={formData.existingCondition3}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* existingCondition4 and Irrigation System */}
          <div>
            <Label htmlFor="existingCondition4">
              existingCondition4 and Irrigation System
            </Label>
            <Textarea
              id="existingCondition4"
              placeholder="Enter summary"
              value={formData.existingCondition4}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Water Quality Condition */}
          <div>
            <Label htmlFor="existingCondition5">Water Quality Condition</Label>
            <Textarea
              id="existingCondition5"
              placeholder="Enter summary"
              value={formData.existingCondition5}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Soil Quality Condition */}
          <div>
            <Label htmlFor="existingCondition6">Soil Quality Condition</Label>
            <Textarea
              id="existingCondition6"
              placeholder="Enter summary"
              value={formData.existingCondition6}
              onChange={handleInputChange}
              required
            />
          </div>

          {/*g Cultivation */}
          <div>
            <Label htmlFor="existingCondition7">Cultivation</Label>
            <Textarea
              id="existingCondition7"
              placeholder="Enter summary"
              value={formData.existingCondition7}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Best Practice Financial Condition */}
          <div>
            <Label htmlFor="existingCondition8">
              Best Practice Financial Condition
            </Label>
            <Textarea
              id="existingCondition8"
              placeholder="Enter summary"
              value={formData.existingCondition8}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Financial Analysis of Livestock Farming */}
          <div>
            <Label htmlFor="existingCondition9">
              Financial Analysis of Livestock Farming
            </Label>
            <Textarea
              id="existingCondition9"
              placeholder="Enter summary"
              value={formData.existingCondition9}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Financial Analysis of Vegetationg existinCondition7 */}
          <div>
            <Label htmlFor="existingCondition10">
              Financial Analysis of Vegetation Cultivation
            </Label>
            <Textarea
              id="existingCondition10"
              placeholder="Enter summary"
              value={formData.existingCondition10}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Analysis Sustainability */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Analysis Sustainability
          </h2>
          <div>
            <Label htmlFor="ecologyDim">Ecology Dimension</Label>
            <Input
              id="ecologyDim"
              placeholder="Enter ecology dimension"
              value={formData.ecologyDim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="socialDim">Social Dimension</Label>
            <Input
              id="socialDim"
              placeholder="Enter social dimension"
              value={formData.socialDim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="economyDim">Economy Dimension</Label>
            <Input
              id="economyDim"
              placeholder="Enter economy dimension"
              value={formData.economyDim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="institutionalDim">Institutional Dimension</Label>
            <Input
              id="institutionalDim"
              placeholder="Enter institutional dimension"
              value={formData.institutionalDim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="technologyDim">Technology Dimension</Label>
            <Input
              id="technologyDim"
              placeholder="Enter technology dimension"
              value={formData.technologyDim}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">File Uploads</h2>
          <FileUpload
            label="Galeri"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "galeri")}
          />
          <FileUpload
            label="Map"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "map")}
          />
          <FileUpload
            label="Supporting Document"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "supportingDocument")}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="secondary" type="button">
            Save as Draft
          </Button>
          <Button variant="default" type="submit">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
