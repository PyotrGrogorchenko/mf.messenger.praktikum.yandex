import { Component } from '@Component'
import { selectUser, subscribe } from '@store'
import { validateFields, validateInput } from '@validation'
import { User } from '@xhrTypes'
import { getFields, logout, save } from './utils'

export class Profile extends Component {
  componentDidMount() {
    subscribe('FLOW_USER', this.onUser)
  }

  onUser = (user: User) => {
    this.setState({ fields: getFields(user) })
  }

  onBlur = (e: FocusEvent) => {
    e.preventDefault()
    const fields = validateInput(this.state.fields, <HTMLInputElement>e.target)
    this.setState({
      fields,
      header: 'Profile*',
      changed: true
    })
  }

  saveOnClick = (e:Event) => {
    e.preventDefault()
    const validation = validateFields(this.state.fields)
    this.setState({ fields: validation.fields })
    if (!this.state.changed) {
      // eslint-disable-next-line no-alert
      alert('Data is not changed')
      return
    }

    if (!validation.valid) {
      // eslint-disable-next-line no-alert
      alert('Data is not valid')
      return
    }

    save(this.state.fields).then(() => {
      this.setState({
        header: 'Profile',
        changed: false
      })
    })
  }

  logoutOnClick = (e:Event) => {
    e.preventDefault()
    logout()
  }

  state = {
    header: 'Profile',
    changed: false,
    saveOnClick: this.saveOnClick,
    logoutOnClick: this.logoutOnClick,
    onBlur: this.onBlur,
    fields: getFields(selectUser())
  }

  template() {
    return (
      `<Root>
        <div className='flex-column'>
          <Form>
            <FormHeader text={{state.header}}></>
            <FormContent>
              <InputField field={{state.fields.display_name}}     onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.first_name}}     onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.second_name}}    onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.login}}          onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.email}}          onBlur={{state.onBlur}}></>
              <InputField field={{state.fields.phone}}          onBlur={{state.onBlur}}></>
            </FormContent>
            <FormFooter>
              <Button text='Save' id='button_save' onClick={{state.saveOnClick}}></>
              <Button text='Log out' id='button_logout' onClick={{state.logoutOnClick}} style='secondary' margin='middle'></>
            </FormFooter>
          </Form>
        </div>
      </Root>`
    )
  }
}
