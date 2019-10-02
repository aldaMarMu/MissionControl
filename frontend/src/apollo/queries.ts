import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password)
  }
`;


export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      teacher
      publisher
      teacherPro
      admin
    }
  }
`;

export const USERS_ANALYTICS_QUERY = gql`
query usersAnalytics($loginAfter: Date){
  usersAnalytics(loginAfter: $loginAfter){
  registered
  active
  admin
  teacher
  teacherPro
  family
  publisher  
  lastLogin
  }
}
`;

export const UPDATEUSERSROLE_MUTATION =gql`
  mutation UpdateUserRoles($id: ObjectID!, $input: UserIn!){
    updateUserRoles(id: $id, input: $input){
      id
      email
      teacher
      publisher
      teacherPro
      admin
    }
}`