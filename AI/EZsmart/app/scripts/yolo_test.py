from ultralytics import YOLO
import cv2

# Load the pretrained YOLOv8 model
model = YOLO("yolov8n.pt")  # n = nano version (fast and lightweight)

# Path to test image (put a sample image in the root folder)
img_path = "test-room.jpg"

# Run detection
results = model(img_path, conf=0.3)  # Lower conf = more objects detected

# Show the image with bounding boxes
results[0].show()

# Print detected classes
for r in results:
    for box in r.boxes:
        cls = r.names[int(box.cls[0])]
        print("Detected:", cls)
