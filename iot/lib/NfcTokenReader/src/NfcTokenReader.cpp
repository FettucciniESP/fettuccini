#include "../include/NfcTokenReader.h"


NfcTokenReader::NfcTokenReader(){
    Serial2.begin(115200,SERIAL_8N1,5,17);//TODO: mettre le port série en paramètre
    this->pair = true;
    this->trame = new std::vector<byte>();
}


bool NfcTokenReader::init(){
    const std::vector<std::vector<byte>> INIT_TRAMES = {INIT_TRAM_0, INIT_TRAM_1, INIT_TRAM_2, INIT_TRAM_3, INIT_TRAM_4, INIT_TRAM_5, INIT_TRAM_6, INIT_TRAM_7};
    const std::vector<std::vector<byte>> REP_TRAMES = {REP_TRAM_0, REP_TRAM_1, REP_TRAM_2, REP_TRAM_3, REP_TRAM_4, REP_TRAM_5, REP_TRAM_6, REP_TRAM_7};
    int repnb = 0;
    for(std::vector<byte> i: INIT_TRAMES){
        for(byte j: i){
            Serial2.write(j);
        }
        while (Serial2.available() == 0);
        while (Serial2.available() > 0){
            for(byte j: REP_TRAMES[repnb]){
                if(Serial2.read() != j){
                    Serial.println("NFC reader init failed");
                    return false;
                }
            }
        }
        repnb++;
    }
    return true;
}

void NfcTokenReader::refresh(){
    this->trame->clear();
    std::vector<byte> trame = READ_TRAM_0;
    if (this->pair){
        trame = READ_TRAM_1;
    }
    this->pair = !this->pair;

    for(byte i: trame){
        Serial2.write(i);
    }
    while (Serial2.available() == 0);
    while (Serial2.available() > 0){
        this->trame->push_back(Serial2.read());
    }
}


String NfcTokenReader::digitify(int number){
    String sortie = "";

    if(number <= 0xF){
        sortie += '0';
        sortie += String(number,HEX);
    }else{
        sortie += String(number,HEX);
    }

    return sortie;
}


void NfcReader::printTrame(){
    for(byte i: *this->trame){
        Serial.print(this->digitify(i));
        Serial.print(" ");
    }
    Serial.println();
}

int NfcReader::getNbTags(){
    return this->trame->at(8);
}
