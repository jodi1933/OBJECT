# OBJECT
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
  #endif
#define PIN            8

#define NUMPIXELS      5
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS,PIN,NEO_RGB +NEO_KHZ400);

int count;
void setup() {
  // put your setup code here, to run once:
  pinMode(11,INPUT);
  pinMode(13,INPUT);
  Serial.begin(9600);
  strip.begin();
  strip.clear();
  strip.show();
}

void loop() {
  // put your main code here, to run repeatedly:
  int twist = analogRead(A1);
  int push = analogRead(A0);
  if(digitalRead(11)==HIGH)
  {
    count = 1;
    Serial.print(twist);
    Serial.print(",");
    Serial.print(push);
    Serial.print(",");
    Serial.println(count);
    delay(1);
  }
  if(digitalRead(13)==HIGH)
  {
    count = 2;
    Serial.print(twist);
    Serial.print(",");
    Serial.print(push);
    Serial.print(",");
    Serial.println(count);
    delay(1);
  }
  else{
    count = 0;
    Serial.print(twist);
    Serial.print(",");
    Serial.print(push);
    Serial.print(",");
    Serial.println(count);
    delay(1);
  }
  if(Serial.available()>0){
    int yuh = Serial.read();
    if(yuh <80){
      strip.setPixelColor(1,0,0,255);
      strip.setPixelColor(2,0,0,255);
      strip.setPixelColor(3,0,0,255);
      strip.setPixelColor(4,0,0,255);
      strip.setPixelColor(0,0,0,255);
      strip.show();
    }
    if(yuh <160&&yuh>=80){
      strip.setPixelColor(1,0,255,0);
      strip.setPixelColor(2,0,255,0);
      strip.setPixelColor(3,0,255,0);
      strip.setPixelColor(4,0,255,0);
      strip.setPixelColor(0,0,255,0);
      strip.show();
    }
    if(yuh>=160){
      strip.setPixelColor(1,255,0,0);
      strip.setPixelColor(2,255,0,0);
      strip.setPixelColor(3,255,0,0);
      strip.setPixelColor(4,255,0,0);
      strip.setPixelColor(0,255,0,0);
      strip.show();
    }
    
  }
  
}
