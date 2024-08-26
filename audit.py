import os

def audit(courses):

    for course in courses:
        root_directory = f"courses/{course}"
        missing = []
    
        # execute the 'updraft sync {course}' CLI command
        os.system(f"updraft sync {course}")
        os.system(f"updraft download captions {course}")
        os.system(f"updraft download markdown {course}")
        os.system(f"updraft utils {course} description")

        with open("audit.txt", "a") as file:
            file.write(f"{course.upper()}\n")

        for dirpath, dirnames, filenames in os.walk(root_directory):
            caption_count = 0
            lesson_count = 0
            for file in filenames:
                if file.endswith('.vtt'):
                    caption_count += 1
                if file.endswith('.md'):
                    lesson_count += 1

            depth = len(dirpath.split(os.sep)) - len(root_directory.split(os.sep))
            
            if depth == 2:
            # Print directory and caption_count if they are less than the threshold
                if caption_count < 13:
                    count_line = f"{dirpath} Captions: {caption_count}"
                    with open("audit.txt", "a") as file:
                        file.write(count_line + "\n")
                    missing.append(dirpath)
                    print(dirpath, " Captions: ", caption_count)
                if lesson_count < 1:
                    count_line = f"{dirpath} Lessons: {lesson_count}"
                    with open("audit.txt", "a") as file:
                        file.write(count_line + "\n")
                    missing.append(dirpath)
                    print(dirpath, " Lessons: ", lesson_count)
                
        if len(missing) == 0:
            with open("audit.txt", "a") as file:
                file.write("No missing captions or lessons found.\n")
            print("No missing captions or lessons found.\n")

        try:
            with open(f"{course}.txt", "r") as file:
                with open("audit.txt", "a") as audit_file:
                    missing_descriptions = file.read()
                    if len(missing_descriptions) > 0:
                        audit_file.write(f"\nMISSING DESCRIPTIONS:\n{missing_descriptions}\n\n")
                    else :
                        audit_file.write("No missing descriptions found.\n\n")
                print(file.read())
        except:
            print("\nNo missing descriptions found.\n\n")
        

courses = ["advanced-foundry", "blockchain-basics", "foundry", "solidity", "uniswap-v2", "security", "formal-verification"]

## formal-verification and security are fucked
# courses = ["security", "formal-verification"]

audit(courses)