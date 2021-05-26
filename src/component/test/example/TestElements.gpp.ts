import { Component } from '../../index'
import { PageColumn } from './PageColumn.gpp'
import { Form } from './Form.gpp'
import { Header } from './Header.gpp'
import { Content } from './Content.gpp'
import { Footer } from './Footer.gpp'
import { Input } from './Input.gpp'
import { Button } from './Button.gpp'

const signUpOnClick = (e:Event) => {
  e.preventDefault()
}

export class TestElements extends Component {
  state = {
    signUpOnClick,
    first_name: 'first_name',
    second_name: 'second_name',
    login: 'login',
    email: 'email',
    phone: 'phone',
    password: ''

  }

  // eslint-disable-next-line class-methods-use-this
  components() {
    return {
      PageColumn, Form, Header, Content, Footer, Input, Button
    }
  }

  template() {
    return (
      `<PageColumn>
        <Form>
          <Header text='Sign up'></>
          
          <Content>
            <Input text='First name'   type='name'     id='input_first-name'   value={{state.first_name}}></>                  
            <Input text='Second name'  type='name'     id='input_second-name'  value={{state.second_name}}></>                  
            <Input text='Login'        type='login'    id='input_login'        value={{state.login}}></>                  
            <Input text='email'        type='mail'     id='input_email'        value={{state.email}}></>                  
            <Input text='Password'     type='password' id='input_password'     value={{state.password}}></>                  
            <Input text='Phone'        type='phone'    id='input_phone'        value={{state.phone}}></>                  
          </Content>
          
          <Footer>
            <Button text='Sign up' id='button-sign-up' onClick={{state.signUpOnClick}}></>
            <Button text='Log in' id='button-to-log-in' onClick={{state.signUpOnClick}}></>
          </Footer>
        
        </Form>
      </PageColumn>`
    )
  }
}
