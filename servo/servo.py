import time
from servo_manager import ServoController

servo_ctrl = ServoController()

try:
    while True:
        for angle in range(0, 181, 10):
            servo_ctrl.move_servo(0, angle) # PinNumber, Angle
            time.sleep(0.1)
        for angle in range(180, -1, -10):
            servo_ctrl.move_servo(0, angle)
            time.sleep(0.1)

except KeyboardInterrupt:
    print("Exiting...")

finally:
    servo_ctrl.deinit()
