from flask import Blueprint, render_template

error_bp = Blueprint('errors', __name__)

@error_bp.app_errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404

@error_bp.app_errorhandler(403)
def permission_denied(e):
  return render_template('403.html'), 403

@error_bp.app_errorhandler(500)
def internal_server_error(e):
  return render_template('500.html'), 500
