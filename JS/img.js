// $ = document.querySelector.bind(document);
// $$ = document.querySelectorAll.bind(document);
const boxes = document.querySelectorAll('.box');
let data = [];
let itemsPerPage = 24;
let page = 1;
const app = {
    currentIndex : 0, // lay ra chi muc dau tien cua mang
    images : [
      {
        id : 'a0',
        image: './IMG/0.jpg' ,
      },
      {
        id : 'a1',
        image: './IMG/1.jpg' ,
      },
      {
        id : 'a2',
        image: './IMG/2.jpg' ,
      },
      {
        id : 'a3',
        image: './IMG/3.jpg' ,
      },
      {
        id : 'a4',
        image: './IMG/4.jpg' ,
      },
    ],

render: function displayImages(app, page) {
  let s = ``;
  let startItem = (page - 1) * itemsPerPage; 
  let stopItem = startItem + itemsPerPage;

  for (let i = startItem; i < stopItem; i++) {
      s += `<div class="box1" data-id="${app[i].id}">
              <img src="./IMG/${app[i].image}" alt="" class="image">
          </div> `;
  };
  // document.querySelector(".box").innerHTML = html.join(s);
  console.log(s);
},

show : function checkBoxes() {
        window.addEventListener('scroll', checkBoxes)
         const triggerBottom = window.innerHeight / 5 * 4

         boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
},
start : function() {
    
    this.show()
    
    // Render playlist
    this.render()
  }
};

app.start()