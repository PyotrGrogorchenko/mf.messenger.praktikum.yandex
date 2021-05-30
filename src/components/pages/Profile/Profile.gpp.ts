import { Component } from '@Component'
import { selectUser } from '@store'
import { validateFields, validateInput } from '@validation'
import { getFields, logout } from './utils'

export class Profile extends Component {
  onBlur = (e: FocusEvent) => {
    e.preventDefault()
    const fields = validateInput(this.state.fields, <HTMLInputElement>e.target)
    this.setState({ fields })
  }

  saveOnClick = (e:Event) => {
    e.preventDefault()
    const validation = validateFields(this.state.fields)
    this.setState({ fields: validation.fields })
    // if (validation.valid) {
    //   signup(validation.fields).then(() => redirect('#signup'))
    // }
  }

  logoutOnClick = (e:Event) => {
    e.preventDefault()
    logout()
  }

  state = {
    saveOnClick: this.saveOnClick,
    logoutOnClick: this.logoutOnClick,
    onBlur: this.onBlur,
    fields: getFields(selectUser())
  }

  template() {
    return (
      `<PageColumn>
        <Form>
          <FormHeader text='Profile'></>
          <FormContent>
            <InputField field={{state.fields.first_name}}  onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.second_name}} onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.login}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.email}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.phone}}       onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.oldPassword}}    onBlur={{state.onBlur}}></>
            <InputField field={{state.fields.newPassword}}    onBlur={{state.onBlur}}></>
          </FormContent>
          <FormFooter>
            <Button text='Save' id='button_save' onClick={{state.saveOnClick}}></>
            <Button text='Log out' id='button_logout' onClick={{state.logoutOnClick}} margin={{middle}} style={{secondary}}></>
          </FormFooter>
        </Form>
      </PageColumn>`
    )
  }
}
