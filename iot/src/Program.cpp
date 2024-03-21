#include "Program.h"
#include <WiFi.h>
#include <soc/soc.h> //disable brownour problems
#include <soc/rtc_cntl_reg.h> //disable brownour problems

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
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector in
    // Startup
    Serial.begin(MONITOR_SPEED);

    // Wire.setPins(15, 14);
    // Wire.begin();

    //this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

    initWiFi();

    //this->screen->welcome();

    this->api = new PokerApi(IP, PORT);

    Serial2.begin(115200,SERIAL_8N1,CARD_RX,CARD_TX); // begin serial port for nfc token reader
    this->NFC = new NfcTokenReader(Serial2);
    this->NFC->init();
}

void Program::loop() {
    std::vector<String> test;
    NFC->refresh();
    NFC->shortToken();

    Serial.println(NFC->getNbTags());
    Serial.print("ISO_15693 tags :");
    if(NFC->getNbTags() != 0){
        Serial.println(NFC->GetIso15693Tokens()->size());
        for(auto it: *NFC->GetIso15693Tokens()){
            this->NFC->pushBackChips(NFC->stringifyId(&it));
            //test.push_back(NFC->stringifyId(&it));
            Serial.println(NFC->stringifyId(&it));
        }
        Serial.print("ISO_18000 tags :");
        Serial.println(NFC->GetIso18000Tokens()->size());
        for(auto it: *NFC->GetIso18000Tokens()){
            this->NFC->pushBackChips(NFC->stringifyId(&it));
            //test.push_back(NFC->stringifyId(&it));
            Serial.println(NFC->stringifyId(&it));
        }
        Serial.print("ISO_14443 tags :");
        Serial.println(NFC->GetIso14443Tokens()->size());
        for(auto it: *NFC->GetIso14443Tokens()){
            this->NFC->pushBackChips(NFC->stringifyId(&it));
            Serial.println(NFC->stringifyId(&it));
        }
        api->decidingSendChips(this->NFC->chips, this->NFC->chipsPresent);
    }
    Serial.println();
}
