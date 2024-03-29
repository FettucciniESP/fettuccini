#ifndef PROGRAM_H
#define PROGRAM_H

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <SPI.h>

#include "OledScreen.h"
#include "NfcTokenReader.h"
//#include "PokerApi.h" // XXX
#include "NfcCardReader.h"

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
    OledScreen *screen;
    // PokerApi* api; //XXX

    NfcTokenReader* NFCTocken;

    NfcCardReader* card1;
    NfcCardReader* card2;
};

#endif
