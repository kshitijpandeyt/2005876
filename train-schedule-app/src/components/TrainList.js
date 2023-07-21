// components/TrainList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrains } from '../services/trainService';

const ITEMS_PER_PAGE = 10; // Number of trains to display per page

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTrains = async () => {
      const data = await getTrains();
      setTrains(data);
    };
    fetchTrains();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when a new search is performed
  };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const filteredTrains = trains.filter((train) =>
    train.trainName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleTrains = filteredTrains.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div>
      <h2>All Trains</h2>
      <input type="text" placeholder="Search train name" value={searchQuery} onChange={handleSearch} />
      <ul>
        {visibleTrains.map((train) => (
          <li key={train.trainNumber}>
            <Link to={`/trains/${train.trainNumber}`}>{train.trainName}</Link>
            <p>Train Number: {train.trainNumber}</p>
            <p>Departure Time: {`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</p>
            <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
            <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
            <p>Price (Sleeper): {train.price.sleeper}</p>
            <p>Price (AC): {train.price.AC}</p>
            <p>Delay: {train.delayedBy} minutes</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={startIdx + ITEMS_PER_PAGE >= filteredTrains.length}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TrainList;
