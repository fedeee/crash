var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  loc: {
    type: {
      type: "String",
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [Number]
  },
  create_date: { type: Date, default: Date.now }
});

locationSchema.index({ 'loc': '2dsphere' });

mongoose.model( 'Location', locationSchema );
