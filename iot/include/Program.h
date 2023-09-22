#ifndef PROGRAM_H
#define PROGRAM_H

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

#include "OledScreen.h"
#include "NfcReader.h"

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
    NfcReader* NFC;
};

#endif
