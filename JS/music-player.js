/**
    1. Render songs
    2. Scroll top
    3. Play/pause/seek
    4. CD rotate
    5. Next / Prev
    6. Random songs
    7. Next/ Repeat when ended
    8. Active songs
    9. Scroll active song into view
    10. Play song when click
 */

$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_player'
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBTn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const app = {
    currentIndex : 0, // lay ra chi muc dau tien cua mang
    isPlaying : false, // đăt biến để pause, true thi playing, 
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs : [
      {
        name: '2B House - Working day',
        singer: 'All',
        path: './CLIP/WorkingDay.mp4',
        image: './CLIP/2BB.jpg' ,
      },
      {
        name: '2B House - Birthday',
        singer: 'All',
        path: './CLIP/SN 1 tuổi.mp4',
        image: './CLIP/2BB.jpg' ,
      },
      {
        name: '2B House - Birthday 2',
        singer: 'All',
        path: './CLIP/SN 1 tuổi.1.mp4',
        image: './CLIP/2BB.jpg' ,
      },
      {
        name: '2B House - Mừng SN Chị gái',
        singer: 'All',
        path: './CLIP/Yingshu SN.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      
      {
        name: '2B House - Cổ vũ xe đạp',
        singer: 'All',
        path: './CLIP/dua xe đạp.mp4',
        image: './CLIP/2BB.jpg' ,
      },
      {
        name: '2B House - Cổ vũ xe đạp 2',
        singer: 'All',
        path: './CLIP/đua xe dap 2.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - About us ',
        singer: 'All',
        path: './CLIP/clip 7.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - About us 02',
        singer: 'All',
        path: './CLIP/store3.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Như Phương EMP',
        singer: 'All',
        path: './CLIP/NP.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Uyên Phương EMP',
        singer: 'All',
        path: './CLIP/UP.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Our Sister',
        singer: 'All',
        path: './CLIP/Thu1.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Bảo Trân EMP',
        singer: 'All',
        path: './CLIP/Trân.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Quách Vân EMP',
        singer: 'All',
        path: './CLIP/Vân.mp4',
        image: './CLIP/2BB.jpg' ,
      },
      {
        name: '2B House - Chị em sát phạt',
        singer: 'All',
        path: './CLIP/Play1.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Marketing',
        singer: 'All',
        path: './CLIP/clip 2B.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - YEP 2020',
        singer: 'All',
        path: './CLIP/Gala1.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Yep 2020',
        singer: 'All',
        path: './CLIP/Gala2.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Khéo tay hay làm ',
        singer: 'All',
        path: './CLIP/Yingshu.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Cơm tró',
        singer: 'All',
        path: './CLIP/D3.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Nhà có 5 nàng tiên',
        singer: 'All',
        path: './CLIP/Team-clip.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      {
        name: '2B House - Kênh bóc phốt',
        singer: 'All',
        path: './CLIP/W4.mp4',
        image: './CLIP/2BB.jpg' ,
      }, 
      
  ],
  setConfig: function(key, value) {
      this.config(key) = value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
  },
  render: function() {
      const htmls = this.songs.map ((song, index) => {
          return `
              <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                  <div class="thumb" style="
                  background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="titile">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>       
          `
    })
    playList.innerHTML = htmls.join('')
  },

  defineProperties : function() {
    Object.defineProperty(this, 'currentSong', {
      get : function() {
        return this.songs[this.currentIndex]
      }
    }) // search hàm define
  },

  // lắng nghe sự kiện trang HTML
  handleEvents : function() {
      const _this = this
      const cdWidth = cd.offsetWidth

      // xử lý CD quay và dừng
      const cdThumbAnimate = // hàm trả về 1 đối tượng
      cdThumb.animate ( 
        { transform : 'rotate(360deg)'} ,
        { duration : 10000, //10 seconds
          iterations : Infinity } // I viết hoa 
        )

      cdThumbAnimate.pause

      // Xử lý phóng to/ thu nhỏ
      document.onscroll = function() {
        // console.log(window.scrollY) // window biến đại diện cửa sổ HTML
        const scrollTop = window.scrollY || document.documentElement.scrollTop
      // toán tử logic, không có 1 thì lấy 2 thông qua dâu ||
        const newcdWidth = cdWidth - scrollTop

        cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0
        cd.style.opacity = newcdWidth / cdWidth 
        // làm mờ : kích thước mới : kích thước cũ = kết quả < 1
      }

      // Xử lý khi click playlist
      playBTn.onclick = function() {
          if(_this.isPlaying) {
            audio.pause()
          } else {
            audio.play()
          }
      }
      // console.log(cdThumbAnimate)

      // khi song được play 
      audio.onplay = function() {
        _this.isPlaying = true
        player.classList.add('playing')
        cdThumbAnimate.play() // tra phương thức animate trả về play
      }

      // khi song stop
      audio.onpause = function() {
        _this.isPlaying = false
        player.classList.remove('playing')
        cdThumbAnimate.pause()
      }

      // khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function() {
        if (audio.duration) {
          const progressPercent = Math.floor(audio.currentTime / audio.duration * 100) 
          progress.value = progressPercent
        }
      }  
      // xu ly khi tua song
      progress.onchange = function (e) {
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
      }

      //khi next song 
      nextBtn.onclick = function() {
        if (_this.isRandom) {
            _this.playRandomSong()
        } else {
          _this.nextSong()
        }
          audio.play()
          _this.render()
          _this.scrollTopActiveSong()
      }

      
      //khi prev song 
      prevBtn.onclick = function() {
        if (_this.isRandom) {
          _this.playRandomSong()
      } else {
        _this.prevSong()
      }
        audio.play()
        _this.render()
    }

      
      // xử lý next song khi End 
      audio.onended = function() {
        if (_this.isRepeat ) { 
          audio.play()
        } else {
          nextBtn.click ()
        }
      }

      // lắng nghe hành vi click vào playlist
      playList.onclick = function(e) {
        const songNode = e.target.closest('.song:not(.active)')
        //xử lý khi click vào song
          if ( songNode ||  e.target.closest('.option')) {
            if ( songNode) {
              _this.currentIndex = Number(songNode.dataset.index)
              _this.loadCurrentSong()
              _this.render()
              audio.play()
            }

            if ( e.target.closest('.option')) {

            }

          }
      }

      // khi random songs
      randomBtn.onclick = function() {
        _this.isRandom = !_this.isRandom
        _this.setConfig('isRandom', _this.isRandom)
        randomBtn.classList.toggle('active',  _this.isRandom)
        // boolen là true thi add class, false thi remove
      }


      // xử lý phát lại 1 bài hát
      repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat
      _this.setConfig('isRandom', _this.isRandom)
      repeatBtn.classList.toggle('active',  _this.isRepeat)
      }

  },// ngoặc lớn chứa 1 hàm nhieuf chức năng chức năng

  scrollTopActiveSong : function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior : 'smooth',
        block : 'nearest'
    }) 
    }, 300)
  },


  loadCurrentSong : function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  loadConfig : function() {
      this.isRandom = this.config.isRandom
      this.isRandom = this.config.isRepeat
  },

  nextSong: function() {
    this.currentIndex++
    if(this.currentIndex >= this.songs.length) { //index array tu 0
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },

  prevSong: function() {
    this.currentIndex--
    if(this.currentIndex >= this.songs.length) { //index array tu 0
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },


  playRandomSong: function() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
      
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },

  start : function() {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig()
    // Định nghĩa các thuộc tính cho Object
      this.defineProperties()

    // Lắng nghe / xử lý các sự kiện
      this.handleEvents()

    // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
      this.loadCurrentSong()

    
    // Render playlist
      this.render()
  }
};

app.start()


