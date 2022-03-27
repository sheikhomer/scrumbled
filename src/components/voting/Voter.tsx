import { TableCell, TableRow } from "@mui/material";
import { Participant } from "../../models/session";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const Voter: React.FC<VoterProps> = ({
  participant,
  isSelf
}) => {
  const votingData = useSelector((state: IRootState) => state.votingData);
  const getVote = () => {
      return votingData.find(x=>x.userId === participant.userId)?.vote ?? <VisibilityOffIcon fontSize="large"></VisibilityOffIcon>
  }
  return (
    <TableRow key={participant.userId}>
      <TableCell component="th" scope="row">
        {participant.name}
      </TableCell>
      <TableCell align="right">
        {isSelf ? getVote() : <VisibilityOffIcon fontSize="large"></VisibilityOffIcon>}
      </TableCell>
    </TableRow>
  );
};

interface VoterProps {
  participant: Participant;
  isSelf: boolean
}

export default Voter;
