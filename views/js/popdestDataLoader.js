
    var start_index = 0;
    var number_of_record = 3;
    var state = true;
    let finish = false;
    let j = 0;

    window.addEventListener('scroll', () => {
        // Kullanıcının sayfanın tam altına geldiğini belirleme
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && state && !finish) {
            // İlk terimse doğrudan yükleme yap
            document.getElementById("loading_animation").style.display = "block";
            setTimeout(load_data, 1000);

        }
    });

    function load_data() {

        state = false;

        const request = new XMLHttpRequest();
        request.open('GET', `/get_popDestData?start_index=${start_index}&num_record=${number_of_record}`);
        request.onload = () => {
            const results = JSON.parse(request.responseText);
            let html = '';
            let html2 = '';

                    
            if (results.length > 0) {
                results.forEach(result => {

                    let locationHTML = ""; // Lokasyonlar için HTML dizisi
                    if (result.locationNames && result.locationNames.length > 0) {
                        result.locationNames.forEach(location => {
                            locationHTML += "<li><a href='" + "www.google.com.tr" + "'>" + location + "</a></li>";
                        });
                    }
                    if (start_index == 0) {
                        html2 += '<section class="popdest-section mt-4 d-block">' +
                            '<img src="' + result.cityImg + '" alt="Keşfet" class="img-fluid d-block mt-5 mx-auto">' +
                            '<div class="ppopdests mt-5 d-flex justify-content-between" style="margin: 2% 11%;">' +
                            '<div class="text-left">' +
                            '<h2 class="city-rank mx-3">#' + ++j + '</h2>' +
                            '<h2 class="city-title mx-3">' + result.cityName + '</h2>' +
                            '<ol class="dest">' +
                            locationHTML + // Burada locationHTML direkt olarak ekleniyor
                            '</ol>' +
                            '</div>' +
                            '<div class="point-section justify-content-between d-block">' +
                            '<div class="d-flex">' +
                            '<h5 class="point">' + result.cityScore + '</h5>' +
                            '<div class="ratings">' +
                            '<i class="fa fa-star"></i>'.repeat(5) +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</section>';



                            ppopdest_data.innerHTML = ppopdest_data.innerHTML + html2;
                    } else {
                        html += "<section class='popdest-section mt-4  d-flex justify-content-between'><div class='popdests-context d-flex'><img src='" +
                            result.cityImg + "' alt='Keşfet' class='cityImg img-fluid'>" +
                            "<div class='popdests-text'>" +
                            "<h2 class='city-rank mx-3'>#" + (++j) + "</h2>" +
                            "<h2 class='city-title mx-3'>" + result.cityName + "</h2>" +
                            "<ol class='dest'>" +
                            locationHTML + // Lokasyonların HTML'ini ekleyin
                            "</ol>" +
                            "</div>" +
                            "</div>" +
                            '<div class="popdests">' +
                            '<div class="point-section">' +
                            '<div class="d-flex">' +
                            '<h5 class="point ">' + result.cityScore + '</h5>' +
                            '<div class="ratings d-flex">' +
                            '<i class="fa fa-star"></i>'.repeat(5) +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            "</section>";
                    }

                    start_index++;
                    

                });


            } else {
                finish = true;

            }
            
            popdests_data.innerHTML = popdests_data.innerHTML + html;
            document.dispatchEvent(new CustomEvent('customLoadEvent'));


            document.getElementById("loading_animation").style.display = "none";
        };
        request.send();

        if (!finish) {
            state = true;
        }

    }