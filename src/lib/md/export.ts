import * as fs from 'fs';

// Export to processed *.md file
// Created only to test out different approaches to variable injection
// in the content MD files
export const exportMd = async (content: string, path: string, filename: string) => {
    const processedMd = fs.writeFileSync(path + filename, content)
}