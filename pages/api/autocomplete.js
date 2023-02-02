/**
 * Find the Possible Addresses according address string description
 * 
 * @param {String} address address string description
 * @param {Response} res HTTP Response Object
 * 
 * @return {Object} Address Info Object
 */
const getPossibleAddresses = async (address, res) => {
  try {
    const request = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${address},US&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`,
      {
        method: 'GET',
      }
    )
    const data = await request.json()
    return data.results
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

  res.status(200).json(results.map(({
    place_id,
    housenumber,
    street,
    city,
    state,
    state_code,
    formatted
  }) => ({
    place_id,
    housenumber,
    street,
    city,
    state,
    state_code,
    formatted
  })))
}