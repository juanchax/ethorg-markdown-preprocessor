import { preprocessMd } from "./preprocess";

export const compile = async (markdown: string) => {
    // preprocess mardkown content before calling 'compileMDX'
    const source = preprocessMd(markdown)

    return source
}

//TODO - compile.ts
// + Add 'import preprocessMd'
// + Alternaitvely, update function name to 'preprocessMarkdown'