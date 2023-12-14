// import { useState,useEffect,useCallback } from 'react'


// function App() {
//   const order=[{
//     id:1,
//     startDate: 1672506000000,
//     endDate: 1673024400000,
//   },{
//     id:2,
//     startDate: 1673283600000,
//     endDate: 1673370000000,
//   },{
//     id:3,
//     startDate: 1673542800000,
//     endDate: 1674147600000,
//   }]

//   const count=useCallback(()=>{
//     for(let i=0;i<order.length;i++){
//       console.log(order[i].startDate)
//     }
//   },[])

//   useEffect(()=>{},[count])

//  return <div></div>
// }

// export default App


import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const PropertyBooking = ({ property, bookProperty }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleBooking = () => {
    const { startDate, endDate } = selectionRange;
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const isSuccess = bookProperty(property.id, startDate, endDate);
    if (isSuccess) {
      // Handle successful booking
    } else {
      alert('Property is already booked for this date range.');
    }
  };

  return (
    <div>
      <h3>{property.name}</h3>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        months={2}
        direction="horizontal"
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

const App = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Property 1',
      bookedRanges: [
        { startDate: '2023-12-15', endDate: '2023-12-17' },  { startDate: '2023-12-20', endDate: '2023-12-22' },
        // Existing booked date ranges...
      ],
    },
    // Add more properties...
  ]);

  const bookProperty = (propertyId, startDate, endDate) => {
    const propertyIndex = properties.findIndex((prop) => prop.id === propertyId);
console.log(propertyId)
    // Check if the selected date range intersects with already booked ranges
    const isAvailable = properties[propertyIndex].bookedRanges.every(
      (range) =>
        new Date(startDate) >= new Date(range.endDate) ||
        new Date(endDate) <= new Date(range.startDate)
    );

    if (isAvailable) {
      // Update bookedRanges for the property
      properties[propertyIndex].bookedRanges.push({ startDate, endDate });
      setProperties([...properties]);
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <h1>Property Booking App</h1>
      {properties.map((property) => (
        <PropertyBooking key={property.id} property={property} bookProperty={bookProperty} />
      ))}
    </div>
  );
};

export default App;
