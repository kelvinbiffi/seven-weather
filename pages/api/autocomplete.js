/**
 * Find the Address infos and coordinates based in the address string description
 * 
 * @param {String} address address string description
 * @param {Response} res HTTP Response Object
 * 
 * @return {Object} Address Info Object
 */
const getPossibleAddresses = async (address, res) => {
  try {
    const request = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=2020&format=json`,
      {
        method: 'GET',
      }
    )
    const data = await request.json()
    return data.result.addressMatches
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

  const { address } = req.query

  if (!address) {
    res.status(402).send({ message: 'Addressinfo required' })
    return
  }

  const results = await getPossibleAddresses(address, res)
  
  if (!results?.length) {
    res.status(404).send({ message: 'Ops... We were not able to find an address with this address text' })
    return
  }

  res.status(200).json(results.map(({coordinates, matchedAddress: address, tigerLine}) => ({ id: tigerLine.tigerLineId, coordinates, address })))
}