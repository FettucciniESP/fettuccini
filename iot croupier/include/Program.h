#ifndef PROGRAM_H
#define PROGRAM_H

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <SPI.h>

// #include "OledScreen.h"
//#include "NfcTokenReader.h"
#include "PokerApi.h"
#include "NfcCardReader.h"
#include <vector>

class Program {
public:
    /**
     * Program startup
     */
    Program();

    /**
     * Program main loop
     */

    void loop();

private:
    // OledScreen *screen;
    PokerApi* api;

    // NfcTokenReader* NFCTocken;

    NfcCardReader* card1;
    NfcCardReader* card2;
    NfcCardReader* card3;

    std::vector<String>* cardId;
    std::vector<String>* sendedCardId;
    bool sendedCard;
};

#endif
