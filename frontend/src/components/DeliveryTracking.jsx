import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeliveryTracking = () => {
  const { id } = useParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const { data } = await axios.get(`/api/delivery/orders/${id}/tracking`);
        setTrackingData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tracking information');
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [id]);

  if (loading) return <div>Loading tracking information...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!trackingData) return <div>No tracking data available</div>;

  const getStatusColor = (status) => {
    const colors = {
      pending: 'secondary',
      confirmed: 'info',
      preparing: 'warning',
      ready: 'primary',
      out_for_delivery: 'info',
      delivered: 'success',
      cancelled: 'danger'
    };
    return colors[status] || 'secondary';
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container mt-4">
      <h2>Order Tracking</h2>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Order Status</h5>
              <span className={`badge bg-${getStatusColor(trackingData.deliveryStatus)} fs-6`}>
                {formatStatus(trackingData.deliveryStatus)}
              </span>
            </div>
            {trackingData.trackingNumber && (
              <div className="col-md-6">
                <h5>Tracking Number</h5>
                <p className="mb-0">{trackingData.trackingNumber}</p>
              </div>
            )}
          </div>

          {trackingData.estimatedDeliveryTime && (
            <div className="mt-3">
              <h5>Estimated Delivery Time</h5>
              <p className="mb-0">
                {new Date(trackingData.estimatedDeliveryTime).toLocaleString()}
              </p>
            </div>
          )}

          {trackingData.deliveryPerson && (
            <div className="mt-3">
              <h5>Delivery Person</h5>
              <p className="mb-0">
                {trackingData.deliveryPerson.name}
                {trackingData.deliveryPerson.phone && ` - ${trackingData.deliveryPerson.phone}`}
              </p>
              {trackingData.deliveryPerson.vehicleNumber && (
                <p className="mb-0 text-muted">
                  Vehicle: {trackingData.deliveryPerson.vehicleNumber}
                </p>
              )}
            </div>
          )}

          <div className="mt-4">
            <h5>Order Timeline</h5>
            <div className="timeline">
              {['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].map((status, index) => {
                const isActive = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].indexOf(trackingData.deliveryStatus) >= index;
                return (
                  <div key={status} className={`timeline-item ${isActive ? 'active' : ''}`}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h6>{formatStatus(status)}</h6>
                      <small className="text-muted">
                        {status === trackingData.deliveryStatus && trackingData.createdAt ?
                          new Date(trackingData.createdAt).toLocaleString() : ''}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
