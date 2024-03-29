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

    delay(2000);
    Serial.println("Hello!");
    //Screen

    // Wire.setPins(15, 14);
    // Wire.begin();
    // this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);
    // this->screen->welcome();

    //Screen

    //this->api = new PokerApi(IP, PORT);


    this->NFCTocken = new NfcTokenReader(Serial2);
    Serial.println("pouet");
    this->NFCTocken->init();
    Serial.println("pouet");


    //Card Reader

    bool card1Connected = 0;
    bool card2Connected = 0;

    this->card1 = new NfcCardReader(Serial1);
    while (!card1Connected){
        card1Connected = card1->connect();
    }

    delay(100);

    // this->card2 = new NfcCardReader(Serial2);
    // while (!card2Connected){
    //     card2Connected = card2->connect();
    // }

}

void Program::loop() {
    NFCTocken->refresh();
    NFCTocken->printTrame();
    Serial.println();
    Serial.println(NFCTocken->getNbTags());
    // this->screen->setTagNB(NFCTocken->getNbTags());
    delay(200);

    String val1 = this->card1->read();
    if(val1 != ""){
        Serial.print("new card 1 : ");
        Serial.println(val1);
    }

    // String val2 = this->card2->read();
    // if(val2 != ""){
    //     Serial.print("new card 2 : ");
    //     Serial.println(val2);
    // }
}
