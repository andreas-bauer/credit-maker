import { Credit } from './credit'

export type CreditGenerator = (
  _authorName: string,
  _credits: Credit[]
) => string
