#ifndef PROGRAM_H
#define PROGRAM_H

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
//#include <WebServer_WT32_ETH01.h>
//#include <HTTPClient.h>

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
};

#endif
