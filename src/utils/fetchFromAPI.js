import axios, * as others from 'axios';


export const getTopArtists =  async (max) => {
  
try {
	const response = await axios.get(`http://localhost:5000/get_top_artists/${max}`);
	return response.data;
} catch (error) {
	console.error(error);
}

}

export const getCountryCities = async (code) => {
  try {
    const response = await axios.get(`http://localhost:5000/country_cities/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }

}

export const getTopChartsByCity = async (code,city) => {
  try {
    const response = await axios.get(`http://localhost:5000/top_city_tracks/${code}/${city}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }

}

export const getTopWorldTracksByGenre = async (genre) => {
  try {
    const response = await axios.get(`http://localhost:5000/top_world_tracks_by_genre/${genre}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getTopCountryTracksByGenre = async (code,genre) => {
  try {
    const response = await axios.get(`http://localhost:5000/top_country_tracks_by_genre/${code}/${genre}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getTopCharts = async (max) => {
  try {
    const response = await axios.get(`http://localhost:5000/top_world_tracks/${max}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getTopChartsByCountry = async (iso) => {
  try {
    const response = await axios.get(`http://localhost:5000/top_country_tracks/${iso}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}


export const getSimilarTracks = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/get_similar_tracks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
export const aboutTrack = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/about_track/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const searchTrack = async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/search_tracks/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const serachArtists = async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/search_artists/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}