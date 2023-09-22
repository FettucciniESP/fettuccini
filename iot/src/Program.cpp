#include "Program.h"

Program::Program() {
    // Startup
    Serial.begin(MONITOR_SPEED);

    this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

    //this->screen->welcome();

    this->NFC = new NfcReader();
    this->NFC->init();

}

void Program::loop() {
    NFC->refresh();
    NFC->printTrame();
    Serial.println();
    Serial.println(NFC->getNbTags());
    this->screen->setTagNB(NFC->getNbTags());
    delay(200);
}
