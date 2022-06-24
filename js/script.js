//Mensagem desejada.
let msg = '*Success! Message sent.';

//Nome da classe para estilizar a mensagem.
let clmsg = 'msgEnvio';

$('#form').on('submit', function(e){
	e.preventDefault();
	let details = $('#form').serialize();

	$.post('enviar.php', details, function(data){
		document.querySelector('.targetmsg').innerHTML = '<p class="'+clmsg+'">'+ msg +'</p>';
		document.querySelector('#form').reset();
	})
});