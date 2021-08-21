$(document).ready(() => {
	new WOW().init();

	$('.test-popup-link').magnificPopup({
		type: 'image'
	});

	document.getElementById('burger').onclick = function () {
		document.getElementById('menu').classList.add('open');
	};
	document.querySelectorAll('#menu > *').forEach((item) => {
		item.onclick = () => {
			document.getElementById('menu').classList.remove('open');
		}
	});

	$('#btn').on('click', function () {
		let forName = $('#for-name');
		let forAddress = $('#for-address');
		let forPhone = $('#for-phone');

		forName.addClass('hide');
		forAddress.addClass('hide');
		forPhone.addClass('hide');

		let name = $('#name');
		let address = $('#address');
		let phone = $('#phone');
		let error = false;

		name.removeClass('error');
		address.removeClass('error');
		phone.removeClass('error');


		if (!name.val()) {
			forName.removeClass('hide');
			name.addClass('error');
			error = true;
		}

		if (!address.val()) {
			forAddress.removeClass('hide');
			address.addClass('error');
			error = true;
		}

		if (!phone.val()) {
			forPhone.removeClass('hide');
			phone.addClass('error');
			$('#btn').css('margin-top', '16px')
			error = true;
		}

		if (!error) {
			let loader = $('#loader');
			loader.css('display', 'flex');

			$.ajax({
				method: "POST",
				url: 'https://itlogia.ru/test/checkout',
				data: {
					name: name.val(),
					address: address.val(),
					phone: phone.val()
				}
			}).done(function (message) {
				loader.hide();

				console.log(message);

				let success = $('#order-form-success');
				let form = $('#order-form');

				if (message.success) {
					success.removeClass('hide');
					form.addClass('hide');
				} else {
					alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
				}
			});
		}
	})
})