#ifndef NFC_READER_H
#define NFC_READER_H

#include <Arduino.h>
#include <vector>

#include "TrameList.h"

class NfcReader{
public:
    NfcReader();

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

private:

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
};




#endif
