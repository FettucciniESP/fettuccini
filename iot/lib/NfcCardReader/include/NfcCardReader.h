#ifndef NFC_CARD_READER_H
#define NFC_CARD_READER_H

#include <Arduino.h>
#include <Wire.h>

#include <PN532_I2C.h>
#include <PN532_HSU.h>
#include <PN532.h>

class NfcCardReader
{
public:
    NfcCardReader(int sda, int scl, unsigned int speed);

    NfcCardReader(HardwareSerial& serial);


    bool connect();

    String read();

    //FIXME: remettre en private après test IRQ
    PN532* nfc;


private:

    String digitify(int number);

    static int readerNb;

    TwoWire* wire;

    PN532_I2C* pn532i2c;

    PN532_HSU* pn532hsu;


};



#endif
