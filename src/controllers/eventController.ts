const Event = require("./../models/event.model");
const factory = require("./handlerFactory");

export const createEvent = function () {
// 1. 


	return factory.createOne(Event);
};
