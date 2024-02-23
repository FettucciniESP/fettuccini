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

#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>

#include "NfcCardReader.h"

// PN532_I2C pn532i2c(Wire);
// PN532 nfc(pn532i2c);

// PN532_I2C pn532i2c1(Wire1);
// PN532 nfc1(pn532i2c1);

NfcCardReader* card1;

bool card1Connected = 0;

void setup(void) {
    Serial.begin(MONITOR_SPEED);

    delay(2000);
    Serial.println("Hello!");
    card1 = new NfcCardReader(SDA_1, SCL_1, 400000U);

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

//TODO: utiliser ça pour être sur que le lecteur soit bien connecté

// bool connect() {

//     Wire.begin(SDA_1, SCL_1, 400000U);
//     nfc.begin();

//   // Connected, show version
//   uint32_t versiondata = nfc.getFirmwareVersion();
//   if (! versiondata)
//   {
//     Serial.println("PN53x card not found!");
//     return false;
//   }

//   //port
//   Serial.print("Found chip PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);
//   Serial.print("Firmware version: "); Serial.print((versiondata >> 16) & 0xFF, DEC);
//   Serial.print('.'); Serial.println((versiondata >> 8) & 0xFF, DEC);

//   // Set the max number of retry attempts to read from a card
//   // This prevents us from waiting forever for a card, which is
//   // the default behaviour of the PN532.
//   nfc.setPassiveActivationRetries(0xFF);

//   // configure board to read RFID tags
//   nfc.SAMConfig();

//   Serial.println("Waiting for card (ISO14443A Mifare)...");
//   Serial.println("");

//   return true;
// }
