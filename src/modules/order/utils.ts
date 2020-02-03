import {mapObjIndexed, pipe, prop, values} from "ramda";

const trimLodash = (value, key) => ({
  amount: value,
  position: key.replace('_', '')
})

export const mapRates = pipe(
  prop('rates'),
  mapObjIndexed(trimLodash),
  values
)
