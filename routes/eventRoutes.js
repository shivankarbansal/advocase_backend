import express from 'express';

import { getEvents, createEvent, deleteEvent, updateEvent, getEventById } from '../controllers/eventController.js';

const router = express.Router();
router
    .route("/")
    .get(getEvents)
    .post(createEvent)
router
    .route("/:id")
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent)

export default router;