document.addEventListener('mousemove', (ev) => {
    const circle = document.querySelector(".circle");
    // const square_int = Math.floor(Math.random() * 1000);
    // circle.style.borderRadius = 50 + '%'
    // circle.style.height = 35 + 'px'
    // circle.style.width = 35 + 'px'
    // if (square_int < 20) {
    //     circle.style.borderRadius = 0;
    //     circle.style.height = 100 + 'vh';
    //     circle.style.width = 100 + 'vh';
    // }

    circle.style.left = ev.pageX - 25 + 'px';
    circle.style.top = ev.pageY - 25 + 'px';
    circle.style.borderRadius = (ev.pageX % 50) + (ev.pageY % 50) + '%';
    if (Math.floor(Math.random() * 100) === 69) {
        circle.style.height = circle.clientHeight + 1 + "px";
        circle.style.width = circle.clientWidth + 1 + "px";
    }
})

let generate_button = document.querySelector(".generator-button")
let generate_input = document.querySelector(".generator-input")
let container = document.querySelector(".container")
let keys = []
let clicked

function generate_key(src) {
    const new_key = document.createElement("img");
    new_key.classList.add("key", "unplaced") 
    console.log(src);               
    new_key.src = src;
    new_key.draggable = "true"
    container.appendChild(new_key);
}

generate_button.addEventListener('click', (ev) => {
    if (generate_input.value === "outsmarted the wolves" && placed === 0) {
        generate_key("images/istockphoto-91895082-612x612.jpg");
        generate_input.value = '';
    }

    if (generate_input.value === "tricked by wolves" && placed === 0) {
        const dead = document.createElement("div");
        dead.classList.add("text", "small");
        dead.id = "remove-1"
        dead.innerHTML = "Haha! You were tricked by wolves. Of course they can climb roofs! During their attack, you fell off your ladded. Luckily, you're alright, but your flashlight fell to pieces. When you put it back together, the beam was much smaller than before. Sucks to be you!";
        container.appendChild(dead);
        generate_input.value = '';
        circle = document.querySelector(".circle");
        circle.style.height = "30px";
        circle.style.width = "30px";
    }

    if (generate_input.value === "thirteen dozen bananas" && placed === 1) {
        generate_key("images/bananas.png");
        generate_input.value = '';
    }

    if (generate_input.value === "leafblown the wolves" && placed === 2 && defeated === true) {
        console.log(defeated);
        generate_key("images/leafblowerwolf.jpg");
        generate_input.value = '';
    }

    if (generate_input.value === "i am rabbit for the forest" && placed === 3) {
        generate_key("images/rabbit.jpg");
        generate_input.value = '';
    }

    if (generate_input.value.includes("ai") && placed === 4) {
        generate_key("images/garbage.jpg");
        generate_input.value = '';
    }
    keys = document.querySelectorAll(".key.unplaced")
    let offset_x, offset_y;
    console.log(keys)
    keys.forEach(key => {
        key.addEventListener('click', (event) => {
            key.style.pointerEvents = "none"
            clicked = key
            offset_x = event.pageX - key.getBoundingClientRect().left;
            offset_y = event.pageY - key.getBoundingClientRect().top;
            function on_mouse_move(event) {
                key.style.left = event.pageX - offset_x + 'px';
                key.style.top = event.pageY - offset_y + 'px';
            }

            document.addEventListener('mousemove', on_mouse_move);

            document.addEventListener('mouseup', () => {
                key.remove();
            })
        })
    })
})

let defeated = false;
const dock_box = document.querySelectorAll('.dock-box');
const gradient_list = ['red', 'violet', 'orange', 'indigo', 'yellow', 'blue', 'green']
let placed = 0;

dock_box.forEach(box => {
    box.addEventListener('dragover', (event) => {
        event.preventDefault();
        box.style.borderColor = '#000'; 
    })// Change border color on drag over
});

dock_box.forEach(box => {
    box.addEventListener('dragleave', (event) => {
        event.preventDefault();
        box.style.borderColor = '#ccc'; 
    }) // Revert border color on drag leave
});

dock_box.forEach(box => {
    box.addEventListener('click', (event) => {
        event.preventDefault();
        box.style.borderColor = '#ccc'; // Revert border color on drop
        
        box.innerHTML = `<img src="${clicked.src}" class="key placed" alt="Dropped Image" style="max-width: 100%; max-height: 100%;">`;
        console.log(placed);
        placed += 1
        if (placed === 1){
            let remove_1 = document.querySelectorAll("#remove-1");
            remove_1.forEach(el => {
                el.remove();
            })
            let scattered = document.querySelectorAll("#scatter");
            scattered.forEach(el => {
                el.remove();
            })
            let header = document.querySelector("#header");
            header.innerHTML = "Key 1 Entered!"
            let clue = document.querySelector("#clue");
            clue.innerHTML = "Six and seven letters is all you will need to solve this next clue. Which letters? Hmm, hard to say. Unfortunately, individual letters are prone to being scattered about by the gradient lords. Fickle beings, those ones."
            let letters_to_scatter = ["b", "a", "n", "t", "h", "i", "r", "e"]
            for (let i = 0; i < letters_to_scatter.length; ++i){
                let letter = document.createElement("div");
                letter.classList.add("text", "small", "scatter");
                letter.id = "scatter";
                // letter.style.color = "white";
                letter.innerHTML = letters_to_scatter[i];
                container.appendChild(letter);
                console.log(letter);
            }
            clue.classList.add("scatter");
            scatter();
        }

        if (placed === 2){
            let header = document.querySelector("#header");
            let clue = document.querySelector("#clue");
            let scattered = document.querySelectorAll("#scatter");
            scattered.forEach(el => {
                el.remove();
            })
            header.innerHTML = "Oh no! Swamp Monster!"
            clue.innerHTML = "The unfortunate thing about Christmas is that the trees are much too green. I greatly prefer BLUE trees. In my world, BLUE is BLOW and if you BLOW hard enough you get the wolves to LEAVE you alone."
            let monster = document.createElement("img");
            monster.classList.add("scatter");
            monster.id = "monster"
            monster.src = "images/swamp-monster.jpg";
            container.appendChild(monster);
            scatter()
            let monster_hp = Math.floor(Math.random() * 30);
            let clicked_count = 0
            monster.addEventListener('click', () => {
                clicked_count += 1;
                if (clicked_count === monster_hp){
                    monster.remove();
                    header.innerHTML = "Swamp Monster Defeated!";
                    defeated = true;
                }
            })
        }

        if (placed === 3) {
            let header = document.querySelector("#header");
            let clue = document.querySelector("#clue");
            header.innerHTML = "Key 3 Entered!";
            clue.innerHTML = "Sorry, I forgot to tell you that there are swamp monsters here. Looks like you figured it out yourself. Anyway, here are too facts about rabbits. They are for the forest, and they have strong anti-gradient powers. Sadly, I don't think you can find a forest around here. But, if you think like a rabbit, maybe a forest will find you. Or maybe, forest the find will you rabbit.";
            scatter();
        }

        if (placed === 4) {
            let header = document.querySelector("#header");
            let clue = document.querySelector("#clue");
            header.innerHTML = "Key 4 Entered!";
            clue.innerHTML = "Here is a riddle: If you're a rabbit, you have to be a rabbit. But if you're a rabbit, you can't be a rabbit. What am I?";
            scatter();
        }
        if (placed === 5){
            container.style.background = "white";
            dock_box.forEach(box => {
                box.style.backgroundImage = '';
                box.style.background = "white";
            })
            dock = document.querySelector(".dock");
            dock.style.background = "black";
            let clue = document.querySelector("#clue");
            clue.classList.remove("scatter");
            clue.style.color = "black";
            clue.innerHTML = "You've entered all five keys! Now, the gradient lords have been defeated. For your help, you must be rewarded. But first, you must solve another riddle. Careful, this one will take you out into the real world.\n\nIs a fast horse that can't run a good horse? What about a slow horse that can run forever? How far must a slow horse run to be a good horse? How many slow horses must a fast horse speed to be a good horse no run?"

            let answer = document.createElement("div");
            answer.classList.add("text", "small", "scatter");
            answer.innerHTML = "And what is a horse, but a way to make smoothies?"
            answer.style.color = "white";
            container.appendChild(answer);
            scatter();
            let header = document.querySelector("#header");
            header.style.color = "black";
            header.innerHTML = "All keys entered!";
            // let generate_input = document.querySelector(".input-container");
            // generate_input.remove();
        }
        else {
            let text = document.querySelectorAll(".text")
            container.style.backgroundImage = `radial-gradient(circle, ${gradient_list.slice(0, gradient_list.length-placed)})`
            text.forEach(text_box => {
                text_box.style.backgroundImage = `radial-gradient(circle, ${gradient_list.slice(0, gradient_list.length-placed)})`
            })
            generate_button.style.backgroundImage = `radial-gradient(circle, ${gradient_list.slice(0, gradient_list.length-placed)})`
            generate_input.style.backgroundImage = `radial-gradient(circle, ${gradient_list.slice(0, gradient_list.length-placed)})`
            scatter_button.style.backgroundImage = `radial-gradient(circle, ${gradient_list.slice(0, gradient_list.length-placed)})`
        }

        clicked = undefined;
        
    })
});

function scatter() {
    let scatters = document.querySelectorAll(".scatter")
    scatters.forEach(scatter => {
        console.log(scatter.id);
        scatter.style.top = Math.max(0, Math.floor(Math.random() * window.innerHeight) - scatter.style.height) + 'px'
        scatter.style.left = Math.max(0, Math.floor(Math.random() * window.innerWidth) - scatter.style.width) + 'px'
        console.log(scatter.style.left)
    })
}

scatter()

let scatter_button = document.querySelector(".scatter-button")

scatter_button.addEventListener('click', () => {
    scatter()
})