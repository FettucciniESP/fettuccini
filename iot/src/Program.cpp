#include "Program.h"
#include <WiFi.h>
#include <soc/soc.h> //disable brownour problems
#include <soc/rtc_cntl_reg.h> //disable brownour problems

void initWiFi() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(WSSID, PASS);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
    }
}


Program::Program() {
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector in
    // Startup
    Serial.begin(MONITOR_SPEED);

    delay(2000);
    //Screen
    initWiFi();
    // Wire.setPins(15, 14);
    // Wire.begin();
    // this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);
    // this->screen->welcome();

    //Screen

    this->api = new PokerApi(IP, PORT);


    this->NFCTocken = new NfcTokenReader(Serial2);
    this->NFCTocken->init();

    //Card Reader

    bool card1Connected = 0;
    bool card2Connected = 0;

    this->card1 = new NfcCardReader(Serial1);
    while (!card1Connected){
        card1Connected = card1->connect();
    }

    delay(100);

    this->card2 = new NfcCardReader(Serial);
    while (!card2Connected){
        card2Connected = card2->connect();
    }

}

void Program::loop() {
    //START nfc Token
    NFCTocken->refresh();
    NFCTocken->shortToken();

    if(NFCTocken->getNbTags() != 0){
        for(auto it: *NFCTocken->GetIso15693Tokens()){
            this->NFCTocken->pushBackChips(NFCTocken->stringifyId(&it));
        }
        for(auto it: *NFCTocken->GetIso18000Tokens()){
            this->NFCTocken->pushBackChips(NFCTocken->stringifyId(&it));
        }
        for(auto it: *NFCTocken->GetIso14443Tokens()){
            this->NFCTocken->pushBackChips(NFCTocken->stringifyId(&it));
        }
        api->decidingSendChips(this->NFCTocken->chips); //XXX
    }
    // END NFC token

    // START NFC card
    String val1 = this->card1->read();
    String val2 = this->card2->read();
    this->api->decidingSendCards(val1, val2);
    // END NFC card
}
