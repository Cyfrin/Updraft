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
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "courses",
      label: "Courses",
      fields: [
        {
          type: "reference",
          name: "course",
          label: "Course",
          collections: ["course"],
        },
      ],
      ui: {
        itemProps(item) {
          const courseName = item.course
            .split("/")
            .pop()
            ?.split(".")
            .shift()
            ?.split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return { label: courseName };
        },
      },
      list: true,
    },
  ],
};
