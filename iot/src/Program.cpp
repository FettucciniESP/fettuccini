#include "Program.h"
#include <WiFi.h>
#include <soc/soc.h> //disable brownour problems
#include <soc/rtc_cntl_reg.h> //disable brownour problems
#include <WebServer_WT32_ETH01.h>

// void initWiFi() {
//     WiFi.mode(WIFI_STA);
//     WiFi.begin(WSSID, PASS);
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(1000);
//     }
// }

void ethernetWT32Init(){
    WT32_ETH01_onEvent();
    ETH.begin(ETH_PHY_ADDR, ETH_PHY_POWER);
    WT32_ETH01_waitForConnect();
}


Program::Program() {
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector in
    // Startup
    Serial.begin(MONITOR_SPEED);

    delay(2000);
    //Screen
    //initWiFi();
    ethernetWT32Init();
    // Wire.setPins(15, 14);
    // Wire.begin();
    // this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);
    // this->screen->welcome();

    //Screen

    this->api = new PokerApi(IP, PORT);

    delay(1000);
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

    // this->card2 = new NfcCardReader(Serial);
    // while (!card2Connected){
    //     card2Connected = card2->connect();
    // }

}

void Program::loop() {
    //START nfc Token
    NFCTocken->refresh();
    NFCTocken->shortToken();

    if(NFCTocken->getNbTags() != 0){
        Serial.println('i got jetons');
        for(auto it: *NFCTocken->GetIso15693Tokens()){
            this->NFCTocken->pushBackChips(NFCTocken->stringifyId(&it));
        }
        for(auto it: *NFCTocken->GetIso18000Tokens()){
            this->NFCTocken->pushBackChips(NFCTocken->stringifyId(&it));
        }
        for(auto it: *NFCTocken->GetIso14443Tokens()){
            this->NFCTocken->pushBackChips(NFCTocken->stringifyId(&it));
        }
        Serial.println(this->NFCTocken->chips->at(0));
        api->decidingSendChips(this->NFCTocken->chips); //XXX
    } else {
        api->refreshSauvgarde();
    }
    // END NFC token

    // START NFC card
    String val1 = this->card1->read();
    String val2 = "coucou"; //this->card2->read();
    this->api->decidingSendCards(val1, val2);
    // END NFC card
}
