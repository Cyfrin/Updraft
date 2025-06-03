#!/bin/bash

# Directory to start searching from
START_DIR="courses"

# Find all .md files recursively
find "$START_DIR" -name "*.md" -type f | while read -r file; do
    # Replace ::image{} syntax with alt attribute (keep existing alt)
    sed -i '' -E "s|::image\\{src='([^']*)' style='[^']*' alt='([^']*)'\\}|![\2](\1)|g" "$file"
    
    # Replace ::image{} syntax without alt attribute (extract just filename without extension for alt)
    sed -i '' -E "s|::image\\{src='([^']*)/([^/]*)\\.([^']*)'[ ]*style='[^']*'\\}|![\2](\1/\2.\3)|g" "$file"
    
    echo "Processed: $file"
done

echo "Reversion complete!"
