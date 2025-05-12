#!/bin/bash

# Directory to start searching from
START_DIR="courses/chainlink-fundamentals"

# Find all .md files recursively
find "$START_DIR" -name "*.md" -type f | while read -r file; do
    # Get the course folder (e.g., 2-smart-contract-and-solidity-fundamentals)
    course_folder=$(echo "$file" | grep -o "$START_DIR/[^/]*" | sed "s|$START_DIR/||")
    
    # Replace markdown image syntax with the new format
    # This looks for ![any-text](../assets/filename.png) pattern
    sed -i '' -E 's|!\[(.*)\]\(\.\./assets/(.*\.png)\)|::image{src='"'"'/chainlink-fundamentals/'"$course_folder"'/assets/\2'"'"' style='"'"'width: 100%; height: auto;'"'"' alt='"'"'\1'"'"'}|g' "$file"
    
    echo "Processed: $file"
done

echo "Conversion complete!"