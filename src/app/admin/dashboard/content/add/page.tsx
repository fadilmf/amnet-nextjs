"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  existingConditions: { [key: string]: string };
  ecologyDim: number;
  ecologyMethod: string | null;
  ecologyMost1: string | null;
  ecologyMost2: string | null;
  ecologyMost3: string | null;
  socialDim: number;
  socialMethod: string | null;
  socialMost1: string | null;
  socialMost2: string | null;
  socialMost3: string | null;
  economyDim: number;
  economyMethod: string | null;
  economyMost1: string | null;
  economyMost2: string | null;
  economyMost3: string | null;
  institutionalDim: number;
  institutionalMethod: string | null;
  institutionalMost1: string | null;
  institutionalMost2: string | null;
  institutionalMost3: string | null;
  technologyDim: number;
  technologyMethod: string | null;
  technologyMost1: string | null;
  technologyMost2: string | null;
  technologyMost3: string | null;
  sustainabilityindex: number;
  video: string;
};

type FileData = {
  galeri: string | null;
  map: string | null;
  supportingDocument: string | null;
  ecologyGraph: string | null;
  ecologyLeve: string | null;
  socialGraph: string | null;
  socialLeve: string | null;
  economyGraph: string | null;
  economyLeve: string | null;
  institutionalGraph: string | null;
  institutionalLeve: string | null;
  technologyGraph: string | null;
  technologyLeve: string | null;
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
    existingConditions: {
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
      existingCondition11: "",
      existingCondition12: "",
      existingCondition13: "",
      existingCondition14: "",
      existingCondition15: "",
      existingCondition16: "",
      existingCondition17: "",
      existingCondition18: "",
      existingCondition19: "",
      existingCondition20: "",
      existingCondition21: "",
      existingCondition22: "",
      existingCondition23: "",
    },
    ecologyDim: 0.0,
    ecologyMethod: "",
    ecologyMost1: "",
    ecologyMost2: "",
    ecologyMost3: "",
    socialDim: 0.0,
    socialMethod: "",
    socialMost1: "",
    socialMost2: "",
    socialMost3: "",
    economyDim: 0.0,
    economyMethod: "",
    economyMost1: "",
    economyMost2: "",
    economyMost3: "",
    institutionalDim: 0.0,
    institutionalMethod: "",
    institutionalMost1: "",
    institutionalMost2: "",
    institutionalMost3: "",
    technologyDim: 0.0,
    technologyMethod: "",
    technologyMost1: "",
    technologyMost2: "",
    technologyMost3: "",
    sustainabilityindex: 0.0,
    video: "",
  });

  const [fileData, setFileData] = useState<FileData>({
    galeri: null,
    map: null,
    supportingDocument: null,
    ecologyGraph: null,
    ecologyLeve: null,
    socialGraph: null,
    socialLeve: null,
    economyGraph: null,
    economyLeve: null,
    institutionalGraph: null,
    institutionalLeve: null,
    technologyGraph: null,
    technologyLeve: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFieldTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      existingConditions: {
        ...formData.existingConditions,
        [field]: e.target.value,
      },
    });
  };

  const handleRemoveField = (field: string) => {
    const updatedConditions = { ...formData.existingConditions };
    delete updatedConditions[field]; // Remove the field from state
    setFormData({
      ...formData,
      existingConditions: updatedConditions,
    });
  };

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
          [label]: reader.result ? reader.result.split(",")[1] : null,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const contentData = {
      ...formData,
      cover: fileData.galeri,
      attachmentDoc: fileData.map,
      supportingDoc: fileData.supportingDocument,
    };

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

      // Reset form data
      setFormData({
        title: "",
        author: "",
        date: "",
        institution: "",
        email: "",
        summary: "",
        keyword: "",
        existingConditions: {},
        ecologyDim: 0.0,
        ecologyMethod: "",
        ecologyMost1: "",
        ecologyMost2: "",
        ecologyMost3: "",
        socialDim: 0.0,
        socialMethod: "",
        socialMost1: "",
        socialMost2: "",
        socialMost3: "",
        economyDim: 0.0,
        economyMethod: "",
        economyMost1: "",
        economyMost2: "",
        economyMost3: "",
        institutionalDim: 0.0,
        institutionalMethod: "",
        institutionalMost1: "",
        institutionalMost2: "",
        institutionalMost3: "",
        technologyDim: 0.0,
        technologyMethod: "",
        technologyMost1: "",
        technologyMost2: "",
        technologyMost3: "",
        sustainabilityindex: 0.0,
        video: "",
      });

      setFileData({
        galeri: null,
        map: null,
        supportingDocument: null,
        ecologyGraph: null,
        ecologyLeve: null,
        socialGraph: null,
        socialLeve: null,
        economyGraph: null,
        economyLeve: null,
        institutionalGraph: null,
        institutionalLeve: null,
        technologyGraph: null,
        technologyLeve: null,
      });

      router.push("/admin/dashboard/content");
    } catch (error) {
      setError("Failed to create content. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

          <div>
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

            {/* Regional Administration */}
            <div>
              <Label htmlFor="existingCondition2">
                Regional Administration
              </Label>
              <Textarea
                id="existingCondition2"
                placeholder="Enter summary"
                value={formData.existingCondition2}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Population Demographics */}
            <div>
              <Label htmlFor="existingCondition3">
                Population Demographics
              </Label>
              <Textarea
                id="existingCondition3"
                placeholder="Enter summary"
                value={formData.existingCondition3}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Community Education Level */}
            <div>
              <Label htmlFor="existingCondition4">
                Community Education Level
              </Label>
              <Textarea
                id="existingCondition4"
                placeholder="Enter summary"
                value={formData.existingCondition4}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Agricultural, Plantation, and Fisheries Conditions */}
            <div>
              <Label htmlFor="existingCondition5">
                Agricultural, Plantation, and Fisheries Conditions
              </Label>
              <Textarea
                id="existingCondition5"
                placeholder="Enter summary"
                value={formData.existingCondition5}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Community Culture and Ethnicity */}
            <div>
              <Label htmlFor="existingCondition6">
                Community Culture and Ethnicity
              </Label>
              <Textarea
                id="existingCondition6"
                placeholder="Enter summary"
                value={formData.existingCondition6}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Topography */}
            <div>
              <Label htmlFor="existingCondition7">Topography</Label>
              <Textarea
                id="existingCondition7"
                placeholder="Enter summary"
                value={formData.existingCondition7}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Climate */}
            <div>
              <Label htmlFor="existingCondition8">Climate</Label>
              <Textarea
                id="existingCondition8"
                placeholder="Enter summary"
                value={formData.existingCondition8}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Land Cover and Mangrove Density */}
            <div>
              <Label htmlFor="existingCondition9">
                Land Cover and Mangrove Density
              </Label>
              <Textarea
                id="existingCondition9"
                placeholder="Enter summary"
                value={formData.existingCondition9}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Shoreline Changes */}
            <div>
              <Label htmlFor="existingCondition10">Shoreline Changes</Label>
              <Textarea
                id="existingCondition10"
                placeholder="Enter summary"
                value={formData.existingCondition10}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Species Composition */}
            <div>
              <Label htmlFor="existingCondition11">Species Composition</Label>
              <Textarea
                id="existingCondition11"
                placeholder="Enter summary"
                value={formData.existingCondition11}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Dominant Mangrove Species */}
            <div>
              <Label htmlFor="existingCondition12">
                Dominant Mangrove Species
              </Label>
              <Textarea
                id="existingCondition12"
                placeholder="Enter summary"
                value={formData.existingCondition12}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Biomass, Carbon Storage, and Carbon Dioxide Absorption */}
            <div>
              <Label htmlFor="existingCondition13">
                Biomass, Carbon Storage, and Carbon Dioxide Absorption
              </Label>
              <Textarea
                id="existingCondition13"
                placeholder="Enter summary"
                value={formData.existingCondition13}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Fauna Diversity */}
            <div>
              <Label htmlFor="existingCondition14">Fauna Diversity</Label>
              <Textarea
                id="existingCondition14"
                placeholder="Enter summary"
                value={formData.existingCondition14}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Pond Conditions */}
            <div>
              <Label htmlFor="existingCondition15">Pond Conditions</Label>
              <Textarea
                id="existingCondition15"
                placeholder="Enter summary"
                value={formData.existingCondition15}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Pond Design & Constructions */}
            <div>
              <Label htmlFor="existingCondition16">
                Pond Design & Constructions
              </Label>
              <Textarea
                id="existingCondition16"
                placeholder="Enter summary"
                value={formData.existingCondition16}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Layout and Irrigation System */}
            <div>
              <Label htmlFor="existingCondition17">
                Layout and Irrigation System
              </Label>
              <Textarea
                id="existingCondition17"
                placeholder="Enter summary"
                value={formData.existingCondition17}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Water Quality Condition */}
            <div>
              <Label htmlFor="existingCondition18">
                Water Quality Condition
              </Label>
              <Textarea
                id="existingCondition18"
                placeholder="Enter summary"
                value={formData.existingCondition18}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Soil Quality Condition */}
            <div>
              <Label htmlFor="existingCondition19">
                Soil Quality Condition
              </Label>
              <Textarea
                id="existingCondition19"
                placeholder="Enter summary"
                value={formData.existingCondition19}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Cultivation */}
            <div>
              <Label htmlFor="existingCondition20">Cultivation</Label>
              <Textarea
                id="existingCondition20"
                placeholder="Enter summary"
                value={formData.existingCondition20}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Best Practice Financial Condition */}
            <div>
              <Label htmlFor="existingCondition21">
                Best Practice Financial Condition
              </Label>
              <Textarea
                id="existingCondition21"
                placeholder="Enter summary"
                value={formData.existingCondition21}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Financial Analysis of Livestock Farming */}
            <div>
              <Label htmlFor="existingCondition22">
                Financial Analysis of Livestock Farming
              </Label>
              <Textarea
                id="existingCondition22"
                placeholder="Enter summary"
                value={formData.existingCondition22}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Financial Analysis of Vegetation Cultivation */}
            <div>
              <Label htmlFor="existingCondition23">
                Financial Analysis of Vegetation Cultivation
              </Label>
              <Textarea
                id="existingCondition23"
                placeholder="Enter summary"
                value={formData.existingCondition23}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Analysis Sustainability */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Analysis Sustainability
          </h2>

          {/* Ecology Dimension */}
          <div>
            <Label className="text-lg font-semibold mb-4">
              Ecology Dimension
            </Label>
            <h1>Index Score</h1>
            <Input
              id="ecologyDim"
              type="number"
              placeholder="Enter your score for ecology dimension"
              value={formData.ecologyDim}
              onChange={handleInputChange}
            />
            <h1>Methods</h1>
            <Input
              id="ecologyMethod"
              type="text"
              placeholder="Describe your method to get the score"
              value={formData.ecologyMethod}
              onChange={handleInputChange}
            />
            <h1>Graphs</h1>
            <FileUpload
              label="Enter Image Result by The Methods"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "ecologyGraph")}
            />
            <h1>Most Significant Aspects to The Score</h1>
            <Input
              id="ecologyMost1"
              type="text"
              placeholder="1. Most Significant Aspects"
              value={formData.ecologyMost1}
              onChange={handleInputChange}
            />
            <Input
              id="ecologyMost2"
              type="text"
              placeholder="2. Most Significant Aspects"
              value={formData.ecologyMost2}
              onChange={handleInputChange}
            />
            <Input
              id="ecologyMost3"
              type="text"
              placeholder="3. Most Significant Aspects"
              value={formData.ecologyMost3}
              onChange={handleInputChange}
            />
            <h1>Overall Aspects</h1>
            <FileUpload
              label="Enter Image Score from Every Aspects"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "ecologyLeve")}
            />
          </div>

          {/* Social Dimension */}
          <div>
            <Label className="text-lg font-semibold mb-4">
              Social Dimension
            </Label>
            <h1>Index Score</h1>
            <Input
              id="socialDim"
              type="number"
              placeholder="Enter your score for social dimension"
              value={formData.socialDim}
              onChange={handleInputChange}
            />
            <h1>Methods</h1>
            <Input
              id="socialMethod"
              type="text"
              placeholder="Describe your method to get the score"
              value={formData.socialMethod}
              onChange={handleInputChange}
            />
            <h1>Graphs</h1>
            <FileUpload
              label="Enter Image Result by The Methods"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "socialGraph")}
            />
            <h1>Most Significant Aspects to The Score</h1>
            <Input
              id="socialMost1"
              type="text"
              placeholder="1. Most Significant Aspects"
              value={formData.socialMost1}
              onChange={handleInputChange}
            />
            <Input
              id="socialMost2"
              type="text"
              placeholder="2. Most Significant Aspects"
              value={formData.socialMost2}
              onChange={handleInputChange}
            />
            <Input
              id="socialMost3"
              type="text"
              placeholder="3. Most Significant Aspects"
              value={formData.socialMost3}
              onChange={handleInputChange}
            />
            <h1>Overall Aspects</h1>
            <FileUpload
              label="Enter Image Score from Every Aspects"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "socialLeve")}
            />
          </div>

          {/* Economy Dimension */}
          <div>
            <Label className="text-lg font-semibold mb-4">
              Economy Dimension
            </Label>
            <h1>Index Score</h1>
            <Input
              id="economyDim"
              type="number"
              placeholder="Enter your score for economy dimension"
              value={formData.economyDim}
              onChange={handleInputChange}
            />
            <h1>Methods</h1>
            <Input
              id="economyMethod"
              type="text"
              placeholder="Describe your method to get the score"
              value={formData.economyMethod}
              onChange={handleInputChange}
            />
            <h1>Graphs</h1>
            <FileUpload
              label="Enter Image Result by The Methods"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "economyGraph")}
            />
            <h1>Most Significant Aspects to The Score</h1>
            <Input
              id="economyMost1"
              type="text"
              placeholder="1. Most Significant Aspects"
              value={formData.economyMost1}
              onChange={handleInputChange}
            />
            <Input
              id="economyMost2"
              type="text"
              placeholder="2. Most Significant Aspects"
              value={formData.economyMost2}
              onChange={handleInputChange}
            />
            <Input
              id="economyMost3"
              type="text"
              placeholder="3. Most Significant Aspects"
              value={formData.economyMost3}
              onChange={handleInputChange}
            />
            <h1>Overall Aspects</h1>
            <FileUpload
              label="Enter Image Score from Every Aspects"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "economyLeve")}
            />
          </div>

          {/* Institutional Dimension */}
          <div>
            <Label className="text-lg font-semibold mb-4">
              Institutional Dimension
            </Label>
            <h1>Index Score</h1>
            <Input
              id="institutionalDim"
              type="number"
              placeholder="Enter your score for institutional dimension"
              value={formData.institutionalDim}
              onChange={handleInputChange}
            />
            <h1>Methods</h1>
            <Input
              id="institutionalMethod"
              type="text"
              placeholder="Describe your method to get the score"
              value={formData.institutionalMethod}
              onChange={handleInputChange}
            />
            <h1>Graphs</h1>
            <FileUpload
              label="Enter Image Result by The Methods"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "institutionalGraph")}
            />
            <h1>Most Significant Aspects to The Score</h1>
            <Input
              id="institutionalMost1"
              type="text"
              placeholder="1. Most Significant Aspects"
              value={formData.institutionalMost1}
              onChange={handleInputChange}
            />
            <Input
              id="institutionalMost2"
              type="text"
              placeholder="2. Most Significant Aspects"
              value={formData.institutionalMost2}
              onChange={handleInputChange}
            />
            <Input
              id="institutionalMost3"
              type="text"
              placeholder="3. Most Significant Aspects"
              value={formData.institutionalMost3}
              onChange={handleInputChange}
            />
            <h1>Overall Aspects</h1>
            <FileUpload
              label="Enter Image Score from Every Aspects"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "institutionalLeve")}
            />
          </div>

          {/* Technology Dimension */}
          <div>
            <Label className="text-lg font-semibold mb-4">
              Technology Dimension
            </Label>
            <h1>Index Score</h1>
            <Input
              id="technologyDim"
              type="number"
              placeholder="Enter your score for technology dimension"
              value={formData.technologyDim}
              onChange={handleInputChange}
            />
            <h1>Methods</h1>
            <Input
              id="technologyMethod"
              type="text"
              placeholder="Describe your method to get the score"
              value={formData.technologyMethod}
              onChange={handleInputChange}
            />
            <h1>Graphs</h1>
            <FileUpload
              label="Enter Image Result by The Methods"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "technologyGraph")}
            />
            <h1>Most Significant Aspects to The Score</h1>
            <Input
              id="technologyMost1"
              type="text"
              placeholder="1. Most Significant Aspects"
              value={formData.technologyMost1}
              onChange={handleInputChange}
            />
            <Input
              id="technologyMost2"
              type="text"
              placeholder="2. Most Significant Aspects"
              value={formData.technologyMost2}
              onChange={handleInputChange}
            />
            <Input
              id="technologyMost3"
              type="text"
              placeholder="3. Most Significant Aspects"
              value={formData.technologyMost3}
              onChange={handleInputChange}
            />
            <h1>Overall Aspects</h1>
            <FileUpload
              label="Enter Image Score from Every Aspects"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "technologyLeve")}
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
