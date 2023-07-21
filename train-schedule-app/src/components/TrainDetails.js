// components/TrainDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainDetails } from '../services/trainService';

const TrainDetails = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      const data = await getTrainDetails(trainNumber);
      setTrain(data);
    };
    fetchTrainDetails();
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{train.trainName}</h2>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</p>
      <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
      <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
      <p>Price (Sleeper): {train.price.sleeper}</p>
      <p>Price (AC): {train.price.AC}</p>
      <p>Delay: {train.delayedBy} minutes</p>
    </div>
  );
};

export default TrainDetails;
