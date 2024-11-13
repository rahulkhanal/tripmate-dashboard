import { Button, Modal, Space, Table, TextInput } from '@mantine/core';
import { BASE_URL } from '../api';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

const UserSetting = () => {
  const token = window.localStorage.token;
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient()
  const [updateDta, setUpdateDta] = useState<any>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/auth/my-profile`, { headers: { 'Authorization': `Bearer ${token}` } });
      return response;
    },
  });

  function handleChanges(item: any) {
    setUpdateDta(item)
    open()
  }

  // 
  const { isPending, mutate: updateInfo } = useMutation({
    mutationFn: () => {
      console.log({ [updateDta.label]: updateDta.value });
      return axios.patch(`${BASE_URL}/property/${data?.data.id}`, { [updateDta.label]: updateDta.value }, {headers: { 'Authorization': `Bearer ${token}` }})
    },
    onSuccess: (e) => {
      notifications.show({
        position: 'top-right',
        title: 'Account Update',
        message: 'Successfully updated'
      })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      close()
    },
    onError: (e) => {
      console.log(e);
      notifications.show({
        color: 'red',
        position: 'top-right',
        title: 'Login Failed',
        message: e.response.data.message || 'An unrecognised error',
      })
    }
  })

console.log(data);

  if (isLoading) {
    return <>Loading...</>
  }
  if (error) {
    return <>{error.message}</>
  }
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>SN</Table.Th>
            <Table.Th>Details</Table.Th>
            <Table.Th>Information</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {[
            { label: "name", value: data?.data.name },
            { label: "category", value: data?.data.category },
            { label: "description", value: data?.data.description },
            { label: "location", value: data?.data.location },
            { label: "price", value: `${data?.data.price}` },
          ].map((item, index) => (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}.</Table.Td>
              <Table.Td>{item.label}</Table.Td>
              <Table.Td>{item.value}</Table.Td>
              <Table.Td><Button onClick={() => handleChanges(item)}>Edit</Button></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close} title="Update Information">
        <TextInput
          label={updateDta?.label}
          value={updateDta?.value}
          onChange={(e) => setUpdateDta({ ...updateDta, value: e.target.value })}
        />
        <Space h="sm" />
        <Button onClick={() => updateInfo()} loading={isPending}>Submit</Button>

      </Modal>
    </>
  )
}

export default UserSetting