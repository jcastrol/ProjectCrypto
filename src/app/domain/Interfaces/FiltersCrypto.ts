import CryptoCurrencyEntity from "../entities/CryptoEntity";


/* The `FiltersCrypto` interface is defining a set of optional filters that can be applied when
querying for cryptocurrency data. It includes the following filter options: */
export interface FiltersCrypto {
  minPriceUsd?: number;
  maxPriceUsd?: number;
  minVolume24?: number;
  maxVolume24?: number;

}

export type SortOrder = 'asc' | 'desc';

/* `keyof CryptoCurrencyEntity` is a TypeScript utility type that returns a
union of all the keys (property names) of the `CryptoCurrencyEntity`
interface. */
export type SortField = keyof CryptoCurrencyEntity;

/* The `SortParams` interface is defining a set of parameters that can be used to specify the sorting
order when querying for cryptocurrency data. It includes two properties: */
export interface SortParams {
  field: SortField;
  order: SortOrder;
}