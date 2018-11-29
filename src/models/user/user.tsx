import fetchit from 'src/util/fetchit';

interface IUser {
  name: string;
  id: string;
}

const fetchIdentity = (onSuccess: (self: IUser) => void) =>
  fetchit('/identity', 'GET', onSuccess);

export { fetchIdentity, IUser };
