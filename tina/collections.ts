import { Collection } from "tinacms";

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const AuthorCollection: Collection = {
  name: "author",
  label: "Authors",
  path: "content/authors",
  format: "json",
  fields: [
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

export const CourseCollection: Collection = {
  name: "course",
  label: "Courses",
  path: "content/courses",
  format: "json",
  fields: [
    {
      type: "datetime",
      name: "createdAt",
      label: "Created At",
      required: true,
      ui: {
        dateFormat: "MMMM DD, YYYY",
      },
    },
    {
      type: "datetime",
      name: "updatedAt",
      label: "Updated At",
      required: true,
      ui: {
        dateFormat: "MMMM DD, YYYY",
      },
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
      name: "trailerUrl",
      label: "Trailer URL",
    },
    {
      type: "string",
      name: "previewImg",
      label: "Preview Image",
    },
    {
      type: "number",
      name: "duration",
      label: "Duration (in minutes)",
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
      name: "overview",
      label: "Course Overview",
      fields: [
        {
          type: "string",
          name: "learnings",
          label: "What you will learn",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "preRequisites",
          label: "Pre-requisites",
          list: true,
        },
      ],
    },
    {
      type: "object",
      name: "authors",
      label: "Authors",
      fields: [
        {
          type: "reference",
          name: "author",
          label: "Author",
          collections: ["author"],
        },
      ],
      list: true,
    },
    {
      type: "object",
      name: "sections",
      label: "Sections",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "object",
          name: "lessons",
          label: "Lessons",
          fields: [
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
              type: "number",
              name: "duration",
              label: "Duration (in minutes)",
              required: true,
            },
            {
              type: "string",
              name: "videoUrl",
              label: "Video URL",
            },
            {
              type: "rich-text",
              name: "markdownContent",
              label: "Markdown Content",
              isBody: true,
            },
            {
              type: "object",
              name: "updates",
              label: "Updates",
              fields: [
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
                  type: "datetime",
                  name: "date",
                  label: "Date",
                  required: true,
                  ui: {
                    dateFormat: "MMMM DD, YYYY",
                  },
                },
              ],
              list: true,
            },
          ],
          list: true,
        },
      ],
      list: true,
    },
  ],
  ui: {
    filename: {
      slugify: (values) => {
        return slugify(values?.title || "New Course");
      },
    },
  },
};
