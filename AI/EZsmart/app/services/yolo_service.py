# app/services/yolo_service.py

from ultralytics import YOLO

YOLO_MODEL_PATH = "app/yolo/yolov8m.pt"
CONFIDENCE_THRESHOLD = 0.3

# Load YOLOv8 model
yolo_model = YOLO(YOLO_MODEL_PATH)

def detect_objects(image_path: str) -> list[str]:
    results = yolo_model(image_path, verbose=False)[0]

    # Extract object labels with sufficient confidence
    detected = {
        yolo_model.names[int(cls)]
        for cls, conf in zip(results.boxes.cls, results.boxes.conf)
        if conf.item() > CONFIDENCE_THRESHOLD
    }

    return list(detected)
