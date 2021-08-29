import { useCallback, useState } from "react";
import { backend } from "~/domain";
import { User } from "~/domain/entity/User";

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(async () => {
    const users = await backend.user.getUsers();
    setUsers(users);
  }, []);

  return { users, getUsers };
};
