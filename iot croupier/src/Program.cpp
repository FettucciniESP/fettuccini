#include "Program.h"
#include <WiFi.h>
#include <WebServer_WT32_ETH01.h>
#include <HTTPClient.h>

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
    Serial.println("Hello!");

    ethernetWT32Init();

    this->api = new PokerApi(IP, PORT);

    //Card Reader


    bool card1Connected = 0;
    this->card1 = new NfcCardReader(Serial1);
    while (!card1Connected){
        card1Connected = card1->connect();
    }

    bool card2Connected = 0;
    this->card2 = new NfcCardReader(Serial2);
    while (!card2Connected){
        card2Connected = card2->connect();
    }

    // bool card3Connected = 0;
    // this->card3 = new NfcCardReader(Serial);
    // while (!card3Connected){
    //     card3Connected = card3->connect();
    // }

    delay(100);
}

void Program::loop() {

    //TEST API :

    delay(2000);
    String card[] = {"10","10"};
    api->sendCard(card);

    // START NFC card
    String val1 = this->card1->read();
    if(val1 != ""){
        Serial.print("new card 1 : ");
        Serial.println(val1);
    }

    String val2 = this->card2->read();
    if(val2 != ""){
        Serial.print("new card 2 : ");
        Serial.println(val2);
    }

    // String val3 = this->card3->read();
    // if(val3 != ""){
    //     Serial.print("new card 3 : ");
    //     Serial.println(val3);
    // }
    // END NFC cad
}
