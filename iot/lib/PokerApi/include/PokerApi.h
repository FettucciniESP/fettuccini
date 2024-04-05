#ifndef POKER_API_H
#define POKER_API_H

#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFiClient.h>
#include <vector>

class PokerApi {
public:


    /**
     * @brief Construct a new HTTPRequester object
     *
     * @param ip adress of the bank server
     * @param port port of the bank server
     */
    PokerApi(String ip, int port, String user = "", String password = "");

    bool decidingSendChips(std::vector<String>* chips);
    bool decidingSendCards(String firstCard, String secondCard);

    /**
     * @brief receive value from the card of the consumer account to the connected account
     *
     * @param NFCID id of nfc card
     * @param amount amount to send
     * @return true if the transaction is a success
     */
    bool receiveFromNFC(String NFCID, int amount);

private:

    /**
     * @brief get the jwt token to the server if the user is not connected
     *
     * @return true
     * @return false
     */
    bool login();

    String username;

    String password;

    String token;

    String ip;
    int port;

    HTTPClient* http;
    WiFiClient* client;

    //Chips call setting
    bool canSendChips = false;
    std::vector<String>* chips = {};
    unsigned long lastUpTimeChip;

        /**
     * @brief send the id of the player card
     *
     * @param seat id of the seat on the table
     * @param chips[x] the jetons of the player
     * @return true if the transaction is a success
     */
    bool sendChips(std::vector<String>* chips);

    /**
     * @brief send the id of the player card
     *
     * @param seat id of the seat on the table
     * @param card[2] the card of the player
     * @return true if the transaction is a success
     */
    bool sendCard(String firstCard, String secondCard);

    //Cards call setting
    String card1 = "";
    String card2 = "";
    bool canSendCards = false;
};


#endif
