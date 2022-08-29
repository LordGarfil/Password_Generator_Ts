export type ElementOptions = {
  id?: String
  class?: String
  classList?: Array<string>
  textContent?: String
  for?: String
}

export interface Options {
  container: ElementOptions
  input: ElementOptions
  label: ElementOptions
}