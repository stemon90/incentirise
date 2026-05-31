import express from "express";
import QRCode from "qrcode";
import { prisma } from "../index.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Get QR code image for a youth
router.get("/:youthId", authenticate, async (req, res) => {
  const youthId = parseInt(req.params.youthId);

  try {
    const youth = await prisma.youth.findFirst({
      where: {
        id: youthId,
        organizationId: req.staff.organizationId,
      },
    });

    if (!youth) return res.status(404).json({ error: "Youth not found" });

    const qrDataUrl = await QRCode.toDataURL(youth.qrCode, {
      width: 300,
      margin: 2,
    });

    res.json({
      youthId: youth.id,
      firstName: youth.firstName,
      lastName: youth.lastName,
      qrCode: youth.qrCode,
      qrImage: qrDataUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Scan a QR code and return youth info
router.get("/scan/:qrCode", authenticate, async (req, res) => {
  const { qrCode } = req.params;

  try {
    const youth = await prisma.youth.findFirst({
      where: {
        qrCode,
        organizationId: req.staff.organizationId,
      },
    });

    if (!youth) return res.status(404).json({ error: "Youth not found" });

    // Return youth info with available behaviors for point awarding
    const behaviors = await prisma.behavior.findMany({
      where: { organizationId: req.staff.organizationId },
      orderBy: { name: "asc" },
    });

    res.json({
      youth: {
        id: youth.id,
        firstName: youth.firstName,
        lastName: youth.lastName,
        points: youth.points,
        grade: youth.grade,
      },
      behaviors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scan QR code" });
  }
});

export default router;
