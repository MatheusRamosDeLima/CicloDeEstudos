const inputContent:HTMLInputElement = window.document.getElementById("inputContent") as HTMLInputElement;
const inputHours:HTMLInputElement = window.document.getElementById("inputHours") as HTMLInputElement;

const optionDifficulty:HTMLOptionsCollection = window.document.getElementsByClassName("optionDifficulty") as HTMLOptionsCollection;
const selectContents:HTMLSelectElement = window.document.getElementById("selectContents") as HTMLSelectElement;

const divResult:HTMLDivElement = window.document.getElementsByClassName("result")[0] as HTMLDivElement;

let contents:string[] = [];
let difficultiesNumber:number[] = [];
let difficultiesString:string[] = [];
let difficultiesColor:string[] = [];

function addContent():void {
    if (verifyInputContent() && verifySelectDifficulty()) {
        if (verifyLastContent(inputContent.value)) {
            divResult.innerHTML = "<h2>Resultado:</h2> <br>";
            const content:string = inputContent.value;
            const difficultyNumber:number = verifyOptionDifficult()[0];
            const difficultyString:string = verifyOptionDifficult()[1];
            const difficultyColor:string = verifyDifficultyColor(difficultyNumber);

            contents.push(content);
            difficultiesNumber.push(difficultyNumber);
            difficultiesString.push(difficultyString);
            difficultiesColor.push(difficultyColor);

            const option = window.document.createElement("option");
            option.style.color = difficultyColor;
            option.text = `${content}, ${difficultyString}`;
            selectContents.appendChild(option);
        }
        else {
            window.alert("Conteúdo já adicionada à lista. Adicione outro!");
        }
    }
    else {
        window.alert("Complete os campos corretamente.");
    }
    inputContent.value = "";
}

function removeLastContent():void {
    if (verifyListContents()) {
        divResult.innerHTML = "<h2>Resultado:</h2> <br>";
        selectContents.remove(contents.length - 1);
        contents.pop();
        difficultiesNumber.pop();
        difficultiesString.pop();
        difficultiesColor.pop();
    }
    else {
        window.alert("Não há nenhum conteúdo na sua lista!");
    }
}

function clearContents():void {
    divResult.innerHTML = "<h2>Resultado:</h2> <br>";
    selectContents.innerHTML = "";
    contents = [];
    difficultiesNumber = [];
    difficultiesString = [];
    difficultiesColor = [];
}

function fSubmit():void {
    if (verifyListContents()) {
        if (verifyInputHours()) {
            divResult.innerHTML = "<h2>Resultado:</h2> <br>";

            const hours:number = Number(inputHours.value);
            const days:number = 7;
            const difficultyTotal:number = sumDifficulties();
            const hoursPerContent:number = hours * days / difficultyTotal;

            for (let i = 0; i <= contents.length - 1; i++) {
                if (((hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")) === "1") {
                    divResult.innerHTML += `<li><span style="color:${difficultiesColor[i]}">${contents[i]}</span> - ${(hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")} hora por ciclo</li>`;
                }
                else if (((hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")) === "") {
                    divResult.innerHTML += `<li><span style="color:${difficultiesColor[i]}">${contents[i]}</span> - nenhuma hora por ciclo</li>`;
                }
                else {
                    divResult.innerHTML += `<li><span style="color:${difficultiesColor[i]}">${contents[i]}</span> - ${(hoursPerContent * difficultiesNumber[i]).toFixed().replace(/\.?0+$/, "")} horas por ciclo</li>`;
                }
            }
        }
        else {
            window.alert("Complete os campos corretamente.");
        }
    }
    else {
        window.alert("Não há nenhum conteúdo na sua lista!");
    }
}

function clearResult():void {
    divResult.innerHTML = "<h2>Resultado:</h2> <br>";
}

function verifyInputContent():boolean {
    return !!(inputContent.value.length);
}

function verifySelectDifficulty():boolean {
    return !!(optionDifficulty[0].selected || optionDifficulty[1].selected || optionDifficulty[2].selected || optionDifficulty[3].selected || optionDifficulty[4].selected);
}

function verifyLastContent(content:string):boolean {
    return contents.indexOf(content) === -1;
}

function verifyOptionDifficult():[number, string] {
    if (optionDifficulty[0].selected) {
        return [1, "Ótimo"];
    }
    else if (optionDifficulty[1].selected) {
        return [2, "Bom"];
    }
    else if (optionDifficulty[2].selected) {
        return [3, "Razoável"];
    }
    else if (optionDifficulty[3].selected) {
        return [4, "Ruim"];
    }
    else if (optionDifficulty[4].selected) {
        return [5, "Péssimo"];
    }
    else {
        return [0, "ERRO"];
    }
}

function verifyDifficultyColor(difficultyNumber:number):string {
    switch (difficultyNumber) {
        case 1:
            return "rgb(107, 107, 255)";
        case 2:
            return "rgb(64, 255, 64)";
        case 3:
            return "rgb(218, 218, 18)";
        case 4:
            return "rgb(246, 154, 7)";
        case 5:
            return "rgb(223, 44, 44)";
        default:
            return "black";
    }
}

function verifyListContents():boolean {
    return contents.length !== 0;
}

function verifyInputHours():boolean {
    return !!(inputHours.value.length && Number(inputHours.value) >= 1 && Number(inputHours.value) <= 12);
}

function sumDifficulties():number {
    let sum = 0;
    for (let i = 0; i < difficultiesNumber.length; i++) {
        sum += difficultiesNumber[i];
    }
    return sum;
}