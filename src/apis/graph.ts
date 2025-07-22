import { createClient, dedupExchange, fetchExchange } from "urql";
import moment from "moment";

const APIURL =
  "https://api.studio.thegraph.com/query/45617/healthinsurancedao/v0.0.2";

const client = createClient({
  url: APIURL,
  exchanges: [dedupExchange, fetchExchange],
});

export async function getAllClaims(id) {
  const query = `query () {
  claimCreateds {
    id
    claimId
    hospitalName
    patientAddress
  }
  }`;

  try {
    // convert id to a string
    const idString = id.toString();

    // make the request with the string id
    const result = await client.query(query, { id: idString }).toPromise();
    let arr = result.data.newProperties;

    let timestamp = arr[0].timeStamp;

    const date = new Date(timestamp * 1000);

    const formattedDate = moment(date).format("MMM D, YYYY");

    return formattedDate;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllPolicies(id) {
  const query = `query () {
  policyCreateds {
    blockNumber
    blockTimestamp
    coverage
    id
    name
    policyNumber
    transactionHash
  }
  }`;

  try {
    // make the request with the string id
    const result = await client.query(query, {}).toPromise();

    let all = result.data.policyCreateds;

    return all;
  } catch (error) {
    console.error(error);
    return null;
  }
}
