import { User } from "firebase/auth";

export interface IUserData {
  id: string;
  friends: IUserData[];
  name: string;
  photoURL: string;
}

export interface IMessage {
  id: number;
  user: User;
  text: string | undefined;
  time: string;  
}