function calc(){

const income = Number(document.getElementById("income").value);
const people = Number(document.getElementById("people").value);

const rate = 0.06;
const perPerson = 35000;

const result =
(income * rate) + (people * perPerson);

document.getElementById("result").innerText =
"年間国保目安 : " + result.toLocaleString() + " 円";

}