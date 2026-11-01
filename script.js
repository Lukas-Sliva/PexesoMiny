let pole = [];
let radky = 6;
let sloupce = 6;
let hodnota = "❓";
let zobrazeno = 0;
let viditelne = [];
let role = [];
let naTahu = 1;
let skore1 = 0;
let skore2 = 0;
let kombinace = false;
let exploze = false;
var zvukVybuchu = new Audio('exploze.mp3');
let jmenoHrace1 = prompt("Zadejte jméno hráče 1:");
let jmenoHrace2 = prompt("Zadejte jméno hráče 2:");
class karta{
    constructor(typ,pozice){
        this.typ = typ;;
        this.pozice = pozice;
    }

}

const karta1 = new karta("", [99, 99]);
const karta2 = new karta("", [99, 99]);

let zvivrata = ["🐶", "🐱", "🐭", "🦑", "🐘", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"];
let mnozstvi_zvirat = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];




for (let i = 0; i < radky; i++) {
    pole[i] = [];
    for (let j = 0; j < sloupce; j++) {
        pole[i][j] = hodnota;
    }
}
viditelne = pole;

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
        cell.appendChild(button);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

const hrac1 = document.getElementById("hrac1");
const hrac2 = document.getElementById("hrac2");

hrac1.textContent = `${jmenoHrace1}: ${skore1} ${naTahu === 1 ? "(Na tahu)" : ""}`;
hrac2.textContent = `${jmenoHrace2}: ${skore2} ${naTahu === 2 ? "(Na tahu)" : ""}`;


function otoceni(i, j) { 
    if (zobrazeno < 2) {
    if (role[i][j] === "99") {
        return;
    }
    if ( table.rows[i].cells[j].firstChild.textContent === "❓") {
        //--------
        table.rows[i].cells[j].firstChild.textContent = role[i][j];
        viditelne[i][j] = role[i][j];
    }
    //-------------AI Used, Model: GPT-6, jazykový model od OpenAI. pro úpravu funkce
    kontrola_karet(i, j);
    if (exploze) {
        zvukVybuchu.play();
        
        setTimeout(() => {
            if (naTahu === 1) {
                alert(`${jmenoHrace1} prohrál!`);
            } else {
                alert(`${jmenoHrace2} prohrál!`);
            }
            location.reload();
        }, 3000);
        
        
    }
    kontrolaVyhry()
    //zvukVybuchu.play();
    detekce_otocenych();
    otoceni_zpet();
    
    hrac1.textContent = `${jmenoHrace1}: ${skore1} ${naTahu === 1 ? "(Na tahu)" : ""}`;
    hrac2.textContent = `${jmenoHrace2}: ${skore2} ${naTahu === 2 ? "(Na tahu)" : ""}`;
}
}

function  kontrola_karet(i, j) {
    if (karta1.typ === "") {
        karta1.typ = role[i][j];
        karta1.pozice = [i, j];
        table.rows[karta1.pozice[0]].cells[karta1.pozice[1]].firstChild.disabled = true;
        zobrazeno++;
    }
    else if (karta2.typ === "") {
        karta2.typ = role[i][j];
        karta2.pozice = [i, j];
        table.rows[karta2.pozice[0]].cells[karta2.pozice[1]].firstChild.disabled = true;
        zobrazeno++;
    }

    if(karta1.typ !== "" && karta2.typ !== "" && karta1.typ === karta2.typ){

        for (let i = 0; i < radky; i++) {
                for (let j = 0; j < sloupce; j++) {
                    if (role[i][j] === karta1.typ && role[i][j] !== karta1.pozice && role[i][j] !== karta2.pozice) {
                        role[i][j] = "💣";
                        
                    }
                }
            }

            if (naTahu === 1) {
                skore1++;
                hrac1.textContent = `${jmenoHrace1}: ${skore1} ${naTahu === 1 ? "(Na tahu)" : ""}`;
                kombinace = true;
            } else {
                skore2++;
                hrac2.textContent = `${jmenoHrace2}: ${skore2} ${naTahu === 2 ? "(Na tahu)" : ""}`;
                kombinace = true;
            }
            //---------
            role[karta1.pozice[0]][karta1.pozice[1]] = "99";
            role[karta2.pozice[0]][karta2.pozice[1]] = "99";
                //--------AI Used, Model: GPT-6, jazykový model od OpenAI.
                
                //-------------------------
            table.rows[karta1.pozice[0]].cells[karta1.pozice[1]].firstChild.disabled = true;
            table.rows[karta2.pozice[0]].cells[karta2.pozice[1]].firstChild.disabled = true;
            //-----------------AI Used Gemini 3.5 Flash-Lite od společnosti Google.

    }else{
        kombinace = false;
        if ((karta1.typ === "💣" || karta2.typ === "💣") && karta1.typ !== "" && karta2.typ !== "" && zobrazeno >=2) {
            exploze = true;
        }
    }


}


function otoceni_zpet() {
    if (zobrazeno >= 2) {
        setTimeout(function() {//GPT-6, jazykový model od OpenAI., pro čekací dobu před otočením karet zpět

            for (let i = 0; i < radky; i++) {
                for (let j = 0; j < sloupce; j++) {
                    let kontrolaViditelnych = false;
                    if(viditelne[i][j] < 9 && viditelne[i][j] >= 0){
                        kontrolaViditelnych = true;
                    }
                    if (viditelne[i][j] !== "❓" && viditelne[i][j] !== "99" && !kontrolaViditelnych) {
                        table.rows[i].cells[j].firstChild.textContent = "❓";
                        viditelne[i][j] = "❓";
                    }
                }
            }

            
            if (karta1.pozice[0] !== 99 && karta1.pozice[1] !== 99) {
                table.rows[karta1.pozice[0]].cells[karta1.pozice[1]].firstChild.disabled = false;
                table.rows[karta2.pozice[0]].cells[karta2.pozice[1]].firstChild.disabled = false;
            }

            
            zobrazeno = 0;
            karta1.typ = "";
            karta2.typ = "";
            karta1.pozice = [99, 99];
            karta2.pozice = [99, 99];

        }, 1000);//GPT-6, jazykový model od OpenAI. pro čekací dobu před otočením karet zpět
        if (!kombinace && !exploze) {
            naTahu = naTahu === 1 ? 2 : 1;
        }
    }
}

function detekce_otocenych(){
   for (let i = 0; i < radky; i++){
        for (let j = 0; j < sloupce; j++){
            if (role[i][j] === "99"){
                let bombs = 0;
                for (let k = i-1; k < i+2; k++){
                    for (let l = j-1; l < j+2; l++){
                        if (k >= 0 && k < radky && l >= 0 && l < sloupce) {
                        if (role[k][l] === "💣") {
                            bombs++;
                        }
                    }
                    }
                }
                viditelne[i][j] = bombs;
                table.rows[i].cells[j].firstChild.textContent = viditelne[i][j];
            }
        }
   }
}

function kontrolaVyhry() {
    let prozkoumaneKarty = 0;
    for (let i = 0; i < radky; i++) {
        for (let j = 0; j < sloupce; j++) {
            if (role[i][j] === "99") {
                prozkoumaneKarty++;
            }
        }
    }
    if (prozkoumaneKarty === radky * sloupce) {
        if (skore1 > skore2) {
            alert(`${jmenoHrace1} vyhrál!`);
        } else if (skore2 > skore1) {
            alert(`${jmenoHrace2} vyhrál!`);
        }else {
            alert("Remíza!");
        }
        location.reload();
    }
}

// části kódu byly pomocí VS code doplňovače