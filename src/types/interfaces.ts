import { User } from "firebase/auth";

export interface IUserData {
  id: string;
  friends: IUserData[];
  name: string;
  photoURL: string;
}

export interface IMessage {
  id: string,
  timestamp: string,
  name: string,
  text: string,
  profilePicUrl: string,
}