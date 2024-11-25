const fs = require('fs');
const path = require('path');

function renumberLessonsFromPoint(basePath, section, startNumber) {
    const sectionPath = path.join(basePath, section);
    
    // Get all lesson directories and sort them numerically
    const lessons = fs.readdirSync(sectionPath)
        .filter(dir => {
            const fullPath = path.join(sectionPath, dir);
            return fs.statSync(fullPath).isDirectory() && /^\d+/.test(dir);
        })
        .sort((a, b) => {
            const numA = parseInt(a.split('-')[0]);
            const numB = parseInt(b.split('-')[0]);
            return numA - numB;
        });

    // Find the index of the second occurrence of startNumber
    let startIndex = -1;
    let foundFirst = false;
    for (let i = 0; i < lessons.length; i++) {
        const num = parseInt(lessons[i].split('-')[0]);
        if (num === startNumber) {
            if (foundFirst) {
                startIndex = i;
                break;
            }
            foundFirst = true;
        }
    }

    if (startIndex === -1) {
        console.log(`No second occurrence of lesson ${startNumber} found.`);
        return;
    }

    // Rename in reverse order starting from the end of the array
    for (let i = lessons.length - 1; i >= startIndex; i--) {
        const lesson = lessons[i];
        const currentNum = parseInt(lesson.split('-')[0]);
        const restOfName = lesson.substring(lesson.indexOf('-'));
        const newNum = currentNum + 1;
        const newName = `${newNum}${restOfName}`;
        
        const oldPath = path.join(sectionPath, lesson);
        const newPath = path.join(sectionPath, newName);
        
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${lesson} -> ${newName}`);
    }
}

const basePath = 'courses/moccasin-101';

// Renumber lessons after the second '6' in section 1
console.log('\nRenumbering Python section lessons...');
renumberLessonsFromPoint(basePath, '1-python-in-updraft', 6);

// Renumber lessons after the first '8' in section 4
console.log('\nRenumbering Mox Favs section lessons...');
renumberLessonsFromPoint(basePath, '4-mox-favs', 8);