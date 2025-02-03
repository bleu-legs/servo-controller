import sys
from servo_manager import ServoController  # Assuming your servo controller is imported this way

def move_servo(pin, angle):
    servo_ctrl = ServoController()
    servo_ctrl.move_servo(pin, angle)
    print(f"Servo {pin} moved to {angle}°")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python move_servo.py <pin_number> <angle>")
        sys.exit(1)

    pin_number = int(sys.argv[1])
    angle = int(sys.argv[2])
    move_servo(pin_number, angle)
