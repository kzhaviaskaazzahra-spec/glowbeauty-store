let keranjang = JSON.parse(localStorage.getItem("cart")) || [];

/* REGISTER */
function register(){
let user=document.getElementById("regUser").value;
let pass=document.getElementById("regPass").value;
if(user===""||pass==="") return alert("Lengkapi data!");

let users=JSON.parse(localStorage.getItem("users"))||[];
if(users.find(u=>u.user===user)) return alert("Username sudah ada!");

users.push({user,pass});
localStorage.setItem("users",JSON.stringify(users));
alert("Daftar berhasil!");
window.location="login.html";
}

/* LOGIN */
function login(){
let user=document.getElementById("loginUser").value;
let pass=document.getElementById("loginPass").value;
let users=JSON.parse(localStorage.getItem("users"))||[];
let found=users.find(u=>u.user===user && u.pass===pass);
if(!found) return alert("Username atau password salah!");
localStorage.setItem("loginUser",user);
window.location="index.html";
}

/* AUTH */
function cekLogin(){
let user=localStorage.getItem("loginUser");
if(!user && !location.pathname.includes("login") && !location.pathname.includes("register")){
window.location="login.html";
}
let el=document.getElementById("userName");
if(el) el.innerText=user;
}

/* LOGOUT */
function logout(){
if(confirm("Yakin ingin logout?")){
localStorage.removeItem("loginUser");
window.location="login.html";
}
}

/* KERANJANG */
function simpan(){
localStorage.setItem("cart",JSON.stringify(keranjang));
updateCount();
}

function updateCount(){
let total=0;
keranjang.forEach(p=>total+=p.qty);
let el=document.getElementById("cartCount");
if(el) el.innerText=total;
}

function tambahKeranjang(nama,harga){
let item=keranjang.find(p=>p.nama===nama);
item?item.qty++:keranjang.push({nama,harga,qty:1});
simpan();
}

function beliSekarang(nama,harga){
tambahKeranjang(nama,harga);
window.location="cart.html";
}

function keKeranjang(){window.location="cart.html"}

function renderKeranjang(){
let list=document.getElementById("daftarKeranjang");
if(!list) return;
list.innerHTML="";
let total=0;
keranjang.forEach(p=>{
total+=p.harga*p.qty;
list.innerHTML+=`<li>${p.nama} x${p.qty}
<button onclick="ubah('${p.nama}',-1)">−</button>
<button onclick="ubah('${p.nama}',1)">+</button></li>`;
});
totalSpan.innerText=total;
}

function ubah(nama,n){
let item=keranjang.find(p=>p.nama===nama);
item.qty+=n;
if(item.qty<1) keranjang=keranjang.filter(p=>p!==item);
simpan();renderKeranjang();
}

/* CHECKOUT & ORDER */
function checkout(){
localStorage.setItem("order",JSON.stringify(keranjang));
keranjang=[];simpan();
window.location="order.html";
}

function loadOrder(){
let order=JSON.parse(localStorage.getItem("order"))||[];
let list=document.getElementById("orderList");
if(!list) return;
list.innerHTML="";
order.forEach(p=>list.innerHTML+=`<li>${p.nama} x${p.qty}</li>`);
setTimeout(()=>document.getElementById("kirim")?.classList.add("active"),3000);
setTimeout(()=>document.getElementById("selesai")?.classList.add("active"),6000);
}

/* INIT */
cekLogin();
updateCount();
renderKeranjang();
loadOrder();
