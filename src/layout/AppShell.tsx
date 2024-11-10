import { AppShell, Burger, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink, Outlet, RouteObject } from 'react-router-dom';

const route = [
    { path: '/dashboard/properties', label: 'Properties' },
    { path: '/dashboard/booking', label: 'Booking' },
]

const AppShellLayout = () => {
    const [opened, { toggle }] = useDisclosure();
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
                <Title order={4}>Tripmate Dashboard</Title>
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

export default AppShellLayout