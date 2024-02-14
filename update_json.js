const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const coursesPath = "courses";
const jsonFilesPath = "content/courses";

// Function to update the corresponding JSON file for a changed Markdown file
function updateJsonForMarkdown(mdFilePath) {
  // Extract course slug from the Markdown file path
  const courseSlug = path.basename(path.dirname(path.dirname(mdFilePath)));

  // Construct the path to the corresponding JSON file
  const jsonFilePath = path.join(jsonFilesPath, courseSlug + ".json");

  // Check if the JSON file exists
  if (!fs.existsSync(jsonFilePath)) {
    console.log(`JSON file not found for course: ${courseSlug}`);
    return;
  }

  // Read the Markdown file
  const markdownContent = fs.readFileSync(mdFilePath, "utf8");

  // Read and update the JSON file
  const jsonContent = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

  // Iterate through sections and lessons to find the correct one to update
  let updated = false;
  jsonContent.sections.forEach((section) => {
    section.lessons.forEach((lesson) => {
      if (lesson.rawMarkdownUrl === mdFilePath.replace(coursesPath, "")) {
        lesson.markdownContent = markdownContent;
        updated = true;
      }
    });
  });

  if (!updated) {
    console.log(`Lesson not found in JSON for Markdown file: ${mdFilePath}`);
    return;
  }

  // Write updated JSON back to file
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null, 2));
}

// Get a list of changed Markdown files
const changedFiles = execSync("git diff --name-only HEAD HEAD~1")
  .toString()
  .split("\n");
changedFiles.forEach((file) => {
  if (file.startsWith(coursesPath) && path.extname(file) === ".md") {
    console.log(`Updating JSON for changed file: ${file}`);
    updateJsonForMarkdown(file);
  }
});
