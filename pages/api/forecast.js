/**
 * Find the Address infos and coordinates based in the address string description
 * 
 * @param {String} address address string description
 * @param {Response} res HTTP Response Object
 * 
 * @return {Object} Address Info Object
 */
const getAddresses = async (address, res) => {
  try {
    const request = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=2020&format=json`,
      {
        method: 'GET',
      }
    );
    const data = await request.json();
    return data.result.addressMatches;
  } catch (err) {
    res.status(500).send({ message: `Ops.. we got and error: ${err.message}` })
    return
  }
}

/**
 * Find the Address weather high level infos based in the coordinates
 * 
 * @param {{x: Float32Array, y: Float}} coordinates lat and long info
 * @param {Response} res HTTP Response Object
 * 
 * @return {Object} High Level weather Info Object
 */
const getHighLevelWeatherInfo = async (coordinates, res) => {
  try {
    const request = await fetch(
      `https://api.weather.gov/points/${coordinates.y},${coordinates.x}`,
      {
        method: 'GET',
      }
    );
    const data = await request.json();
    return data.properties;
  } catch (err) {
    res.status(500).send({ message: `Ops.. we got and error: ${err.message}` })
    return
  }
}

const getForecastInfo = async (forecastURL, res) => {
  try {
    const request = await fetch(
      forecastURL,
      {
        method: 'GET',
      }
    );
    const data = await request.json();
    return data?.properties;
  } catch (err) {
    res.status(500).send({ message: `Ops.. we got and error: ${err.message}` })
    return
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }

  const { address } = req.query;

  if (!address) {
    res.status(402).send({ message: 'Addressinfo required' })
    return
  }

  const addressMatches = await getAddresses(address, res);
  
  if (!addressMatches?.length) {
    res.status(404).send({ message: 'Ops... We were not able to get the coordinates for this address info' })
    return
  }

  const { coordinates } = addressMatches[0];

  const highLevelWeather = await getHighLevelWeatherInfo(coordinates, res)

  if (!highLevelWeather?.forecast) {
    res.status(404).send({ message: 'Ops... We were not able to get the forecast for this address cooerdinates' })
    return
  }

  const forecastInfo = await getForecastInfo(highLevelWeather?.forecast, res)

  if (forecastInfo?.periods?.length === 0) {
    res.status(404).send({ message: 'Ops... We were not able to get the forecast for this address' })
    return
  }

  const forecast = {};

  forecastInfo.periods.forEach((period) => {
    const dateString = period.startTime.split('T')[0]
    const forecastObject = forecast[dateString] ?? {};
    const periodTime = period.isDaytime ? 'day' : 'night'
    forecastObject[periodTime] = period;
    forecast[dateString] = forecastObject
  });

  res.status(200).json(forecast)
}
