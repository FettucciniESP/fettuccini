#ifndef NFC_READER_H
#define NFC_READER_H

#include <Arduino.h>
#include <vector>

// #include <SoftwareSerial.h>

#include "TrameList.h"

class NfcTokenReader{
public:
    NfcTokenReader(HardwareSerial& serial);

    /**
     * @brief initialise le lecteur NFC
     *
     * @return true le lecteur NFC est initialisé
     * @return false le lecteur NFC n'est pas initialisé (erreur)
     */
    bool init();

    /**
     * @brief rafraichit les données du lecteur NFC
     *
     */
    void refresh();

    /**
     * @brief affiche la dernière trame lue
     *
     */
    void printTrame();

    /**
     * @brief retourne le nombre de tags lus
     *
     * @return int nombre de tags lus
     */
    int getNbTags();

    /**
     * @brief retourne un vecteur avec tout les tags split
     *
     * @return std::vector<byte> tableau avec tout les tags
     */
    void shortToken();

    /**
     * @brief Get the Iso18000 Tokens object
     *
     * @return std::vector<std::vector<byte>>*
     */
    std::vector<std::vector<byte>>* GetIso18000Tokens();

    /**
     * @brief Get the Iso15693 Tokens object
     *
     * @return std::vector<std::vector<byte>>*
     */
    std::vector<std::vector<byte>>* GetIso15693Tokens();

    /**
     * @brief Get the Iso14443 Tokens object
     *
     * @return std::vector<std::vector<byte>>*
     */
    std::vector<std::vector<byte>>* GetIso14443Tokens();

    /**
     * @brief
     *
     * @return * String
     */
    String stringifyId(std::vector<byte>* id);

    void pushBackChips(String chip);

    //Tableau de jetons
    std::vector<String>* chips;

    bool chipsPresent;

private:

    HardwareSerial *serial;

    /**
     * @brief convertit un nombre en hexadécimal (a 2 chiffres)
     *
     * @param number nombre à convertir
     * @return String nombre converti
     */
    String digitify(int number);

    /**
     * @brief variable pair/impair pour le type de trame
     *
     */
    bool pair;

    /**
     * @brief dernière trame lue
     *
     */
    std::vector<byte>* trame;

    // SoftwareSerial* serial;
    std::vector<std::vector<byte>>* iso_18000;
    std::vector<std::vector<byte>>* iso_14443;
    std::vector<std::vector<byte>>* iso_15693;
};

#endif
