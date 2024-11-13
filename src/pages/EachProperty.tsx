import { Button, Flex, Image, Rating, Stack, Text, Title } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';
import axios from 'axios';

const EachProperty = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = location.state.property.id;
    const queryClient = useQueryClient()

    // Fetch API
    const {mutateAsync,isPending} = useMutation({
        mutationFn: async () => {
            const response = await axios.patch(`${BASE_URL}/property/${params}`, { verified: true });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos'],
                exact: true,
            })
            alert('Property verified successfully');
            navigate('/dashboard/properties');
        },
        onError: (error) => {
            alert(error.message);
        }
    });


    return (
        <>
            <Flex gap='xl'>
                <Stack w={700}>
                    <Image src={`${BASE_URL}/${location.state.property.imgUrl}`} alt="property" width={300} height={300} />
                    <Rating value={location.state.property.rating} readOnly size='xl' />
                </Stack>
                <Stack>
                    <Title order={1}>{location.state.property.name}</Title>
                    <Text><strong>Category:</strong> {location.state.property.category}</Text>
                    <Text><strong>Location:</strong> {location.state.property.location}</Text>
                    <Text>{location.state.property.description}</Text>
                    <Text><strong>Documentation:</strong><Image src={`${BASE_URL}/${location.state.property.imgDocUrl}`} alt="documentation" width={300} height={300} /></Text>
                </Stack>
            </Flex>
            <Flex justify='end' px='xl' py='0'>
                {
                    location.state.property.verified ? <Button disabled>verified</Button> : <Button loading={isPending} onClick={() => mutateAsync()}>Verify</Button>
                }
            </Flex>
        </>
    )
}

export default EachProperty