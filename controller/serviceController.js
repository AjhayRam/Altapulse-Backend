const Service = require("../model/Service");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");



const getAllServices = async (req, res) => {
  const service = await Service.find({});
  res.status(StatusCodes.OK).json({ service, count: service.length });
};

const postService = async (req, res) => {
  const {
    name,
    organisaitionEmail,
    phone,
    website,
    serviceRequired,
    digitalMarketingService,
    graphicDesignService,
    webdevelopmentService,
    address,
    user,
  } = req.body;
  if (!name || !organisaitionEmail || !phone) {
    throw new CustomError.BadRequestError(
      "Please provide Name, Organisational Email and Phone"
    );
  }
  // req.body.user = req.user.userId;

  const services = await Service.create(req.body);
  res.status(StatusCodes.CREATED).json({ services });
};

const getSingleService = async (req, res) => {
  const { id: serviceId } = req.params;

  const service = await Service.findOne({ _id: serviceId });
  if (!service) {
    throw new CustomError.NotFoundError(`No service with id: ${serviceId}`);
  }

  res.status(StatusCodes.OK).json({ service });
};

const updateService = async (req, res) => {
  const { id: serviceId } = req.params;
  const service = await Service.findOneAndUpdate({ _id: serviceId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new CustomError.NotFoundError(`No Service with id: ${serviceId}`);
  }

  res.status(StatusCodes.OK).json({ service });
};

const deleteService = async (req, res) => {
  const { id: serviceId } = req.params;

  const service = await Service.findOne({ _id: serviceId });
  if (!service) {
    throw new CustomError.NotFoundError(`No Service with id: ${serviceId}`);
  }

  await service.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Service removed" });
};

module.exports = {
  getAllServices,
  postService,
  getSingleService,
  updateService,
  deleteService,
};
