import { Collection } from "tinacms";
import { slugify } from "../utils";

export const LearningPathCollection: Collection = {
  name: "learningPath",
  label: "Learning Paths",
  path: "content/learning-paths",
  format: "json",
  ui: {
    filename: {
      slugify: (values) => {
        return slugify(values?.title || "New Learning Path");
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "learningPathId",
      label: "Learning Path ID",
      required: true,
      ui: {
        component: "hidden",
      },
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
  ],
};
