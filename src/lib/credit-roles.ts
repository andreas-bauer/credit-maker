export interface CreditRole {
  name: string
  definition: string
}

export const allCreditRoles: CreditRole[] = [
  {
    name: 'Conceptualization',
    definition:
      'Ideas, formulation or evolution of overarching research goals and aims.',
  },
  {
    name: 'Data curation',
    definition:
      'Produce metadata, scrub data and maintain research data for initial use and later re-use.',
  },
  {
    name: 'Formal analysis',
    definition:
      'Application of statistical, mathematical, computational, or other formal techniques to analyze data.',
  },
  {
    name: 'Funding acquisition',
    definition:
      'Acquisition of the financial support for the project leading to this publication.',
  },
  {
    name: 'Investigation',
    definition:
      'Conducting a research and investigation process, specifically performing the data collection.',
  },
  {
    name: 'Methodology',
    definition: 'Development or design of methodology; creation of models.',
  },
  {
    name: 'Project Management',
    definition:
      'Management and coordination responsibility for the research activity planning and execution.',
  },
  {
    name: 'Resources',
    definition:
      'Provision of study materials, instrumentation, computing resources, or other analysis tools.',
  },
  {
    name: 'Software',
    definition:
      'Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms.',
  },
  {
    name: 'Supervision',
    definition:
      'Oversight for the research activity planning and execution, including mentorship external to the core team.',
  },
  {
    name: 'Validation',
    definition: 'Replication of results and other research outputs.',
  },
  {
    name: 'Visualization',
    definition:
      'Preparation, creation and/or presentation of the published work, specifically data presentation.',
  },
  {
    name: 'Writing – original draft',
    definition:
      'Preparation, creation and/or presentation of the published work, specifically writing the initial draft.',
  },
  {
    name: 'Writing – review and editing',
    definition:
      'Critical review, commentary or revision – including pre- or post-publication stages.',
  },
]
