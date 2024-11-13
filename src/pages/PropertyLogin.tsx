import { Button, Paper, PasswordInput, TextInput } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../api'
import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

const PropertyLogin = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    async function handleLogin() {
        const response = await axios.post(`${BASE_URL}/auth/login?userType=owner`, { email: email, password: password })
        if (response.status == 201) {
            window.localStorage.setItem('token', response.data.token);
        }
    }
    const { isPending, mutate } = useMutation({
        mutationFn: handleLogin,
        onSuccess: (e) => {
            console.log(e);
            window.location.href = '/property/booking'
        },
        onError: (e) => {
            console.log(e);
            notifications.show({
                color: 'red',
                position: 'top-right',
                title: 'Login Failed',
                message: e.response.data.message,
            })
        }
    })

    return (
        <Paper shadow='xl' withBorder radius="md" p="md" w={300} m={'auto'} mt={100}>
            <TextInput label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <PasswordInput label="Password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <Button onClick={() => mutate()} loading={isPending} disabled={isPending}>Login</Button>
        </Paper>
    )
}

export default PropertyLogin