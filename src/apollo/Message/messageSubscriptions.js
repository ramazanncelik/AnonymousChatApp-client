import {gql} from '@apollo/client';

export const messageCreated = gql`
    subscription createMessage{
        messageCreated {
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