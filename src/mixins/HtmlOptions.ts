import { ElementOptions } from '../types/HtmlOptions'

export const Add_element_attribute = (
  element: HTMLElement,
  options: ElementOptions
) => {
  const exceptional_options = ["textContent"]

  let key: keyof typeof options
  for (key in options) {
    const option = options[key]
    if (exceptional_options.includes(key)) {
      element[key] = option
    } else {
      element.setAttribute(key, option)
    }
  }
}