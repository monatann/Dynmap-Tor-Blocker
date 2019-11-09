jQuery(document).ready(function () {
	//tor判断
	jQuery.ajax({
		//https://monatann.azurewebsites.net/crossdomain.phpにリクエスト
		url: 'https://monatann.azurewebsites.net/crossdomain.php',
		data: {
			//送信するデータの設定(今回はtextが欲しいURL)
			"crossdomain_url": "https://check.torproject.org/exit-addresses"
		},
		//textで受け取る
		dataType: 'text',
		//クロスドメインを行う
		crossDomain: 'true',
		//POSTを行う
		type: 'POST'
			//成功したら
	}).done(function (data) {
		var html = data;
		var tor;
		if (html.indexOf(ipAddress) != -1) {
			tor = "true";
			var result = window.confirm('Blocked because of Tor IP!');
				location.href = "https://www.google.co.jp/";
		}else{
			tor = "false";
		}
	}).fail(function (jqXHR, textStatus) {
		console.log('Failed to connect', jqXHR, textStatus);
	});

	setTimeout(function () {
		//search DIMs
		jQuery("#mcmap > div.sidebar > div > fieldset:nth-child(2) > legend").after('<input type="text" id="searchDIM" placeholder="Search Dimention(ID/Name)"><br><br>');

		var name;
		var html;
		//If you write text in search box
		jQuery(document).on('keyup', '#searchDIM', function () {
			//get value
			name = jQuery("#searchDIM").val().toLowerCase();

			//display and not display
			jQuery('#mcmap > div.sidebar > div > fieldset:nth-child(2) > ul > li').each(function () {
				//all hide
				jQuery(this).css("display", "none");
				//get html
				html = jQuery(this).text().toLowerCase();
				//If html contains serch box value,display
				if (html.match(name)) {
					jQuery(this).css("display", "table-row");
				}
			});

		});
	}, 1000);
});
