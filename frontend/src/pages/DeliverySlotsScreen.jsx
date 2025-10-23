import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeliverySlotsScreen = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deliveryAreas = [
    'Downtown',
    'Midtown',
    'Uptown',
    'Suburb North',
    'Suburb South',
    'Industrial Area'
  ];

  const fetchSlots = async () => {
    if (!selectedDate || !selectedArea) return;

    setLoading(true);
    try {
      const { data } = await axios.get('/api/delivery/slots', {
        params: { date: selectedDate, area: selectedArea }
      });
      setSlots(data);
    } catch (error) {
      console.error('Error fetching delivery slots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate, selectedArea]);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirmSlot = () => {
    if (selectedSlot) {
      // Store selected slot in localStorage or context for use in checkout
      localStorage.setItem('selectedDeliverySlot', JSON.stringify(selectedSlot));
      navigate('/placeorder');
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="container mt-4">
      <h2>Select Delivery Slot</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Delivery Date</label>
          <input
            type="date"
            className="form-control"
            min={getTomorrowDate()}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Delivery Area</label>
          <select
            className="form-select"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">Select Area</option>
            {deliveryAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="text-center">Loading available slots...</div>}

      {slots.length > 0 && (
        <div>
          <h4>Available Slots for {selectedDate} in {selectedArea}</h4>
          <div className="row">
            {slots.map(slot => (
              <div key={slot._id} className="col-md-4 mb-3">
                <div
                  className={`card ${selectedSlot?._id === slot._id ? 'border-primary' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSlotSelection(slot)}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">{slot.timeSlot}</h5>
                    <p className="card-text">
                      Available: {slot.maxOrders - slot.currentOrders} slots
                    </p>
                    {selectedSlot?._id === slot._id && (
                      <span className="badge bg-primary">Selected</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleConfirmSlot}
              disabled={!selectedSlot}
            >
              Confirm Delivery Slot
            </button>
          </div>
        </div>
      )}

      {selectedDate && selectedArea && slots.length === 0 && !loading && (
        <div className="alert alert-info">
          No delivery slots available for the selected date and area. Please try a different date or area.
        </div>
      )}
    </div>
  );
};

export default DeliverySlotsScreen;
