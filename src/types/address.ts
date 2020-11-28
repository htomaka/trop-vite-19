export interface Address {
  street: string,
  city: string,
  zipcode: string
  location?: {lat: number, lng: number}
}
