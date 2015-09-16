$(function (){
  
  var User = {
    handle: '@bradwestfall',
    img: 'brad.png'
  }

  var composeStr = $('#template-compose').html();
  var composeTmpl = Handlebars.compile(composeStr);

  var tweetStr = $('#template-tweet').html();
  var tweetTmpl = Handlebars.compile(tweetStr);

  var threadStr = $('#template-thread').html();
  var threadTmpl = Handlebars.compile(threadStr);
  
  function renderCompose() {
    return composeTmpl();
    
  }
  
  function renderTweet(User, message) {
    return tweetTmpl({
      img: User.img,
      handle: User.handle,
      message: message
    })

      // var output = { => same as line 38 - 41
    //   img: User.img,
    //   handle: User.handle,
    //   message: meesage
    // }

    // return tweetTmpl(output)
  }

  function renderThread(User, message) {
      return threadTmpl({
        tweet: renderTweet(User, message),
        compose: renderCompose()
      })
  }

  $('main').on('click', 'textarea', function() {
    $(this).parent().addClass('expand');

  })

  $('body').on('click', '.tweet', function () {
    $(this).parent().toggleClass('expand');

   })

   $('main').on('submit', 'form', function (event) {
      event.preventDefault();
      var txt = $(this).find("textarea").val()

      if ($(this).parents('.replies').length) {
          $(this).parents('.replies').append(renderTweet(User, txt)) 
      } else {
        $('.tweets').append(renderThread(User, txt)) 
      }

      $(this).find('textarea').val('')
      $(this).removeClass('expand')
      


   })

})
