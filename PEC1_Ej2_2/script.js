const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');
const popup = document.getElementById("myPopup");
const second_popup = document.getElementById("mySecondPopup");


const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const curr_one = currency_one.value;
    const curr_two = currency_two.value;

    if(amount_one.value < 0){
        popup.classList.add("show");
    }else{
        popup.classList.remove("show");
        second_popup.classList.add("show");
        setTimeout(function() {
            fetch(`https://api.exchangerate-api.com/v4/latest/${curr_one}`)
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                  return response.json();
                } else {
                  throw Error(response.statusText);
                }
              })
            .then(data => {
                const rate = data.rates[curr_two];
                rate.innerText = `1 ${curr_one} = ${rate} ${curr_two}`;
                amount_two.value = (amount_one.value * rate).toFixed(2);
                second_popup.classList.remove("show");
            }).catch((error) => {
                alert(error);
              });
          }, 1000);
    }    
}

/*
function calculate() {
    const curr_one = currency_one.value;
    const curr_two = currency_two.value;

    if(curr_one < 0 || curr_two < 0){
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }else{
        fetch(`https://api.exchangerate-api.com/v4/latest/${curr_one}`)
        .then(res => {
            if (!res.ok) throw Error(response.status);
            res.json();
        })
        .then(data => {
            const rate = data.rates[curr_two];
            rate.innerText = `1 ${curr_one} = ${rate} ${curr_two}`;
            amount_two.value = (amount_one.value * rate).toFixed(2);
        })
        
    }

} */

// // Event listeners
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change',calculate);
amount_one.addEventListener('input',calculate);
amount_two.addEventListener('input',calculate);

// Swap
swap.addEventListener('click', () => {
    const tmp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = tmp;
    calculate();
});

calculate();