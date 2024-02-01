// #include "Program.h"
// #include <WiFi.h>

// void initWiFi() {
//     WiFi.mode(WIFI_STA);
//     WiFi.begin(WSSID, PASS);
//     Serial.print("Connecting to WiFi ..");
//     while (WiFi.status() != WL_CONNECTED) {
//         Serial.print(WiFi.status());
//         delay(1000);
//     }
//     Serial.println(WiFi.localIP());
// }




// Program::Program() {
//     // Startup
//     Serial.begin(MONITOR_SPEED);

//     Wire.setPins(15, 14);
//     Wire.begin();

//     this->screen = new OledScreen(OLED_WIDTH, OLED_HEIGHT, OLED_RESET);

//     // initWiFi();

//     this->screen->welcome();

//     //this->api = new PokerApi(IP, PORT);


// //    //this->screen->welcome();
//     // this->NFC = new NfcReader(new SoftwareSerial(5,17));
//     this->NFC = new NfcReader();
//     Serial.println("pouet");
//     this->NFC->init();
//     Serial.println("pouet");

// }

// void Program::loop() {
//     NFC->refresh();
//     NFC->printTrame();
//     Serial.println();
//     Serial.println(NFC->getNbTags());
//     this->screen->setTagNB(NFC->getNbTags());
//     delay(200);
// }
