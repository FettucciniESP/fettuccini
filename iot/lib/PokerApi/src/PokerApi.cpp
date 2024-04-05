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

bool PokerApi::sendCard(String firstCard, String secondCard) {
    bool sortie = true;
    this->http->begin(*this->client, this->ip, this->port, API_CARD);
    this->http->addHeader("Authorization", "Bearer " + this->token);
    this->http->addHeader("Content-Type", "application/json");
    JSONVar body;
    body["cardsId"][0] = firstCard;
    body["cardsId"][1] = secondCard;
    int resp = this->http->POST(JSON.stringify(body));
    if (resp == 401) {  // 401 = Unauthorized
        this->login();
        this->sendCard(firstCard, secondCard);
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

bool PokerApi::sendChips(std::vector<String>* chips) {
    bool sortie = true;
    this->http->begin(*this->client, this->ip, this->port, API_CHIP);
    this->http->addHeader("Authorization", "Bearer " + this->token);
    this->http->addHeader("Content-Type", "application/json");
    JSONVar body;
    body["seat"] = SEAT_1;
    for (int i = 0; i < chips->size(); i++) {
        body["chipsId"][i] = chips->at(i);
    }
    int resp = this->http->POST(JSON.stringify(body));
    if (resp == 401) {  // 401 = Unauthorized
        this->login();
        this->sendChips(chips);
    } else if (resp != 201) {
        sortie = false;
    }
    this->http->end();
    return sortie;
}

bool PokerApi::decidingSendChips(std::vector<String>* chips) {
    if(chips != this->chips) {
        this->chips = chips;
        this->lastUpTimeChip = millis();
    }

    if(!this->chips->empty() && millis() - this->lastUpTimeChip >= 5000) {
        bool res = this->sendChips(this->chips);
        this->chips = {};
        return res;
    }
    return false;
}

bool PokerApi::decidingSendCards(String firstCard, String secondCard) {
    if (firstCard != this->card1 && secondCard != this->card2) {
        this->card1 = firstCard;
        this->card2 = secondCard;
        this->canSendCards = true;
    }

    if(this->canSendCards) {
        this->sendCard(firstCard, secondCard);
        this->canSendCards = false;
        return true;
    }
    return false;
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
