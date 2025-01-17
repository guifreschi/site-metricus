from flask import Blueprint, jsonify
from Metricus.gui import MetricusGUI

metricusgui_bp = Blueprint('metricusgui', __name__)

@metricusgui_bp.route('/metricusgui', methods=["GET"])
def get_metricusgui():
  try:
    MetricusGUI()
    return jsonify({"success": True})
  except Exception as e:
    print(f"Error: {e}")
    return jsonify({"success": False, "message": str(e)}), 500
