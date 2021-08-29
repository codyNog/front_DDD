import { useState, useCallback } from "react";
import { backend } from "~/domain";
import { User } from "~/domain/entity/User";

const initialUser: User = {
  uid: "",
  name: "",
  age: 0,
  organization: "",
  features: [],
  hogeProperty: ""
};

export const useUserForm = () => {
  const [user, setUser] = useState<User>(initialUser);

  const setName = useCallback((name: string) => {
    setUser((prev) => {
      return { ...prev, name };
    });
  }, []);

  const setAge = useCallback((age: number) => {
    setUser((prev) => {
      return { ...prev, age };
    });
  }, []);

  const setOrganization = useCallback((organization: string) => {
    setUser((prev) => {
      return { ...prev, organization };
    });
  }, []);

  const setFeatures = useCallback((feature: string) => {
    setUser((prev) => {
      if (prev.features.includes(feature)) return prev;
      return { ...prev, features: prev.features.concat(feature) };
    });
  }, []);

  const submit = useCallback(async () => {
    await backend.user.createUser(user);
  }, [user]);

  return { user, setName, setAge, setOrganization, setFeatures, submit };
};
