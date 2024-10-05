import express from "express";
import * as membershipControllers from "../controllers/memberships.controllers";

const router = express.Router();

router
  .post("/memberships/create", membershipControllers.createNewMembership)
  .get("/memberships", membershipControllers.getClientMemberships);

export default router;
