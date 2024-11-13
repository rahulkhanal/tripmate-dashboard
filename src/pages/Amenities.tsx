import axios from 'axios';
import { BASE_URL } from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Switch, Table } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const Amenities = () => {
    const token = window.localStorage.token;
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}/auth/my-profile`, { headers: { 'Authorization': `Bearer ${token}` } });
            return response;
        },
    });

    const { isLoading: isPending, mutate: handleClick } = useMutation({
        mutationFn: async (element) => {
            return await axios.patch(
                `${BASE_URL}/property/${element.id}/features`,
                { status: !element.status },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            notifications.show({
                position: 'top-right',
                title: 'Feature Updated',
                message: 'The feature status has been successfully updated.',
            });
        },
        onError: (error) => {
            console.error(error);
            notifications.show({
                color: 'red',
                position: 'top-right',
                title: 'Update Failed',
                message: error.response?.data?.message || 'An error occurred while updating the feature.',
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>SN</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data?.data?.propertyFeatures.map((element, index) => (
                        <Table.Tr key={element.id}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td>{element.feature.name}</Table.Td>
                            <Table.Td>
                                <Switch
                                    onChange={() => handleClick(element)}
                                    checked={element.status}
                                    disabled={isPending}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );
}

export default Amenities;