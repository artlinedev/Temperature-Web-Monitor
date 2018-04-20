void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(num);
  num = num + 1;
  delay(10000);
}
