#include "../include/OledScreen.h"

#include <Adafruit_SSD1306.h>

OledScreen::OledScreen(int screenWidth, int screenHeight, int oledResetPin, TwoWire* wire) {
    this->display = new Adafruit_SSD1306(screenWidth, screenHeight, wire, oledResetPin);
    if (!display->begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
        for (;;); // Don't proceed, loop forever
    }
    this->display->clearDisplay();

    this->blind = 0;
    this->bigBlind = 0;
    this->stack = 0;
    this->nbBlind = 0;
}

void OledScreen::welcome() {
    this->display->clearDisplay();
    this->display->setCursor(0, 0);
    this->display->setTextSize(2);
    this->display->setTextColor(WHITE);
    this->display->println(F("150/300\n"));
    this->display->println(F("\n30 BB"));

    this->display->display();
}

void OledScreen::refresh() {
    this->display->clearDisplay();
    this->display->setCursor(0, 0);
    this->display->setTextSize(2);
    this->display->setTextColor(WHITE);

    // String blindString = this->blind + "/" + this->bigBlind + "\nB/BB";
    // this->display->println(F(blindString.c_str()));
    this->display->println(F("135005 $"));
    this->display->println(F("30 Bld"));


    this->display->display();
}

void OledScreen::printAmount(int amount) {
    this->display->clearDisplay();
    this->display->setCursor(0, 0);
    this->display->setTextSize(2);
    this->display->setTextColor(WHITE);
    this->display->println(F("  Total:  "));
    this->display->println();

    this->display->print(amount / 100);
    this->display->print(F(","));
    int centimes = amount % 100;
    if (centimes < 10) {
        this->display->print(F("0"));
    }
    this->display->println(centimes);
    this->display->print(F("       EUR"));
    this->display->display();
}

void OledScreen::wifiWaiting() {
    this->clear();
    this->display->setCursor(0, 0);
    this->display->setTextSize(2);
    this->display->setTextColor(WHITE);
    this->display->println(F("Connection\n"));
    this->display->println(F("  WiFi...\n"));
    this->display->println();
    this->display->display();
}

void OledScreen::clear() {
    this->display->clearDisplay();
}


void OledScreen::setTagNB(int nb){
    this->display->clearDisplay();
    this->display->setCursor(0, 0);
    this->display->setTextSize(2);
    this->display->setTextColor(WHITE);
    this->display->println(F("NB Jetons:\n"));
    this->display->println(nb);

    this->display->display();
}
