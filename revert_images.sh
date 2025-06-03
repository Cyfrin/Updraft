#!/bin/bash

# Directory to start searching from
START_DIR="courses"

# Find all .md files recursively
find "$START_DIR" -name "*.md" -type f | while read -r file; do
    # Replace the ::image{} syntax back to markdown image syntax
    # This keeps the exact src path as-is
    sed -i '' -E "s|::image\{src='([^']*)' style='[^']*' alt='([^']*)'\}|![\2](\1)|g" "$file"
    
    echo "Processed: $file"
done

echo "Reversion complete!"
