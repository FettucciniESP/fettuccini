#ifndef PROGRAM_H
#define PROGRAM_H

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <SPI.h>

#include "NfcModule.h"
#include "OledScreen.h"

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
    NfcModule* nfc;
};

#endif
