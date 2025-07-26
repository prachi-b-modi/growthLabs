# agents/experiment_designer.py
import uuid
from datetime import datetime, timezone

def run(senso_evt):
    """
    AI Experiment Designer:
    Variant B adds a visible warning banner with best practices to reduce confusion,
    increase trust, and (therefore) improve retention_d7.
    """
    corr_id = senso_evt["correlation_id"]
    exp_id = f"exp_{uuid.uuid4().hex[:8]}"

    exp_event = {
        "type": "EXPERIMENT_SPEC_READY",
        "id": str(uuid.uuid4()),
        "correlation_id": corr_id,
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "experiment_designer",
        "payload": {
            "experiment": {
                "id": exp_id,
                "name": "Hallucination Warning Banner",
                "hypothesis": (
                    "Educating users about prompt quality and manual review will reduce confusion, "
                    "increase trust, and raise D7 retention by ≥5%."
                ),
                "metric_primary": "retention_d7",
                "metric_secondary": ["activation_rate", "banner_click_best_practices"],
                "target_segment": "all_logged_in_users",
                "variants": [
                    {"id": "A", "description": "Control (no banner)"},
                    {
                        "id": "B",
                        "description": (
                            "Show banner: 'Output may include hallucinations if the prompt is not good. "
                            "Best practice is to review the output manually, and refine your prompt as needed.'"
                        )
                    }
                ],
                "tracking_plan": [
                    "banner_impression",
                    "banner_click_best_practices",
                    "prompt_refinement_click",
                    "activation",
                    "retention_d7"
                ]
            }
        }
    }

    action_event = {
        "type": "ACTION_REQUIRED",
        "id": str(uuid.uuid4()),
        "correlation_id": corr_id,
        "ts": datetime.now(timezone.utc).isoformat(),
        "agent": "execution_planner",
        "payload": {
            "experiment_id": exp_id,
            "title": "Approve banner rollout & retention tracking",
            "description": "Create feature flag, rollout A/B 50/50, add Mixpanel events for banner interactions & retention_d7.",
            "requires_approval": True,
            "actions": [
                {
                    "id": "act_flag_banner",
                    "type": "create_feature_flag",
                    "config": {
                        "flag_key": "hallucination_warning_banner",
                        "variants": ["A", "B"],
                        "rollout": {"B": 0.5}
                    }
                },
                {
                    "id": "act_trackplan_banner",
                    "type": "update_tracking_plan",
                    "config": {
                        "events": [
                            "banner_impression",
                            "banner_click_best_practices",
                            "prompt_refinement_click",
                            "activation",
                            "retention_d7"
                        ]
                    }
                }
            ]
        }
    }

    return exp_event, action_event