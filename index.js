const axios = require('axios')
const busMap = require('./bus-map')
const config = require('./config')

const getBusData = () => busMap

const findBusByNumber = number =>
  getBusData().find(bus => String(bus.number) === String(number))

const requestTcccData = busId => axios({
  method: 'GET',
  url: `${config.TCCC_BASE_URL}/${busId}`
})

const getBusCalendarFromTerminal = async ({ number } = {}) => {
  if (!number) {
    throw new Error('You need define the bus number')
  }

  const bus = findBusByNumber(number)

  if (!bus) {
    throw new Error(`Bus ${number} not found`)
  }

  const { data: tcccResponse } = await requestTcccData(bus.id)

  const [fromBusTerminal] = tcccResponse.directions

  return {
    route: {
      name: tcccResponse.routeName,
      description: tcccResponse.description
    },
    calendar: fromBusTerminal.calendars
  }
}

module.exports = {
  getBusData,
  getBusCalendarFromTerminal
}
