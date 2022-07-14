window.onload = () => {
  const socket = io("http://localhost:3000");

  const insertElementHtml = (mensagem) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
         <img src="${mensagem}" class="gallery-item" alt="gallery">`;
    return div;
  };

  const $ = selector => document.querySelector(selector);
  $("#send").addEventListener('click', function (e) {
    e.preventDefault();

    const input = $("#url").value;
    if (!input) {
      alert("Enter a domain to validate");
    }
    $("#result").innerHTML = "";

    socket.emit('message', { data: input })

  });
  socket.on('message', ({ data }) => {
    if (data === '1') {
      $("#result").innerHTML = "Page not found";
      alert("Page not found");
      return false;
    }

    $("#result").appendChild(insertElementHtml(data));


  })
};
