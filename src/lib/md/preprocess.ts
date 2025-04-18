import { EXT_URLS } from "../constants";

const extUrlRefs = EXT_URLS

/**  NOTE - Type RegexSearchAndReplace
* Modular implementation to allow variable placeholder syntax
* to be easily swapped and committed.
* - RegEx syntax matching included:
* ${variableName} | {variableName} | {{variableName}}
* - Implemented: {variableName} -- Find the rest at the bottom
*/

type RegexSearchAndReplace = {
    search: RegExp,
    replace: RegExp
}

// Match {myVar} styled placeholders
// ignore Markdown anchors, e.g. {#myVar}
const rgxCurlyIgnoreAnchor = {
    search: /\{(?!#).*\}/g,
    replace: /(\{?)(\}?)/g
};

// Match Markdown Headings & Excape anchors' curly
// heading: '# Heading' - anchor: '{#anchor}'
const rgxCurlyEscapeIncludeAnchor = {
    search: /^(?<heading>#{1,6}.*?)\{(?<anchor>#[\w-]+)\}/gm,
    replace: `$<heading>\\{$<anchor>\\}`
}

const getVarValue = (varName: string, refsObj: object) => {
    const varValue = refsObj[varName]
    if (!varValue) { return }
    return varValue
}

const extractVars = (content: string, regex: RegExp) => {
    return content.match(regex)
}

const resolveVars = (markdown: string, regex: RegexSearchAndReplace, refsObj: object) => {
    const varsExtracted = extractVars(markdown, regex.search)
    let content = markdown

    if (!!varsExtracted && !!varsExtracted.length) {

        for (let i in varsExtracted) {
            const varExtracted = varsExtracted[i]
            const varName = varExtracted.replace(regex.replace, '')
            const varValue = getVarValue(varName, refsObj);

            if (!!varValue) {
                content = content.replace(varExtracted, varValue)
            }
        }
    }
    return content
}

export async function preprocessMd(markdown: string) {

    // Inject external URLs into placeholders
    const varsResolved = resolveVars(markdown, rgxCurlyIgnoreAnchor, extUrlRefs)

    // Excape curly braces in Heading Anchors
    const content = varsResolved.replace(rgxCurlyEscapeIncludeAnchor.search, rgxCurlyEscapeIncludeAnchor.replace)

    return content
}


//NOTE - Additional RegEx for variable resolution
// Match ${myVar} styled placeholders
const rgxDollaCurly = {
    search: /\$\{.*\}/g,
    replace: /(\$\{)(\})/g
}

// Match{{myVar}} styled placeholders
const rgxDoubleCurly = {
    search: /\{\{(?!#).*\}\}/g,
    replace: /(\{\{?)(\}\}?)/g
}

//TODO - Create preprocess.ts file + contents