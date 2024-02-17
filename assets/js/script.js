//access token 4905856019427443
$(document).ready(function () {




    if (input == '') {
        $('#show-hero').attr('style', 'display:none');
    }
    $('#submit').on('submit', function (e) {
        e.preventDefault();
        let input = $('#input').val();



        validar(input);
        $("#input").val('');
    })


    function validar(input) {
        let validator = /[0-9]/i;
        if (validator.test(input) != true) {
            alert('input invalido, este debe ser un numero')
        } if (input >= 733) {
            alert('numero invalido, debe ser menor a 733')
        }



        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${input}`,
            type: "GET",
            dataType: "json",
            success: function (data) {

                $('.card-title').text(`${data.name}`);

                $('.card-img-top').attr('src', `${data.image.url}`);
                $('.card-text').text(data.work.occupation);

                let dataPoints = []
                for (let stat in data.powerstats) {

                    dataPoints.push({ label: stat, y: data.powerstats[stat] })
                }

                let option = {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: false,
                    animationEnabled: true,
                    title: {
                        text: "Stats del super heroe"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: dataPoints


                    }]
                }

                let chart = new CanvasJS.Chart("chartContainer", option);
                chart.render();


            }, error: function (error) {
                console.log(error);
            }
        })


    }

});