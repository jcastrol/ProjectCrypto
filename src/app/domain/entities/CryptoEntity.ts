export type CryptoCurrencyResponseApi= {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    percent_change_1h: string;
    percent_change_7d: string;
    market_cap_usd: string;
    volume24: string;
    volume24a: string;
    csupply: string;
    price_btc: string;
    tsupply: string;
    msupply: string;
    
}
class CryptoCurrencyEntity {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    priceUsd: number;
    percentChange24h: number;
    percentChange1h: number;
    percentChange7d: number;
    marketCapUsd: number;
    volume24: number;
    volume24Native: number;
    circulatingSupply: number;
    priceBtc: number;
    totalSupply: number;
    maxSupply: number;
  
    constructor(data: CryptoCurrencyResponseApi) {
      this.id = data.id;
      this.symbol = data.symbol;
      this.name = data.name;
      this.nameid = data.nameid;
      this.rank = data.rank;
      this.priceUsd = parseFloat(data.price_usd);
      this.percentChange24h = parseFloat(data.percent_change_24h);
      this.percentChange1h = parseFloat(data.percent_change_1h);
      this.percentChange7d = parseFloat(data.percent_change_7d);
      this.marketCapUsd = parseFloat(data.market_cap_usd);
      this.volume24 = parseFloat(data.volume24);
      this.volume24Native = parseFloat(data.volume24a);
      this.circulatingSupply = parseFloat(data.csupply);
      this.priceBtc = parseFloat(data.price_btc);
      this.totalSupply = parseFloat(data.tsupply);
      this.maxSupply = parseFloat(data.msupply);
    }
  }
  
  export default CryptoCurrencyEntity;