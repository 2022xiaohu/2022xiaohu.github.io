function show_message(msg) {
    window.Notification.permission = "granted";
    // alert(window.Notification.permission);
    if(window.Notification) {
        if(window.Notification.permission == "granted") {
            var notification = new Notification('你有一条新信息', {
                body: msg,

                // icon: "img/1.jpg"
            });
            // setTimeout(function() { notification.close(); }, 5000);
        }else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                var notification = new Notification("Hi there!");
              }
            });
          }
    } else alert('你的浏览器不支持此消息提示功能，请使用chrome内核的浏览器！');
};