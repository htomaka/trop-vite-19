import axios from "axios";
import { geocodingApiUrl } from "../config";
import { Address } from "../types/address";

export class GeocodingService {
  getLocation(address: Address) {
    return axios.get(geocodingApiUrl, {
      params: {
        address: `${address.street} ${address.zipcode} ${address.city}`
      }
    }).then(res => res.data.results[0].geometry.location);
  }
}
