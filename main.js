(function(){
	var monthData, $wrapper;
	var datepicker=window.datepicker;
	datepicker.buildUi=function(year,month){
		 monthData=datepicker.getMonthData(year,month);
		console.log(monthData)
		var html='<div class="ui-datepicker-header">'+
			'<a class="ui-datepicker-btn ui-datepicker-prev-btn" href="#">&lt;</a>'+
			'<a class="ui-datepicker-btn ui-datepicker-next-btn" href="#">&gt;</a>'+
			'<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>'+
			'</div>'+
			'<div class="ui-datepicker-body">'+
			'<table>'+
				'<thead>'+
					'<tr>'+
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
						'<th>日</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>';
				console.log(monthData)
				for (var i = 0; i < monthData.days.length; i++) {
					var date=monthData.days[i];
					if(i%7===0){
						html+='<tr>';
					}
					
					html +='<td data-date="' + monthData.days[i].date + '">'+date.showDate+'</td>';
					if(i%7===6){
						html +='</tr>'
					}
				}
				html+='</tbody>'+
					'</table>'+
					'</div>';
						return html;
		};
	datepicker.render = function (direction){
		var year, month;
		if (monthData) {
			year = monthData.year;
			month = monthData.month;
		}
		if (direction === 'next'){
			month ++;
		}
		if (direction === 'prev'){
			month --;
		} 
		if (month < 1) {
			year--;
			month = 12;
		}
		if(month > 12) {
			year++;
			month = 1;
		}
		var html=datepicker.buildUi(year,month);
		if(!$wrapper){
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className='ui-datepicker-wrapper';
		}
		
		
		$wrapper.innerHTML=html;

	};

	datepicker.init=function(input){
		
		var $input=document.querySelector(input);
		datepicker.render();

		var isopen=false;
		$input.addEventListener("click",function(){
			if(isopen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isopen=false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left=$input.offsetLeft;
				var top=$input.offsetTop;
				$wrapper.style.top=top+2+'px';
				$wrapper.style.left=left+'px';
				isopen=true;
			}
		},false);
		$wrapper.addEventListener('click', function(e){
			var $target=e.target;
			if (!$target.classList.contains('ui-datepicker-btn')) {
				return false;
			}
			if ($target.classList.contains('ui-datepicker-prev-btn')) {
				datepicker.render('prev');
			} else if ($target.classList.contains('ui-datepicker-next-btn')) {
				datepicker.render('next');
			}

		}, false);
		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== 'td') {
				return false;
			}
			var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
			$input.value = format(date);
			$wrapper.classList.remove('ui-datepicker-container-show');
		}, false);
	};

	function format (date) {
		alert(1)
		var result = '';
		var padding = function (num) {
			if (num <= 9) {
				return '0' + num;
			}
			return num;
		}
		result += date.getFullYear() + '-';
		result += padding(date.getMonth() + 1) + '-';
		result += padding(date.getDate());
		return result;
	}


})()