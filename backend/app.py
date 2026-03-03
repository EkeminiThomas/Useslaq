import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg

load_dotenv()

app = Flask(__name__)

# Allow your frontend domain (tight CORS)
CORS(app, resources={r"/api/*": {"origins": [
    "https://useslaq.com",
    "https://slaq-web.pxxl.click",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]}})

DATABASE_URL = os.getenv("DATABASE_URL")

def get_conn():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL missing. Set it in Pxxl environment variables.")
    return psycopg.connect(DATABASE_URL)

@app.get("/api/health")
def health():
    return jsonify({"ok": True})

@app.post("/api/waitlist")
def join_waitlist():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    source = (data.get("source") or "").strip()

    if not email or "@" not in email:
        return jsonify({"ok": False, "message": "Please enter a valid email."}), 400

    try:
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO waitlist (email, source)
                    VALUES (%s, %s)
                    ON CONFLICT (email) DO NOTHING
                    RETURNING id
                    """,
                    (email, source or None),
                )
                row = cur.fetchone()

        if row is None:
            return jsonify({"ok": True, "message": "You’re already on the waitlist."}), 200

        return jsonify({"ok": True, "message": "Joined successfully!"}), 201

    except Exception as e:
        return jsonify({"ok": False, "message": "Server error.", "error": str(e)}), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)