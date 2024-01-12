import { defineConfig } from "tinacms";
import { AuthorCollection } from "./collections/author";
import { CourseCollection } from "./collections/course";
import { GlobalsCollection } from "./collections/site";
import { LearningPathCollection } from "./collections/learning-paths";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD;

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    publicFolder: "static",
    outputFolder: "admin",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
       return pack.TinaCloudCloudinaryMediaStore;
         }
  },
  schema: {
    collections: [
      AuthorCollection,
      LearningPathCollection,
      CourseCollection,
      GlobalsCollection,
    ],
  },
});
