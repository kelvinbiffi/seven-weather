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
        method: "GET",
      }
    );
    const data = await request.json();
    return data.properties;
  } catch (err) {
    res
      .status(500)
      .send({ message: `Ops.. we got an unexpected error: ${err.message}` });
    return;
  }
};

/**
 *
 * @param {forecastURL} forecastURL URL for get forecast provided by the weather API
 * @param {Response} res HTTP Response Object
 * @return Forecast for the next 7 days split in day and night
 */
const getForecastInfo = async (forecastURL, res) => {
  try {
    const request = await fetch(forecastURL, {
      method: "GET",
    });
    const data = await request.json();
    return data?.properties;
  } catch (err) {
    res
      .status(500)
      .send({ message: `Ops.. we got an unexpected error: ${err.message}` });
    return;
  }
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  const coordinates = req.query?.coordinates?.split(",");

  if (coordinates?.length !== 2) {
    res.status(402).send({ message: "Addressinfo required" });
    return;
  }

  const highLevelWeather = await getHighLevelWeatherInfo(
    {
      y: coordinates[0],
      x: coordinates[1],
    },
    res
  );

  if (!highLevelWeather?.forecast) {
    res
      .status(404)
      .send({
        message:
          "Ops... We were not able to get the forecast for this address cooerdinates",
      });
    return;
  }

  const forecastInfo = await getForecastInfo(highLevelWeather?.forecast, res);

  if (!forecastInfo?.periods?.length) {
    res
      .status(404)
      .send({
        message: "Ops... We were not able to get the forecast for this address",
      });
    return;
  }

  const forecast = {};

  forecastInfo.periods.forEach((period) => {
    const dateString = period.startTime.split("T")[0];
    const forecastObject = forecast[dateString] ?? {};
    const periodTime = period.isDaytime ? "day" : "night";
    forecastObject[periodTime] = period;
    forecast[dateString] = forecastObject;
  });

  res.status(200).json({
    code: 200,
    forecast,
  });
}
