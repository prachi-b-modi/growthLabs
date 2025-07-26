# orchestrator.py
import json
import uuid
from datetime import datetime, timezone

from agents.bright_data_agent import run as bright_data_run
from agents.senso_ai_agent import run as senso_run
from agents.experiment_designer import run as exp_designer_run
from agents.mixpanel_evaluation import run as mixpanel_eval_run

EVENTS_FILE = "events.json"

def retention_drop_seed():
    """
    Seed event for drop in retention detected by Mixpanel.
    """
    return {
        "type": "RETENTION_DROP_DETECTED",
        "id": str(uuid.uuid4()),
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "mixpanel_watcher",
        "payload": {
            "metric": "retention_d7",
            "previous": 0.42,
            "current": 0.33,
            "delta": -0.09,
            "segments": [
                {"segment": "US_mobile_new_users", "previous": 0.39, "current": 0.28}
            ],
            "time_window": {"from": "2025-07-19", "to": "2025-07-26"},
            "notes": "Retention has dropped 9% week over week."
        }
    }

def main():
    events = []

    # 1) Seed event
    retention_evt = retention_drop_seed()
    events.append(retention_evt)

    # 2) Bright Data MCP Scraper Agent
    market_evt = bright_data_run(retention_evt)
    events.append(market_evt)

    # 3) Senso.ai sentiment analysis
    senso_evt = senso_run(market_evt)
    events.append(senso_evt)

    # 4) Experiment Designer (Hallucination banner experiment)
    exp_evt, action_evt = exp_designer_run(senso_evt)
    events.extend([exp_evt, action_evt])

    # 5) Mixpanel Evaluation (simulate approval + run)
    corr_id = retention_evt["id"]
    exp_id = exp_evt["payload"]["experiment"]["id"]
    results_evt, decision_evt = mixpanel_eval_run(corr_id, exp_id)
    events.extend([results_evt, decision_evt])

    # Write all events
    with open(EVENTS_FILE, "w") as f:
        json.dump(events, f, indent=2)

    print(f"✅ Wrote {len(events)} events to {EVENTS_FILE}")

if __name__ == "__main__":
    main()