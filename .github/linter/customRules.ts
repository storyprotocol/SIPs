import { RuleParams, RuleOnError } from "markdownlint"
import * as yaml from "js-yaml"

export const enforceHeaderStructure = {
  names: ["enforce-header-structure"],
  description: "Proposal header structure should follow template",
  tags: ["structure"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
    .join("\n")
    .trim()
    .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)
    if (!frontMatter) return

    const category: string = frontMatter.category
    if (!category) return

    if (["Meta"].includes(category)) return

    const filtered = params.tokens.filter(function filterToken(token) {
      return (
        token.type === "heading_open" &&
        (token.tag === "h1" || token.tag === "h2")
      )
    })

    let index = 0

    let tempHeadings = expectedHeadings;

    while (index < expectedHeadings.length) {
      let token = filtered[index]
      tempHeadings = tempHeadings.filter(item => item !== token.line)

      if (index >= filtered.length) {
        onError({
          lineNumber: 1,
          detail: `Expected heading \`${tempHeadings[0]}\` and none exists. Please follow the structure outlined in the Proposal Template.`,
        })

        return
      } else {
        index++
      }
    }
    tempHeadings.forEach(item => {
      onError({
        lineNumber: 1,
        detail: `Expected heading \`${item}\` and none exists. Please follow the structure outlined in the Proposal Template.`,
      })
    })

    if (tempHeadings.length >= 0) {
      return
    }
  },
}

const expectedHeadings = [
  "## Summary",
  "## Motivation",
  "## Proposal",
  "## Drawbacks",
  "## Alternatives Considered",
  "## User Impact",
]

export const enforceMetadataStructure = {
  names: ["enforce-front-matter-structure"],
  description:
    "Proposal front matter should be YAML following template structure",
  tags: ["front-matter"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
      .join("\n")
      .trim()
      .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)

    if (!frontMatter) {
      onError({
        lineNumber: 1,
        detail: `Missing front matter metadata formatted as YAML`,
      })
      return
    }

    Object.keys(requiredMetadata).forEach((meta) => {
      if (!frontMatter[meta]) {
        onError({
          lineNumber: 1,
          detail: `Front matter metadata either doesn't contain \`${meta}\` or isn't formatted correctly`,
        })
      }
    })

    Object.keys(frontMatter).forEach((key) => {
      if (!(requiredMetadata as any)[key] && !optionalMetadata.includes(key)) {
        onError({
          lineNumber: 1,
          detail: `Front matter contains invalid metadata \`${key}\``,
        })
      }
    })
  },
}

const requiredMetadata = {
  number: {},
  title: {},
  authors: {},
  sponsors: {},
  created: {},
  type: {},
  status: {},
}

const optionalMetadata = [
  "supersedes",
  "superseded-by",
  "extends",
]

export const metadataSipIsValid = {
  names: ["front-matter-has-number"],
  description: "Metadata `number` is a 5 digit numerical string",
  tags: ["front-matter"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
      .join("\n")
      .trim()
      .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)
    if (!frontMatter) return

    const sip: string = frontMatter.number
    if (!sip) return

    if (isNaN(Number(sip))) {
      onError({
        lineNumber: 1,
        detail: "Front matter `number` must be a numerical string",
      })
    }

    if (sip.length !== 5) {
      onError({
        lineNumber: 1,
        detail: "Front matter `number` must be 5 digits",
      })
    }
  },
}

export const metadataTitleIsValid = {
  names: ["front-matter-has-title"],
  description:
    "Proposal front matter should include a title no longer than 45 characters",
  tags: ["front-matter"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
      .join("\n")
      .trim()
      .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)
    if (!frontMatter) return

    const title: string = frontMatter.title
    if (!title) return

    if (title.length > 45) {
      onError({
        lineNumber: 1,
        detail: "Metadata `title` should be no longer than 45 characters",
      })
    }
  },
}

export const metadataAuthorsIsValid = {
  names: ["front-matter-has-authors"],
  description: "Proposal front matter should include authors",
  tags: ["front-matter"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
      .join("\n")
      .trim()
      .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)
    if (!frontMatter) return

    const authors: string = frontMatter.authors
    if (!authors) return

    if (authors.length == 0) {
      onError({
        lineNumber: 1,
        detail: "Metadata `authors` exists but doesn't include any values",
      })
    }
  },
}

export const metadataTypeIsValid = {
  names: ["front-matter-has-valid-type"],
  description: "Proposal front matter should have a valid type",
  tags: ["front-matter"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
      .join("\n")
      .trim()
      .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)
    if (!frontMatter) return

    const type: string = frontMatter.type
    if (!type) return

    if (!["Meta", "Standard", "Ecosystem"].includes(type)) {
      onError({
        lineNumber: 1,
        detail: `\`${type}\` is not supported as a value for type`,
      })
    }
  },
}

export const metadataStatusIsValid = {
  names: ["front-matter-has-valid-status"],
  description: "Proposal front matter should have a valid status",
  tags: ["front-matter"],
  function: function rule(params: RuleParams, onError: RuleOnError) {
    const string = params.frontMatterLines
      .join("\n")
      .trim()
      .replace(/^-*$/gm, "")

    const frontMatter: any = yaml.load(string)
    if (!frontMatter) return

    const status: string = frontMatter.status
    if (!status) return

    const validStatus = [
      "Idea",
      "Draft",
      "Review",
      "Accepted",
      "Stagnant",
      "Withdrawn",
      "Implemented",
      "Activated",
      "Living"
    ]

    if (!validStatus.includes(status)) {
      onError({
        lineNumber: 1,
        detail: `\`${status}\` is not supported as a value for status. Valid values for status are: ${validStatus.join(
          ", "
        )}`,
      })
    }
  },
}
