import crypto from "crypto";
import fs from "fs";
import Courses from "./courses.json";

const tinaCoursesPath = "content/courses";
const tinaAuthorsPath = "content/authors";
const learningPathsPath = "content/learning-paths";

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

type LearningPath = {
  learningPathId: string;
  title: string;
  courses: {
    course: string;
  }[];
};

const capitalize = (text: string) => {
  const words = text.split(" ");
  const capitalizedWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return capitalizedWords;
};

const getLearningPaths = (): LearningPath[] => {
  const allLearningPaths = Courses.map((course) => {
    return {
      title: course.path.toLocaleLowerCase(),
      course: `${tinaCoursesPath}/${course.slug}.json`,
    };
  });

  const grouped = new Map<string, { course: string }[]>();

  allLearningPaths.forEach((learningPath) => {
    const { title, course } = learningPath;

    if (!grouped.has(title)) {
      grouped.set(title, []);
    }

    grouped.get(title)?.push({ course });
  });

  return Array.from(grouped).map(([title, courses]) => {
    const learningPathId = crypto.randomUUID();

    return {
      learningPathId,
      title: capitalize(title),
      courses,
    };
  });
};

const createLearningPathsFiles = () => {
  const learningPaths = getLearningPaths();

  learningPaths.forEach((learningPath) => {
    const { title } = learningPath;
    const slug = slugify(title);
    const path = `${learningPathsPath}/${slug}.json`;

    fs.writeFile(path, JSON.stringify(learningPath, null, 2), (err) => {
      if (err) throw err;
      console.log(`Learning path file ${slug}.json has been saved!`);
    });
  });
};

const createAuthorsFiles = () => {
  const allAuthors = Courses.flatMap((course) => course.authors);
  const uniqueAuthors = Array.from(
    new Set(allAuthors.map((author) => author.name))
  ).map((name) => {
    const author = allAuthors.find((a) => a.name === name);

    if (!author) return;

    const authorId = crypto.randomUUID();

    return {
      authorId,
      ...author,
    };
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
  Courses.forEach((originalCourse) => {
    const courseId = originalCourse.id;

    const updatedSections = originalCourse.sections.map((originalSection) => {
      const sectionId = originalSection.id;

      const updatedLessons = originalSection.lessons.map((originalLesson) => {
        const { id, ...lessonWithoutId } = originalLesson; // Destructure to remove id
        const lessonId = id;

        return {
          lessonId,
          ...lessonWithoutId,
        };
      });

      const { id, ...sectionWithoutId } = originalSection; // Destructure to remove id
      return {
        sectionId,
        ...sectionWithoutId,
        lessons: updatedLessons,
      };
    });

    const updatedAuthors = originalCourse.authors.map((author) => {
      const slug = slugify(author.name);
      return { author: `${tinaAuthorsPath}/${slug}.json` };
    });

    const { id, ...courseWithoutId } = originalCourse; // Destructure to remove id
    const updatedCourse = {
      courseId,
      ...courseWithoutId,
      sections: updatedSections,
      authors: updatedAuthors,
      path: `${learningPathsPath}/${slugify(originalCourse.path)}.json`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { slug } = originalCourse;
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
createFolderIfNotExists(learningPathsPath);

createLearningPathsFiles();
createAuthorsFiles();
createCoursesFiles();
