// #include "Program.h"

// Program* program;

// void setup() {
//     program = new Program();
// }

// void loop() {
//     program->loop();
// }

#include <Arduino.h>
#include <SPI.h>

// #include <Wire.h>
// #include <PN532_I2C.h>
// #include <PN532.h>

#include "NfcCardReader.h"


NfcCardReader* card1;

bool card1Connected = 0;

void setup(void) {
    Serial.begin(MONITOR_SPEED);

    delay(2000);
    Serial.println("Hello!");
    // card1 = new NfcCardReader(SDA_1, SCL_1, 400000U);

    Serial2.begin(115200,SERIAL_8N1, SDA_1, SCL_1);

    card1 = new NfcCardReader(Serial2);

    while (!card1Connected)
    {
        card1Connected = card1->connect();
    }

}

void loop(void) {
    String val = card1->read();
    if(val != ""){
        Serial.print("new card : ");
        Serial.println(val);
    }
}
