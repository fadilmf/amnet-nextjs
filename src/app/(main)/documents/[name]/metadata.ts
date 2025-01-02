import { Metadata } from "next";

const documents: any = {
  doc1: {
    title: "Document 1 Title",
    description: "This is the description for Document 1.",
  },
  doc2: {
    title: "Document 2 Title",
    description: "This is the description for Document 2.",
  },
  doc3: {
    title: "Document 3 Title",
    description: "This is the description for Document 3.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const document = documents[params.name];
  if (!document) {
    return {
      title: "Document Not Found",
      description: "The requested document could not be found.",
    };
  }

  return {
    title: document.title,
    description: document.description,
  };
}
