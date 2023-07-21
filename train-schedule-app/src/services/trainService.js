// services/trainService.js
const API_BASE_URL = 'http://20.244.56.144';

// Replace with your registered company credentials
const CLIENT_ID = 'd397ed8c-841c-4d4c-bb2f-eedf56fd597e';
const CLIENT_SECRET = 'rwbCXRiWGXOyolOR';
const ACCESS_TOKEN = 'eyJhbGci0iJIUzI1NiIsInR5CCI6IkpXVCJ9.eyJleнAiOjE20DI2MjkyNjQsImNvbXBhbnl0YW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiYjQ2MTE4ZjAtZmJkZSO0YjE2LWE@YjEtNmF1NmFkNzE8YjI3Ine.v93QcxrZHWDTnTwm8-6t';

const requestOptions = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const getTrains = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/train/trains`, requestOptions);
    const data = await response.json();

    // Filter and sort trains according to the given specifications
    const currentTime = new Date();
    const allowedTimeWindow = 30 * 60 * 1000; // 30 minutes in milliseconds
    const filteredTrains = data.filter(
      (train) =>
        new Date(train.departureTime.Hours, train.departureTime.Minutes, train.departureTime.Seconds).getTime() >
        currentTime.getTime() + allowedTimeWindow
    );
    const sortedTrains = filteredTrains.sort((a, b) => {
      if (a.price.sleeper !== b.price.sleeper) {
        return a.price.sleeper - b.price.sleeper;
      } else if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
        return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
      } else {
        // Consider delays in departure time
        const aDepartureTime = new Date(a.departureTime.Hours, a.departureTime.Minutes, a.departureTime.Seconds).getTime() + a.delayedBy * 60 * 1000;
        const bDepartureTime = new Date(b.departureTime.Hours, b.departureTime.Minutes, b.departureTime.Seconds).getTime() + b.delayedBy * 60 * 1000;
        return bDepartureTime - aDepartureTime;
      }
    });

    return sortedTrains;
  } catch (error) {
    console.error('Error fetching train data:', error);
    return [];
  }
};

export const getTrainDetails = async (trainNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/train/trains/${trainNumber}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching train details:', error);
    return null;
  }
};
