import { Component } from '@Component'
import { selectUser, subscribe } from '@store'
import { validateFields, validateInput } from '@validation'
import { redirect } from '@router'
import { User } from '@xhrTypes'
import { getFields, signup } from './utils'

const signinOnClick = (e:Event) => {
  e.preventDefault()
  redirect('#signin')
}

export class Signup extends Component {
  componentDidMount() {
    subscribe('FLOW_USER', this.onUser)
  }

  onUser = (user: User) => {
    if (user) {
      redirect('#chat')
    }
  }

  onBlur = (e: FocusEvent) => {
    e.preventDefault()
    const fields = validateInput(this.state.fields, <HTMLInputElement>e.target)
    this.setState({ fields })
  }

  signupOnClick = (e:Event) => {
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
    signupOnClick: this.signupOnClick,
    signinOnClick,
    onBlur: this.onBlur,
    fields: getFields(selectUser())
  }

  template() {
    return (
      `<Root>
        <div className='flex-column'>
          <Form formName={{'userData'}}>
            <FormHeader text='Sign up'></>
            <FormContent>
              <InputField field={{state.fields.first_name}}  onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.second_name}} onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.login}}       onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.email}}       onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.password}}    onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.phone}}       onBlur={{state.onBlur}}></>
            </FormContent>
            <FormFooter>
              <Button text='Sign up' id='button_sign-up' onClick={{state.signupOnClick}}></>
              <Button text='Sign in' id='button_sign-in' onClick={{state.signinOnClick}} style='secondary' margin='middle'></>
            </FormFooter>
          </Form>
        </div>
      </Root>`
    )
  }
}
