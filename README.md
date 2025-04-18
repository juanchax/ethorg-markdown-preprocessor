# &#127798; Ethereum.org Website's External URLs &#127798;

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[![status - in progress](https://img.shields.io/badge/status-inprogress-blue?style=for-the-badge)](#status) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![ready for review](https://img.shields.io/badge/review-needed-orange?style=for-the-badge)](#pitch-idea)

<br>

**Test/Demo repo for implementing the content pages' link references parameterization.**

Parameterize references to external links, using some sort of variable injection logic to replace these in the `content md` files before building; creating a _single source of truth_ for references to external URLs used across the website, and simplifying maintenance tasks

<br>

## &#128163; Issue

Currently, the content pages contain a multitude of hardcoded link references, which of course are duplicated on the translated versions as well.

Causing:

* There's no single source of truth
* brittle approach
* Difficult to know if all links are synched (as in: all have the same url)
* Updating dead links is a laborious task _to say the least_

### &#128204; Background

I was omw to tackle some GFI on GitHub when I noticed a few Issues that were related to link references, more specifically [the OATs reference on the Contributing page](https://github.com/search?q=repo%3Aethereum%2Fethereum-org-website+galxe+language%3AMarkdown+label%3A%22bug+%F0%9F%90%9B%22+&type=issues)

Needless to say, I went down the rabbit hole &#128007; and soon enough I managed to get a clearer idea of what was up.. **link references are hardcoded across the website**. Not sure if it was always the case or not, but it feels it might not be the best approach.

Here's a bird's eye view of the relevant items:

| Issue      | Description |
| ----------- | ----------- |
| [Dead links around site #14823](https://github.com/ethereum/ethereum-org-website/issues/14823)      | A neat report of all dead links found across website pages |
| [Fixed broken link on Contributing Page #14605](https://github.com/ethereum/ethereum-org-website/pull/14605/files) | A pr that updated `/public/content/index.md` only |
| [Old link for article about OATs on Contributing page #14200](https://github.com/ethereum/ethereum-org-website/issues/14200) | An open issue for the same link reference (More on OATs) |
| [Bug report #14711](https://github.com/ethereum/ethereum-org-website/issues/14711) | Same issue, different translated page |

But rest assured, <a id=related-issues></a>[many more are coming](https://github.com/search?q=repo%3Aethereum%2Fethereum-org-website%20https%3A%2F%2Fhelp.galxe.com%2Fen%2Farticles%2F7067290-galxe-oats-reward-and-celebrate-achievements&type=code) &#128565;!

<br>

<a id="pitch-idea"></a>

## &#128161;  Parameterized Link References

The idea is to apply a _modularity mindset_ and parameterize references to external links, using some sort of variable injection in the `content md` files; thus creating a _single source of truth_ for references to external URLs used across the website, and simplifying maintenance tasks:

* link references updated
* content pages consistent
* periodically check and update dead link references
* reduced duplication, improved reusability

### Implementation Considerations

* **Ease of Merging** - Opt for an implementation with the least amount of code refactoring
* **Consistency** - Reuse as many existing classes, functions, structure & architecture as possible
* **Reusability** - Keep code as reusable as possible, ask for feedback to polish the solution
* **Modularity** - Break down the preprocess logic into clear bits that just do one thing

<br>

> &#9432;  **Implementation Approach**
>
 > The proposed approach is just my first iteration on the root issue, there's a few items to review/discuss before merging, detailed below.
>
 >That being said, let's jump right into it.

<br>

## &#129302; Implementation Details

### &#128506; Implementation Design

* `/src/lib/constants` - Append new link reference variables, exported as an object  containing for ease of import + processing

* `/src/lib/md/preprocess.ts` -  Contains variable preprocessing logic for the md files

* `/src/lib/md/compile.ts`- Swap declaration of `preprocessMarkdown()` for the implementation of the same in `preprocess.ts`

### &#128203; Task Overview

1. Extract references to external URLs
2. Create easy-to-maintain `external-link-reference` variables for each item in #1
3. Replace harddoced references with `{placeholders}` for their variables in `all content md files`
4. Add necessary processing logic to replace `{placeholders}` with the corresponding `value`

### &#x1F9C0; Naming Overview

* `EXT_` + `REF_NAME` - Naming convention for new link references variables appended to the `constants.ts` file. _Variables not individually exported._

* `EXT_URLS` - Exported object to be imported for preprocessing content markdown files, making it easy to include / exclude existing variables: `{ EXT_REF_ONE, EXT_REF_TWO }`

* `preprocessMd()` - Moved and renamed function previously known as `preprocessMarkdown()` &#x1F57A;

* `{EXT_REF_NAME}` - Naming convention used for placeholders in the content md files. `EXT_REF_NAME` matches the variable name contained in the `constants.ts` file.

    Code has been structured to accommodate a couple different naming conventions for the placeholders: `{EXT_REF_NAME}` | `${EXT_REF_NAME}` | `{{EXT_REF_NAME}}`

<br>

<a id="status"></a>

## Implementation Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![view on github](https://img.shields.io/badge/check-github-teal?style=for-the-badge)](https://github.com/juanchax/ethereum-org-website)

| Repo | Task | Status |
| ----------- | ----------- | ----------- |
| Test | Implement link ref variables in constants.ts | Done |
| Test | Implement Markdown preprocessing logic | Done |
| Test | Implement link ref placeholders in /contributing/index.md | Done |
| Test | Move md preprocessing to 'preprocess.ts' file | Done |
| Test | Test preprocessing variable resolution | Done |
| Test | Test preprocessing heading anchors escaping | Done |

### Next steps

- [ ] Implement in forked repo test, and build locally to ensure nothing breaks.

- [ ] Test implementation

- [ ] Create a complete list of md files

- [ ] Replace hardcoded urls with variable placeholders

- [ ] Create any additional variables needed in 'constants.ts'

- [ ] Build local

- [ ] Test some more, double, triple check

If everything looks good, and Ethereum.org Community Admins are ok with this refactor:

- [ ] Create pull request

- [ ] Link [related issues](#pitch-idea) <->  PR
