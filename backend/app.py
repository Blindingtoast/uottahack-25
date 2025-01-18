import os
import logging
import mimetypes
from api import api_bp
from flask import Flask, send_from_directory, render_template
from db import db

mimetypes.add_type('application/javascript', '.js')

DEV = False

if DEV:
    app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
else:
    app = Flask(__name__, static_folder='dist/assets', template_folder='dist')

app.config['UPLOAD_FOLDER'] = './uploaded_files'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
app.logger.setLevel(logging.DEBUG)

app.register_blueprint(api_bp)

# Flask serves the whole project for the production build, might be better to 
# use NGINX


@app.route('/')
def index():
    return render_template('index.html')

# Serves React's static files


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)


# create db

db.init_app(app)
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
