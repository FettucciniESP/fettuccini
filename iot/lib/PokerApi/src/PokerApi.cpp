#include <Arduino.h>
#include "../include/PokerApi.h"
#include <Arduino_JSON.h>


PokerApi::PokerApi(String ip, int port, String user, String password) {
    this->ip = ip;
    this->port = port;
    this->username = user;
    this->password = password;

    this->client = new WiFiClient();
    this->http = new HTTPClient();
    this->token = "";
}

bool PokerApi::sendCard(String card[]) {
    bool sortie = true;
    this->http->begin(*this->client, this->ip, this->port, API_CARD);
    this->http->addHeader("Authorization", "Bearer " + this->token);
    this->http->addHeader("Content-Type", "application/json");
    JSONVar body;
    body["cardsId"][0] = card[0];
    body["cardsId"][1] = card[1];
    int resp = this->http->POST(JSON.stringify(body));
    if (resp == 401) {  // 401 = Unauthorized
        this->login();
        this->sendCard(card);
    } else if (resp != 201) {
#ifdef DEBUG
        Serial.print("Error while sending Card : ");
        Serial.println(resp);
        Serial.println(this->http->errorToString(resp));
        Serial.println(this->http->getString());
#endif
        sortie = false;
    }
    this->http->end();
    return sortie;
}

bool PokerApi::sendJetons(String jetons[]) {
    bool sortie = true;
    this->http->begin(*this->client, this->ip, this->port, API_CHIP);
    this->http->addHeader("Authorization", "Bearer " + this->token);
    this->http->addHeader("Content-Type", "application/json");
    JSONVar body;
    for (int i = 0; jetons[i] != null; i++) {
        body["chipsId"][i] = jetons[i];
    }
    int resp = this->http->POST(JSON.stringify(body));
    if (resp == 401) {  // 401 = Unauthorized
        this->login();
        this->sendJetons(jetons);
    } else if (resp != 201) {
        sortie = false;
    }
    this->http->end();
    return sortie;
}

bool PokerApi::receiveFromNFC(String NFCID, int amount) {
    bool sortie = true;
//     this->http->begin(*this->client, this->ip, this->port, URL_CARD + NFCID + URL_PAYMENT);
//     this->http->addHeader("Authorization", "Bearer " + this->token);
//     this->http->addHeader("Content-Type", "application/json");
//     int resp = this->http->POST("{\"amount\": " + String(amount) + "}");
//     if (resp == 401) {  // 401 = Unauthorized
//         this->login();
//         this->receiveFromNFC(NFCID, amount);
//     } else if (resp != 201) {
// #ifdef DEBUG
//         Serial.println("Error while sending money (NFC) : ");
//         Serial.println(resp);
//         Serial.println(this->http->errorToString(resp));
//         Serial.println(this->http->getString());
// #endif
//         sortie = false;
//     }
//     this->http->end();
    return sortie;
}

bool PokerApi::login() {
    bool sortie = true;
//     this->http->begin(*this->client, this->ip, this->port, URL_LOGIN);
//     this->http->addHeader("Content-Type", "application/json");
//     String body = "{\"username\": \"" + this->username + "\", \"password\": \"" + this->password + "\"}";
//     this->http->addHeader("Content-Length", String(body.length()));
//     int resp = this->http->POST(body);
//     if (resp != 200) {
// #ifdef DEBUG
//         Serial.println("connection error");
//         Serial.println(resp);
//         Serial.println(this->http->errorToString(resp));
//         Serial.println(this->http->getString());
// #endif
//         sortie = false;
//     } else {
//         JSONVar json = JSON.parse(this->http->getString());
//         String temp = json.stringify(json["data"]["token"]);
//         this->token = temp.substring(1, temp.length() - 1);
//     }
//     this->http->end();
    return sortie;
}

