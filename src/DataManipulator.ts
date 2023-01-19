import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: Number,
  price_def: Number,
  ratio: Number,
  lower_bound: Number,
  upper_bound: Number,
  timestamp: Date,
  trigger_alert: Number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price+serverRespond[0].top_bid.price)/2;
    const priceDEF = (serverRespond[1].top_ask.price+serverRespond[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const upper_bound = 1+0.05;
    const lower_bound = 1-0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      lower_bound,
      upper_bound,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
      trigger_alert: (ratio>upper_bound || ratio<lower_bound)? ratio:undefined,
    }
  }
}
