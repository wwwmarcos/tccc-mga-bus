# tccc-mga-bus
transporte coletivo cidade canção

# Install
`npm i tccc-mga-bus --save`

# Usage
```js
const bus = require('tccc-mga-bus')

bus.getBusCalendarFromTerminal({ number: 219 })
```
result:
```json
{
  "route": {
    "name": "219 - Jd. Iguaçu"
  },
  "calendar": [
    {
      "serviceId": 1079,
      "serviceDesc": "Sábados",
      "departures": [
        {
          "routeId": 13465,
          "tripShortName": "Sentido para Bairro / Jd. Iguaçu",
          "tripId": 46881,
          "tripName": "Sentido para Bairro / Jd. Iguaçu",
          "departure": "13:30:00",
          "tripSeq": 1
        },
  ...
```