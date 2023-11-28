#include "Program.h"

Program* program;

void setup() {
    program = new Program();
}

void loop() {
    program->loop();
}
