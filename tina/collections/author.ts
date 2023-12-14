import { Collection } from "tinacms";
import { slugify } from "../utils";

export const AuthorCollection: Collection = {
  name: "author",
  label: "Authors",
  path: "content/authors",
  format: "json",
  fields: [
    {
      type: "string",
      name: "authorId",
      label: "Author ID",
      required: true,
      ui: {
        component: "hidden",
      },
    },
    {
      type: "string",
      name: "name",
      label: "Name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "role",
      label: "Role",
    },
    {
      type: "string",
      name: "avatarUrl",
      label: "Avatar URL",
    },
    {
      type: "string",
      name: "company",
      label: "Company",
    },
  ],
  ui: {
    filename: {
      slugify: (values) => {
        return slugify(values?.name || "New Author");
      },
    },
  },
};
