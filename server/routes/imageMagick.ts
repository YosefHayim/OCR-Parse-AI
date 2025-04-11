import express from "express";
import { testImageMagick } from "../controller/imageMagick";

const router = express();

router.get("/test", testImageMagick);

export default router;
