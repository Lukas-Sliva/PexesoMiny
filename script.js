let pole = [];
let radky = 6;
let sloupce = 6;
let hodnota = "?";
let zobrazeno = 0;
let viditelne = [];


class karta{
    constructor(typ,pozice){
        this.typ = typ;
        this.pozice = pozice;
    }

}

const karta1 = new karta("", [99, 99]);
const karta2 = new karta("", [99, 99]);

let zvivrata = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"];
let mnozstvi_zvirat = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];




for (let i = 0; i < radky; i++) {
    pole[i] = [];
    for (let j = 0; j < sloupce; j++) {
        pole[i][j] = hodnota;
    }
}
viditelne = pole;
let role = [];
for (let i = 0; i < radky; i++) {
    role[i] = [];
    for (let j = 0; j < sloupce; j++) {
        let uspesne_urceni = false;
        while (!uspesne_urceni) {
        let ucreni_zvirete = Math.floor(Math.random() * 12);
        if (mnozstvi_zvirat[ucreni_zvirete] > 0) {
            role[i][j] = zvivrata[ucreni_zvirete];
            mnozstvi_zvirat[ucreni_zvirete]--;
            uspesne_urceni = true;
            }
        
        }
    }
}




console.log(pole);
console.log(role);
console.log(viditelne);

const table = document.getElementById("hraci_pole");

// function otoceni(i, j) {
            
//         button.textContent = role[i][j];
//         cell.appendChild(button);
//         table.appendChild(row);
//         //alert(`Otočeno:`);       
// }

for (let i = 0; i < radky; i++) {
    const row = document.createElement("tr");  
    for (let j = 0; j < sloupce; j++) {
        const cell = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = pole[i][j];

        button.setAttribute("onclick", `otoceni(${i}, ${j})`);
        otoceni_zpet();
        cell.appendChild(button);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function otoceni(i, j) {
    //
    table.rows[i].cells[j].firstChild.textContent = role[i][j];
    viditelne[i][j] = role[i][j];
    //AI Used, Model: OpenAI GPT-5.6-sol
    kontrola_karet(i, j);
    otoceni_zpet(i,j);
}

function  kontrola_karet(i, j) {
    if (karta1.typ === "") {
        karta1.typ = role[i][j];
        karta1.pozice = [i, j];
        alert(karta1.typ + karta1.pozice);
        alert("1");
    }
    else if (karta2.typ === "") {
        karta2.typ = role[i][j];
        karta2.pozice = [i, j];
        alert(karta2.typ + karta2.pozice);
        alert("2")
    }

    if(karta1.typ === karta2.typ){
            role[karta1.pozice[i]][karta1.pozice[j]] = "99";
            role[karta2.pozice[i]][karta2.pozice[j]] = "99";



            karta1.typ = "";
            karta2.typ = "";
            karta1.pozice = [99, 99];
            karta2.pozice = [99, 99];

    }else if (karta1 !== "" && karta2.typ !== ""){
        karta1.typ = "";
        karta2.typ = "";
    }


}
function otoceni_zpet(i,j) {
    
    if (zobrazeno >= 2) {
        for (let i = 0; i < radky; i++) {
            for (let j = 0; j < sloupce; j++) {
                if (viditelne[i][j] !== "?" && viditelne[i][j] !== "99") {
                    table.rows[i].cells[j].firstChild.textContent = "?";
                    viditelne[i][j] = "?";
                }
            }
    }
    zobrazeno = 0;
    }
    else {
        zobrazeno++;
    }
}


// části kódu byly pomocí VS code doplňovače