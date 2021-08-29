import { User } from "~/domain/entity/User";

type UserBody = {
  uid: string;
  name: string;
  age: number;
  organization: string;
  features: string[];
  hoge_property: string;
};

// こういった変換層が置かれる
const convertUserToBody = (user: User): UserBody => {
  const { hogeProperty, ...rest } = user;
  return { ...rest, hoge_property: hogeProperty };
};

const createUser = async (user: User) => {
  const newUser = convertUserToBody(user);
  await fetch("/users", { method: "POST", body: JSON.stringify(newUser) });
};

const getUsers = async (): Promise<User[]> => (await fetch("/users")).json();

const getUser = async (uid: string): Promise<User> =>
  (await fetch(`/users/${uid}`)).json();

const updateUser = async (user: User) => {
  const newUser = convertUserToBody(user);
  (
    await fetch(`/users/${user.uid}`, {
      method: "PUT",
      body: JSON.stringify(newUser)
    })
  ).json();
};

const deleteUser = async (uid: string) =>
  await fetch(`/users/${uid}`, { method: "DELETE" });

export const userImpl = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
