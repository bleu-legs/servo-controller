import board
from adafruit_motor import servo
from adafruit_pca9685 import PCA9685

class ServoController:
    def __init__(self, i2c=None, frequency=50):
        """
        Initialize the ServoController with a PCA9685 driver.
        
        Args:
            i2c: An initialized I2C object. Defaults to board.I2C().
            frequency (int): Frequency for the servos. Default is 50 Hz.
        """
        self.i2c = i2c if i2c else board.I2C()
        self.pca = PCA9685(self.i2c)
        self.pca.frequency = frequency
        self.servos = [servo.Servo(self.pca.channels[i]) for i in range(16)]

    def move_servo(self, pinNumber, degree):
        """
        Move a servo connected to the specified pin to the given angle.
        
        Args:
            pinNumber (int): The channel number (0-15) on the PCA9685 where the servo is connected.
            degree (int or float): The angle to set the servo to (0-180 degrees).
        """
        if 0 <= pinNumber < 16:
            if 0 <= degree <= 180:
                self.servos[pinNumber].angle = degree
            else:
                raise ValueError(f"Degree {degree} out of range (0-180).")
        else:
            raise ValueError(f"Pin number {pinNumber} out of range (0-15).")

    def deinit(self):
        """
        Deinitialize the PCA9685 to release resources.
        """
        self.pca.deinit()
