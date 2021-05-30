import { Component } from '@Component'
import { subscribe, User } from '@store'
import { validateField, validateFields } from '@validation'
import { getFields, signup } from './utils'

export class Signup extends Component {
  componentDidMount() {
    subscribe('FLOW_USER', this.onUserChange)
  }

  onBlur = (e: FocusEvent) => {
    const input = <HTMLInputElement>e.target
    const { id, value } = input
    const { fields } = this.state
    const field = this.state.fields[id]
    field.value = value
    fields[id] = validateField(field)
    this.setState({ fields })
  }

  signUpOnClick = (e:Event) => {
    e.preventDefault()
    const validation = validateFields(this.state.fields)
    this.setState({ fields: validation.fields })
    if (validation.valid) {
      signup(validation.fields)
    }
  }

  onUserChange = (user: User) => {
    this.setState({ fields: getFields(user) })
  }

  state = {
    signUpOnClick: this.signUpOnClick,
    onBlur: this.onBlur,
    fields: getFields()
  }

  template() {
    return (
      `<PageColumn>
        <AuthForm formName={{'userData'}}>
          <AuthHeader text='Sign up'></>
          <AuthContent>
            <InputField field={{state.fields.first_name}}  onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.second_name}} onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.login}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.email}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.password}}    onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.phone}}       onBlur={{state.onBlur}}></>
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
