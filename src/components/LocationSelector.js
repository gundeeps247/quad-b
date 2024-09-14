import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../redux/actions';

const LocationSelector = () => {
    const dispatch = useDispatch();
    const savedLocation = useSelector(state => state.tasks.location);
    const [location, setLocationState] = useState(savedLocation || '');

    const handleLocationChange = (event) => {
        setLocationState(event.target.value);
    };

    const handleSaveLocation = () => {
        dispatch(setLocation(location));
        localStorage.setItem('location', location);
    };

    useEffect(() => {
        setLocationState(savedLocation);
    }, [savedLocation]);

    return (
        <div>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter city name (e.g., London)"
            />
            <button onClick={handleSaveLocation}>Save Location</button>
        </div>
    );
};

export default LocationSelector;
