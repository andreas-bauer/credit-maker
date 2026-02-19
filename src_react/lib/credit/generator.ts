import { Contributors } from './credit'

export type CreditGenerator = (_contributors: Contributors) => string
