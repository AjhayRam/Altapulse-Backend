const mongoose = require("mongoose");

const validator = require("validator");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    organisaitionEmail: {
      type: String,
      unique: true,
      required: [true, "Please provide Organisational email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    phone: {
      type: String,
      unique: true,
      require: [true, "Please provide whatsapp number"],
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide valid Whatsapp Number",
      },
    },
    website: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Please provide valid url",
      },
    },
    serviceRequired: {
      type: String,
    },
    digitalMarketingService: {
      type: String,
    },
    graphicDesignService: {
      type: String,
    },
    webdevelopmentService: {
      type: String,
    },
    address: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
