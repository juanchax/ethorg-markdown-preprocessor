import { preprocessMarkdown } from "./preprocess";

export const compile = async (markdown: string) => {
    // preprocess mardkown content before calling 'compileMDX'
    const source = preprocessMarkdown(markdown)

    return source
}
