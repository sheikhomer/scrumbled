import { createSlice } from "@reduxjs/toolkit";
import { Action } from "./type";

export interface VotingData {
  userId: string;
  userName: string;
  isVoted: boolean;
  vote: string;
}

const initialState = Array<VotingData>();

const votingSlice = createSlice({
  name: "voting",
  initialState: initialState,
  reducers: {
    updateVotingData: (state, data: Action<VotingData>) => {
        const voter = state.find(x=>x.userId === data.payload.userId);
        if(voter){
            voter.isVoted = data.payload.isVoted;
            voter.vote = data.payload.vote;
        }else{
            state.push(data.payload);
        }
    },
  },
});

export const {updateVotingData} = votingSlice.actions;
export default votingSlice;
