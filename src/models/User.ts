import Role from "./Role";

type User = {
  id: number,
  name: string,
  age: number,
  cpf: string,
  role: Role | null
}

export default User; 