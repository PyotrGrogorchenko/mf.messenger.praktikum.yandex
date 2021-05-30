import { Component } from '@Component'
import { validateFields, validateInput } from '@validation'
import { redirect } from '@router'
import { selectUser, subscribe, User } from '@store'
import { getFields, signin } from './utils'

const signupOnClick = (e:Event) => {
  e.preventDefault()
  redirect('#signup')
}

export class Signin extends Component {
  componentDidMount() {
    subscribe('FLOW_USER', this.onUserChange)
  }

  onBlur = (e: FocusEvent) => {
    e.preventDefault()
    const fields = validateInput(this.state.fields, <HTMLInputElement>e.target)
    this.setState({ fields })
  }

  signinOnClick = (e:Event) => {
    e.preventDefault()
    const validation = validateFields(this.state.fields)
    this.setState({ fields: validation.fields })
    if (validation.valid) {
      signin(validation.fields).then(() => redirect('#chat'))
    }
  }

  onUserChange = (user: User) => {
    this.setState({ fields: getFields(user) })
  }

  state = {
    signinOnClick: this.signinOnClick,
    signupOnClick,
    onBlur: this.onBlur,
    fields: getFields(selectUser())
  }

  template() {
    return (
      `<PageColumn>
        <Form>
          <FormHeader text='Sign in'></>
          <FormContent>
            <InputField field={{state.fields.login}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.password}}    onBlur={{state.onBlur}}></>
          </FormContent>
          <FormFooter>
            <Button text='Sign in' id='button_sign-in' onClick={{state.signinOnClick}}></>
            <Button text='Sign up' id='button_sign-up' onClick={{state.signupOnClick}} margin={{middle}} style={{secondary}}></>
          </FormFooter>
        </Form>
      </PageColumn>`
    )
  }
}
