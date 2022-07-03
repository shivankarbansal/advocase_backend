import express from 'express';
import mongoose from 'mongoose';

import Event from '../models/eventModel.js';

const router = express.Router();

export const getEvents = async(req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async(req, res) => {
    const { eventTitle, startDate, endDate, startTime, endTime, location, agenda } = req.body;

    const newEvent = new Event({ eventTitle, startDate, endDate, startTime, endTime, location, agenda })

    try {
        await newEvent.save();
        res.status(201).json({
            type: "success",
            message: "Event has been added successfully",
            data: {
                case: newEvent
            }
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const getEventById = async(req, res) => {
    try {
        const foundEvent = await Event.findOne({
            _id: req.params.id
        });
        if (foundEvent) {
            res.status(200).json({
                status: "success",
                data: {
                    case: foundEvent,
                },
            });
        } else {
            res.status(200).json({
                status: "fail",
                message: "Schedule not found",
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: err.message,
        });
    }
};

export const updateEvent = async(req, res) => {
    try {
        const updatedEvent = await Event.findOneAndUpdate({ _id: req.params.id },
            req.body, {
                runValidators: true,
                new: true,
            }
        );

        if (updatedEvent) {
            res.status(200).json({
                status: "success",
                data: {
                    case: updatedEvent,
                },
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "Schedule not found",
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: err.message,
        });
    }
};

export const deleteEvent = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });
}

export default router;