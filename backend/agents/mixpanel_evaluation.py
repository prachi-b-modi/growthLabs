# agents/mixpanel_evaluation.py
import uuid
from datetime import datetime, timezone
import random

def run(correlation_id, experiment_id):
    """
    Mock Mixpanel evaluation now focused on retention_d7 as the primary metric.
    B should (usually) outperform A.
    """
    # Control (A)
    a_retention = round(random.uniform(0.28, 0.36), 3)
    a_activation = round(random.uniform(0.40, 0.55), 3)

    # Variant (B) - expected improvement
    lift_abs = round(random.uniform(0.03, 0.10), 3)     # absolute lift on retention_d7
    b_retention = round(a_retention + lift_abs, 3)
    b_activation = round(a_activation + random.uniform(0.00, 0.04), 3)

    p_value = round(random.uniform(0.01, 0.09), 3)
    decision = "PROMOTE" if (lift_abs >= 0.05 and p_value <= 0.05) else "ITERATE"

    results_event = {
        "type": "EXPERIMENT_RESULTS_READY",
        "id": str(uuid.uuid4()),
        "correlation_id": correlation_id,
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "mixpanel_evaluator",
        "payload": {
            "experiment_id": experiment_id,
            "variant_metrics": {
                "A": {
                    "retention_d7": a_retention,
                    "activation_rate": a_activation,
                    "banner_click_best_practices": 0
                },
                "B": {
                    "retention_d7": b_retention,
                    "activation_rate": b_activation,
                    "banner_click_best_practices": random.randint(20, 150)
                }
            },
            "lift": {
                "retention_d7_abs": lift_abs,
                "retention_d7_rel": round(lift_abs / max(a_retention, 1e-9), 3)
            },
            "p_value": p_value
        }
    }

    decision_event = {
        "type": "DECISION_READY",
        "id": str(uuid.uuid4()),
        "correlation_id": correlation_id,
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "decision_agent",
        "payload": {
            "experiment_id": experiment_id,
            "decision": decision,
            "rationale": (
                f"D7 retention improved by {lift_abs*100:.1f}% "
                f"(p={p_value})."
            ),
            "next_actions": [
                "Roll banner to 100%" if decision == "PROMOTE" else "Iterate banner copy & add inline prompt helper",
                "Update changelog & best practices doc"
            ]
        }
    }

    return results_event, decision_event