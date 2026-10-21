export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).send('Bot Server is running...');
    }

    try {
        let body = req.body;
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }

        const message = body?.message;

        if (message && message.text) {
            const chatId = message.chat.id;
            const BOT_TOKEN = "8791327298:AAGjVQijrSduhx29RrkOHGqeIInkQabUSqc";

            const text = "👋 أهلاً بك في بوت ومساعد التداول اليومي!\n\n" +
                         "للبدء بالحصول على الإشارات والتحليلات وحاسبة اللوت، يرجى اتباع الخطوات التالية:\n\n" +
                         "1️⃣ قم بالتسجيل في المنصة عبر رابط الإحالة الرسمي:\n" +
                         "https://u3.shortlink.io/smart/QNeefalAVa9Zr2\n\n" +
                         "2️⃣ اضغط على زر 'فتح منصة التداول' بالأسفل وقم بإدخال Trader ID الخاص بك للتحقق والتفعيل الفوري.";

            const replyMarkup = {
                inline_keyboard: [
                    [
                        {
                            text: "🔗 رابط التسجيل في المنصة",
                            url: "https://u3.shortlink.io/smart/QNeefalAVa9Zr2"
                        }
                    ],
                    [
                        {
                            text: "📈 فتح منصة التداول",
                            web_app: { url: "https://forex-mini-app.vercel.app" }
                        }
                    ]
                ]
            };

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    reply_markup: replyMarkup
                })
            });
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(200).json({ ok: true, error: error.message });
    }
}
