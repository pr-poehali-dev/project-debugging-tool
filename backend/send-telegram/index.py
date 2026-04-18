import os
import json
import urllib.request

TELEGRAM_API = "https://api.telegram.org"
CHAT_ID = "1493177598"


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram бот"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Zapolnite vse polya"}, ensure_ascii=False),
        }

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    text = (
        f"📩 Новая заявка с сайта!\n\n"
        f"👤 Имя: {name}\n"
        f"📧 Email: {email}\n"
        f"💬 Сообщение:\n{message}"
    )

    payload = json.dumps({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML"
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{TELEGRAM_API}/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }