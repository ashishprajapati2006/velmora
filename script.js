const products = [
 {id:1,name:"Belgian Dark",full:"Belgian Dark Chocolate",category:"dark",price:349,tag:"Bestseller",desc:"Deep cocoa notes with a beautifully smooth finish.",img:"https://images.unsplash.com/photo-1548907040-4d42f7c9f5a7?auto=format&fit=crop&w=900&q=85"},
 {id:2,name:"Sea Salt Caramel",full:"Sea Salt Caramel",category:"caramel",price:399,tag:"Customer favourite",desc:"Silky chocolate with a delicate salted caramel note.",img:"https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=85"},
 {id:3,name:"Hazelnut Crunch",full:"Hazelnut Crunch",category:"nutty",price:399,tag:"Crunchy",desc:"Roasted hazelnut pieces in rich, creamy chocolate.",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"},
 {id:4,name:"Strawberry Fusion",full:"Strawberry Fusion",category:"fruity",price:379,tag:"New",desc:"A bright berry twist meets a decadent chocolate bite.",img:"https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85"},
 {id:5,name:"Pistachio Delight",full:"Pistachio Delight",category:"nutty",price:449,tag:"Signature",desc:"A delicate blend with a generous pistachio finish.",img:"https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=85"},
 {id:6,name:"Orange Zest",full:"Orange Zest Chocolate",category:"fruity",price:369,tag:"Citrus notes",desc:"Bright orange aroma layered over dark chocolate.",img:"https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=85"},
 {id:7,name:"Coffee Mocha",full:"Coffee Mocha",category:"dark",price:389,tag:"For coffee lovers",desc:"A mellow coffee note with a bold cocoa finish.",img:"https://images.unsplash.com/photo-1548907040-4d42f7c9f5a7?auto=format&fit=crop&w=900&q=85"},
 {id:8,name:"Almond Bliss",full:"Roasted Almond Chocolate",category:"nutty",price:379,tag:"Classic",desc:"Toasted almond crunch in every satisfying square.",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"}
];
let cart = JSON.parse(localStorage.getItem("velmora-cart") || "[]");
let activeFilter = "all";
const grid = document.getElementById("productGrid");
const money = n => "₹" + n.toLocaleString("en-IN");
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function renderProducts(){
 let list=products.filter(p=>(activeFilter==="all"||p.category===activeFilter)&&(`${p.full} ${p.desc}`.toLowerCase().includes(document.getElementById("productSearch").value.toLowerCase())));
 const sort=document.getElementById("sortSelect").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.img}" alt="${p.full}" loading="lazy" onerror="this.src='assets/velmora-hero.png'"><span class="tag">${p.tag}</span></div><div class="product-info"><h3>${p.full}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="Add ${p.full} to cart">＋</button></div></div></article>`).join("")||'<p class="muted">No chocolates found. Try another search.</p>';
}
function saveCart(){localStorage.setItem("velmora-cart",JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();toast("Added to your cart")}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart()}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("cartSubtotal").textContent=money(total);
 document.getElementById("checkoutBtn").disabled=count===0;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><img src="${p.img}" alt=""><div><h4>${p.full}</h4><small>${money(p.price)} each</small><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><div><b>${money(p.price*x.qty)}</b><br><button class="remove-btn" data-remove="${p.id}">Remove</button></div></div>`}).join(""):'<div class="empty-cart">Your cart is waiting for something delicious.</div>';
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
document.getElementById("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q)changeQty(Number(q.dataset.qty),Number(q.dataset.delta));if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));saveCart()}});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderProducts()}));
document.getElementById("productSearch").addEventListener("input",renderProducts);document.getElementById("sortSelect").addEventListener("change",renderProducts);
document.getElementById("cartOpen").addEventListener("click",openCart);document.getElementById("cartClose").addEventListener("click",closeCart);document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",()=>{closeCart();document.getElementById("checkoutDialog").showModal()});
document.getElementById("checkoutClose").addEventListener("click",()=>document.getElementById("checkoutDialog").close());
document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("checkoutDialog").close();cart=[];saveCart();toast("Demo order placed! Connect a backend to accept real orders.");e.target.reset()});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();toast("Thanks for joining the VELMORA list!");e.target.reset()});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("show"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("show")));
document.getElementById("searchBtn").addEventListener("click",()=>{document.getElementById("shop").scrollIntoView();document.getElementById("productSearch").focus()});
renderProducts();renderCart();