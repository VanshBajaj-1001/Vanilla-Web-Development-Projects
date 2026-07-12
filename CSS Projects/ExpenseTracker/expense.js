const balance=document.getElementById("balance");
const income=document.getElementById("money-plus");
const expense=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const textInput=document.getElementById("text");
const amountInput=document.getElementById("amount");
const dateInput=document.getElementById("date");
const categoryInput=document.getElementById("category");
const paymentInput=document.getElementById("payment");
const searchInput = document.getElementById("search");

//database
let transactions=[];
form.addEventListener("submit",addTransaction);

function addTransaction(event){//event parameter bcz whnever the form is submittedbrowser automaticaaly creates event object
    event.preventDefault();
    const text=textInput.value;
    const amount=Number(amountInput.value)
    const date=dateInput.value;
    const category=categoryInput.value;
    const paymentMethod=paymentInput.value;

    if(text==="" ||amount===0 || date===""||category===""||paymentMethod===""){
        alert("Please complete all fields before adding a transaction.");
        return;
    }
    const transaction={
        id:Date.now(),
        text:text,
        amount:amount,
        date:date,
        category:category,
        paymentMethod:paymentMethod
    };
    transactions.push(transaction);
    renderTransactions();
    updateValues();
    saveTransactions();
    form.reset();
}
function addTransactionToDOM(transaction){
    const li=document.createElement("li");
    const borderClass =
    transaction.amount >= 0 ? "income-border"  : "expense-border";
    const amountClass=transaction.amount >=0?"income-amount":"expense-amount";
    li.classList.add("transaction",borderClass);
   li.innerHTML = `
    <div class="transaction-header">
        <h4>${transaction.text}</h4>
        <h3 class="${amountClass}">
            ₹${Math.abs(transaction.amount).toFixed(2)}
        </h3>
    </div>
    <div class="transaction-details">
        <span>📅 ${formatDate(transaction.date)}</span>
        <span class="category-badge">
            🏷 ${transaction.category}
        </span>
        <span class="payment-badge">
            💳 ${transaction.paymentMethod}
        </span>
    </div>
    <button
        class="delete-btn"
        data-id="${transaction.id}">
        🗑
    </button>
`;
    list.appendChild(li);
}
searchInput.addEventListener("input", renderTransactions);
function updateValues(){
    const amounts=transactions.map(function(transaction){
        return transaction.amount;
    });
    console.log(amounts);

    const total=amounts.reduce(function(accumulator,currentValue){
        return accumulator+currentValue;
    },0);
     balance.textContent=`₹${total.toFixed(2)}`;
     const incomeTotal=amounts.filter(function(amount){
        return amount>0;
     })
     .reduce(function(total,amount){
        return total +amount;
     },0);
income.textContent=`₹${incomeTotal.toFixed(2)}`;
     const expenseTotal=amounts.filter(function(amount){
        return amount <0;
     })
     .reduce(function(total,amount){
    return total+amount;
     },0);
     expense.textContent=`₹${Math.abs(expenseTotal).toFixed(2)}`
}

function saveTransactions(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}

function loadTransactions(){
    const storedTransactions=localStorage.getItem("transactions");
    if(storedTransactions){
        transactions=JSON.parse(storedTransactions);
    }
    renderTransactions();
    updateValues();

}

list.addEventListener("click",deleteTransaction); 

function deleteTransaction(event){
    if(!event.target.classList.contains("delete-btn")){
        return;
    }
    const id=Number(event.target.dataset.id);
    transactions=transactions.filter(function(transaction){
        return transaction.id!==id;
    });
    renderTransactions();
    updateValues();
    saveTransactions();
}


function renderTransactions(){
    list.innerHTML = "";
    if(transactions.length === 0){
        list.innerHTML = `
            <div id="empty-state">
                <h2>📝</h2>
                <p>No transactions yet.</p>
                <span>Add your first transaction to get started.</span>
            </div>
        `;
        return;
    }
    const searchText = searchInput.value.toLowerCase();

const filteredTransactions = transactions.filter(function(transaction){
    return transaction.text
        .toLowerCase()
        .includes(searchText);
});
filteredTransactions.forEach(function(transaction){
    addTransactionToDOM(transaction);
});
}

loadTransactions();

function formatDate(dateString){
    const date=new Date(dateString);
    return date.toLocaleDateString("en-IN",{
        day:"numeric",
        month:"short",
        year:"numeric"
    });
}