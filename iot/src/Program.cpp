#include "Program.h"

Program::Program() {
    // Startup
    Serial.begin(MONITOR_SPEED);

    this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

    this->screen->welcome();

}

void Program::loop() {
    // Loop
}
