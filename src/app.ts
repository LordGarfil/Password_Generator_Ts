import options from "../options.json"

import OptionsElement from "./components/Options"

const App = () => {
  type Options = {
    name: String
    value: boolean
  }

  type Data = {
    password: String
    strength: String
  }

  type State = {
    options: Array<Options>
    data: Data | {}
  }

  const state: State = {
    options: [],
    data: {},
  }

  const Init = () => {
    InitHTML()
    Init_listeners()
  }

  const InitHTML = () => {
    options.forEach((option) => {
      const optionsGroup = OptionsElement(option)

      const optionsContainer = document.querySelector(".options-container")
      if (optionsContainer) {
        optionsContainer.appendChild(optionsGroup)
      }
    })
  }

  const Handle_submit = () => {
    let password: String = ""
    const len = 10
    var letters = "abcdefghijklmnopqrstuvwxyz"
    var numbers = "0123456789"
    var symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-="
    const min = 1

    let currentLen = len

    const optionsLength = state.options.filter(option => option.value == true).length
    for (let option of state.options) {
      const { value, name } = option
      if (value) {
        if (name == "uppercase") {
          let max =
          optionsLength > 1 ? Math.floor(Math.random() * currentLen + 1) : len
          currentLen = currentLen - max
          for(let i = 0; i < max; i++){
            const r = Math.floor(Math.random() * letters.length)
            password += letters.at(r)?.toUpperCase()
          }
        }
        if (name == "lowercase") {
          const max =
          optionsLength > 1 ? Math.floor(Math.random() * currentLen + 1) : len
          currentLen = currentLen - max
          for(let i = 0; i < max; i++){
            const r = Math.floor(Math.random() * letters.length)
            password += letters.at(r)
          }
        }
        if (name == "numbers") {
          const max =
          optionsLength > 1 ? Math.floor(Math.random() * currentLen + 1) : len
          currentLen = currentLen - max
          for(let i = 0; i < max; i++){
            const r = Math.floor(Math.random() * (max - min) + min)
            password += numbers.at(r)
          }
        }
        if (name == "symbols") {
          const max =
          optionsLength > 1 ? Math.floor(Math.random() * currentLen + 1) : len
          currentLen = currentLen - max
          for(let i = 0; i < max; i++){
            const r = Math.floor(Math.random() * symbols.length )
            password += symbols.at(r)
          }
        }
      }
    }

    const shuffle = str => [...str].sort(()=>Math.random()-.5).join('');
    state.data = {
      ...state.data,
      password: shuffle(password)
    }
    document.querySelector('#password').innerHTML = state.data.password
  }

  const Get_options_status = (checkbox: HTMLInputElement) => {
    const checkboxData: Options = {
      name: checkbox.id,
      value: checkbox.checked,
    }

    state.options.push(checkboxData)
  }

  const Init_listeners = () => {
    Listen_to_option_change()
    Listen_to_copy()

    document.querySelector("button")!.onclick = Handle_submit
  }

  const Listen_to_option_change = () => {
    const checkboxes = document.querySelectorAll("input[name=option-checkbox]")
    if (checkboxes) {
      checkboxes.forEach((checkbox) => {
        Get_options_status(checkbox)
        checkbox.addEventListener("change", Handle_checkbox_change)
      })
      return
    }

    console.warn("No hay opciones")
  }

  const Listen_to_copy = () => {
    document.querySelector('#copy').onclick = Copy_on_clipboad
  }

  const Handle_checkbox_change = (event: Event) => {
    const target = event.target as HTMLInputElement
    const checkbox = {
      name: target.id,
      value: target.checked,
    }

    const newState = state.options.map((option) => {
      if (option.name == checkbox.name) {
        return { ...option, value: checkbox.value }
      }
      return option
    })

    state.options = newState
  }

  const Copy_on_clipboad = () => {
    navigator.clipboard.writeText(state.data.password)
  }

  Init()
}

App()
