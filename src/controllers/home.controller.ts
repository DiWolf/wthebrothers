import { Request, Response } from "express";

export class HomeController {
  home = async (req: Request, res: Response) => {
    res.render("index.njk");
  };
  contact = async (req: Request, res: Response) => {
    res.render("contact.njk");
  };
  galeria = async (req: Request, res: Response) => {
    res.render("unidades.njk");
  };
  contactSubmit = async (req: Request, res: Response) => {
    try {
      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        meta: {
          ip: req.ip,
          sentAt: new Date().toISOString(),
          origin: req.headers.origin || "",
          ua: req.headers["user-agent"] || "",
        },
      };

      // En Node 18+ fetch ya existe global
      const fw = await fetch(process.env.WEBHOOK_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!fw.ok) {
        const text = await fw.text().catch(() => "");
        throw new Error(`Webhook HTTP ${fw.status} ${text}`);
      }

      return res.status(200).json({ ok: true });
    } catch (err: any) {
      console.error("contactSubmit error:", err?.message || err);
      return res
        .status(500)
        .json({ ok: false, error: "Failed to forward to webhook" });
    }
  };
}
