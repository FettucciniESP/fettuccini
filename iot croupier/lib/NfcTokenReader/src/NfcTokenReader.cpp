#include "../include/NfcTokenReader.h"


NfcTokenReader::NfcTokenReader(HardwareSerial& serial) {
    this->serial = &serial;
    this->serial->begin(115200);
    this->pair = true;
    this->trame = new std::vector<byte>();
    this->iso_18000 = new std::vector<std::vector<byte>>();
    this->iso_14443 = new std::vector<std::vector<byte>>();
    this->iso_15693 = new std::vector<std::vector<byte>>();
    this->chips = new std::vector<String>();
}


bool NfcTokenReader::init(){
    const std::vector<std::vector<byte>> INIT_TRAMES = {INIT_TRAM_0, INIT_TRAM_1, INIT_TRAM_2, INIT_TRAM_3, INIT_TRAM_4, INIT_TRAM_5, INIT_TRAM_6, INIT_TRAM_7};
    const std::vector<std::vector<byte>> REP_TRAMES = {REP_TRAM_0, REP_TRAM_1, REP_TRAM_2, REP_TRAM_3, REP_TRAM_4, REP_TRAM_5, REP_TRAM_6, REP_TRAM_7};
    int repnb = 0;
    for(std::vector<byte> i: INIT_TRAMES){
        for(byte j: i){
            this->serial->write(j);
        }
        while (this->serial->available() == 0);
        while (this->serial->available() > 0){
            for(byte j: REP_TRAMES[repnb]){
                if(this->serial->read() != j){
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
    this->iso_14443->clear();
    this->iso_18000->clear();
    this->iso_15693->clear();
    this->trame->clear();
    this->chips->clear();
    std::vector<byte> trame = READ_TRAM_0;
    if (this->pair){
        trame = READ_TRAM_1;
    }
    this->pair = !this->pair;

    for(byte i: trame){
        this->serial->write(i);
    }
    while (this->serial->available() == 0);
    while (this->serial->available() > 0){
        this->trame->push_back(this->serial->read());
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


void NfcTokenReader::printTrame(){
    for(byte i: *this->trame){
        Serial.print(this->digitify(i));
        Serial.print(" ");
    }
    Serial.println();
}

int NfcTokenReader::getNbTags(){

    int number = this->trame->at(8);

    this->chipsPresent = number != 0;
    return this->trame->at(8);

}

void NfcTokenReader::shortToken(){
    if(this->getNbTags() == 0){
        return;
    }
    auto tokentypeIt = this->trame->begin();
    tokentypeIt += 11;

    for(int i = 0; i < this->getNbTags(); i++){
        std::vector<byte>* type = new std::vector<byte>();
        for (int j  = 0; j < ISO_18000.size(); j ++){
            type->push_back(*tokentypeIt);
            tokentypeIt++;
        }
        if(*type == ISO_18000){
            this->iso_18000->push_back(std::vector<byte>(tokentypeIt, tokentypeIt+12));
            tokentypeIt += 12;
        }else if(*type == ISO_14443){
            this->iso_14443->push_back(std::vector<byte>(tokentypeIt, tokentypeIt+7));
            tokentypeIt += 7;
        }else if(*type == ISO_15693){
            this->iso_15693->push_back(std::vector<byte>(tokentypeIt, tokentypeIt+8));
            tokentypeIt += 9;
        }else{
            Serial.println("Error token type");
        }
    }
}

std::vector<std::vector<byte>>* NfcTokenReader::GetIso18000Tokens(){
    return this->iso_18000;
}

std::vector<std::vector<byte>>* NfcTokenReader::GetIso15693Tokens(){
    return this->iso_15693;
}

std::vector<std::vector<byte>>* NfcTokenReader::GetIso14443Tokens(){
    return this->iso_14443;
}

String NfcTokenReader::stringifyId(std::vector<byte>* id){
    String sortie = "";
    for(auto it : *id){
        sortie += this->digitify(it);
        sortie += ":";
    }
    sortie = sortie.substring(0,sortie.length()-1);
    return sortie;
}


void NfcTokenReader::pushBackChips(String chip) {
    for(int i = 0; i < this->chips->size(); i++) {
        if (this->chips->at(i) == chip)
            return;
    }
    this->chips->push_back(chip);
}
