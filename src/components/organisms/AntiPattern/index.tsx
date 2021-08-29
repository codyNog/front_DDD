import { Box, Button, Input, StyleProps } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { MultipleInput } from "~/components/molecules/MultipleInput";
import { User } from "~/domain/entity/User";

const initialUser: User = {
  uid: "",
  name: "",
  age: 0,
  organization: "",
  features: [],
  hogeProperty: ""
};

interface Props {
  styleProps?: StyleProps;
}

export const AntiPattern: React.FC<Props> = ({ styleProps }) => {
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

  return (
    <Box {...styleProps}>
      <Input
        placeholder={"ユーザー名"}
        value={user.name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Input
        placeholder={"年齢"}
        mt={2}
        type={"number"}
        value={user.age}
        onChange={(e) => setAge(Number(e.currentTarget.value))}
      />
      <Input
        placeholder={"組織"}
        mt={2}
        value={user.organization}
        onChange={(e) => setOrganization(e.currentTarget.value)}
      />
      <MultipleInput
        placeholder={"特記事項"}
        value={user.features}
        onEnterKeyDown={(value) => setFeatures(value)}
        styleProps={{ mt: 2 }}
      />
      <Button
        onClick={useCallback(async () => {
          const { hogeProperty, ...rest } = user;
          const newUser = { ...rest, hoge_property: hogeProperty };
          await fetch("/users", {
            method: "POST",
            body: JSON.stringify(newUser)
          });
        }, [])}
      >
        submit
      </Button>
    </Box>
  );
};
