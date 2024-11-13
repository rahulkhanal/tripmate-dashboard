import { Button, Center, Paper, PasswordInput, TextInput } from '@mantine/core'
import { Link } from 'react-router-dom'

const Login = () => {
  function handleLogin() {
    console.log('Login')
  }
  return (
    <>
      <Paper shadow='xl' withBorder radius="md" p="md" w={300} m={'auto'} mt={100}>
        <TextInput label="Email" placeholder="Enter your email" />
        <br />
        <PasswordInput label="Password" placeholder="Enter your password" type="password" />
        <br />
        <Button onClick={() => { handleLogin() }}>Login</Button>
      </Paper>
      <br />
      <Center>
        <Link to="/loginaspropertyowner">Are you Login as a property owner? Login here</Link>
      </Center>
    </>
  )
}

export default Login