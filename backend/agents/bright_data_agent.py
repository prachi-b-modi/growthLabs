# agents/bright_data_agent.py
import uuid
from datetime import datetime, timezone

def run(quality_evt):
    """
    Mock 'Bright Data MCP Scraper Agent' – here it simulates pulling
    customer feedback + public chatter pointing to inconsistency/hallucinations.
    """
    return {
        "type": "MARKET_INTEL_READY",
        "id": str(uuid.uuid4()),
        "correlation_id": quality_evt["id"],
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "bright_data_scraper",
        "payload": {
            "competitors": ["CompetitorX", "CompetitorY"],
            "findings": {
                "feature_launches": [
                    {"competitor": "CompetitorX", "feature": "Prompt Quality Assistant", "date": "2025-07-20"}
                ],
                "feedback_snippets": [
                    {"source": "support_ticket", "text": "Scraper output is inconsistent across runs"},
                    {"source": "reddit", "text": "Sometimes it hallucinates fields if the prompt is vague"},
                    {"source": "internal_forum", "text": "We need to warn users about prompt engineering best practices"}
                ],
                "best_practices_seen": [
                    {"competitor": "CompetitorY", "practice": "Warn users about potential hallucinations & suggest prompt refinement"}
                ]
            }
        }
    }