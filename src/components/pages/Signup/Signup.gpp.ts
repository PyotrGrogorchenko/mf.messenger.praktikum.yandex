import { Component } from '@Component'
import { subscribe } from '@store'
import { validateField } from '@validation'
import { initFields } from './utils'

const fields = initFields()

const signUpOnClick = (e:Event) => {
  e.preventDefault()
  // signup()
  console.log('fields', fields)
}

export class Signup extends Component {
  componentDidMount() {
    // console.log('fields', fields)
    // subscribe('FLOW_USER', this.onUserChange)
  }

  onBlur = (e: FocusEvent) => {
    const input = <HTMLInputElement>e.target
    const { id, value } = input
    const field = fields[id]
    field.value = value
    fields[id] = validateField(field)
    this.setState({ fields })
  }

  onUserChange() {
    console.log('onUserChange')
  }

  state = {
    signUpOnClick,
    onBlur: this.onBlur,
    ...fields
  }

  template() {
    return (
      `<PageColumn>
        <AuthForm formName={{'userData'}}>
          <AuthHeader text='Sign up'></>
          <AuthContent>
            <InputField field={{state.first_name}}  onBlur={{state.onBlur}}></>
            <InputField field={{state.second_name}} onBlur={{state.onBlur}}></>
            <InputField field={{state.login}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.email}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.password}}    onBlur={{state.onBlur}}></>
            <InputField field={{state.phone}}       onBlur={{state.onBlur}}></>
          </AuthContent>
          <AuthFooter>
            <ButtonMain text='Sign up' id='button-sign-up' onClick={{state.signUpOnClick}}></>
            <ButtonSecondary text='Log in' id='button-to-log-in' onClick={{state.signUpOnClick}}></>
          </AuthFooter>
        </AuthForm>
      </PageColumn>`
    )
  }
}
