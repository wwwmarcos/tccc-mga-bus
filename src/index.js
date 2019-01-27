const axios = require('axios')
const busMap = require('../bus-map')
const config = require('./config')

const getBusData = () => busMap

const findBusByNumber = number =>
  getBusData().find(bus => String(bus.number) === String(number))

const requestTcccData = busId => axios({
  method: 'GET',
  url: `${config.TCCC_BASE_URL}/${busId}`
})

const formatResponse = ({ tcccResponse, calendar }) => ({
  route: {
    name: tcccResponse.routeName,
    description: tcccResponse.description
  },
  calendar
})

const getCalendar = ({ number }) => {
  if (!number) {
    throw new Error('You need define the bus number')
  }
  const bus = findBusByNumber(number)

  if (!bus) {
    throw new Error(`Bus ${number} not found`)
  }

  return requestTcccData(bus.id)
}

const getBusCalendarFromTerminal = async ({ number } = {}) => {
  const { data: tcccResponse } = await getCalendar({ number })

  const [fromBusTerminal] = tcccResponse.directions

  return formatResponse({ tcccResponse, calendar: fromBusTerminal.calendars })
}

const getBusCalendarFromDistrict = async ({ number } = {}) => {
  const { data: tcccResponse } = await getCalendar({ number })

  const [, fromDistrict] = tcccResponse.directions

  return formatResponse({ tcccResponse, calendar: fromDistrict.calendars })
}

module.exports = {
  getBusData,
  getBusCalendarFromTerminal,
  getBusCalendarFromDistrict
}
