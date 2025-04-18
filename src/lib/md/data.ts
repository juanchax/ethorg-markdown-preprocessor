import { importMd } from "./import"
import { compile } from "./compile"

export async function getPageData(filePath: string) {
    // Import and compile markdown
    const markdown = await importMd(filePath)
    const content = await compile(markdown)

    return content
}


//NOTE data.ts - No changes needed on source