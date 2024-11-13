import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../api';
import { Badge, Table } from '@mantine/core';
import axios from 'axios';

const Booking = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/visit/get-all-bookings?userType='owner'`, { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } });
      return response.data;
    },
    refetchInterval: 1000,
  });
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  let row;
  if (data) {
    row = data?.map((element: any, index: number) => (
      <Table.Tr key={element.id}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{element.visitor.name}</Table.Td>
        <Table.Td>{element.startDate.toString().slice(0, 10)}</Table.Td>
        <Table.Td>{element.endDate.toString().slice(0, 10)}</Table.Td>
        <Table.Td><Badge color="green">{element.status}</Badge></Table.Td>
      </Table.Tr>
    ));
  }else{
    row = <Table.Tr><Table.Td colSpan={5}>No Booking Found</Table.Td></Table.Tr>
  }
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>SN</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Start Date</Table.Th>
            <Table.Th>End Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{row}</Table.Tbody>
      </Table>

    </div>
  )

}

export default Booking