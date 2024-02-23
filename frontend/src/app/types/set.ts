import { Term } from "./term"

export type Set = {
  name: string,
  description: string,
  terms: Term[],
  owner: string,
  id: number
}