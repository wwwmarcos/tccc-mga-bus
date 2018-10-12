"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBusCalendarFromTerminal = exports.getBusData = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _axios = _interopRequireDefault(require("axios"));

var _busMap = _interopRequireDefault(require("../bus-map"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const getBusData = () => _busMap.default;

exports.getBusData = getBusData;

const findBusByNumber = number => getBusData().find(bus => String(bus.number) === String(number));

const requestTcccData = busId => (0, _axios.default)({
  method: 'GET',
  url: `${_config.default.TCCC_BASE_URL}/${busId}`
});

const getBusCalendarFromTerminal = async ({
  number
} = {}) => {
  if (!number) {
    throw new Error('You need define the bus number');
  }

  const bus = findBusByNumber(number);

  if (!bus) {
    throw new Error(`Bus ${number} not found`);
  }

  const _ref = await requestTcccData(bus.id),
        tcccResponse = _ref.data;

  const _tcccResponse$directi = _slicedToArray(tcccResponse.directions, 1),
        fromBusTerminal = _tcccResponse$directi[0];

  return {
    route: {
      name: tcccResponse.routeName,
      description: tcccResponse.description
    },
    calendar: fromBusTerminal.calendars
  };
};

exports.getBusCalendarFromTerminal = getBusCalendarFromTerminal;