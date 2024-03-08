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

    this->nfc = new NfcModule(27, 26);

    //this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

    initWiFi();

    this->api = new PokerApi(IP, PORT);


//    this->screen->welcome();
}

String oldVal = "";
String oldVal2 = "";

void Program::loop() {
    String val = nfc->read();
    if(val !="" && val != oldVal){
        Serial.println(val);
        oldVal = val;
        String cards[] = {val,"23892B"};
        String jetons[] = {val,"23892B"};
        this->api->sendCard(cards);
        this->api->sendJetons(jetons);
    }
}
