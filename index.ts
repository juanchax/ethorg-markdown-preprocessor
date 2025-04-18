import { getPageData } from "./src/lib/md/data";
import { exportMd } from "./src/lib/md/export";

const path = './public/content/'
const filename = 'index.md'

async function page() {
// Mimic behavior of compile.ts implementation
const pageData = await getPageData(path + filename)

//  DEBUG: Output generated pageData to md file
exportMd(pageData, path, 'compiled-' + filename)

return pageData
}

const pageCompiled = page()

//NOTE - Testing purposes *only*, no changes needed on source