#include "Program.h"
#include <WiFi.h>

void initWiFi() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(WSSID, PASS);
    Serial.print("Connecting to WiFi ..");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(WiFi.status());
        delay(1000);
    }
    Serial.println(WiFi.localIP());
}


Program::Program() {
    // Startup
    Serial.begin(MONITOR_SPEED);

    nfc = new NfcModule(27, 26);

    //this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

    initWiFi();

    this->api = new PokerApi(IP, PORT);


//    this->screen->welcome();
}

String oldVal = "";

void Program::loop() {
    String val = nfc->read();
    if(val !="" && val != oldVal){
        Serial.println(val);
        oldVal = val;
        String cards[] = {val,"4269"};
        this->api->sendCard("1",cards);
    }
}
