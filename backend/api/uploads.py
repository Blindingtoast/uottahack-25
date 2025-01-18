import os
import time
from typing import Mapping
import xml.etree.ElementTree as ET
import json

from flask import request, abort, Blueprint, current_app

bp = Blueprint("uploads", __name__)


# Handles uploading multiple files
@bp.route('/upload', methods=['POST'])
def uploaded_files():
    if 'upload-file' not in request.files:
        current_app.logger.info("uploaded_file was not given the expected files")
        abort(400)
    to_process = []
    for file in request.files.getlist("upload-file"):
        # Empty if no file uploaded w form
        if file.filename != '':
            filename = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
            to_process.append(filename)
            file.save(filename)
            current_app.logger.info(f"saved a file {file.filename}")
    # Do some work with the file
    response = process_upload(to_process, request.form)
    # Return some information
    return {"status": "success", "result": response}


def process_upload(files: list[str], form_data: Mapping[str, str]) -> Mapping:
    """
    Processes a set of files, where files is the paths of files that were uploaded,
    and kargs is a dictionary of form values in json
    """
    for file in files:
        if file.endswith(".xml"):
            tree = ET.parse(file)
            for tag in tree.iter():
                current_app.logger.debug(f"processing xml tag {tag}")
        if file.endswith(".json"):
            with open(file) as f:
                data = json.load(f)
            current_app.logger.debug(f"recieved a json object: {data}")
    if "extra-input" in form_data:
        current_app.logger.info(f"got some extra data: {form_data['extra-input']}")
    return {"processing-done": f"{time.time()}"}
