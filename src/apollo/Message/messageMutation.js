import {gql} from '@apollo/client'

export const createMessage = gql`
    mutation($data: CreateMessageInput!){
        createMessage(data: $data)
    }
`;