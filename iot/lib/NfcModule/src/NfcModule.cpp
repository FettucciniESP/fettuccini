#include "../include/NfcModule.h"



NfcModule::NfcModule(int ssPin, int rstPin) {
    SPI.begin();
    this->rfid = new MFRC522(ssPin, rstPin);
    this->rfid->PCD_Init();
}


String NfcModule::read() {
    String result = "";
    if (!this->rfid->PICC_IsNewCardPresent()) {
        return result;
    }
    if (this->rfid->PICC_ReadCardSerial()) {
        for (int i = 0; i < this->rfid->uid.size; i++) {
            result += (this->rfid->uid.uidByte[i] < 0x10 ? "0" : "");
            result += String(this->rfid->uid.uidByte[i], HEX);
        }
    }
    result.toUpperCase();
    return result;
}
