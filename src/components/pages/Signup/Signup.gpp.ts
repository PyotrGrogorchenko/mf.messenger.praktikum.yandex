import { Component } from '@Component'
// import { xhrPostAuthSignUp } from '@xhr'
// import { defaultPage } from '@utils'

const signUpOnClick = (e:Event) => {
  e.preventDefault()

  // eslint-disable-next-line no-console
  console.log('signUpOnClick')

  // const formdata = window.getFormData()

  // const body: LooseObject = {}
  // for (const key in formdata.data) {
  //   body[formdata.data[key].name] = formdata.data[key].value
  // }

  // const req = await xhrPostAuthSignUp(body)

  // if (req) {
  //   if (req.status === 200) {
  //     defaultPage()
  //   } else if (req.status >= 400) {
  //     alert(`Failed to execute sign up. reason ${req.response.reason}`)
  //   } else {
  //     alert('Failed to execute sign up.')
  //   }
  // } else {
  //   alert('Failed to execute sign up.')
  // }
}

export class Signup extends Component {
  state = {
    signUpOnClick,

    first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
    second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
    phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
    password: ''

  }

  template() {
    return (
      `<PageColumn>
        <AuthForm>
          <AuthHeader text='Sign up'></>
          
          <AuthContent>
            <InputMain text='First name'   type='name'     id='input_first-name'   value={{state.first_name}} ></>                  
            <InputMain text='Second name'  type='name'     id='input_second-name'  value={{state.second_name}} ></>                  
            <InputMain text='Login'        type='login'    id='input_login'        value={{state.login}} ></>                  
            <InputMain text='email'        type='mail'     id='input_email'        value={{state.email}} ></>                  
            <InputMain text='Password'     type='password' id='input_password'     value={{state.password}} ></>                  
            <InputMain text='Phone'        type='phone'    id='input_phone'        value={{state.phone}} ></>                  
          </AuthContent>
          
          <AuthFooter>
            <ButtonMain text='Sign up'      id='button-sign-up' onClick={{state.signUpOnClick}}></>
            <ButtonSecondary text='Log in' id='button-to-log-in' onClick={{state.signUpOnClick}}></ButtonSecondary>
          </AuthFooter>
        
        </AuthForm>
      </PageColumn>`
    )
  }
}
