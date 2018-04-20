const int inPin = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(inPin);
  float millivolts = (value / 1024.0) * 5000;
  float celsius = millivolts / 10;
  Serial.println(celsius);
  delay(5000);
}
