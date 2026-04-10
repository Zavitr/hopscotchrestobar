window.appId = typeof __app_id !== 'undefined' ? __app_id : 'hopscotch-dev';
window.siteData = {
    heroImg: "assets/images/Hopscotch hero image.webp",
    aboutText: "Perched in the lush Nilgiri hills, Hopscotch Coonoor is the ultimate retro-style gastropub for locals and travelers alike. We combine breathtaking valley views with hearty comfort food, authentic wood-fired pizzas, and a meticulously crafted cocktail menu. Our space features uniquely themed seating areas, live music on weekends, and billiards for a complete entertainment experience. Book a table and enjoy top-tier hospitality in Coonoor's most vibrant hangout.",
    gallery: [
        "assets/images/IMG_2863.webp",
        "assets/images/IMG_2864.webp",
        "assets/images/IMG_2869.webp",
        "assets/images/IMG_2893.webp",
        "assets/images/IMG_2894.webp",
        "assets/images/IMG_2895.webp"
    ],
    pin: "1234"
};

window.switchView = (viewId) => {
    const overlay = document.getElementById('page-flip-transition');
    if(overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.remove('flip-in');
        overlay.classList.add('flip-out');
        
        setTimeout(() => {
            document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
            document.getElementById(`view-${viewId}`).classList.add('active');
            window.scrollTo(0, 0);
            
            overlay.classList.remove('flip-out');
            overlay.classList.add('flip-in');
            
            setTimeout(() => {
                overlay.classList.add('hidden');
                window.initScrollAnimations();
            }, 1200);
        }, 1200);
    } else {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        window.scrollTo(0, 0);
        setTimeout(window.initScrollAnimations, 100);
    }
};

window.closeMobileMenu = (targetView) => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.add('hidden');
    menu.classList.remove('flex', 'flex-col');
    if(targetView) switchView(targetView);
};

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('hidden');
    menu.classList.add('flex', 'flex-col');
});

const menuRaw = {
    "Starters & Nibbles": [
        { name: "Creamy Leek Soup", desc: "Spinach & garlic simmered in an aromatic broth" },
        { name: "Toasted Ramen Salad", desc: "A crunchy, texturally complex salad." },
        { name: "Cheese Masala Peanuts", desc: "Classic bar crunch." },
        { name: "Baked Nachos", desc: "Served with baked bean, cream & salsa" },
        { name: "Vietnamese Chilli Paneer", desc: "Fiery, tangy wok-tossed paneer." },
        { name: "Crispy Masala Arancini", desc: "Italian classic meets local spices." },
        { name: "Paneer Wellingtons", desc: "Mini pastry bites stuffed with rich paneer." },
        { name: "Bucket Fries", desc: "Classic potato strips, salted to perfection." },
        { name: "Korean Fried Chicken Wings", desc: "Sticky, spicy, and sweet." },
        { name: "Mini Wellingtons", desc: "Coin parathas with pepper spiced lamb mince." },
        { name: "Chicks In A Blanket", desc: "Bacon wrapped chicken sausages." }
    ],
    "Local Signatures": [
        { name: "Ghee Podi Chicken", desc: "Crispy fried chicken 65 tossed in spices & ghee." },
        { name: "Chicken Dynamite", desc: "Red chilli spiced South Indian style." },
        { name: "Kodi Vepudu", desc: "Andhra-style fiery spiced fried chicken." },
        { name: "Shallot Pepper Prawn", desc: "Coastal flavors with a heavy pepper hit." }
    ],
    "Burgers & Woodfired Pizza": [
        { name: "Cheese Burst Paneer Burger", desc: "A hefty, molten-core vegetarian stack." },
        { name: "Woodcutter's Special Pizza", desc: "Spinach, onions, mushroom & peppers." },
        { name: "Regional Xplode Pizza", desc: "Chicken blended with local spices, dry chilli, curry leaves." },
        { name: "Meaty Almighty Pizza", desc: "Roasted chicken, chicken sausages & bacon." }
    ],
    "Large Plates & Steaks": [
        { name: "Butter Chicken", desc: "Served with pulao & roti / naan." },
        { name: "Vietnamese Lemongrass Curry", desc: "A fragrant, herbaceous bowl served with rice." },
        { name: "Madras Goreng", desc: "Fragrant rice tossed in a spicy madras-style gravy with chicken and prawn, topped with a runny egg." },
        { name: "Grilled Lamb Chops", desc: "Choice of whiskey pepper cream, brown mushroom sauce, or chimichurri." },
        { name: "Grilled Chicken Steak", desc: "Served with potato mash, roasted carrots, and butter tossed veggies." }
    ],
    "Craft Cocktails": [
        { name: "Sichuan Julep", desc: "Whiskey with a symphony of grapefruit, lychee, passionfruit, and salted caramel, elevated by a molecular flavour bubble." },
        { name: "Nilgiri Nights", desc: "A smooth blend of banana sherry vermouth, brightened with lemongrass-infused gin and our house-made campari." },
        { name: "Hopscotch Zombie", desc: "Signature rum with banana falernum, citrus mix and homemade dry vermouth." },
        { name: "Ronin", desc: "Cardamom-infused gin with lime and salted caramel, crowned with a molecular raspberry foam." },
        { name: "Hopscotch Mystery Box", desc: "A treasure chest of flavours, unveiled through a cloud of smoke. What's inside? That's for you to discover." }
    ],
    "Classics & Pours": [
        { name: "Classic Margarita", desc: "Tequila, lime, triple sec. Clean and sharp." },
        { name: "Old Fashioned", desc: "Whiskey, bitters, sugar. The timeless standard." },
        { name: "Single Malts", desc: "Featuring Glenmorangie 10 Y.o, Singleton, Glenfiddich, Laphroaigh Select." },
        { name: "Craft Beers & Stouts", desc: "Ask the bartender for current drafts." }
    ]
};

window.renderMenu = () => {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    Object.keys(menuRaw).forEach((category, index) => {
        const catDiv = document.createElement('div');
        catDiv.className = "reveal break-inside-avoid mb-10";
        
        let itemsHtml = menuRaw[category].map(item => `
            <div class="border-b border-brass/20 pb-4">
                <h4 class="font-serif text-[1.15rem] text-gunmetal mb-1 font-semibold">${item.name}</h4>
                <p class="font-sans text-sm text-gunmetal/70 leading-relaxed font-light">${item.desc}</p>
            </div>
        `).join('');

        catDiv.innerHTML = `
            <h3 class="font-mono text-lg text-gunmetal uppercase tracking-widest border-b border-gunmetal pb-3 mb-6 flex items-center">
                <span class="text-brass opacity-80 mr-3">0${index + 1}.</span> ${category}
            </h3>
            <div class="space-y-6">
                ${itemsHtml}
            </div>
        `;
        container.appendChild(catDiv);
    });
};

window.initScrollAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => observer.observe(reveal));

    requestAnimationFrame(() => {
        reveals.forEach(reveal => {
            const rect = reveal.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                reveal.classList.add('active');
            }
        });
    });
};

window.applyCMSDataToDOM = (data) => {
    document.getElementById('render-hero-img').style.backgroundImage = `url('${data.heroImg}')`;
    document.getElementById('render-about-text').innerHTML = data.aboutText;
    
    if(!data.gallery || data.gallery.length === 0) return;
    
    const firstImg = data.gallery[0];
    const restImgs = data.gallery.slice(1);

    const firstHTML = `
        <div class="relative reveal group w-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl md:rounded-[2rem] overflow-hidden transform transition-all duration-700 hover:-translate-y-3">
            <img src="${firstImg}" class="w-full h-auto max-h-[70vh] object-cover transition-transform duration-[2s] group-hover:scale-105" loading="lazy">
        </div>
    `;

    const restHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-4">` + restImgs.map((url, idx) => `
        <div class="relative reveal group w-full shadow-[0_15px_30px_rgba(0,0,0,0.12)] rounded-2xl md:rounded-3xl overflow-hidden transform transition-all duration-700 hover:-translate-y-2" style="animation-delay: ${idx * 150}ms">
            <img src="${url}" class="w-full h-64 object-cover transition-transform duration-[2s] group-hover:scale-105" loading="lazy">
        </div>
    `).join('') + `</div>`;

    const featureEl = document.getElementById('featured-gallery-img');
    if(featureEl) featureEl.innerHTML = firstHTML;
    
    const gridEl = document.getElementById('modern-gallery-grid');
    if(gridEl) gridEl.innerHTML = restHTML;
};

window.addGalleryInput = (val = '') => {
    const container = document.getElementById('admin-gallery-urls');
    const div = document.createElement('div');
    div.className = 'flex gap-2 mb-2';
    div.innerHTML = `
        <input type="text" class="gal-url-input w-full bg-canvas border border-brass/30 px-4 py-2 text-sm focus:outline-none focus:border-olive font-sans" value="${val}" placeholder="Paste image URL here">
        <button onclick="this.parentElement.remove()" class="bg-red-900 text-canvas px-4 hover:bg-red-700 cursor-pointer border-none font-mono text-sm shadow-sm transition-colors">Remove</button>
    `;
    container.appendChild(div);
};

window.populateAdminFields = (data) => {
    document.getElementById('input-hero-img').value = data.heroImg;
    document.getElementById('input-about-text').value = data.aboutText;
    document.getElementById('input-admin-pin').value = data.pin;
    
    const container = document.getElementById('admin-gallery-urls');
    container.innerHTML = '';
    data.gallery.forEach(url => window.addGalleryInput(url));
};

window.attemptLogin = () => {
    const inputPin = document.getElementById('admin-pin').value;
    const errorMsg = document.getElementById('login-error');
    
    if(inputPin === window.siteData.pin) {
        errorMsg.classList.add('hidden');
        document.getElementById('admin-login-block').classList.add('hidden');
        document.getElementById('admin-dashboard-block').classList.remove('hidden');
        document.getElementById('admin-pin').value = '';
        window.populateAdminFields(window.siteData);
    } else {
        errorMsg.classList.remove('hidden');
    }
};

window.logoutAdmin = () => {
    document.getElementById('admin-login-block').classList.remove('hidden');
    document.getElementById('admin-dashboard-block').classList.add('hidden');
};

window.saveCMSDataOfflineFallback = async () => {
    alert("Database connection requires a modern browser. Running in offline preview mode.");
    document.getElementById('save-btn-text').classList.remove('hidden');
    document.getElementById('save-spinner').classList.add('hidden');
    
    const newGallery = Array.from(document.querySelectorAll('.gal-url-input')).map(input => input.value).filter(v => v.trim() !== '');
    window.siteData.heroImg = document.getElementById('input-hero-img').value;
    window.siteData.aboutText = document.getElementById('input-about-text').value;
    window.siteData.gallery = newGallery;
    window.siteData.pin = document.getElementById('input-admin-pin').value;
    window.applyCMSDataToDOM(window.siteData);
    
    const statusMsg = document.getElementById('save-status');
    statusMsg.style.opacity = '1';
    setTimeout(() => { statusMsg.style.opacity = '0'; }, 3000);
};

document.addEventListener("DOMContentLoaded", function() {
    window.applyCMSDataToDOM(window.siteData);
    window.renderMenu();
    window.initScrollAnimations();
});
