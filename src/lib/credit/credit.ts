const ALL_CREDITS = [
  'conceptualization',
  'dataCuration',
  'formalanAlysis',
  'funding',
  'investigation',
  'methodology',
  'projectManagement',
  'resource',
  'software',
  'supervision',
  'validation',
  'visualization',
  'writing',
  'writingReview',
] as const

export type Credit = (typeof ALL_CREDITS)[number]

export function isCredit(value: string): value is Credit {
  return ALL_CREDITS.includes(value as Credit)
}

export interface CreditRole {
  name: string
  definition: string
}

export const allCreditRoles: Record<Credit, CreditRole> = {
  conceptualization: {
    name: 'Conceptualization',
    definition:
      'Ideas, formulation or evolution of overarching research goals and aims.',
  },
  dataCuration: {
    name: 'Data curation',
    definition:
      'Produce metadata, scrub data and maintain research data for initial use and later re-use.',
  },
  formalanAlysis: {
    name: 'Formal analysis',
    definition:
      'Application of statistical, mathematical, computational, or other formal techniques to analyze data.',
  },
  funding: {
    name: 'Funding acquisition',
    definition:
      'Acquisition of the financial support for the project leading to this publication.',
  },
  investigation: {
    name: 'Investigation',
    definition:
      'Conducting a research and investigation process, specifically performing the data collection.',
  },
  methodology: {
    name: 'Methodology',
    definition: 'Development or design of methodology; creation of models.',
  },
  projectManagement: {
    name: 'Project Management',
    definition:
      'Management and coordination responsibility for the research activity planning and execution.',
  },
  resource: {
    name: 'Resources',
    definition:
      'Provision of study materials, instrumentation, computing resources, or other analysis tools.',
  },
  software: {
    name: 'Software',
    definition:
      'Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms.',
  },
  supervision: {
    name: 'Supervision',
    definition:
      'Oversight for the research activity planning and execution, including mentorship external to the core team.',
  },
  validation: {
    name: 'Validation',
    definition: 'Replication of results and other research outputs.',
  },
  visualization: {
    name: 'Visualization',
    definition:
      'Preparation, creation and/or presentation of the published work, specifically data presentation.',
  },
  writing: {
    name: 'Writing – original draft',
    definition:
      'Preparation, creation and/or presentation of the published work, specifically writing the initial draft.',
  },
  writingReview: {
    name: 'Writing – review and editing',
    definition:
      'Critical review, commentary or revision – including pre- or post-publication stages.',
  },
}
