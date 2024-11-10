import { Badge, Button, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const Properties = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['property'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/property`);
      const data = await response.json();
      return data;
    },
    refetchInterval: 1000,
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const rows = data.map((element: any, index: number) => (
    <Table.Tr key={element.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{element.verified ? <Badge color="green">Verified</Badge> : <Badge color="yellow">Pending</Badge>}</Table.Td>
      <Table.Td>
        <Button onClick={() => navigate(`/dashboard/properties/${element.id}`, { state: { property: element } })}>View</Button>
      </Table.Td>
    </Table.Tr>
  ));
  console.log(data);
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>SN</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

    </div>
  )
}

export default Properties