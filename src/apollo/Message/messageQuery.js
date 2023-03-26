import { gql } from '@apollo/client'

export const getMessages = gql`
    query{
        messages {
            _id
            From
            Description
            FullDate
            Date
            Time
            Month
        }
    }
`;