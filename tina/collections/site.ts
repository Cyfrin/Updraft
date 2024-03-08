import { Collection } from "tinacms";

export const GlobalsCollection: Collection = {
  name: "globals",
  label: "Globals",
  path: "content/globals",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    filename: {
      slugify: () => {
        return "globals";
      },
    },
  },
  fields: [
    {
      type: "rich-text",
      name: "content",
      label: "Content",
    },
  ],
};
