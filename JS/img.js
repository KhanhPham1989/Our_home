$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const boxes = document.querySelectorAll('.box');
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

render: function() {
    const htmls = this.images.map ((images, id) => {
        return `
            <div class="box1"  data-index="${id}" style="background-image: url('${images.image}')"></div>
           
        `
  })
 boxes.innerHTML = htmls.join('')
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