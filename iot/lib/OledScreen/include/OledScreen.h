#ifndef OLED_SCREEN_H
#define OLED_SCREEN_H

#include <Adafruit_SSD1306.h>


class OledScreen {
public:

    /**
     * @brief Construct a new Oled Screen object
     *
     * @param screenWidth The width of the screen
     * @param screenHeight The height of the screen
     * @param oledResetPin The pin used to reset the screen (default: -1)
     */
    OledScreen(int screenWidth, int screenHeight, int oledResetPin = -1);

    /**
     * @brief display welcome screen
     */
    void welcome();

    /**
     * @brief print the total amount on the screen
     *
     * @param amount The total amount to print in centimes
     */
    void printAmount(int amount);

    /**
     * @brief Clear the screen
     */
    void clear();


    /**
     * @brief messsage for wifi waiting
     *
     */
    void wifiWaiting();

    /**
     * @brief refresh the screen
     */
    void refresh();

    /**
     * @brief Set the number of Tag
     *
     * @param nb of tag
     */
    void setTagNB(int nb);


private:

    Adafruit_SSD1306* display;

    /**
     * @brief blind en cour
     *
     */
    int blind;
    /**
     * @brief big blind en cour
     *
     */
    int bigBlind;

    /**
     * @brief valeur des jeutons du joueur
     *
     */
    int stack;

    /**
     * @brief nombre de blind du joueur
     *
     */
    int nbBlind;


};


#endif
