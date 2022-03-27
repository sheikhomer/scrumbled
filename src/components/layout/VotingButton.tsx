import { Button } from "@mui/material";
import { MouseEvent } from "react";
const VotingButton: React.FC<VotingButtonProps> = ({value, onVote}) => {
  const onClickHandler = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onVote(e.currentTarget.value);
  }
  return (
    <Button value={value} size="medium" variant="contained" sx={{ borderRadius: "50%" }} onClick={onClickHandler}>
      {value}
    </Button>
  );
};
interface VotingButtonProps{
  value: string,
  onVote: (vote:string)=> Promise<void>
}
export default VotingButton;
