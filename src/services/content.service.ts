// src/services/content.service.ts

import { Content } from "@/models/content.model";

const contentData: Content[] = []; // Simulating a database with an array

export const createContent = (newContent: Content): Content => {
  newContent.id = contentData.length + 1;
  contentData.push(newContent);
  return newContent;
};

export const getContentList = (filter?: {
  keyword?: string;
  author?: string;
}): Content[] => {
  return contentData.filter((content) => {
    if (filter?.keyword && !content.title.includes(filter.keyword))
      return false;
    if (filter?.author && content.author !== filter.author) return false;
    return true;
  });
};

export const getContentById = (id: number): Content | undefined => {
  return contentData.find((content) => content.id === id);
};

export const updateContent = (
  id: number,
  updatedContent: Partial<Content>
): Content | undefined => {
  const content = getContentById(id);
  if (content) {
    Object.assign(content, updatedContent, {
      updatedAt: new Date().toISOString(),
    });
    return content;
  }
  return undefined;
};

export const deleteContent = (id: number): boolean => {
  const index = contentData.findIndex((content) => content.id === id);
  if (index !== -1) {
    contentData[index].status = "archived"; // Soft delete by archiving
    return true;
  }
  return false;
};
