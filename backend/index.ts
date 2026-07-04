import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Expo, type ExpoPushMessage, type ExpoPushTicket } from "expo-server-sdk";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN || undefined,
});

// In-memory token store. Swap for a real database (Postgres/Mongo/Redis) in production.
const pushTokens = new Set<string>();

app.post("/register", (req: Request, res: Response) => {
    const { token } = req.body ?? {};

    if (!Expo.isExpoPushToken(token)) {
        return res.status(400).json({ error: "Invalid or missing Expo push token" });
    }

    pushTokens.add(token);
    console.log(`Registered token (${pushTokens.size} total):`, token);
    return res.json({ success: true, count: pushTokens.size });
});

app.post("/unregister", (req: Request, res: Response) => {
    const { token } = req.body ?? {};
    pushTokens.delete(token);
    return res.json({ success: true, count: pushTokens.size });
});

app.post("/send", async (req: Request, res: Response) => {
    const { title, body, data } = req.body ?? {};

    if (pushTokens.size === 0) {
        return res.status(400).json({ error: "No registered devices to send to" });
    }

    const messages: ExpoPushMessage[] = [];
    for (const pushToken of pushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) continue;
        messages.push({
            to: pushToken,
            sound: "default",
            title: title || "Hello",
            body: body || "This is a test notification",
            data: data || {},
        });
    }

    const chunks = expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    try {
        for (const chunk of chunks) {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }
    } catch (error) {
        console.error("Error sending push notifications:", error);
        return res.status(500).json({ error: "Failed to send notifications" });
    }

    // Ticket ↔ token mapping banao — order same rehta hai jaisa messages array mein tha,
    // isliye index se match kar sakte hain (chunking order preserve karta hai).
    const ticketTokenMap = new Map<string, string>();
    tickets.forEach((ticket, index) => {
        if (ticket.status === "ok" && ticket.id) {
            ticketTokenMap.set(ticket.id, messages[index]?.to as string);
        }
    });

    // Fire-and-forget receipt check ~15s later to prune dead tokens.
    setTimeout(() => checkReceipts(tickets, ticketTokenMap).catch(console.error), 15_000);

    return res.json({ success: true, sent: messages.length, tickets });
});

async function checkReceipts(tickets: ExpoPushTicket[], ticketTokenMap: Map<string, string>) {
    const receiptIds = tickets
        .filter((t): t is Extract<ExpoPushTicket, { status: "ok" }> => t.status === "ok" && !!t.id)
        .map((t) => t.id);

    if (receiptIds.length === 0) return;

    const idChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

    for (const chunk of idChunks) {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);

        for (const [receiptId, receipt] of Object.entries(receipts)) {
            if (receipt.status === "error") {
                console.error(`Receipt ${receiptId} error: ${receipt.message}`);

                if (receipt.details?.error === "DeviceNotRegistered") {
                    const deadToken = ticketTokenMap.get(receiptId);
                    if (deadToken) {
                        pushTokens.delete(deadToken);
                        console.warn(`Pruned dead token: ${deadToken} (${pushTokens.size} remaining)`);
                    }
                }
            }
        }
    }
}

app.get("/", (_req: Request, res: Response) => {
    res.json({ status: "ok", registeredDevices: pushTokens.size });
});

app.listen(PORT, () => {
    console.log(`Push backend running on http://localhost:${PORT}`);
});