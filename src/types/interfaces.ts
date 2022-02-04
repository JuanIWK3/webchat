export interface IUserData {
  id: string;
  friends: IUserData[];
  name: string;
  photoURL: string;
}

export interface IMessage {
  user: IUserData;
  text: string | undefined;
  time: string;  
}