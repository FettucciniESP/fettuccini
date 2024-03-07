#include "Program.h"

Program* program;

void setup() {
    program = new Program();
}

void loop() {
    program->loop();
}

// #include <Arduino.h>
// #include <SPI.h>

// // #include <Wire.h>
// // #include <PN532_I2C.h>
// // #include <PN532.h>

// #include "NfcCardReader.h"


// NfcCardReader* card1;
// NfcCardReader* card2;

// bool card1Connected = 0;
// bool card2Connected = 0;

// void setup(void) {
//     Serial.begin(MONITOR_SPEED);

//     delay(2000);
//     Serial.println("Hello!");

//     // Serial2.begin(115200,SERIAL_8N1, SDA_1, SCL_1);
//     // card1 = new NfcCardReader(Serial2);
//     // while (!card1Connected){
//     //     card1Connected = card1->connect();
//     // }

//     Serial1.begin(115200,SERIAL_8N1, SDA_2, SCL_2);
//     Serial.print(SDA_2);
//     Serial.println(SCL_2);
//     delay(100);
//     card2 = new NfcCardReader(Serial1);
//     while (!card2Connected){
//         card2Connected = card2->connect();
//     }

// }

// void loop(void) {
//     // String val1 = card1->read();
//     // if(val1 != ""){
//     //     Serial.print("new card 1 : ");
//     //     Serial.println(val1);
//     // }

//     String val2 = card2->read();
//     if(val2 != ""){
//         Serial.print("new card 2 : ");
//         Serial.println(val2);
//     }
// }
