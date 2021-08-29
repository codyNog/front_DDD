import { useState, useCallback } from "react";
import { User } from "~/domain/entity/User";

const initialUser: User = {
  uid: "",
  name: "",
  age: 0,
  organization: "",
  features: [],
  hogeProperty: ""
};

export const useAntiPattern = () => {
  const [user, setUser] = useState<User>(initialUser);

  const submit = useCallback(async () => {
    const { hogeProperty, ...rest } = user;
    const newUser = { ...rest, hoge_property: hogeProperty };
    await fetch("/users", {
      method: "POST",
      body: JSON.stringify(newUser)
    });
  }, []);

  return { submit, setUser };
};
