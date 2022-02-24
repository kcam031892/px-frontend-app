import axios from 'axios';
import { Country, State, ArtistType } from '../types/optinos';

export async function getCountries(): Promise<Country[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/countries?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<Country[]>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getStates(): Promise<State[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/states?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<State[]>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getArtistTypes(): Promise<ArtistType[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/artistTypes?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<ArtistType[]>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}
