// src/models/content.model.ts

export interface Content {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: "published" | "draft" | "archived";
}

export const contentSchema = {
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  status: {
    type: String,
    enum: ["published", "draft", "archived"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};
