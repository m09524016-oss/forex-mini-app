export default async function handler(req, res) {
    try {
        // استقبال رقم الـ ID والحدث من PocketPartners
        const trader_id = req.query.trader_id || req.body?.trader_id || "غير معروف";
        const event = req.query.event || "تسجيل/إيداع";

        // بيانات البوت والمعرف الخاص بك
        const BOT_TOKEN = "7896024102:AAH..."; // ضع توكين بوتك هنا
        const MY_CHAT_ID = "YOUR_TELEGRAM_ID"; // ضع رقم الـ ID الشخصي لك هنا

        // رسالة الإشعار الفوري على تيليجرام
        const message = `🔔 **إشعار متداول جديد تلقائي!**\n\n👤 **رقم معرف المتداول (Trader ID):** \`${trader_id}\`\n📌 **الحدث:** ${event}\n\n✅ تم استلام البيانات من PocketPartners بنجاح.`;

        // إرسال الإشعار لتيليجرام
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: MY_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        // إرجاع رد 200 لتأكيد النجاح لمنصة PocketPartners
        return res.status(200).json({ status: 'success', message: 'Postback received' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
