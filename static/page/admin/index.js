let itemWord = {
  text: '',
  images: '',
  video: '',
  poster: '',
  displayDate: moment().format('YYYY-MM-DD'),
  link: 0,
  send: 0,
  comment: 0,
  collection: 0,
  source: '',
  addDate: moment().format('YYYY-MM-DD HH:mm:ss')
}

var app = new Vue({
  el: '#app',
  data: {
  	loginInfo: false,
    list: [],
    itemWord: {...itemWord},
    st: 0
  },
  created () {
  	this.init()

    // $.get('/weChart/word/so', res=>{
    //   this.imgList = res.list
    // })

  },
  methods: {
  	init () {
  		this.isLogin()
  		this.getWord()
  	},

  	// 是否登录
  	isLogin () {
			$.get('/admin/login/get', (res) => {
				if (res.code === 0 ) {
					this.loginInfo = true
				}
			})
  	},

  	// 获取列表
  	getWord() {
  		$.get('/admin/word', {st: this.st * 10}, (res) => {
				if (res.code === 0 ) {
					this.list = res.datas
				}
			})
  	},

  	// 添加
  	addWord() {
  		this.itemWord.link = parseInt(Math.random()*100)
  		this.itemWord.send = parseInt(Math.random()*100)
  		this.itemWord.collection = parseInt(Math.random()*100)
  		$.post('/admin/word/add', this.itemWord, (res)=> {
  			if (res.code === 0) {
  				this.getWord()
  				$('#addWordFrom').modal('hide')
  			}
  		})
  	},

    //修改 
    upWord () {
      console.log(this.itemWord)
      $.post('/admin/word/up', this.itemWord, (res)=> {
        if (res.code === 0) {
          this.getWord()
          $('#addWordFrom').modal('hide')
        }
      })
    },

  	del(id) {
  		let r = confirm("确认要删除吗？")
  		if(r) {
  			$.get('/admin/word/del', {id: id}, (res)=> {
  				if (res.code === 0) {
  					this.getWord()
  				}
  			})
  		}
  	},

		//str表示要转换的字符串
  	trim(str) {  
			return str.replace(/\n|\r\n/g, '<br/>')
		},

    dateFmt(d) {
      return moment(d).format('YYYY-MM-DD')
    },

    // 回填
    backfill (item) {
      let word = {...item}
      word.images = word.images.toString()
      word.displayDate = moment(item.displayDate).format('YYYY-MM-DD')
      this.itemWord = word
      console.log(this.itemWord)
      $('#addWordFrom').modal('show')
    }
	}
})

// 登录
$('#setSignIn').on('click', function() {
	$.post('/administration/login', {
		userName: $('#inputUser').val(),
		password: $('#inputPassword').val(),
	}, (res) => {
		if (res.code === 0) {
			app.init()
			$('#myLodinFrom').modal('hide')
		} else {
			alert(res.msg)
		}
	})
})

$('#addWordFrom').on('hidden.bs.modal', function (e) {
  app.itemWord = {...itemWord}
})