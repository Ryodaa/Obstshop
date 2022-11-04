// 202211021049 Sven Elberfeld
//Mein kleiner Mini ObstShop

//Datenstruktur des ObstShop


let prompt = require('prompt-sync')();
let storeOpen = true;
let currentDate = new Date();
let running = true;
let warenkorb = [];
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
];

function mainMenu() {
    console.clear();
    console.log('\nMenu Bar: - "q": Beenden')
    console.log('\n-- Main Menu --\n');
    console.log('Wilkommen bei iObst\n');
    console.log('Sind sie Kunde oder Verkäufer?');
    console.log('Kunde: 1 - Verkäufer: 2\n');
    let inputKuVe = prompt('Eingabe: ');
    while (true) {
        if (inputKuVe == 1) {
            kundeMenu();
            break;
        } else if (inputKuVe == 2) {
            adminMenu();
            break;
        } else if (inputKuVe.toLowerCase() == 'q') {
            quitProgram();
            break;
        } else {
            console.error('Bitte 1, 2 oder "q" eingeben ')
            inputKuVe = prompt('Eingabe: ');
            continue;
        };
    };
};

function adminMenu() {
    console.clear();
    console.log('\nMenu Bar: - "r": Zurück - ' + '"q": Beenden - ');
    console.log('\n-- Admin Menu --\n');
    console.log('Was wollen sie tun?:');
    console.log(` - Bestand anzeigen: 1\n - Umsatz ermitteln: 2\n - Laden öffnen:     3\n - Laden schließen:  4\n`);
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
        case 'r':
            mainMenu();
        case 'q':
            quitProgram();
            break;
        default:
            break;
    };
};

function openTimes() {
    console.log('\nÖffnungszeiten:\n - Mo-Mi: 09:00-18:00 Uhr\n - Do:    12:00-18:00 Uhr\n - Fr-Sa: 09:00-18:00 Uhr\n - So:    Geschlossen\n');
};

function kundeMenu() {
    console.clear();
    if (storeOpen === false) {
        console.clear();
        console.log('iObst hat leider geschlossen. \nBitte versuchen sie es erneut zu unseren Öffnungszeiten');
        openTimes();
        prompt('Zurück: "Enter" ');
        mainMenu();
    } else {
        console.clear();
        console.log('\nMenu Bar: - "r": Zurück - ' + '"q": Beenden - ' + '"w": Warenkorb Anzeigen');
        console.log('\n-- Kunden Menu --\n');
        console.log('Was wollen sie tun?:');
        console.log(` - Obst kaufen:        1\n - Öffnungszeiten:     2\n - Rechnungen ansehen: 3\n`);
        let inputKndMenu = prompt('Eingabe: ');

        switch (inputKndMenu) {
            case '1':
                kaufObstMenu();
                break;
            case 'w':
                warenkorbZeigen();
                break;
            case '2':
                console.clear();
                openTimes();
                prompt('Zurück: "Enter" ');
                kundeMenu();
                break;
            case 'r':
                mainMenu();
                break;
            case 'q':
                quitProgram();
                break;
            default:
                break;
        };
    };
};

function mergeWarenkorb(duplObstObj) {
    for (k in warenkorb) {
        if (duplObstObj.name == warenkorb[k].name) {
            warenkorb[k].preis = Number(warenkorb[k].preis) + Number(duplObstObj.preis);
            warenkorb[k].menge = Number(warenkorb[k].menge) + Number(duplObstObj.menge);
        };
    };
};

function duplicateCheck(obstVar) {
    if (warenkorb.length == 0) {
        return false;
    } else {
        for (k in warenkorb) {
            if (warenkorb[k].name == obstVar) {
                return true;
            };
        };
        return false;
    };
};

function mergeOrPush(obstVar, mengeVar) {
    if (duplicateCheck(obstVar) === true) {
        mergeWarenkorb(createObstObj(obstVar, mengeVar), obstVar, mengeVar);
    } else {
        warenkorb.push(createObstObj(obstVar, mengeVar));
    };
};

function chkBestandLimit(obstVar, mengeVar) {
    if (warenkorb.length > 0) {
        for (k in bestand) {
            for (i in warenkorb) {
                if (bestand[k].name == warenkorb[i].name && obstVar == warenkorb[i].name) {
                    if (Number(bestand[k].anzahlKisten) * Number(bestand[k].anzahlProKiste) < Number(warenkorb[i].menge) + Number(mengeVar)) {
                        return true;
                    };
                };
            };
        };
    } else {
        for (k in bestand) {
            if (obstVar == bestand[k].name) {
                if (Number(bestand[k].anzahlKisten) * Number(bestand[k].anzahlProKiste) < mengeVar) {
                    return true;
                };
            };
        };
    };
};

function tooManyItems(caseNum) {
    console.log(`Einkauf übersteigt unsere kapazitäten\nMaximal ${bestand[caseNum - 1].anzahlKisten * bestand[caseNum - 1].anzahlProKiste} Stück`);
    prompt('Zurück: "Enter" ');
    kaufObstMenu();
};

function quitProgram() {
    console.log('Bye Bye');
    process.exit();
};

function rechnung(gesamtPreis) {
    console.clear();
    console.log('-- Rechnung --');
    for (k in warenkorb) {
        console.log('\nName: ' + warenkorb[k].name);
        console.log('Stück: ' + warenkorb[k].menge);
        console.log('Preis: ' + Number(warenkorb[k].preis).toFixed(2) + '€\n');
    };
    console.log('-----\nGesamtpreis        : ' + gesamtPreis.toFixed(2) + '€\n');
    console.log('Danke für ihren Einkauf bei iObst');
    let rechnungPrompt = prompt('Eingabe: ');
    console.log('Nochmal Kaufen: 1 - Zurück: "r"' - 'Beenden: "q"');
    while(true) {
        if (rechnungPrompt == 1) {
            buyAgain();
            break;
        } else if (rechnungPrompt == 'r') {
            kaufObstMenu();
            break;
        } else if (rechnungPrompt == 'q') {
            quitProgram();
            break;
        } else {
            console.log('Bitte 1, "r" oder "q" eingeben');
            rechnungPrompt = prompt('Eingabe: ');
            continue;
        };
    };
};

function kassenMenu(gesamtPreis) {
    console.clear();
    console.log('-- Kasse --\n');
    console.log('Aktueller Warenkorb: ' + warenkorbLen());
    console.log('Gesamtpreis        : ' + gesamtPreis.toFixed(2) + '€\n');
    console.log('\nKaufen: 1 - Abbrechen: "r" ');
    let kassenPrompt = prompt('Eingabe: ');
    if (kassenPrompt == 1) {
        rechnung(gesamtPreis);
    } else if (kassenPrompt == 'r') {
        warenkorbZeigen();
    };
};

function warenkorbLen() {
    let warenkorbLen;
    if (warenkorb.length == 0) {
        warenkorbLen = 'leer';
    } else {
        warenkorbLen = warenkorb.length + ' Artikel';
    };
    return warenkorbLen;
};

function kaufObstMenu() {
    console.clear();
    let bestandList = '';
    let obstVar;
    let mengeVar;
    let warenkorbLenObstMenu;

    console.log('\nMenu Bar: - "r": Zurück - ' + '"q": Beenden - ' + '"w": Warenkorb Anzeigen')
    console.log('\n-- Unser Sortiment --\n');
    for (k in bestand) {
        bestandList += +k + 1 + ': ' + bestand[k].name + ' - '
    };
    console.log(bestandList.slice(0, -3));

    warenkorbLenObstMenu = warenkorbLen();
    console.log(`\nAktueller Warenkorb: ${warenkorbLenObstMenu}\n`);

    console.log('Bitte wählen sie welches Obst sie kaufen wollen:');
    let obstKaufVar = prompt('Eingabe: ');

    switch (obstKaufVar) {
        case '1':
            // Mango
            obstVar = bestand[0].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            if (chkBestandLimit(obstVar, mengeVar) === true) {
                tooManyItems(Number(obstKaufVar));
            };
            mergeOrPush(obstVar, mengeVar);
            kaufObstMenu();
            break;
        case '2':
            // Banane
            obstVar = bestand[1].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            if (chkBestandLimit(obstVar, mengeVar) === true) {
                tooManyItems(Number(obstKaufVar));
            };
            mergeOrPush(obstVar, mengeVar);
            kaufObstMenu();
            break;
        case '3':
            // Birne
            obstVar = bestand[2].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            if (chkBestandLimit(obstVar, mengeVar) === true) {
                tooManyItems(obstKaufVar);
            };
            mergeOrPush(obstVar, mengeVar);
            kaufObstMenu();
            break;
        case '4':
            // Aprikose
            obstVar = bestand[3].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            if (chkBestandLimit(obstVar, mengeVar) === true) {
                tooManyItems(obstKaufVar);
            };
            mergeOrPush(obstVar, mengeVar);
            kaufObstMenu();
            break;
        case '5':
            // Apfel
            obstVar = bestand[4].name;
            mengeVar = prompt(obstVar + ' - Menge: ');
            if (chkBestandLimit(obstVar, mengeVar) === true) {
                tooManyItems(obstKaufVar);
            };
            mergeOrPush(obstVar, mengeVar);
            kaufObstMenu();
            break;
        case 'w':
            // Warenkorb
            warenkorbZeigen();
            kaufObstMenu();
            break;
        case 'q':
            // Quit
            quitProgram();
            break;
        case 'r':
            // Return
            kundeMenu();
            break;
        default:
            kundeMenu();
            break;
    };
};

function bestandObst() {
    console.clear();
    console.log('Lager bestand:\n');
    for (ele in bestand) {
        console.log(bestand[ele].name + ' - Anzahl Kisten: ' + bestand[ele].anzahlKisten + ' - Anzahl pro Kiste: ' + bestand[ele].anzahlProKiste + ' - Anzahl Früchte gesamt: ' + bestand[ele].anzahlProKiste * bestand[ele].anzahlKisten);
    };
    prompt('Zurück: "Enter" ');
    adminMenu();
};

function warenkorbZeigen() {
    console.clear();
    console.log('\n-- Warenkorb: --');
    let gesamtPreis = 0;
    let preisVar;
    if (warenkorb.length > 0) {
        for (k in warenkorb) {
            console.log('\nName: ' + warenkorb[k].name);
            console.log('Stück: ' + warenkorb[k].menge);
            console.log('Preis: ' + Number(warenkorb[k].preis).toFixed(2) + '€\n');
        };
        if (warenkorb.length > 0) {
            for (k in warenkorb) {
                gesamtPreis += warenkorb[k].preis
            }
        }
        console.log('-----');
        console.log(`Gesamt: ${gesamtPreis.toFixed(2)}€\n`)
        console.log('Zur Kasse: 1 - Zurück: "r"')
        let warenkorbPrompt = prompt('Eingabe: ');
        while (true) {
            if (warenkorbPrompt == 1) {
                kassenMenu(gesamtPreis);
                break;
            } else if (warenkorbPrompt == "r") {
                kaufObstMenu();
                break;
            } else {
                console.error('Bitte 1 oder "r" eingeben.\n')
                warenkorbPrompt = prompt('Eingabe: ')
                continue;
            }
        }
        kundeMenu();
    } else {
        console.clear();
        console.log('Warenkorb ist leer\n');
        console.log('-----');
        console.log(`Gesamt: ${gesamtPreis}€\n`)
        prompt('Zurück: Enter ');
        kundeMenu();
    };
};

function createObstObj(inputObst, inputMenge) {
    let warenkorbObj;
    for (k in bestand) {
        if (inputObst == bestand[k].name) {
            warenkorbObj = {
                name: bestand[k].name,
                preis: (bestand[k].preis * inputMenge),
                menge: inputMenge
            };
        };
    };
    return warenkorbObj;
};

function closeStore() {
    console.clear();
    console.log('Store closed!');
    storeOpen = false;
    adminMenu();
};

function openStore() {
    console.clear();
    console.log('Store open!');
    storeOpen = true;
    adminMenu();
};

while (running === true) {
    mainMenu();
};

//bestandObst();
// console.log(kaufObst(inputObst, inputMenge));
// openOrCloseStore();