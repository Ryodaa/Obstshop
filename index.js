// 202211021049 Sven Elberfeld
//Mein kleiner Mini ObstShop

//Datenstruktur des ObstShop

let prompt = require('prompt-sync')();
let storeOpen = true;
let currentDate = new Date();
let warenkorb = [{
    name: 'Mango',
    anzahlKisten: 2,
    anzahlProKiste: 12,
    preis: 1.10,
    verkauf: 0,
    verluste: 0
},
{
    name: 'Banane',
    anzahlKisten: 3,
    anzahlProKiste: 30,
    preis: 0.70,
    verkauf: 0,
    verluste: 0
},
{
    name: 'Birne',
    anzahlKisten: 2,
    anzahlProKiste: 10,
    preis: 1.40,
    verkauf: 0,
    verluste: 0
},
{
    name: 'Apfel',
    anzahlKisten: 3,
    anzahlProKiste: 12,
    preis: 0.90,
    verkauf: 0,
    verluste: 0
}]
let bestand = [{
        name: 'Mango',
        anzahlKisten: 2,
        anzahlProKiste: 12,
        preis: 1.10,
        verkauf: 0,
        verluste: 0
    },
    {
        name: 'Banane',
        anzahlKisten: 3,
        anzahlProKiste: 30,
        preis: 0.70,
        verkauf: 0,
        verluste: 0
    },
    {
        name: 'Birne',
        anzahlKisten: 2,
        anzahlProKiste: 10,
        preis: 1.40,
        verkauf: 0,
        verluste: 0
    },
    {
        name: 'Aprikose',
        anzahlKisten: 4,
        anzahlProKiste: 25,
        preis: 0.30,
        verkauf: 0,
        verluste: 0
    },
    {
        name: 'Apfel',
        anzahlKisten: 3,
        anzahlProKiste: 12,
        preis: 0.90,
        verkauf: 0,
        verluste: 0
    }
]

function mainMenu() {
    console.log('\n-- Main Menu --\n')
    console.log('-- Wilkommen bei iObst --');
    console.log('Sind sie Kunde oder Verkäufer?');
    console.log('Kunde: 1 - Verkäufer: 2\n');
    console.log('Zum Beenden: "q".')
    let inputKuVe = prompt('Eingabe: ');
    while (true) {
        if (inputKuVe == 1) {
            kundeMenu();
            break;
        } else if (inputKuVe == 2) {
            adminMenu();
            break;
        } else if (inputKuVe.toLowerCase == 'q') {
            exitProgramm();
            break;
        } else {
            console.error('Bitte 1, 2 oder "q" eingeben ')
            inputKuVe = prompt('Eingabe: ');
            continue;
        }
    }
}

function adminMenu() {
    console.log('\n-- Admin Menu --\n');
    console.log('Was wollen sie tun? :');
    console.log(` - Bestand anzeigen: 1\n - Umsatz ermitteln: 2\n - Laden öffnen:     3\n - Laden schließen:  4\n - Zurück:           5\n`);
    let adminInp = prompt('Eingabe: ');

    switch (adminInp) {
        case '1':
            bestandObst();
            break;
        case '2':
            umsatzObst();
            break;
        case '3':
            openStore();
            break;
        case '4':
            closeStore();
            break;
        case '5':
            mainMenu();
        default:
            break;
    }
}

function openTimes() {
    console.log('\nÖffnungszeiten:\n - Mo-Mi: 09:00-18:00 Uhr\n - Do:    12:00-18:00 Uhr\n - Fr-Sa: 09:00-18:00 Uhr\n - So:    Geschlossen');
};

function kundeMenu() {
    console.log('\n-- Kunden Menu --\n');
    if (storeOpen === false) {
        console.log('iObst hat leider geschlossen. \nBitte versuchen sie es erneut zu unseren Öffnungszeiten\n')
        openTimes();
        mainMenu();
    } else {
        console.log('Was wollen sie tun? :');
        console.log(` - Obst kaufen:        1\n - Warenkorb ansehen:  2\n - Öffnungszeiten:     3\n - Zurück:             4\n`);
        let inputKndMenu = prompt('Eingabe: ');

        switch (inputKndMenu) {
            case '1':
                kaufObstMenu();
                break;
            case '2':
                warenkorbZeigen();
                break;
            case '3':
                openTimes();
                kundeMenu();
                break;
            case '4':
                mainMenu();
            default:
                break;

        }
    }
}

function mergeWarenkorb() {

}

// THIS SHIT DOESN'T WORK!!!

function duplicateCheck(obstVar) {
    let index, index0, index1, index2, index3, index4;
    if (warenkorb.length == 0) {
        return false;
    };
    for (let i = 0; i <= warenkorb.length; i++) {
        if (obstVar == !warenkorb[i].name) {
            index = false;
        } else {
            index = true;
        }
        switch (i) {
            case 0:
                index0 = index;
                return index0;
            case 1:
                index1 = index;
                return index1;
            case 2:
                index2 = index;
                return index2;
            case 3:
                index3 = index;
                return index3;
            case 4:
                index4 = index;
                return index4;
            default:
                break;
        }
    }
}

function kaufObstMenu() {
    let bestandList = '';
    let obstVar;
    let mengeVar;
    let warenkorbLen;

    console.log('\n-- Unser Sortiment --\n');
    for (k in bestand) {
        bestandList += +k + 1 + ': ' + bestand[k].name + ' - '
    }
    console.log(bestandList.slice(0, -3) + '\n');

    if (warenkorb.length == 0) {
        warenkorbLen = 'leer';
    } else {
        warenkorbLen = warenkorb.length + ' Artikel';
    }
    console.log(`Aktueller Warenkorb: ${warenkorbLen}`)

    console.log('Bitte Wählen sie welches Obst sie kaufen wollen. \nWarenkorb Anzeigen: "w" \nAbbrechen: Enter\n');
    let obstKaufVar = prompt('Eingabe: ');

    switch (obstKaufVar) {
        case '1':
            // Mango
            obstVar = bestand[0].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            console.log( duplicateCheck(obstVar) );
            if (duplicateCheck(obstVar) === true) {
                mergeWarenkorb();
                console.log('merge here')
            } else {
                warenkorb.push(obstInKorb(obstVar, mengeVar));
            };
            kaufObstMenu();
            break;
        case '2':
            // Banane
            obstVar = bestand[1].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            console.log( duplicateCheck(obstVar) ); // DELETE LATER
            warenkorb.push(obstInKorb(obstVar, mengeVar));
            kaufObstMenu();
            break;
        case '3':
            // Birne
            obstVar = bestand[2].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            console.log( duplicateCheck(obstVar) ); // DELETE LATER
            duplicateCheck(obstVar, mengeVar, obstKaufVar);
            kaufObstMenu();
            break;
        case '4':
            // Aprikose
            obstVar = bestand[3].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            console.log( duplicateCheck(obstVar) ); // DELETE LATER
            duplicateCheck(obstVar, mengeVar, obstKaufVar);
            kaufObstMenu();
            break;
        case '5':
            // Apfel
            obstVar = bestand[4].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            console.log( duplicateCheck(obstVar) ); // DELETE LATER
            duplicateCheck(obstVar, mengeVar, obstKaufVar);
            kaufObstMenu();
            break;
        case 'w':
            // Warenkorb
            warenkorbZeigen();
            kaufObstMenu();
        default:
            kundeMenu();
            break;
    }

}

function bestandObst() {
    console.log('Lager bestand:\n');
    for (ele in bestand) {
        console.log(bestand[ele].name + ' - Anzahl Kisten: ' + bestand[ele].anzahlKisten + ' - Anzahl pro Kiste: ' + bestand[ele].anzahlProKiste + ' - Anzahl Früchte gesammt: ' + bestand[ele].anzahlProKiste * bestand[ele].anzahlKisten);
    };
    console.log('\nZurück: ')
    let bestandObstVar = prompt('Enter drücken ');
    adminMenu();
}

function warenkorbZeigen() {
    console.log('\n-- Warenkorb: --');
    let preisVar;
    if (warenkorb.length > 0) {
        for (k in warenkorb) {
            console.log('\nName: ' + warenkorb[k].name);
            console.log('Stück: ' + warenkorb[k].menge);
            console.log('Preis: ' + Number(warenkorb[k].preis).toFixed(2) + '€\n');
        }
        let bckBtn = prompt('Zurück: Enter ')
        if (bckBtn == '') {
            kundeMenu();
        } else {
            kundeMenu();
        }
    } else {
        console.log('Warenkorb ist leer')
        let bckBtn = prompt('Zurück: Enter ')
        if (bckBtn == '') {
            kundeMenu();
        } else {
            kundeMenu();
        }
    }
}

function obstInKorb(inputObst, inputMenge) {
    let warenkorbObj;
    for (ele in bestand) {
        if (inputObst == bestand[ele].name) {
            warenkorbObj = {
                name: bestand[ele].name,
                preis: (bestand[ele].preis * inputMenge),
                menge: inputMenge
            };
        }
    };
    return warenkorbObj;
}

function closeStore() {
    console.log('Store closed!');
    storeOpen = false;
    adminMenu();
}

function openStore() {
    console.log('Store open!');
    storeOpen = true;
    adminMenu();
}

mainMenu();

//bestandObst();
// console.log(kaufObst(inputObst, inputMenge));
// openOrCloseStore();