import { Signin } from '@pages/Signin'
import { selectAuth } from '@store'

export const privateRoute = (Component: any) => () => (selectAuth() ? Component : Signin)
