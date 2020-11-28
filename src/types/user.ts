import { Address } from "./address";

export interface User {
  firstname: string,
  lastname: string,
  birthday: string,
  placeofbirth: string,
  address: Address
}
