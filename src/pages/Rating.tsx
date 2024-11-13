import { Rating, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../api';

const RatingPage = () => {
    const token = window.localStorage.token;
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}/auth/my-profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;  // Returning response.data directly
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>SN</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Review</Table.Th>
                    <Table.Th>Rating</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data?.ratings?.map((element: any, index: number) => (
                    <Table.Tr key={element.id}> 
                        <Table.Td>{index + 1}</Table.Td>
                        <Table.Td>{element.createdAt.toString().slice(0, 10)}</Table.Td>
                        <Table.Td>{element.visitor.name}</Table.Td>
                        <Table.Td>{element.review}</Table.Td>
                        <Table.Td><Rating value={element.rating_score} readOnly /></Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
}

export default RatingPage;
