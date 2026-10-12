let pole = [];
let radky = 6;
let sloupce = 6;
let hodnota = 0

let zvivrata = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"]
let mnozstvi_zvirat = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

for (let i = 0; i < radky; i++) {
    pole[i] = [];
    for (let j = 0; j < sloupce; j++) {
        pole[i][j] = hodnota;
    }
}
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