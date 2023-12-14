import React, { useState } from 'react';
import { DateRangePicker, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Property {
  id: number;
  name: string;
  bookedRanges: DateRange[];
}

const PropertyBooking: React.FC<{ property: Property; bookProperty: Function }> = ({
  property,
  bookProperty,
}) => {
  const [selectionRange, setSelectionRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const handleSelect = (ranges: any) => {
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

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      name: 'Property 1',
      bookedRanges: [
        { startDate: new Date('2023-12-15'), endDate: new Date('2023-12-17') },
        // Existing booked date ranges...
      ],
    },
    // Add more properties...
  ]);

  const bookProperty = (propertyId: number, startDate: Date, endDate: Date): boolean => {
    const propertyIndex = properties.findIndex((prop) => prop.id === propertyId);

    // Check if the selected date range intersects with already booked ranges
    const isAvailable = properties[propertyIndex].bookedRanges.every(
      (range) =>
        startDate >= range.endDate || endDate <= range.startDate
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
