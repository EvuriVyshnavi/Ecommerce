import mongoose from 'mongoose';

const deliverySlotSchema = mongoose.Schema(
  {
    timeSlot: {
      type: String,
      required: true,
      enum: [
        '9:00 AM - 11:00 AM',
        '11:00 AM - 1:00 PM',
        '1:00 PM - 3:00 PM',
        '3:00 PM - 5:00 PM',
        '5:00 PM - 7:00 PM',
        '7:00 PM - 9:00 PM'
      ],
    },
    date: {
      type: Date,
      required: true,
    },
    maxOrders: {
      type: Number,
      default: 50,
    },
    currentOrders: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    deliveryArea: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DeliverySlot = mongoose.model('DeliverySlot', deliverySlotSchema);

export default DeliverySlot;
