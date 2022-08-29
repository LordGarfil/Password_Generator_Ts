import { Options } from '../types/HtmlOptions'
import { Add_element_attribute } from '../mixins/HtmlOptions'

const OptionsElement = (options: Options): HTMLDivElement => {
  const {
    container: containerOptions,
    input: inputOptions,
    label: labelOptions,
  } = options

  const containerElement = document.createElement("div")
  Add_element_attribute(containerElement, containerOptions)

  const inputElement = document.createElement("input")
  inputElement.type = "checkbox"
  Add_element_attribute(inputElement, inputOptions)

  const labelElement = document.createElement("label")
  Add_element_attribute(labelElement, labelOptions)

  containerElement.appendChild(inputElement)
  containerElement.appendChild(labelElement)
  
  return containerElement
}

export default OptionsElement
