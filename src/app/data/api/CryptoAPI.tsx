import axios from 'axios';
import { API_BASE_URL } from '../../constants/apis';

/* The CryptoAPI class is a TypeScript class that provides methods for fetching crypto currencies and
their details from an API. */
class CryptoAPI {
 /**
  * The function fetches crypto currencies data from an API using axios and returns the data.
  * @returns the data property from the response object.
  */
  static async fetchCryptoCurrencies(): Promise<any> {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.data;
    } catch (error) {
      throw new Error('Error fetching crypto currencies'+API_BASE_URL);
    }
  }

  /**
   * The function fetches the detail of a specific cryptocurrency using its ID.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * specific cryptocurrency.
   * @returns the data of the first crypto currency with the specified id.
   */
  static async fetchCryptoCurrencyDetail(id: string): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/?id=${id}`);
      return response.data.data[0];
    } catch (error) {
      throw new Error('Error fetching crypto currency detail');
    }
  }
}

export default CryptoAPI;
  