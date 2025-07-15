const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdown){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from"&& currcode==="USD"){
            newoption.selected="selected"
        }
        else if(select.name==="to"&& currcode==="INR"){
            newoption.selected="selected"
        }
        select.append(newoption);

    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
});