$(document).ready(function() {
    $("#wholeSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#NewsAccordion").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    let source = 'bbc-news';
    let apiKey = '86205eddd8504ca6bb2c3145d0cff002';
    let newsAccordian = document.getElementById('NewsAccordion');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
    xhr.onload = function() {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            console.log(articles);
            let newsHtml = "";
            articles.forEach(function(element, index) {
                let news = `<div class="card">
                <div class="card-header" id="heading${index}">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            ${element['title']}
                        </button>
                    </h5>
                </div>

                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#NewsAccordion">
                    <div class="card-body">
                        ${element['content']}.<a href="${element['url']}" target="_blank">Read More</a>
                    </div>
                </div>
            </div>`;
                newsHtml += news;
            })
            newsAccordian.innerHTML = newsHtml;
        } else {
            console.log("Some error occured");
        }
    }
    xhr.send();
})