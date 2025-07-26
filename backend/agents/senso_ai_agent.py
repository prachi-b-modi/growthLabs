# agents/senso_ai_agent.py
import uuid
from datetime import datetime, timezone
import random

def run(market_intel_event):
    """
    Mock Senso.ai – classify emotion/intent around inconsistency/hallucinations.
    """
    return {
        "type": "EMOTION_INTENT_ENRICHED",
        "id": str(uuid.uuid4()),
        "correlation_id": market_intel_event["correlation_id"],
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "senso_ai",
        "payload": {
            "top_pain_points": [
                {"topic": "inconsistent_output", "sentiment": "negative", "urgency": round(random.uniform(0.75, 0.95), 2)},
                {"topic": "hallucinations", "sentiment": "negative", "urgency": round(random.uniform(0.6, 0.85), 2)},
            ],
            "user_emotions": {
                "negative_ratio": round(random.uniform(0.5, 0.8), 2),
                "frustration_ratio": round(random.uniform(0.4, 0.7), 2)
            },
            "recommendations": [
                "Educate users about prompt quality",
                "Surface warning banner with mitigation tips"
            ]
        }
    }