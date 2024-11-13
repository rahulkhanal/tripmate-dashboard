import { AppShell, Burger, Button, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { NavLink, Outlet, RouteObject } from 'react-router-dom';

const route = [
    { path: '/property/booking', label: 'Booking' },
    { path: '/property/user-setting', label: 'User Settings' },
    { path: '/property/amenety', label: 'Ameneties' },
    { path: '/property/rating', label: 'Ratings' }
]

const OwnerAppShellLayout = () => {
    const [opened, { toggle }] = useDisclosure();
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            window.location.href = "/loginaspropertyowner"
        }
    }, [])
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Flex align='center' justify='space-between' px='xl'>
                    <h1>TripMate</h1>
                    <Button variant='outline' color='red' onClick={() => { window.localStorage.clear(), window.location.reload() }}>Logout</Button>
                </Flex>
            </AppShell.Header>

            <AppShell.Navbar p="md" className='navbar'>
                {route.map((route) => (
                    <NavLink key={route.path} to={route.path}>
                        {route.label}
                    </NavLink>
                ))}
            </AppShell.Navbar>

            <AppShell.Main><Outlet /></AppShell.Main>
        </AppShell>
    );

}

export default OwnerAppShellLayout;