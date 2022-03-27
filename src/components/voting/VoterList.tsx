import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import Voter from "./Voter";

const VoterList: React.FC = () => {
  const session = useSelector((state: IRootState) => state.sessionData);
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {session.participants?.map((voter) => {
            return <Voter participant={voter} key={voter.userId} isSelf={session.userId === voter.userId}></Voter>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VoterList;
