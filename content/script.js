const fs = require('fs');
const path = require('path');

const coursesDirectory = path.join(__dirname, 'courses');
const outputDirectory = path.join(__dirname, 'markdown');

// Ensure output directory exists
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory);
}

// Read and process each JSON file
fs.readdir(coursesDirectory, (err, files) => {
    if (err) {
        console.error("Error reading the courses directory:", err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(coursesDirectory, file);
            fs.readFile(filePath, 'utf8', (err, rawData) => {
                if (err) {
                    console.error(`Error reading file: ${file}`, err);
                    return;
                }

                try {
                    const course = JSON.parse(rawData);
                    
                    // Convert to markdown
                    const markdown = convertToMarkdown(course);

                    // Write to markdown file
                    const outputFilePath = path.join(outputDirectory, `${course.slug}.md`);
                    fs.writeFileSync(outputFilePath, markdown);
                    console.log(`Markdown file created: ${outputFilePath}`);
                } catch (parseError) {
                    console.error(`Error parsing JSON from file: ${file}`, parseError);
                }
            });
        }
    });
});

function escapeMarkdown(text) {
    return text.replace(/`/g, '\\`')   // Escape backticks
               .replace(/"/g, '\\"')   // Escape double quotes
               .replace(/\*\*\*/g, '\\*\\*\\*'); // Escape triple asterisks
}

function convertToMarkdown(course) {
    let markdown = `---\n`;
    markdown += `id: ${course.courseId}\n`;
    markdown += `blueprint: course\n`;
    markdown += `title: "${escapeMarkdown(course.title)}"\n`; // Enclose title in double quotes
    markdown += `updated_at: ${new Date(course.updatedAt).getTime()}\n`;
    markdown += `github_url: "${course.githubUrl}"\n`; // Enclose URL in double quotes
    markdown += `preview_image: ${course.previewImg}\n`;
    markdown += `duration: ${course.duration}\n`;
    markdown += `description: |-\n    ${(course.description ?? '').split('\n').map(line => `    ${escapeMarkdown(line)}`).join('\n')}\n`;
    markdown += `overview: |-\n    ${(course.overview?.learnings ?? '').split('\n').map(line => `    ${escapeMarkdown(line)}`).join('\n')}\n`;
    markdown += `preRequisites: |-\n    ${(course.overview?.preRequisites ?? []).join('\n    ')}\n`;
    markdown += `authors:\n`;
    course.authors.forEach(author => {
        markdown += `  - ${author.author}\n`;
    });
    markdown += `sections:\n`;
    course.sections.forEach(section => {
        markdown += `  -\n`;
        markdown += `    title: "${escapeMarkdown(section.title)}"\n`; // Enclose title in double quotes
        markdown += `    slug: ${section.slug}\n`;
        markdown += `    lessons:\n`;
        section.lessons.forEach(lesson => {
            markdown += `      -\n`;
            markdown += `        type: new_lesson\n`;
            markdown += `        enabled: true\n`;
            markdown += `        id: ${lesson.lessonId ?? ''}\n`;
            markdown += `        title: "${escapeMarkdown(lesson.title)}"\n`; // Enclose title in double quotes
            markdown += `        slug: ${lesson.slug}\n`;
            markdown += `        duration: ${lesson.duration}\n`;
            markdown += `        video_url: "${lesson.videoUrl}"\n`; // Enclose URL in double quotes
            markdown += `        raw_markdown_url: "${lesson.rawMarkdownUrl}"\n`; // Enclose URL in double quotes
            markdown += `        description: |-\n          ${(lesson.description ?? '').split('\n').map(line => `          ${escapeMarkdown(line)}`).join('\n')}\n`;
            markdown += `        markdown_content: |-\n`;
            markdown += `${lesson.markdownContent.split('\n').map(line => `          ${line}`).join('\n')}\n`;
        });
        markdown += `    type: new_section\n`;
        markdown += `    enabled: true\n`;
    });
    markdown += `---\n`;
    return markdown;
}




