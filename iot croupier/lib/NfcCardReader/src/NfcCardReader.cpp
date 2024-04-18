#include "../include/NfcCardReader.h"

int NfcCardReader::readerNb = 0;

NfcCardReader::NfcCardReader(int sda, int scl, unsigned int speed){
    NfcCardReader::readerNb++;
    this->wire = new TwoWire(NfcCardReader::readerNb);
    wire->begin(sda,scl,speed);
    this->pn532i2c = new PN532_I2C(*wire); //I2C
    this->nfc = new PN532(*pn532i2c);
}


NfcCardReader::NfcCardReader(HardwareSerial& serial){
    NfcCardReader::readerNb++;
    this->pn532hsu = new PN532_HSU(serial);
    this->nfc = new PN532(*pn532hsu);
}


bool NfcCardReader::connect() {

    this->nfc->begin();

    uint32_t versiondata = this->nfc->getFirmwareVersion();
    if (! versiondata){
        //Serial.println("PN53x card not found!");
        return false;
    }

    //port
    //Serial.print("Found chip PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);
    //Serial.print("Firmware version: "); Serial.print((versiondata >> 16) & 0xFF, DEC);
    //Serial.print('.'); Serial.println((versiondata >> 8) & 0xFF, DEC);

    // Set the max number of retry attempts to read from a card
    // This prevents us from waiting forever for a card, which is
    // the default behaviour of the PN532.
    this->nfc->setPassiveActivationRetries(0xFF);

    // configure board to read RFID tags
    this->nfc->SAMConfig();

    //Serial.print("Waiting for card on reader : ");
    //Serial.println(NfcCardReader::readerNb);
    //Serial.println("");

    return true;
}


String NfcCardReader::read(){
    String sortie = "";

    boolean success;
    uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
    uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)

    success = this->nfc->readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength, READER_TIMEOUT);

    if (success) {
        for (uint8_t i=0; i < uidLength; i++)
        {
            sortie += this->digitify(uid[i]);
            sortie += ":";
        }
        sortie = sortie.substring(0,sortie.length()-1);
    }

    return sortie;
}


String NfcCardReader::digitify(int number){
    String sortie = "";

    if(number <= 0xF){
        sortie += '0';
        sortie += String(number,HEX);
    }else{
        sortie += String(number,HEX);
    }
    return sortie;
}
