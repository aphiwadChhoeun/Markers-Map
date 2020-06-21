import template from "lodash/template";
import axios from "axios";

export const API_KEY = process.env.VUE_APP_MAPBOX_KEY;

const searchEndpoint = template(
  "https://api.mapbox.com/geocoding/v5/mapbox.places/<%= address %>.json?access_token=<%= token %>&limit=1"
);

export default class GeoService {
  static search(address) {
    let url = searchEndpoint({
      address: encodeURIComponent(address),
      token: API_KEY,
    });

    return axios.get(url);
  }
}
