import { Box } from "@mui/material";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";

const users = [
    {
        id : 1,
        name : 'Tharusa',
    },
    {
        id : 2,
        name : 'Tharuka',
    },
]

const Users = () => {
  return (
    <Box
        sx={{
            width: 'calc(100% - 100px)',
            margin: 'auto',
            marginTop: '100px',
        }}
    >
        <UsersForm/>
        <UsersTable rows={users} />
    </Box>
    
  );

}
export default Users; 