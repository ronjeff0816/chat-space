$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message-list" data-message-id=${message.id}>
         <div class="message-list__user">
           <div class="message-list__user--name">
             ${message.user_name}
           </div>
           <div class="message-list__user--time">
             ${message.date}
           </div>
         </div>
         <div class="message-list__topic">
           <p class="message-list__topic--content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
    } else {
      var html =
        `<div class="message-list" data-message-id=${message.id}>
          <div class="message-list__user">
            <div class="message-list__user--name">
              ${message.user_name}
            </div>
            <div class="message-list__user--time">
              ${message.date}
            </div>
          </div>
          <div class="message-list__topic">
            <p class="message-list__topic--content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
 
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message-list').append(html);
        $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');   
        $('.new_message')[0].reset();
      })
      .fail(function(){
        alert('メッセージを入力してください');
      });
      return false;
  });

  var reloadMessages = function() {
    var last_message_id = $('.message-list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        }
    })
    .fail(function() {
      alert('メッセージを入力してください');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
   }

 });