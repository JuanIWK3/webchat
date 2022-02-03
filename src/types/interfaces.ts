export interface IUserData {
  id: string;
  friends: IUserData[];
  name: string;
  photoURL: string;
}
