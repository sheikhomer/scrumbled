import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const baseUrl = process.env.REACT_APP_REAL_TIME_API_URI;

const makeConnection:()=>HubConnection = () => new HubConnectionBuilder()
.withUrl(`${baseUrl}/scrumble`)
.configureLogging(LogLevel.Information)
.build();

export default makeConnection;