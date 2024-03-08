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

    // Wire.setPins(15, 14);
    // Wire.begin();

    //this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

    // initWiFi();

    //this->screen->welcome();

    //this->api = new PokerApi(IP, PORT);

    Serial2.begin(115200,SERIAL_8N1,CARD_RX,CARD_TX); // begin serial port for nfc token reader
    this->NFC = new NfcTokenReader(Serial2);
    this->NFC->init();
}

void Program::loop() {
    NFC->refresh();
    NFC->shortToken();
    NFC->printTrame();
    for(auto it: *NFC->GetIso14443Tokens()){
        Serial.println(NFC->stringifyId(&it));
    }
    Serial.println();
    delay(200);
}
