import * as fs from 'fs';

export const importMd = async (path: string) => {
    // Mimic call to get md file content
    let markdown = ""
    markdown = fs.readFileSync(path, 'utf-8')

    return markdown
}

//NOTE import.ts - No changes needed on source