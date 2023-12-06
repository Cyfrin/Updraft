import fs from "fs";
import Courses from "./courses.json";

const tinaCoursesPath = "content/courses";
const tinaAuthorsPath = "content/authors";

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

const createFolderIfNotExists = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const createAuthorsFiles = () => {
  const allAuthors = Courses.flatMap((course) => course.authors);
  const uniqueAuthors = Array.from(
    new Set(allAuthors.map((author) => author.name))
  ).map((name) => {
    return allAuthors.find((author) => author.name === name);
  });
  uniqueAuthors.forEach((author) => {
    if (!author) return;
    const { name } = author;
    const slug = slugify(name);
    const path = `${tinaAuthorsPath}/${slug}.json`;
    fs.writeFile(path, JSON.stringify(author, null, 2), (err) => {
      if (err) throw err;
      console.log(`Author file ${slug}.json has been saved!`);
    });
  });
};

const createCoursesFiles = () => {
  Courses.forEach((course) => {
    const updatedAuthors = course.authors.map((author) => {
      const slug = slugify(author.name);
      return { author: `${tinaAuthorsPath}/${slug}.json` };
    });

    delete (course as any).lastUpdated;

    const updatedCourse = {
      ...course,
      authors: updatedAuthors,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // We also need to remove the markdownContent from the lessons
    updatedCourse.sections.forEach((section) => {
      section.lessons.forEach((lesson) => {
        delete (lesson as any).markdownContent;
      });
    });

    const { slug } = course;
    const coursePath = `${tinaCoursesPath}/${slug}.json`;

    // Write course file
    fs.writeFile(coursePath, JSON.stringify(updatedCourse, null, 2), (err) => {
      if (err) throw err;
      console.log(`Course file ${slug}.json has been saved!`);
    });
  });
};

createFolderIfNotExists("content");
createFolderIfNotExists(tinaCoursesPath);
createFolderIfNotExists(tinaAuthorsPath);
createAuthorsFiles();
createCoursesFiles();
